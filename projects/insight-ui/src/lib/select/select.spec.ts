import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IFCSelect } from './select';

@Component({
  standalone: true,
  imports: [IFCSelect],
  template: `<i-fc-select label="Pick" [options]="options" />`,
})
class SelectHost {
  options = ['A', 'B'];
}

describe('IFCSelect', () => {
  let fixture: ComponentFixture<SelectHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectHost);
    fixture.detectChanges();
  });

  it('renders host and inner select', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-fc-select')).toBeTruthy();
    expect(host.querySelector('i-select')).toBeTruthy();
  });
});
