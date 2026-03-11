import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ICard } from './card';

@Component({
  standalone: true,
  imports: [ICard],
  template: `<i-card href="https://example.com">Card</i-card>`,
})
class CardHost {}

describe('ICard', () => {
  let fixture: ComponentFixture<CardHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHost],
    }).compileComponents();

    fixture = TestBed.createComponent(CardHost);
    fixture.detectChanges();
  });

  it('renders host and inner anchor', () => {
    const host = fixture.nativeElement as HTMLElement;
    const anchor = host.querySelector('i-card > a.i-card') as HTMLAnchorElement | null;

    expect(host.querySelector('i-card')).toBeTruthy();
    expect(anchor).toBeTruthy();
    expect(anchor?.getAttribute('href')).toBe('https://example.com');
  });
});
