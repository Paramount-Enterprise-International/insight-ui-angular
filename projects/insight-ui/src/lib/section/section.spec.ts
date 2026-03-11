import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ISection, ISectionHeader } from './section';

@Component({
  standalone: true,
  imports: [ISection, ISectionHeader],
  template: `
    <i-section>
      <i-section-header>Title</i-section-header>
    </i-section>
  `,
})
class SectionHost {}

describe('ISection', () => {
  let fixture: ComponentFixture<SectionHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionHost);
    fixture.detectChanges();
  });

  it('renders section shell', () => {
    const host = fixture.nativeElement as HTMLElement;
    const header = host.querySelector('i-section-header h4') as HTMLElement | null;

    expect(host.querySelector('i-section')).toBeTruthy();
    expect(header?.textContent).toContain('Title');
  });
});
