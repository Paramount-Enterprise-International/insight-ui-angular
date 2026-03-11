import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IToggle } from './toggle';

@Component({
  standalone: true,
  imports: [IToggle],
  template: `<i-toggle />`,
})
class ToggleHost {}

describe('IToggle', () => {
  let fixture: ComponentFixture<ToggleHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleHost);
    fixture.detectChanges();
  });

  it('renders host and input', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-toggle')).toBeTruthy();
    expect(host.querySelector('i-toggle input[type="checkbox"]')).toBeTruthy();
  });
});
