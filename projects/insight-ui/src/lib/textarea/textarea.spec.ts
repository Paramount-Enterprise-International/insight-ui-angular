import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IFCTextArea } from './textarea';

@Component({
  standalone: true,
  imports: [IFCTextArea],
  template: `<i-fc-textarea label="Notes" [value]="'Hello'" />`,
})
class TextareaHost {}

describe('IFCTextArea', () => {
  let fixture: ComponentFixture<TextareaHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaHost);
    fixture.detectChanges();
  });

  it('renders host and inner textarea', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-fc-textarea')).toBeTruthy();
    expect(host.querySelector('i-textarea textarea')).toBeTruthy();
    expect(host.querySelector('label.i-fc-textarea__label')?.textContent).toContain('Notes');
  });
});
