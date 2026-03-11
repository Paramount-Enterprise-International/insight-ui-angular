import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IButton } from './button';

@Component({
  standalone: true,
  imports: [IButton],
  template: `<i-button>Save</i-button>`,
})
class ButtonHost {}

describe('IButton', () => {
  let fixture: ComponentFixture<ButtonHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonHost);
    fixture.detectChanges();
  });

  it('renders host and inner button', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-button')).toBeTruthy();
    expect(host.querySelector('i-button .i-button-inner')).toBeTruthy();
  });
});
