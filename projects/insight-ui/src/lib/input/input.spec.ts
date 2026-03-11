import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IFCInput } from './input';

@Component({
  standalone: true,
  imports: [IFCInput],
  template: `<i-fc-input label="Name" [value]="'Alice'" />`,
})
class InputHost {}

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
