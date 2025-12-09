export type IFormControlErrorMessage = {
  required?: string;
  requiredTrue?: string;
  minlength?: string;
  maxlength?: string;
  pattern?: string;
  email?: string;
  min?: string;
  max?: string;
  [key: string]: string | undefined; // custom validators welcome (e.g., usernameTaken)
};

export type IUISize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IUIVariant =
  | 'primary'
  | 'info'
  | 'warning'
  | 'danger'
  | 'success'
  | 'outline';

import { AbstractControl, NgControl, Validators } from '@angular/forms';

export interface IErrorContext {
  label: string;
  error: any;
  control: AbstractControl | null;
}

const DEFAULT_ERROR_FACTORIES: Record<string, (ctx: IErrorContext) => string> =
  {
    required: ({ label }) => `${label || 'This field'} is required.`,
    requiredTrue: ({ label }) => `Please confirm ${label || 'this field'}.`,
    minlength: ({ label, error }) =>
      `${label || 'This field'} must be at least ${error.requiredLength} characters (currently ${error.actualLength}).`,
    maxlength: ({ label, error }) =>
      `${label || 'This field'} must be at most ${error.requiredLength} characters (currently ${error.actualLength}).`,
    pattern: ({ label }) => `${label || 'This field'} format is invalid.`,
    email: ({ label }) => `Please enter a valid ${label || 'email'}.`,
    min: ({ label, error }) =>
      `${label || 'This field'} must be ≥ ${error.min}.`,
    max: ({ label, error }) =>
      `${label || 'This field'} must be ≤ ${error.max}.`,
  };

export function resolveControlErrorMessage(
  ngControl: NgControl | null,
  label: string | undefined,
  errorMessage?: IFormControlErrorMessage,
  extraFactories: Record<string, (ctx: IErrorContext) => string> = {}
): string | null {
  const control = ngControl?.control ?? null;
  const errors = control?.errors ?? null;
  if (!errors) return null;

  const keys = Object.keys(errors);
  if (!keys.length) return null;

  const key = keys[0];
  const err = errors[key];
  const trimmedLabel = (label || '').trim();

  const ctx: IErrorContext = {
    label: trimmedLabel,
    error: err,
    control,
  };

  // 1) custom template via [errorMessage]
  const customTpl = errorMessage?.[key];
  if (customTpl) {
    return interpolate(customTpl, ctx);
  }

  // 2) default or extra factory
  const factories = { ...DEFAULT_ERROR_FACTORIES, ...extraFactories };
  const factory = factories[key];
  if (factory) {
    return factory(ctx);
  }

  // 3) fallback
  return `${trimmedLabel || 'This field'} is invalid.`;
}

export function isControlRequired(
  ngControl: NgControl | null,
  errorMessage?: IFormControlErrorMessage
): boolean {
  const control = ngControl?.control ?? null;
  const hasCustomRequired = !!errorMessage?.['required'];
  if (!control) return hasCustomRequired;

  let hasRequired = false;
  const asAny: any = control;

  if (typeof asAny.hasValidator === 'function') {
    hasRequired = asAny.hasValidator(Validators.required);
  } else if (control.validator) {
    const res = control.validator({} as AbstractControl);
    hasRequired = !!res?.['required'];
  }

  return hasRequired || hasCustomRequired;
}

function interpolate(tpl: string, ctx: IErrorContext): string {
  const map: Record<string, any> = {
    label: ctx.label || 'This field',
    requiredLength: ctx.error?.requiredLength,
    actualLength: ctx.error?.actualLength,
    min: ctx.error?.min,
    max: ctx.error?.max,
    ...ctx.error,
  };

  return tpl.replace(/\{(\w+)\}/g, (_match, key) =>
    map[key] != null ? String(map[key]) : `{${key}}`
  );
}
