import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IDatepicker, IFCDatepicker } from './datepicker';

@Component({
  standalone: true,
  imports: [IFCDatepicker],
  template: `<i-fc-datepicker label="Date" [displayFormat]="displayFormat" [format]="format" [value]="value" />`,
})
class DatepickerHost {
  format = 'dd/MM/yyyy';
  displayFormat: string | undefined;
  value: Date | string | null = null;
}

@Component({
  standalone: true,
  imports: [IDatepicker],
  template: `<i-datepicker
    [disabled]="disabled"
    [displayFormat]="displayFormat"
    [format]="format"
    [value]="value"
    (onChanged)="changed = $event"
  />`,
})
class DatepickerFormatHost {
  format = 'dd/MM/yyyy';
  displayFormat: string | undefined;
  disabled = false;
  value: Date | string | null = null;
  changed: Date | null | undefined;
}

describe('IFCDatepicker', () => {
  let fixture: ComponentFixture<DatepickerHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerHost],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerHost);
    fixture.detectChanges();
  });

  it('renders host and inner datepicker', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-fc-datepicker')).toBeTruthy();
    expect(host.querySelector('i-datepicker')).toBeTruthy();
  });

  it('parses wrapper string values with the input format', () => {
    fixture.componentInstance.format = 'yyyy-MM-dd';
    fixture.componentInstance.displayFormat = 'dd MMM yyyy';
    fixture.componentInstance.value = '2026-07-14';
    fixture.detectChanges();

    const input = (fixture.nativeElement as HTMLElement).querySelector('i-input input') as HTMLInputElement;
    expect(input.value).toBe('14 Jul 2026');
  });
});

describe('IDatepicker date input', () => {
  let fixture: ComponentFixture<DatepickerFormatHost>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerFormatHost],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerFormatHost);
    fixture.detectChanges();
    input = (fixture.nativeElement as HTMLElement).querySelector('i-input input')!;
  });

  function typeDigits(digits: string): void {
    for (const digit of digits) {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: digit, bubbles: true, cancelable: true }));
      fixture.detectChanges();
    }
  }

  it('keeps partial input and parses a complete date', () => {
    input.focus();
    typeDigits('31122');
    expect(input.value).toBe('31/12/2');
    expect(fixture.componentInstance.changed).toBeNull();

    typeDigits('026');
    expect(input.value).toBe('31/12/2026');
    expect(fixture.componentInstance.changed?.getTime()).toBe(new Date(2026, 11, 31).getTime());
  });

  it('follows a year-first format', () => {
    fixture.componentInstance.format = 'yyyy-MM-dd';
    fixture.detectChanges();
    input.focus();
    typeDigits('20261231');
    expect(input.value).toBe('2026-12-31');
    expect(fixture.componentInstance.changed?.getTime()).toBe(new Date(2026, 11, 31).getTime());
  });

  it('parses an external string with the input format', () => {
    fixture.componentInstance.format = 'MM-dd-yyyy';
    fixture.componentInstance.displayFormat = 'dd MMM yyyy';
    fixture.componentInstance.value = '07-14-2026';
    fixture.detectChanges();
    expect(input.value).toBe('14 Jul 2026');
  });

  it('pads a short segment when a separator is entered', () => {
    input.focus();
    typeDigits('3');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: '/', bubbles: true, cancelable: true }));
    fixture.detectChanges();
    expect(input.value).toBe('03/');
    expect(input.selectionStart).toBe(3);
  });

  it('advances through a month-first format with its separator', () => {
    fixture.componentInstance.format = 'MM-dd-yyyy';
    fixture.detectChanges();
    input.focus();
    typeDigits('7');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: '-', bubbles: true, cancelable: true }));
    fixture.detectChanges();
    typeDigits('142026');
    expect(input.value).toBe('07-14-2026');
    expect(fixture.componentInstance.changed?.getTime()).toBe(new Date(2026, 6, 14).getTime());
  });

  it('preserves invalid input and accepts a leap day', () => {
    input.focus();
    typeDigits('31022026');
    input.blur();
    fixture.detectChanges();
    expect(input.value).toBe('31/02/2026');
    expect(fixture.componentInstance.changed).toBeNull();

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    expect(input.value).toBe('31/02/2026');

    input.focus();
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    typeDigits('29022024');
    expect(fixture.componentInstance.changed?.getTime()).toBe(new Date(2024, 1, 29).getTime());
  });

  it('uses displayFormat while blurred and the input format while focused', () => {
    fixture.componentInstance.value = new Date(2026, 6, 14);
    fixture.componentInstance.displayFormat = 'dd MMM yyyy';
    fixture.detectChanges();
    expect(input.value).toBe('14 Jul 2026');

    input.focus();
    fixture.detectChanges();
    expect(input.value).toBe('14/07/2026');

    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    expect(input.value).toBe('14 Jul 2026');

    input.blur();
    fixture.detectChanges();
    expect(input.value).toBe('14 Jul 2026');

    fixture.componentInstance.displayFormat = 'dd MMMM yyyy';
    fixture.detectChanges();
    expect(input.value).toBe('14 July 2026');
  });

  it('applies an external value after editing finishes', () => {
    fixture.componentInstance.value = new Date(2026, 6, 14);
    fixture.componentInstance.displayFormat = 'dd MMM yyyy';
    fixture.detectChanges();
    input.focus();
    fixture.detectChanges();
    input.value = '15/07/2';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    fixture.componentInstance.value = new Date(2026, 7, 20);
    fixture.detectChanges();
    expect(input.value).toBe('15/07/2');

    input.blur();
    fixture.detectChanges();
    expect(input.value).toBe('20 Aug 2026');
  });
});
