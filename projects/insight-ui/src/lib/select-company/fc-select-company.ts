import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl } from '@angular/forms';
import type { Subscription } from 'rxjs';

import {
  type IFormControlErrorMessage,
  isControlRequired,
  resolveControlErrorMessage,
} from '../interfaces';
import {
  type ISelectChange,
  ISelectOptionDefDirective,
  type ISelectPanelPosition,
} from '../select';
import type { IMenuCompanyDto } from '../user/user.types';
import { ISelectCompany } from './select-company';

@Component({
  selector: 'i-fc-select-company',
  standalone: true,
  imports: [ISelectCompany, ISelectOptionDefDirective, NgTemplateOutlet],
  template: `
    @if (label) {
      <label class="i-fc-select__label" (click)="focus()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-select__required">*</span>
        }
      </label>
    }

    <i-select-company
      [disabled]="disabled || formDisabled"
      [displayWith]="displayWith"
      [filterDelay]="filterDelay"
      [filterPredicate]="filterPredicate"
      [invalid]="invalid || controlInvalid"
      [matchTriggerWidth]="matchTriggerWidth"
      [menuCode]="menuCode"
      [panelOffset]="panelOffset"
      [panelPosition]="panelPosition"
      [placeholder]="placeholder"
      [portalToBody]="portalToBody"
      [value]="value"
      (onChanged)="handleSelectChange($event)"
    >
      @if (optionDef; as option) {
        <ng-template iSelectOption let-row>
          <ng-container
            [ngTemplateOutlet]="option.template"
            [ngTemplateOutletContext]="{ $implicit: row, row: row }"
          />
        </ng-template>
      }
    </i-select-company>

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-select__error">{{ resolvedErrorText }}</div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IFCSelectCompany implements ControlValueAccessor, OnDestroy {
  @ViewChild(ISelectCompany) private innerSelect?: ISelectCompany;
  @ContentChild(ISelectOptionDefDirective)
  protected optionDef?: ISelectOptionDefDirective<IMenuCompanyDto>;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() menuCode?: string | null;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() displayWith?: ((row: IMenuCompanyDto | null) => string) | string;
  @Input() filterDelay = 200;
  @Input() filterPredicate = (row: IMenuCompanyDto, term: string): boolean =>
    row.name.toLowerCase().includes(term.toLowerCase()) ||
    row.code.toLowerCase().includes(term.toLowerCase());
  @Input() panelPosition: ISelectPanelPosition = 'bottom left';
  @Input() panelOffset = 6;
  @Input() portalToBody = true;
  @Input() matchTriggerWidth = false;
  @Input() errorMessage?: IFormControlErrorMessage;

  @Input()
  set value(value: IMenuCompanyDto | null) {
    this.writeValue(value);
  }

  get value(): IMenuCompanyDto | null {
    return this.modelValue;
  }

  @Output() readonly onChanged = new EventEmitter<ISelectChange<IMenuCompanyDto>>();
  @Output() readonly onOptionSelected = new EventEmitter<ISelectChange<IMenuCompanyDto>>();

  protected formDisabled = false;
  private modelValue: IMenuCompanyDto | null = null;
  private onChange: (value: IMenuCompanyDto | null) => void = () => undefined;
  private onTouched: () => void = () => undefined;
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly formDir = inject(FormGroupDirective, { optional: true });
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly submitSub?: Subscription;

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
    this.submitSub = this.formDir?.ngSubmit.subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy(): void {
    this.submitSub?.unsubscribe();
  }

  writeValue(value: IMenuCompanyDto | null): void {
    this.modelValue = value ?? null;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: IMenuCompanyDto | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.formDisabled = disabled;
    this.cdr.markForCheck();
  }

  focus(): void {
    if (!this.disabled && !this.formDisabled) this.innerSelect?.focus();
  }

  protected handleSelectChange(change: ISelectChange<IMenuCompanyDto>): void {
    this.modelValue = change.value;
    this.onChange(change.value);
    this.onTouched();
    this.onChanged.emit(change);
    this.onOptionSelected.emit(change);
  }

  protected get controlInvalid(): boolean {
    const control = this.ngControl?.control;
    if (!control) return false;
    return (
      control.invalid && (this.formDir ? this.formDir.submitted : control.touched || control.dirty)
    );
  }

  protected get required(): boolean {
    return isControlRequired(this.ngControl, this.errorMessage);
  }

  protected get resolvedErrorText(): string | null {
    return resolveControlErrorMessage(this.ngControl, this.label, this.errorMessage);
  }
}
