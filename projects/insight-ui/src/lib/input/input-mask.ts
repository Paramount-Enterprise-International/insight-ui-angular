/**
 * IInputMaskDirective
 * Version: 1.4.2
 *
 * Fixes (1.4.2):
 * - Works when applied to wrapper elements like <i-input> (custom element)
 * - Always resolves the real native <input>/<textarea> before reading/writing value
 * - Prevents setSelectionRange crash (only call when supported)
 * - Prevents "value gone on click" (was writing to <i-input> host instead of inner <input>)
 *
 * Usage:
 *   <input [iInputMask]="{ type: 'date', format: 'dd/MM/yyyy' }" />
 *   <i-input [iInputMask]="{ type: 'date', format: 'dd/MM/yyyy' }" />
 */

import { formatDate } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

export type IInputMaskType = 'date' | 'integer' | 'number' | 'currency' | 'time';

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

  /** Whether initial default (today / now) has been applied */
  private _defaultApplied = false;

  // NOTE: must be HTMLElement, because this directive is often applied to <i-input>
  constructor(private elRef: ElementRef<HTMLElement>) {}

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

  /** Normalize full date string (used on blur / Enter). */
  private normalizeDateValue(value: string, format: string): string {
    if (!value) return value;

    const segments = this.getDateSegments(value, format);
    if (!segments.length) return value;

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

    const maxDay = this.daysInMonth(year > 0 ? year : 2000, month);
    if (day < 1) day = 1;
    if (day > maxDay) day = maxDay;

    return this.formatDateFromParts(day, month, year, format);
  }

  /**
   * Digits-only behavior for date mask (no separators typed yet).
   *
   * For dd/MM/yyyy:
   * - "12"       → "12/"
   * - "1210"     → "12/10/"
   * - "12101980" → "12/10/1980"
   */
  private applyDateMaskDigitsOnly(digits: string, format: string): string {
    const { tokens, seps } = this.splitDateFormat(format);
    if (!tokens.length) return digits;

    const firstSep = seps[1] ?? '';
    const secondSep = seps[2] ?? '';

    if (digits.length <= 2) {
      if (digits.length === 2 && firstSep) return digits + firstSep;
      return digits;
    }

    if (digits.length <= 4) {
      const dRaw = digits.slice(0, 2);
      const mRaw = digits.slice(2);

      let res = dRaw;
      if (firstSep) res += firstSep;

      if (mRaw.length) {
        res += mRaw;
        if (mRaw.length === 2 && secondSep) res += secondSep;
      }

      return res;
    }

    const dStr = digits.slice(0, 2);
    const mStr = digits.slice(2, 4);
    const yStr = digits.slice(4, 8);

    let day = Number(dStr || '1');
    let month = Number(mStr || '1');
    const year = Number(yStr || '2000');

    if (month < 1) month = 1;
    if (month > 12) month = 12;

    const maxDay = this.daysInMonth(year > 0 ? year : 2000, month);
    if (day < 1) day = 1;
    if (day > maxDay) day = maxDay;

    return this.formatDateFromParts(day, month, year, format);
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

    const dayPart = parts.find((p) => p.kind === 'day');
    const monthPart = parts.find((p) => p.kind === 'month');
    const yearPart = parts.find((p) => p.kind === 'year');

    let monthNumForClamp: number | null = null;

    if (monthPart && monthPart.closed && monthPart.raw) {
      let m = Number(monthPart.raw);
      if (m < 1) m = 1;
      if (m > 12) m = 12;
      monthNumForClamp = m;
    }

    let yearForCalc = 2000;
    if (yearPart && yearPart.closed && yearPart.raw) {
      const y = Number(yearPart.raw);
      yearForCalc = y > 0 ? y : 2000;
    }

    if (monthPart) {
      if (monthPart.closed && monthPart.raw) {
        let m = monthNumForClamp ?? Number(monthPart.raw);
        if (m < 1) m = 1;
        if (m > 12) m = 12;
        monthPart.out = String(m).padStart(monthPart.len, '0');
        monthNumForClamp = m;
      } else {
        monthPart.out = monthPart.raw;
      }
    }

    if (dayPart) {
      if (dayPart.closed && dayPart.raw) {
        let d = Number(dayPart.raw);
        const monthForDay = monthNumForClamp !== null ? monthNumForClamp : 1;
        const maxDay = this.daysInMonth(yearForCalc, monthForDay);

        if (d < 1) d = 1;
        if (d > maxDay) d = maxDay;

        dayPart.out = String(d).padStart(dayPart.len, '0');
      } else {
        dayPart.out = dayPart.raw;
      }
    }

    if (yearPart) {
      yearPart.out = yearPart.raw;
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

  // ----------------------------------------------------
  // HOST LISTENERS
  // ----------------------------------------------------

  @HostListener('input', ['$event'])
  onInput(_event: Event): void {
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

    if (this.mask.type === 'date' && this.mask.format) {
      if (!el.value) return;
      const normalized = this.normalizeDateValue(el.value, this.mask.format);
      if (normalized !== el.value) {
        el.value = normalized;
        this.dispatchInputEvent();
      }
    }

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

    // Date normalize on Enter
    if (type === 'date' && this.mask.format && key === 'Enter') {
      event.preventDefault();
      if (el.value) {
        const normalized = this.normalizeDateValue(el.value, this.mask.format);
        if (normalized !== el.value) {
          el.value = normalized;
          this.dispatchInputEvent();
        }
      }
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

    // Date/time: allow digits + separators
    if (type === 'date' || type === 'time') {
      const format = this.mask.format || '';
      const allowedSeps = new Set<string>();

      for (const c of format) {
        if (!/[dMyHms]/.test(c)) allowedSeps.add(c);
      }

      if (/\d/.test(key)) return;
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
}
