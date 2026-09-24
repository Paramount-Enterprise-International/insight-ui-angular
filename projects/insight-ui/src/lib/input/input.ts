/* input.ts */
/**
 * IInput
 * Version: 2.0.0
 *
 * - Simple CVA text input
 * - Masking is handled by IInputMaskDirective on the inner <input>
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  IFormControlErrorMessage,
  isControlRequired,
  resolveControlErrorMessage,
} from '../interfaces';
import { IButton, IButtonVariant } from '../button';
import { IIcon } from '../icon';
import { ILoading } from '../loading';
import { formatDate } from '@angular/common';

export type IInputAddonKind = 'icon' | 'text' | 'button' | 'link' | 'loading';

export type IInputAddonType = {
  type: IInputAddonKind;
};

export type IInputAddonLoading = {
  type: 'loading';
  visible?: boolean;
} & IInputAddonType;

export type IInputAddonIcon = {
  type: 'icon';
  icon: string;
  visible?: boolean;
} & IInputAddonType;

export type IInputAddonText = {
  type: 'text';
  text: string;
  visible?: boolean;
} & IInputAddonType;

export type IInputAddonButton = {
  type: 'button';
  icon: string;
  onClick?: () => void;
  visible?: boolean;
  variant?: IButtonVariant;
} & IInputAddonType;

export type IInputAddonLink = {
  type: 'link';
  icon: string;
  href?: string;
  visible?: boolean;
  variant?: IButtonVariant;
} & IInputAddonType;

export type IInputAddons =
  | IInputAddonLoading
  | IInputAddonIcon
  | IInputAddonText
  | IInputAddonButton
  | IInputAddonLink;

@Component({
  selector: 'i-input-addon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IButton, IIcon, ILoading],
  template: `
    @if (!addon || addon.visible === false) {
      <!-- render nothing -->
    } @else if (addon.type === 'button') {
      <i-button
        size="xs"
        type="button"
        [icon]="addon.icon"
        [variant]="addon.variant ?? 'primary'"
        (onClick)="addon.onClick ? addon.onClick() : null"
      />
    } @else if (addon.type === 'link') {
      <a
        class="i-btn i-btn-xs"
        target="_blank"
        [attr.variant]="addon.variant ?? 'primary'"
        [href]="addon.href"
      >
        <i-icon size="xs" [icon]="addon.icon" />
      </a>
    } @else if (addon.type === 'icon') {
      <i-icon size="sm" [icon]="addon.icon" />
    } @else if (addon.type === 'loading') {
      <i-loading label="" />
    } @else {
      <!-- text -->
      <span>{{ addon.text }}</span>
    }
  `,
})
export class IInputAddon {
  @Input({ required: true }) addon!: IInputAddons | undefined;

  @HostBinding('attr.kind')
  get addonKind(): string {
    return this.addon?.type + '';
  }
}

export type IInputMaskType =
  | 'date'
  | 'integer'
  | 'number'
  | 'currency'
  | 'time'
  | 'lowercase'
  | 'uppercase';

export type IInputMask = {
  type: IInputMaskType;
  /**
   * Optional format, used for:
   * - type: 'date' → e.g. 'dd/MM/yyyy', 'yyyy-MM-dd'
   * - type: 'time' → e.g. 'HH:mm', 'HH:mm:ss'
   * For 'integer' | 'number' | 'currency' format is currently ignored.
   */
  format?: string;
};

@Directive({
  selector: '[iInputMask]',
  standalone: true,
})
export class IInputMaskDirective implements OnInit, OnChanges {
  @Input('iInputMask') mask: IInputMask | undefined;

  /**
   * When true (default), an empty input is auto-filled with today's date
   * (or current time) on init and on focus. Set to false inside components
   * that provide their own initial value (e.g. IDatepicker).
   */
  @Input() autoDefault = true;

  /** Whether initial default (today / now) has been applied */
  private _defaultApplied = false;
  private elRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

  // ----------------------------------------------------
  // Lifecycle
  // ----------------------------------------------------

  ngOnInit(): void {
    this.applyInitialDefaultIfNeeded();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mask']) {
      // allow default to re-apply if mask changes AND input is still empty
      this.applyInitialDefaultIfNeeded();
    }
  }

  // ----------------------------------------------------
  // Element resolution (CRITICAL FIX)
  // ----------------------------------------------------

  /**
   * Resolve the real native input/textarea.
   * Works for:
   * - <input iInputMask ...>
   * - <textarea iInputMask ...>
   * - <i-input iInputMask ...> (wrapper custom element)
   */
  private get nativeInput(): HTMLInputElement | HTMLTextAreaElement | null {
    const host = this.elRef.nativeElement;

    if (host instanceof HTMLInputElement || host instanceof HTMLTextAreaElement) {
      return host;
    }

    // wrapper element: find inner input/textarea
    const found = host.querySelector('input, textarea');
    if (found instanceof HTMLInputElement || found instanceof HTMLTextAreaElement) {
      return found;
    }

    return null;
  }

  private get hasMask(): boolean {
    const el = this.nativeInput;
    return !!this.mask && !!el && !el.readOnly && !el.disabled;
  }

  private safeSetSelectionRange(
    el: HTMLInputElement | HTMLTextAreaElement,
    start: number,
    end: number,
  ): void {
    // Some input types don't support selection; also avoid crashing ever.
    try {
      if (typeof (el as any).setSelectionRange === 'function') {
        el.setSelectionRange(start, end);
      }
    } catch {
      // ignore
    }
  }

  private dispatchInputEvent(): void {
    const el = this.nativeInput;
    if (!el) return;
    const ev = new Event('input', { bubbles: true });
    el.dispatchEvent(ev);
  }

  private computeDefaultForMask(): string | null {
    if (!this.mask) {
      return null;
    }

    const now = new Date();

    if (this.mask.type === 'date') {
      const fmt = this.mask.format || 'dd/MM/yyyy';
      return formatDate(now, fmt, 'en');
    }

    if (this.mask.type === 'time') {
      const fmt = this.mask.format || 'HH:mm';
      return formatDate(now, fmt, 'en');
    }

    return null;
  }

  private applyInitialDefaultIfNeeded(): void {
    if (!this.mask) return;
    if (!this.autoDefault) return;

    const el = this.nativeInput;
    if (!el) return;

    if (this._defaultApplied) return;

    // If already has a value, do not override.
    if (el.value && el.value.trim().length > 0) return;

    const def = this.computeDefaultForMask();
    if (def === null) return;

    this._defaultApplied = true;
    el.value = def;
    this.dispatchInputEvent();
  }

  private isControlKey(event: KeyboardEvent): boolean {
    const key = event.key;
    const controlKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Tab',
      'Home',
      'End',
      'Enter',
      'Escape',
    ];

    if (controlKeys.includes(key)) return true;
    if (event.ctrlKey || event.metaKey || event.altKey) return true;

    return false;
  }

  // ----------------------------------------------------
  // DATE HELPERS
  // ----------------------------------------------------

  private daysInMonth(year: number, month1Based: number): number {
    return new Date(year, month1Based, 0).getDate();
  }

  /** Split date format into tokens (dd, MM, yyyy) and separators. */
  private splitDateFormat(format: string): { tokens: string[]; seps: string[] } {
    const tokens: string[] = [];
    const seps: string[] = [];

    let currentSep = '';
    let i = 0;

    const isTokenChar = (c: string): boolean => c === 'd' || c === 'M' || c === 'y';

    while (i < format.length) {
      const c = format[i];

      if (!isTokenChar(c)) {
        currentSep += c;
        i++;
        continue;
      }

      seps.push(currentSep);
      currentSep = '';

      const ch = c;
      let token = ch;
      let j = i + 1;
      while (j < format.length && format[j] === ch) {
        token += format[j];
        j++;
      }

      tokens.push(token);
      i = j;
    }

    seps.push(currentSep);
    return { tokens, seps };
  }

  /** Segments (day, month, year) with actual positions in current value. */
  private getDateSegments(
    value: string,
    format: string,
  ): { kind: 'day' | 'month' | 'year'; start: number; end: number; raw: string }[] {
    const { tokens, seps } = this.splitDateFormat(format);
    const segments: { kind: 'day' | 'month' | 'year'; start: number; end: number; raw: string }[] =
      [];

    let pos = 0;

    if (seps[0]) {
      const s0 = seps[0];
      if (value.startsWith(s0)) pos += s0.length;
    }

    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      const ch = tok[0];
      const kind: 'day' | 'month' | 'year' = ch === 'd' ? 'day' : ch === 'M' ? 'month' : 'year';

      const start = pos;
      let end = pos;

      while (end < value.length && /\d/.test(value[end])) end++;

      const raw = value.slice(start, end);
      segments.push({ kind, start, end, raw });

      pos = end;

      const sep = seps[i + 1] ?? '';
      if (sep && value.substr(pos, sep.length) === sep) {
        pos += sep.length;
      }
    }

    return segments;
  }

  /** Format day/month/year back to string according to format tokens. */
  private formatDateFromParts(day: number, month: number, year: number, format: string): string {
    const { tokens, seps } = this.splitDateFormat(format);
    let result = seps[0] ?? '';

    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      const ch = tok[0];
      const len = tok.length;

      if (ch === 'd') {
        result += String(day).padStart(len, '0');
      } else if (ch === 'M') {
        result += String(month).padStart(len, '0');
      } else {
        let s = String(year);
        if (s.length < len) s = s.padStart(len, '0');
        else if (s.length > len) s = s.slice(-len);
        result += s;
      }

      if (i < tokens.length - 1) result += seps[i + 1] ?? '';
    }

    return result;
  }

  /** Places digits in date segments and inserts completed separators. */
  private applyDateMaskDigitsOnly(digits: string, format: string): string {
    const { tokens, seps } = this.splitDateFormat(format);
    if (!tokens.length) return digits;
    let result = seps[0] ?? '';
    let offset = 0;
    for (let i = 0; i < tokens.length; i++) {
      const part = digits.slice(offset, offset + tokens[i].length);
      if (!part) break;
      result += part;
      offset += part.length;
      if (part.length === tokens[i].length && i < tokens.length - 1) {
        result += seps[i + 1] ?? '';
      }
    }
    return result;
  }

  private applyDateMask(raw: string, format: string): string {
    if (!raw) return '';

    const hasSeparator = /[^0-9]/.test(raw);
    const { tokens, seps } = this.splitDateFormat(format);

    if (!tokens.length) return raw.replace(/\D/g, '');

    if (!hasSeparator) {
      const digits = raw.replace(/\D/g, '');
      if (!digits) return '';
      return this.applyDateMaskDigitsOnly(digits, format);
    }

    const rawSegs = raw.split(/[^0-9]/);
    const rawSeps = raw.match(/[^0-9]+/g) ?? [];

    type PartKind = 'day' | 'month' | 'year';
    type Part = { kind: PartKind; raw: string; len: number; closed: boolean; out: string };

    const parts: Part[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      const ch = tok[0];
      const len = tok.length;
      const rawSeg = (rawSegs[i] ?? '').replace(/\D/g, '');

      const kind: PartKind = ch === 'd' ? 'day' : ch === 'M' ? 'month' : 'year';
      const closed = rawSeg.length >= len;

      parts.push({ kind, raw: rawSeg.slice(0, len), len, closed, out: '' });
    }

    for (const part of parts) part.out = part.raw;

    const outSegs = parts.map((p) => p.out);
    const hasDigits = parts.map((p) => p.raw.length > 0);

    let result = seps[0] ?? '';

    for (let i = 0; i < parts.length; i++) {
      result += outSegs[i] ?? '';

      if (i < parts.length - 1) {
        const sepFmt = seps[i + 1] ?? '';
        const hadRawSep = i < rawSeps.length;
        const segClosed = parts[i].closed;
        const nextHasDigits = hasDigits[i + 1];

        if (sepFmt && (hadRawSep || segClosed || nextHasDigits)) {
          result += sepFmt;
        }
      }
    }

    return result.replace(/[^0-9]+$/, (sep) => {
      const prefix = result.slice(0, -sep.length);
      return /\d/.test(prefix) ? sep : '';
    });
  }

  private adjustDateSegmentByArrow(key: 'ArrowUp' | 'ArrowDown'): void {
    if (!this.mask || this.mask.type !== 'date' || !this.mask.format) return;

    const el = this.nativeInput;
    if (!el) return;

    const format = this.mask.format;
    const value = el.value;

    const segments = this.getDateSegments(value, format);
    if (!segments.length) return;

    const caret = el.selectionStart ?? value.length;

    let idx = segments.findIndex((s) => caret >= s.start && caret <= s.end);
    if (idx === -1) {
      idx = segments.findIndex((s) => caret < s.start);
      if (idx === -1) idx = segments.length - 1;
      if (idx > 0 && caret > segments[idx - 1].end) idx = idx - 1;
    }
    if (idx < 0) idx = 0;

    let day = 1;
    let month = 1;
    let year = 2000;

    for (const seg of segments) {
      const n = seg.raw ? Number(seg.raw) : NaN;
      if (Number.isNaN(n)) continue;

      if (seg.kind === 'day') day = n;
      else if (seg.kind === 'month') month = n;
      else year = n;
    }

    if (month < 1) month = 1;
    if (month > 12) month = 12;

    let maxDay = this.daysInMonth(year > 0 ? year : 2000, month);
    if (day < 1) day = 1;
    if (day > maxDay) day = maxDay;

    const seg = segments[idx];

    if (seg.kind === 'day') {
      if (key === 'ArrowUp') {
        day = day + 1;
        if (day > maxDay) day = 1;
      } else {
        day = day - 1;
        if (day < 1) day = maxDay;
      }
    } else if (seg.kind === 'month') {
      if (key === 'ArrowUp') {
        month = month + 1;
        if (month > 12) month = 1;
      } else {
        month = month - 1;
        if (month < 1) month = 12;
      }
    } else {
      if (key === 'ArrowUp') year = year + 1;
      else {
        year = year - 1;
        if (year < 0) year = 0;
      }
    }

    maxDay = this.daysInMonth(year > 0 ? year : 2000, month);
    if (day > maxDay) day = maxDay;

    const newValue = this.formatDateFromParts(day, month, year, format);
    el.value = newValue;
    this.dispatchInputEvent();

    const newSegments = this.getDateSegments(newValue, format);
    const newSeg = newSegments[idx] ?? newSegments[newSegments.length - 1];
    if (newSeg) this.safeSetSelectionRange(el, newSeg.start, newSeg.end);
  }

  // ----------------------------------------------------
  // TIME HELPERS
  // ----------------------------------------------------

  private splitTimeFormat(format: string): { tokens: string[]; seps: string[] } {
    const tokens: string[] = [];
    const seps: string[] = [];

    let currentSep = '';
    let i = 0;

    const isTokenChar = (c: string): boolean => c === 'H' || c === 'm' || c === 's';

    while (i < format.length) {
      const c = format[i];

      if (!isTokenChar(c)) {
        currentSep += c;
        i++;
        continue;
      }

      seps.push(currentSep);
      currentSep = '';

      const ch = c;
      let token = ch;
      let j = i + 1;
      while (j < format.length && format[j] === ch) {
        token += format[j];
        j++;
      }

      tokens.push(token);
      i = j;
    }

    seps.push(currentSep);
    return { tokens, seps };
  }

  private getTimeSegments(
    value: string,
    format: string,
  ): { kind: 'hour' | 'minute' | 'second'; start: number; end: number; raw: string }[] {
    const { tokens, seps } = this.splitTimeFormat(format);
    const segments: {
      kind: 'hour' | 'minute' | 'second';
      start: number;
      end: number;
      raw: string;
    }[] = [];

    let pos = 0;

    if (seps[0]) {
      const s0 = seps[0];
      if (value.startsWith(s0)) pos += s0.length;
    }

    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      const ch = tok[0];
      const kind: 'hour' | 'minute' | 'second' =
        ch === 'H' ? 'hour' : ch === 'm' ? 'minute' : 'second';

      const start = pos;
      let end = pos;

      while (end < value.length && /\d/.test(value[end])) end++;

      const raw = value.slice(start, end);
      segments.push({ kind, start, end, raw });

      pos = end;

      const sep = seps[i + 1] ?? '';
      if (sep && value.substr(pos, sep.length) === sep) {
        pos += sep.length;
      }
    }

    return segments;
  }

  private formatTimeFromParts(
    hour: number,
    minute: number,
    second: number,
    format: string,
  ): string {
    const { tokens, seps } = this.splitTimeFormat(format);
    let result = seps[0] ?? '';

    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      const ch = tok[0];
      const len = tok.length;

      if (ch === 'H') result += String(hour).padStart(len, '0');
      else if (ch === 'm') result += String(minute).padStart(len, '0');
      else result += String(second).padStart(len, '0');

      if (i < tokens.length - 1) result += seps[i + 1] ?? '';
    }

    return result;
  }

  private normalizeTimeValue(value: string, format: string): string {
    if (!value) return value;

    const segments = this.getTimeSegments(value, format);
    if (!segments.length) return value;

    let hour = 0;
    let minute = 0;
    let second = 0;

    for (const seg of segments) {
      const n = seg.raw ? Number(seg.raw) : NaN;
      if (Number.isNaN(n)) continue;

      if (seg.kind === 'hour') hour = n;
      else if (seg.kind === 'minute') minute = n;
      else second = n;
    }

    if (hour < 0) hour = 0;
    if (hour > 23) hour = 23;

    if (minute < 0) minute = 0;
    if (minute > 59) minute = 59;

    if (second < 0) second = 0;
    if (second > 59) second = 59;

    return this.formatTimeFromParts(hour, minute, second, format);
  }

  private applyTimeMaskDigitsOnly(digits: string, format: string): string {
    const { tokens, seps } = this.splitTimeFormat(format);
    if (!tokens.length) return digits;

    const firstSep = seps[1] ?? '';
    const secondSep = seps[2] ?? '';

    const hasMinutes = tokens.length >= 2 && tokens[1][0] === 'm';
    const hasSeconds = tokens.length >= 3 && tokens[2][0] === 's';

    if (hasMinutes && !hasSeconds) {
      if (digits.length <= 2) {
        if (digits.length === 2 && firstSep) return digits + firstSep;
        return digits;
      }

      if (digits.length <= 4) {
        const hRaw = digits.slice(0, 2);
        const mRaw = digits.slice(2);

        let res = hRaw;
        if (firstSep) res += firstSep;
        if (mRaw.length) res += mRaw;

        return res;
      }

      const hStr = digits.slice(0, 2);
      const mStr = digits.slice(2, 4);

      let hour = Number(hStr || '0');
      let minute = Number(mStr || '0');

      if (hour < 0) hour = 0;
      if (hour > 23) hour = 23;

      if (minute < 0) minute = 0;
      if (minute > 59) minute = 59;

      return this.formatTimeFromParts(hour, minute, 0, format);
    }

    if (hasMinutes && hasSeconds) {
      if (digits.length <= 2) {
        if (digits.length === 2 && firstSep) return digits + firstSep;
        return digits;
      }

      if (digits.length <= 4) {
        const hRaw = digits.slice(0, 2);
        const mRaw = digits.slice(2);

        let res = hRaw;
        if (firstSep) res += firstSep;

        if (mRaw.length) {
          res += mRaw;
          if (mRaw.length === 2 && secondSep) res += secondSep;
        }

        return res;
      }

      if (digits.length <= 6) {
        const hRaw = digits.slice(0, 2);
        const mRaw = digits.slice(2, 4);
        const sRaw = digits.slice(4);

        let res = hRaw;
        if (firstSep) res += firstSep;
        res += mRaw;
        if (secondSep) res += secondSep;
        res += sRaw;

        return res;
      }

      const hStr = digits.slice(0, 2);
      const mStr = digits.slice(2, 4);
      const sStr = digits.slice(4, 6);

      let hour = Number(hStr || '0');
      let minute = Number(mStr || '0');
      let second = Number(sStr || '0');

      if (hour < 0) hour = 0;
      if (hour > 23) hour = 23;

      if (minute < 0) minute = 0;
      if (minute > 59) minute = 59;

      if (second < 0) second = 0;
      if (second > 59) second = 59;

      return this.formatTimeFromParts(hour, minute, second, format);
    }

    return digits;
  }

  private applyTimeMask(raw: string, format: string): string {
    if (!raw) return '';

    const hasSeparator = /[^0-9]/.test(raw);
    const { tokens, seps } = this.splitTimeFormat(format);

    if (!tokens.length) return raw.replace(/\D/g, '');

    if (!hasSeparator) {
      const digits = raw.replace(/\D/g, '');
      if (!digits) return '';
      return this.applyTimeMaskDigitsOnly(digits, format);
    }

    const rawSegs = raw.split(/[^0-9]/);
    const rawSeps = raw.match(/[^0-9]+/g) ?? [];

    type PartKind = 'hour' | 'minute' | 'second';
    type Part = { kind: PartKind; raw: string; len: number; closed: boolean; out: string };

    const parts: Part[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      const ch = tok[0];
      const len = tok.length;
      const rawSeg = (rawSegs[i] ?? '').replace(/\D/g, '');

      const kind: PartKind = ch === 'H' ? 'hour' : ch === 'm' ? 'minute' : 'second';
      const closed = rawSeg.length >= len;

      parts.push({ kind, raw: rawSeg.slice(0, len), len, closed, out: '' });
    }

    const hourPart = parts.find((p) => p.kind === 'hour');
    const minutePart = parts.find((p) => p.kind === 'minute');
    const secondPart = parts.find((p) => p.kind === 'second');

    let hour = hourPart?.raw ? Number(hourPart.raw) : 0;
    let minute = minutePart?.raw ? Number(minutePart.raw) : 0;
    let second = secondPart?.raw ? Number(secondPart.raw) : 0;

    if (hourPart) {
      if (hourPart.closed && hourPart.raw) {
        if (hour < 0) hour = 0;
        if (hour > 23) hour = 23;
        hourPart.out = String(hour).padStart(hourPart.len, '0');
      } else hourPart.out = hourPart.raw;
    }

    if (minutePart) {
      if (minutePart.closed && minutePart.raw) {
        if (minute < 0) minute = 0;
        if (minute > 59) minute = 59;
        minutePart.out = String(minute).padStart(minutePart.len, '0');
      } else minutePart.out = minutePart.raw;
    }

    if (secondPart) {
      if (secondPart.closed && secondPart.raw) {
        if (second < 0) second = 0;
        if (second > 59) second = 59;
        secondPart.out = String(second).padStart(secondPart.len, '0');
      } else secondPart.out = secondPart.raw;
    }

    const outSegs = parts.map((p) => p.out);
    const hasDigits = parts.map((p) => p.raw.length > 0);

    let result = seps[0] ?? '';

    for (let i = 0; i < parts.length; i++) {
      result += outSegs[i] ?? '';

      if (i < parts.length - 1) {
        const sepFmt = seps[i + 1] ?? '';
        const hadRawSep = i < rawSeps.length;
        const segClosed = parts[i].closed;
        const nextHasDigits = hasDigits[i + 1];

        if (sepFmt && (hadRawSep || segClosed || nextHasDigits)) {
          result += sepFmt;
        }
      }
    }

    return result.replace(/[^0-9]+$/, (sep) => {
      const prefix = result.slice(0, -sep.length);
      return /\d/.test(prefix) ? sep : '';
    });
  }

  private adjustTimeSegmentByArrow(key: 'ArrowUp' | 'ArrowDown'): void {
    if (!this.mask || this.mask.type !== 'time' || !this.mask.format) return;

    const el = this.nativeInput;
    if (!el) return;

    const format = this.mask.format;
    const value = el.value;

    const segments = this.getTimeSegments(value, format);
    if (!segments.length) return;

    const caret = el.selectionStart ?? value.length;

    let idx = segments.findIndex((s) => caret >= s.start && caret <= s.end);
    if (idx === -1) {
      idx = segments.findIndex((s) => caret < s.start);
      if (idx === -1) idx = segments.length - 1;
      if (idx > 0 && caret > segments[idx - 1].end) idx = idx - 1;
    }
    if (idx < 0) idx = 0;

    let hour = 0;
    let minute = 0;
    let second = 0;

    for (const seg of segments) {
      const n = seg.raw ? Number(seg.raw) : NaN;
      if (Number.isNaN(n)) continue;

      if (seg.kind === 'hour') hour = n;
      else if (seg.kind === 'minute') minute = n;
      else second = n;
    }

    const seg = segments[idx];

    if (seg.kind === 'hour') {
      if (key === 'ArrowUp') hour = (hour + 1) % 24;
      else hour = (hour - 1 + 24) % 24;
    } else if (seg.kind === 'minute') {
      if (key === 'ArrowUp') minute = (minute + 1) % 60;
      else minute = (minute - 1 + 60) % 60;
    } else {
      if (key === 'ArrowUp') second = (second + 1) % 60;
      else second = (second - 1 + 60) % 60;
    }

    const newValue = this.formatTimeFromParts(hour, minute, second, format);
    el.value = newValue;
    this.dispatchInputEvent();

    const newSegments = this.getTimeSegments(newValue, format);
    const newSeg = newSegments[idx] ?? newSegments[newSegments.length - 1];
    if (newSeg) this.safeSetSelectionRange(el, newSeg.start, newSeg.end);
  }

  // ----------------------------------------------------
  // NUMERIC HELPERS
  // ----------------------------------------------------

  private applyNumericMask(raw: string, allowDecimal: boolean): string {
    if (!raw) return '';

    let result = '';
    let hasDecimal = false;

    for (const ch of raw) {
      if (/\d/.test(ch)) {
        result += ch;
        continue;
      }

      if (allowDecimal && (ch === '.' || ch === ',')) {
        if (!hasDecimal) {
          hasDecimal = true;
          result += ch;
        }
      }
    }

    return result;
  }

  private applyTextCaseMask(value: string, type: 'lowercase' | 'uppercase'): string {
    if (!value) return value;

    if (type === 'lowercase') return value.toLowerCase();
    return value.toUpperCase();
  }

  // ----------------------------------------------------
  // CARET ↔ DIGIT helpers (used for smart keydown typing)
  // ----------------------------------------------------

  private countDigitsBeforePos(value: string, pos: number): number {
    let n = 0;
    for (let i = 0; i < Math.min(pos, value.length); i++) {
      if (/\d/.test(value[i])) n++;
    }
    return n;
  }

  /** caret index in formatted string after `digitCount` digits */
  private caretPosAfterDigits(value: string, digitCount: number): number {
    if (digitCount <= 0) return 0;

    let seen = 0;
    for (let i = 0; i < value.length; i++) {
      if (/\d/.test(value[i])) {
        seen++;
        if (seen === digitCount) {
          // caret should sit AFTER this digit
          return i + 1;
        }
      }
    }
    return value.length;
  }

  private clamp(n: number, min: number, max: number): number {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /** Inserts a digit into the date segment at the caret. */
  private handleDateDigitKey(el: HTMLInputElement | HTMLTextAreaElement, digit: string): void {
    const format = this.mask?.format || 'dd/MM/yyyy';

    // Normalize separators before locating the caret.
    const baseline = this.applyDateMask(el.value ?? '', format);
    if (baseline !== el.value) {
      el.value = baseline;
    }

    const tokens = this.splitDateFormat(format).tokens;
    const lens = tokens.map((t) => t.length);
    const totalLen = lens.reduce((a, b) => a + b, 0);

    const digitsOnly = (el.value ?? '').replace(/\D/g, '').slice(0, totalLen);

    const caret = el.selectionStart ?? (el.value ?? '').length;
    const digitCursor = this.countDigitsBeforePos(el.value ?? '', caret);

    // Locate each segment in the digit sequence.
    const ranges: { start: number; end: number; kind: 'day' | 'month' | 'year' }[] = [];
    let acc = 0;
    for (const tok of tokens) {
      const kind = tok[0] === 'd' ? 'day' : tok[0] === 'M' ? 'month' : 'year';
      const len = tok.length;
      ranges.push({ start: acc, end: acc + len, kind });
      acc += len;
    }

    // A completed segment advances to the next segment.
    let idx = ranges.findIndex((r) => digitCursor < r.end);
    if (idx === -1) idx = ranges.length - 1;

    const r = ranges[idx];
    const tokenLen = r.end - r.start;

    const tokenDigits = digitsOnly.slice(r.start, r.end);
    const isFull = tokenDigits.length >= tokenLen;

    let rel = digitCursor - r.start;
    rel = this.clamp(rel, 0, tokenLen);

    let newToken = tokenDigits;

    if (!isFull) {
      newToken = (tokenDigits.slice(0, rel) + digit + tokenDigits.slice(rel)).slice(0, tokenLen);
    } else {
      if (digitCursor >= r.end) {
        // Shift a full segment when typing at its end.
        newToken = tokenDigits.slice(1) + digit;
      } else {
        newToken =
          tokenDigits.slice(0, rel) +
          digit +
          tokenDigits.slice(Math.min(rel + 1, tokenDigits.length));
        newToken = newToken.slice(0, tokenLen);
      }
    }

    const before = digitsOnly.slice(0, r.start);
    const after = digitsOnly.slice(r.end);
    const nextDigits = (before + newToken + after).slice(0, totalLen);

    const masked = this.applyDateMaskDigitsOnly(nextDigits, format);

    // Keep the caret in the edited segment when its digits are shifted.
    const didRollAtEnd = isFull && digitCursor >= r.end;
    const nextDigitCursor = didRollAtEnd ? r.end : Math.min(totalLen, digitCursor + 1);

    el.value = masked;
    this.dispatchInputEvent();

    let nextCaret = this.caretPosAfterDigits(masked, nextDigitCursor);
    while (nextCaret < masked.length && /\D/.test(masked[nextCaret])) nextCaret++;
    this.safeSetSelectionRange(el, nextCaret, nextCaret);
  }

  /** Pads the active segment and moves the caret past its separator. */
  private handleDateSeparatorKey(el: HTMLInputElement | HTMLTextAreaElement, key: string): void {
    const format = this.mask?.format || 'dd/MM/yyyy';
    const { tokens, seps } = this.splitDateFormat(format);
    const value = el.value;
    const caret = el.selectionStart ?? value.length;
    const segments = this.getDateSegments(value, format);
    const index = segments.findIndex(
      (segment, i) => i < tokens.length - 1 && caret >= segment.start && caret <= segment.end,
    );
    if (index < 0 || !seps[index + 1]?.includes(key)) return;

    const segment = segments[index];
    if (!segment.raw) return;
    const padded = segment.raw.padStart(tokens[index].length, '0');
    let next = value.slice(0, segment.start) + padded + value.slice(segment.end);
    let nextCaret = segment.start + padded.length;
    const separator = seps[index + 1];
    if (!next.startsWith(separator, nextCaret)) {
      next = next.slice(0, nextCaret) + separator + next.slice(nextCaret);
    }
    nextCaret += separator.length;
    el.value = next;
    this.dispatchInputEvent();
    this.safeSetSelectionRange(el, nextCaret, nextCaret);
  }

  /**
   * Smart digit typing for TIME (similar behavior, keeps segments fixed-length).
   * - HH:mm       => keeps hour/min 2 digits
   * - HH:mm:ss    => keeps hour/min/sec 2 digits
   */
  private handleTimeDigitKey(el: HTMLInputElement | HTMLTextAreaElement, digit: string): void {
    const format = this.mask?.format || 'HH:mm';

    const baseline = this.applyTimeMask(el.value ?? '', format);
    if (baseline !== el.value) el.value = baseline;

    const tokens = this.splitTimeFormat(format).tokens; // e.g. ['HH','mm'] or ['HH','mm','ss']
    const lens = tokens.map((t) => t.length); // usually [2,2,(2)]
    const totalLen = lens.reduce((a, b) => a + b, 0);

    const digitsOnly = (el.value ?? '').replace(/\D/g, '').slice(0, totalLen);

    const caret = el.selectionStart ?? (el.value ?? '').length;
    const digitCursor = this.countDigitsBeforePos(el.value ?? '', caret);

    const ranges: { start: number; end: number; kind: 'hour' | 'minute' | 'second' }[] = [];
    let acc = 0;
    for (const tok of tokens) {
      const kind = tok[0] === 'H' ? 'hour' : tok[0] === 'm' ? 'minute' : 'second';
      const len = tok.length;
      ranges.push({ start: acc, end: acc + len, kind });
      acc += len;
    }

    let idx = ranges.findIndex((r) => digitCursor < r.end);
    if (idx === -1) idx = ranges.length - 1;
    if (idx > 0 && digitCursor === ranges[idx].start) idx = idx - 1;

    const r = ranges[idx];
    const tokenLen = r.end - r.start;

    const tokenDigits = digitsOnly.slice(r.start, r.end);
    const isFull = tokenDigits.length >= tokenLen;

    let rel = digitCursor - r.start;
    rel = this.clamp(rel, 0, tokenLen);

    let newToken = tokenDigits;

    if (!isFull) {
      newToken = (tokenDigits.slice(0, rel) + digit + tokenDigits.slice(rel)).slice(0, tokenLen);
    } else {
      if (digitCursor >= r.end) {
        newToken = tokenDigits.slice(1) + digit; // rolling shift
      } else {
        newToken =
          tokenDigits.slice(0, rel) +
          digit +
          tokenDigits.slice(Math.min(rel + 1, tokenDigits.length));
        newToken = newToken.slice(0, tokenLen);
      }
    }

    // clamp segment when complete
    const clamp2 = (v2: string, max: number): string => {
      let n = Number(v2);
      if (Number.isNaN(n)) n = 0;
      n = this.clamp(n, 0, max);
      return String(n).padStart(2, '0');
    };

    const before = digitsOnly.slice(0, r.start);
    const after = digitsOnly.slice(r.end);

    if (newToken.length === 2) {
      if (r.kind === 'hour') newToken = clamp2(newToken, 23);
      else newToken = clamp2(newToken, 59);
    }

    const nextDigits = (before + newToken + after).slice(0, totalLen);
    const masked = this.applyTimeMaskDigitsOnly(nextDigits, format);

    const didRollAtEnd = isFull && digitCursor >= r.end;
    const nextDigitCursor = didRollAtEnd ? r.end : Math.min(totalLen, digitCursor + 1);

    el.value = masked;
    this.dispatchInputEvent();

    const nextCaret = this.caretPosAfterDigits(masked, nextDigitCursor);
    this.safeSetSelectionRange(el, nextCaret, nextCaret);
  }

  private normalizePastedDate(raw: string, format: string): string {
    return this.applyDateMask(raw, format);
  }

  private normalizePastedTime(raw: string, format: string): string {
    if (!raw) return '';

    const nums = raw.match(/\d+/g) ?? [];
    if (!nums.length) return '';

    const digits = nums.join('');

    let hour = 0;
    let minute = 0;
    let second = 0;

    if (digits.length >= 2) hour = Number(digits.slice(0, 2));
    if (digits.length >= 4) minute = Number(digits.slice(2, 4));
    if (digits.length >= 6) second = Number(digits.slice(4, 6));

    hour = this.clamp(hour, 0, 23);
    minute = this.clamp(minute, 0, 59);
    second = this.clamp(second, 0, 59);

    return this.formatTimeFromParts(hour, minute, second, format);
  }

  // ----------------------------------------------------
  // HOST LISTENERS
  // ----------------------------------------------------

  @HostListener('input')
  onInput(): void {
    if (!this.hasMask || !this.mask) return;

    const el = this.nativeInput;
    if (!el) return;

    const oldValue = el.value ?? '';
    let value = oldValue;
    const type = this.mask.type;
    const format = this.mask.format;

    const prevPos = el.selectionStart ?? oldValue.length;

    if (type === 'date' && format) {
      value = this.applyDateMask(value, format);
    } else if (type === 'time' && format) {
      value = this.applyTimeMask(value, format);
    } else if (type === 'integer') {
      value = this.applyNumericMask(value, false);
    } else if (type === 'number' || type === 'currency') {
      value = this.applyNumericMask(value, true);
    } else if (type === 'lowercase' || type === 'uppercase') {
      value = this.applyTextCaseMask(value, type);
    }

    if (value !== oldValue) {
      const oldLen = oldValue.length;
      el.value = value;
      const newLen = value.length;

      const delta = newLen - oldLen;
      const newPos = Math.max(0, Math.min(newLen, prevPos + delta));
      this.safeSetSelectionRange(el, newPos, newPos);
    }
  }

  @HostListener('blur')
  onBlur(): void {
    if (!this.mask) return;

    const el = this.nativeInput;
    if (!el) return;

    if (this.mask.type === 'time' && this.mask.format) {
      if (!el.value) return;
      const normalized = this.normalizeTimeValue(el.value, this.mask.format);
      if (normalized !== el.value) {
        el.value = normalized;
        this.dispatchInputEvent();
      }
    }
  }

  @HostListener('focus')
  onFocus(): void {
    if (!this.mask) return;
    if (!this.autoDefault) return;

    const el = this.nativeInput;
    if (!el) return;

    if (!this._defaultApplied && el.value.trim() === '') {
      this.applyInitialDefaultIfNeeded();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const el = this.nativeInput;
    if (!this.mask || !el || el.readOnly || el.disabled) return;

    const type = this.mask.type;
    const key = event.key;

    // Date ↑/↓ segment adjust
    if (type === 'date' && this.mask.format && (key === 'ArrowUp' || key === 'ArrowDown')) {
      event.preventDefault();
      this.adjustDateSegmentByArrow(key as 'ArrowUp' | 'ArrowDown');
      return;
    }

    // Time ↑/↓ segment adjust
    if (type === 'time' && this.mask.format && (key === 'ArrowUp' || key === 'ArrowDown')) {
      event.preventDefault();
      this.adjustTimeSegmentByArrow(key as 'ArrowUp' | 'ArrowDown');
      return;
    }

    if (type === 'date' && this.mask.format && key === 'Enter') {
      event.preventDefault();
      return;
    }

    // Time normalize on Enter
    if (type === 'time' && this.mask.format && key === 'Enter') {
      event.preventDefault();
      if (el.value) {
        const normalized = this.normalizeTimeValue(el.value, this.mask.format);
        if (normalized !== el.value) {
          el.value = normalized;
          this.dispatchInputEvent();
        }
      }
      return;
    }

    if (this.isControlKey(event)) return;

    // Text case masks allow all characters
    if (type === 'lowercase' || type === 'uppercase') {
      return;
    }

    // Date/time: smart digit typing + allow separators
    if (type === 'date' || type === 'time') {
      const format = this.mask.format || '';
      const allowedSeps = new Set<string>();

      for (const c of format) {
        if (!/[dMyHms]/.test(c)) allowedSeps.add(c);
      }

      // ✅ handle digits ourselves to prevent "31/012/2026" type inserts
      if (/\d/.test(key)) {
        event.preventDefault();

        if (type === 'date') this.handleDateDigitKey(el, key);
        else this.handleTimeDigitKey(el, key);

        return;
      }

      if (type === 'date' && allowedSeps.has(key)) {
        event.preventDefault();
        this.handleDateSeparatorKey(el, key);
        return;
      }

      if (allowedSeps.has(key)) return;

      event.preventDefault();
      return;
    }

    // Integer
    if (type === 'integer') {
      if (!/\d/.test(key)) event.preventDefault();
      return;
    }

    // Number/currency
    if (type === 'number' || type === 'currency') {
      if (/\d/.test(key)) return;

      if (key === '.' || key === ',') {
        const v = el.value;
        if (v.includes('.') || v.includes(',')) {
          event.preventDefault();
        }
        return;
      }

      event.preventDefault();
      return;
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    if (!this.hasMask || !this.mask) return;

    const el = this.nativeInput;
    if (!el) return;

    const text = event.clipboardData?.getData('text');
    if (!text) return;

    event.preventDefault();

    const type = this.mask.type;
    const format = this.mask.format;

    let next = '';

    if (type === 'date' && format) {
      next = this.normalizePastedDate(text, format);
    } else if (type === 'time' && format) {
      next = this.normalizePastedTime(text, format);
    } else if (type === 'integer') {
      next = text.replace(/\D/g, '');
    } else if (type === 'number' || type === 'currency') {
      next = this.applyNumericMask(text, true);
    }

    if (next !== undefined) {
      el.value = next;
      this.dispatchInputEvent();
      // caret at end after paste = expected UX
      this.safeSetSelectionRange(el, next.length, next.length);
    }
  }
}

/* =========================================
 * IInput (CVA)
 * ========================================= */

@Component({
  selector: 'i-input',
  standalone: true,
  imports: [IInputAddon, IInputMaskDirective],
  template: `@for (i of prepends; track $index) {
      <i-input-addon [addon]="i" />
    }
    <input
      #inputRef
      [attr.aria-invalid]="invalid ? 'true' : null"
      [attr.autocomplete]="autocomplete || null"
      [disabled]="isDisabled"
      [iInputMask]="mask"
      [placeholder]="placeholder"
      [readonly]="readonly"
      [type]="type"
      [value]="value ?? ''"
      (blur)="handleBlur()"
      (input)="handleInput($event)"
    />
    @for (i of appends; track $index) {
      <i-input-addon [addon]="i" />
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IInput),
      multi: true,
    },
  ],
})
export class IInput implements ControlValueAccessor {
  @Input() type = 'text';

  @Input() placeholder = '';

  @Input() autocomplete: string | undefined;

  @Input() readonly = false;

  /** invalid state (controlled by form or wrapper) */
  @Input() invalid = false;

  @Input() mask: IInputMask | undefined;

  /** value usable both by CVA and by [value] binding */
  @Input()
  get value(): string | null {
    return this._value;
  }
  set value(v: string | null) {
    this._value = v ?? '';
  }

  @Input() prepend: IInputAddons | IInputAddons[] | undefined;

  @Input() append: IInputAddons | IInputAddons[] | IInputAddonLoading | undefined;

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  private _value: string | null = null;

  isDisabled = false;

  @Input()
  get disabled(): boolean {
    return this.isDisabled;
  }
  set disabled(value: boolean) {
    this.isDisabled = value;
  }

  private onChange: (value: any) => void = () => {
    /*  */
  };

  private onTouched: () => void = () => {
    /*  */
  };

  // -----------------------------
  // ControlValueAccessor
  // -----------------------------
  writeValue(value: any): void {
    this._value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // -----------------------------
  // View events
  // -----------------------------
  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._value = target.value;
    this.onChange(this._value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  /** Click anywhere on <i-input> focuses the inner input, except clicks on addons */
  @HostListener('click', ['$event'])
  handleHostClick(event: MouseEvent): void {
    if (this.isDisabled || !this.inputRef) {
      return;
    }

    const target = event.target as HTMLElement | null;

    if (target && target.closest('i-input-addon')) {
      return;
    }

    this.inputRef.nativeElement.focus();
  }

  get prepends(): IInputAddons[] {
    if (!this.prepend) {
      return [];
    }
    return Array.isArray(this.prepend) ? this.prepend : [this.prepend];
  }

  get appends(): (IInputAddons | IInputAddonLoading)[] {
    if (!this.append) {
      return [];
    }
    return Array.isArray(this.append) ? this.append : [this.append];
  }
}

/* =========================================
 * IFCInput (CVA wrapper)
 * ========================================= */

@Component({
  selector: 'i-fc-input',
  standalone: true,
  imports: [IInput],
  template: `@if (label) {
      <label class="i-fc-input__label" (click)="focusInnerInput()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-input__required">*</span>
        }
      </label>
    }

    <i-input
      [append]="append"
      [autocomplete]="autocomplete"
      [disabled]="isDisabled"
      [invalid]="controlInvalid"
      [mask]="mask"
      [placeholder]="placeholder"
      [prepend]="prepend"
      [readonly]="readonly"
      [type]="type"
      [value]="value"
      (blur)="handleInnerBlur()"
      (input)="handleInnerInput($event)"
    />

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-input__error">
        {{ resolvedErrorText }}
      </div>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ✅ NO NG_VALUE_ACCESSOR PROVIDER HERE (prevents circular dependency)
})
export class IFCInput implements ControlValueAccessor, OnDestroy {
  @ViewChild(IInput) innerInput!: IInput;

  private readonly cdr = inject(ChangeDetectorRef);

  // Optional injections (equivalent to @Optional() @Self())
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly formDir = inject(FormGroupDirective, { optional: true });

  private submitSub?: Subscription;

  // ---------- UI inputs ----------
  @Input() label = '';

  @Input() placeholder = '';

  @Input() autocomplete: string | undefined;

  @Input() readonly = false;

  @Input() type = 'text';

  @Input() mask: IInputMask | undefined;

  @Input() prepend: IInput['prepend'];

  @Input() append: IInput['append'];

  /** old-style custom error templates: { required: '{label} is cuwax' } */
  @Input() errorMessage?: IFormControlErrorMessage;

  /** non-form usage: [value] binding */
  @Input()
  get value(): string | null {
    return this._value;
  }
  set value(v: string | null) {
    this._value = v ?? '';
    this.cdr.markForCheck();
  }

  // ---------- internal state ----------
  private _value: string | null = null;

  isDisabled = false;

  private onChange: (v: any) => void = () => {
    /*  */
  };

  private onTouched: () => void = () => {
    /*  */
  };

  constructor() {
    // ✅ same pattern you use in other fc components
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    // 🔁 when the form is submitted, re-check this OnPush component
    if (this.formDir) {
      this.submitSub = this.formDir.ngSubmit.subscribe(() => {
        this.cdr.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this.submitSub?.unsubscribe();
  }

  // ---------- CVA ----------
  writeValue(v: any): void {
    this._value = v ?? '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.cdr.markForCheck();
  }

  // ---------- bridge from inner <i-input> ----------
  handleInnerInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const v = target?.value ?? '';
    this._value = v;
    this.onChange(this._value);
    this.cdr.markForCheck();
  }

  handleInnerBlur(): void {
    this.onTouched();
    this.cdr.markForCheck();
  }

  // ---------- focus from label ----------
  focusInnerInput(): void {
    if (!this.isDisabled && this.innerInput?.inputRef) {
      this.innerInput.inputRef.nativeElement.focus();
    }
  }

  // ---------- validation helpers ----------
  get controlInvalid(): boolean {
    const c = this.ngControl?.control;
    if (!c) return false;

    if (this.formDir) {
      return c.invalid && !!this.formDir.submitted;
    }

    return c.invalid && (c.dirty || c.touched);
  }

  get required(): boolean {
    return isControlRequired(this.ngControl, this.errorMessage);
  }

  get resolvedErrorText(): string | null {
    return resolveControlErrorMessage(this.ngControl, this.label, this.errorMessage);
  }
}

@NgModule({
  imports: [IInput, IFCInput, IInputAddon, IInputMaskDirective],
  exports: [IInput, IFCInput, IInputAddon, IInputMaskDirective],
})
export class IInputModule {}
