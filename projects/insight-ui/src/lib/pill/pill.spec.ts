import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IPill } from './pill';

@Component({
  standalone: true,
  imports: [IPill],
  template: `<i-pill>Tag</i-pill>`,
})
class PillHost {}

describe('IPill', () => {
  let fixture: ComponentFixture<PillHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillHost],
    }).compileComponents();

    fixture = TestBed.createComponent(PillHost);
    fixture.detectChanges();
  });

  it('renders host and content', () => {
    const host = fixture.nativeElement as HTMLElement;
    const content = host.querySelector('.i-pill__content');

    expect(host.querySelector('i-pill')).toBeTruthy();
    expect(content?.textContent).toContain('Tag');
  });
});
