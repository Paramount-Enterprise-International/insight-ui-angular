import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IFCInput, IInput, IInputMaskDirective } from './input';

@Component({
  standalone: true,
  imports: [IFCInput],
  template: `<i-fc-input label="Name" [value]="'Alice'" />`,
})
class InputHost {}

@Component({
  standalone: true,
  imports: [IInput, IInputMaskDirective],
  template: `<i-input [autoDefault]="false" [iInputMask]="{ type: 'date', format: 'MM-dd-yyyy' }" />`,
})
class DateMaskHost {}

describe('IFCInput', () => {
  let fixture: ComponentFixture<InputHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputHost],
    }).compileComponents();

    fixture = TestBed.createComponent(InputHost);
    fixture.detectChanges();
  });

  it('renders host and input', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-fc-input')).toBeTruthy();
    expect(host.querySelector('i-input input')).toBeTruthy();
    expect(host.querySelector('label.i-fc-input__label')?.textContent).toContain('Name');
  });
});

describe('IInput date mask', () => {
  it('keeps invalid numeric segments with a month-first format', async () => {
    await TestBed.configureTestingModule({ imports: [DateMaskHost] }).compileComponents();
    const fixture = TestBed.createComponent(DateMaskHost);
    fixture.detectChanges();
    const input = (fixture.nativeElement as HTMLElement).querySelector('input')!;

    for (const digit of '13312026') {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: digit, bubbles: true, cancelable: true }));
      fixture.detectChanges();
    }
    expect(input.value).toBe('13-31-2026');
    input.blur();
    expect(input.value).toBe('13-31-2026');
  });

  it('preserves a pasted invalid date and later edits', async () => {
    await TestBed.configureTestingModule({ imports: [DateMaskHost] }).compileComponents();
    const fixture = TestBed.createComponent(DateMaskHost);
    fixture.detectChanges();
    const input = (fixture.nativeElement as HTMLElement).querySelector('input')!;
    const paste = new Event('paste', { bubbles: true, cancelable: true });
    Object.defineProperty(paste, 'clipboardData', {
      value: { getData: () => '13-31-2026' },
    });

    input.dispatchEvent(paste);
    expect(input.value).toBe('13-31-2026');
    input.value = '13-31-202';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(input.value).toBe('13-31-202');
  });
});
