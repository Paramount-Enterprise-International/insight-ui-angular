import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IFCDatepicker } from './datepicker';

@Component({
  standalone: true,
  imports: [IFCDatepicker],
  template: `<i-fc-datepicker label="Date" [value]="null" />`,
})
class DatepickerHost {}

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
});
