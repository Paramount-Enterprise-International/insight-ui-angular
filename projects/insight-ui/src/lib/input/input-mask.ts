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

  private clampMonth2(raw2: string): string {
    // raw2 must be 2 digits
    let m = Number(raw2);
    if (Number.isNaN(m)) m = 1;
    m = this.clamp(m, 1, 12);
    return String(m).padStart(2, '0');
  }

  private clampDay2(raw2: string, month2?: string, year4?: string): string {
    let d = Number(raw2);
    if (Number.isNaN(d)) d = 1;

    let m = month2 ? Number(month2) : 1;
    if (Number.isNaN(m)) m = 1;
    m = this.clamp(m, 1, 12);

    let y = year4 ? Number(year4) : 2000;
    if (Number.isNaN(y) || y <= 0) y = 2000;

    const maxDay = this.daysInMonth(y, m);
    d = this.clamp(d, 1, maxDay);
    return String(d).padStart(2, '0');
  }

  /**
   * Smart digit typing for DATE:
   * - never allows 3-digit day/month or 5-digit year
   * - when caret is at end of a full segment, typing "rolls" that segment:
   *   month "01" + '2' => "12" (shift + append)
   *   year "2026" + '1' => "0261" (keeps last 4)
   */
  private handleDateDigitKey(el: HTMLInputElement | HTMLTextAreaElement, digit: string): void {
    const format = this.mask?.format || 'dd/MM/yyyy';

    // Ensure we work from a masked baseline (important for stable caret mapping)
    const baseline = this.applyDateMask(el.value ?? '', format);
    if (baseline !== el.value) {
      el.value = baseline;
    }

    const tokens = this.splitDateFormat(format).tokens;
    const lens = tokens.map((t) => t.length); // usually [2,2,4]
    const totalLen = lens.reduce((a, b) => a + b, 0);

    // digits-only
    const digitsOnly = (el.value ?? '').replace(/\D/g, '').slice(0, totalLen);

    const caret = el.selectionStart ?? (el.value ?? '').length;
    const digitCursor = this.countDigitsBeforePos(el.value ?? '', caret);

    // Build ranges for each token in digitsOnly
    const ranges: { start: number; end: number; kind: 'day' | 'month' | 'year' }[] = [];
    let acc = 0;
    for (const tok of tokens) {
      const kind = tok[0] === 'd' ? 'day' : tok[0] === 'M' ? 'month' : 'year';
      const len = tok.length;
      ranges.push({ start: acc, end: acc + len, kind });
      acc += len;
    }

    // Find active token index.
    // If caret is exactly at a token boundary, prefer the previous token (so month-end rolling works).
    let idx = ranges.findIndex((r) => digitCursor < r.end);
    if (idx === -1) idx = ranges.length - 1;

    // boundary case: digitCursor equals start of this token -> maybe user is at previous token end
    if (idx > 0 && digitCursor === ranges[idx].start) {
      idx = idx - 1;
    }

    const r = ranges[idx];
    const tokenLen = r.end - r.start;

    const tokenDigits = digitsOnly.slice(r.start, r.end); // may be shorter than tokenLen
    const isFull = tokenDigits.length >= tokenLen;

    // Position inside token (0..tokenLen)
    let rel = digitCursor - r.start;
    rel = this.clamp(rel, 0, tokenLen);

    let newToken = tokenDigits;

    if (!isFull) {
      // insert into token until full
      // (but still cap at tokenLen)
      newToken = (tokenDigits.slice(0, rel) + digit + tokenDigits.slice(rel)).slice(0, tokenLen);
    } else {
      // token is full
      if (digitCursor >= r.end) {
        // caret at token end -> rolling shift (fixes your "01" => "12" behavior)
        newToken = tokenDigits.slice(1) + digit;
      } else {
        // overwrite at position
        newToken =
          tokenDigits.slice(0, rel) +
          digit +
          tokenDigits.slice(Math.min(rel + 1, tokenDigits.length));
        newToken = newToken.slice(0, tokenLen);
      }
    }

    // Apply clamp rules when token becomes complete
    // We need current month/year to clamp day correctly
    const monthRange = ranges.find((x) => x.kind === 'month');
    const yearRange = ranges.find((x) => x.kind === 'year');

    // Prepare a working digits string with replaced token first (before clamp)
    const before = digitsOnly.slice(0, r.start);
    const after = digitsOnly.slice(r.end);
    let nextDigits = (before + newToken + after).slice(0, totalLen);

    const month2 = monthRange
      ? nextDigits.slice(monthRange.start, monthRange.end).padEnd(2, '')
      : '';
    const year4 = yearRange ? nextDigits.slice(yearRange.start, yearRange.end).padEnd(4, '') : '';

    if (r.kind === 'month' && newToken.length === 2) {
      const clamped = this.clampMonth2(newToken);
      nextDigits = (before + clamped + after).slice(0, totalLen);
    }

    if (r.kind === 'day' && newToken.length === 2) {
      const clamped = this.clampDay2(
        newToken,
        month2.length === 2 ? month2 : undefined,
        year4.length === 4 ? year4 : undefined,
      );
      nextDigits = (before + clamped + after).slice(0, totalLen);
    }

    // Year: never exceed 4 digits; rolling already enforces.
    if (r.kind === 'year') {
      // Ensure year segment is max 4
      if (yearRange) {
        const y = nextDigits.slice(yearRange.start, yearRange.end);
        const yFixed = y.slice(0, 4);
        nextDigits =
          nextDigits.slice(0, yearRange.start) + yFixed + nextDigits.slice(yearRange.end);
        nextDigits = nextDigits.slice(0, totalLen);
      }
    }

    const masked = this.applyDateMaskDigitsOnly(nextDigits, format);

    // compute caret: if we rolled at token end, keep caret at token end (don’t jump into next token)
    const didRollAtEnd = isFull && digitCursor >= r.end;
    const nextDigitCursor = didRollAtEnd ? r.end : Math.min(totalLen, digitCursor + 1);

    el.value = masked;
    this.dispatchInputEvent();

    const nextCaret = this.caretPosAfterDigits(masked, nextDigitCursor);
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
    if (!raw) return '';

    const nums = raw.match(/\d+/g) ?? [];
    if (!nums.length) return '';

    const { tokens } = this.splitDateFormat(format);

    let day = 1;
    let month = 1;
    let year = 2000;

    if (nums.length >= 3) {
      // ✅ make TS happy
      const a = nums[0] ?? '';
      const b = nums[1] ?? '';
      const c = nums[2] ?? '';

      const aNum = Number(a);
      const bNum = Number(b);
      const cNum = Number(c);

      if (a.length === 4) {
        // yyyy MM dd
        year = aNum;
        month = bNum;
        day = cNum;
      } else if (c.length === 4) {
        // dd MM yyyy
        day = aNum;
        month = bNum;
        year = cNum;
      } else {
        // fallback: map by format order
        const parts = [a, b, c];
        const map: Record<'d' | 'M' | 'y', number | undefined> = {
          d: undefined,
          M: undefined,
          y: undefined,
        };

        tokens.forEach((t, i) => {
          const v = Number(parts[i] ?? '');
          if (!Number.isNaN(v)) map[t[0] as 'd' | 'M' | 'y'] = v;
        });

        if (map.d !== undefined) day = map.d;
        if (map.M !== undefined) month = map.M;
        if (map.y !== undefined) year = map.y;
      }
    } else {
      // digits-only fallback: 31122026, 20260131, etc.
      const digits = nums.join('').slice(0, 8);

      if (digits.length >= 8) {
        if (format.trim().startsWith('yyyy')) {
          year = Number(digits.slice(0, 4));
          month = Number(digits.slice(4, 6));
          day = Number(digits.slice(6, 8));
        } else {
          day = Number(digits.slice(0, 2));
          month = Number(digits.slice(2, 4));
          year = Number(digits.slice(4, 8));
        }
      } else {
        // if user pastes something too short, just let the normal mask handle it
        return this.applyDateMask(nums.join(''), format);
      }
    }

    // Clamp + sanitize
    if (!Number.isFinite(year) || year <= 0) year = 2000;
    year = Math.min(year, 9999); // ✅ never 5 digits

    month = this.clamp(month, 1, 12);

    const maxDay = this.daysInMonth(year, month);
    day = this.clamp(day, 1, maxDay);

    return this.formatDateFromParts(day, month, year, format);
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

      // allow separators as typed (optional; mask will normalize anyway)
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
