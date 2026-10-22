import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ILoading, type ILoadingMode } from './loading';

@Component({
  standalone: true,
  imports: [ILoading],
  template: `<i-loading [mode]="mode" [label]="label" [light]="light" />`,
})
class LoadingHost {
  mode: ILoadingMode = 'inline';
  label = 'Loading..';
  light = false;
}

describe('ILoading', () => {
  let fixture: ComponentFixture<LoadingHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingHost],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingHost);
    fixture.detectChanges();
  });

  it('renders host and label', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-loading')).toBeTruthy();
    expect(host.textContent).toContain('Loading..');
    expect(host.querySelector('i-loading')?.getAttribute('mode')).toBe('inline');
    expect(host.querySelector('i-loading')?.getAttribute('aria-live')).toBeNull();
  });

  for (const mode of ['container', 'fullpage'] as const) {
    it(`announces ${mode} loading with the visible label`, () => {
      Object.assign(fixture.componentInstance, { mode, label: 'Loading page...', light: true });
      fixture.detectChanges();
      const status = fixture.nativeElement.querySelector('i-loading[role="status"]') as HTMLElement;
      expect(status.textContent).toContain('Loading page...');
      expect(status.getAttribute('aria-live')).toBe('polite');
      expect(status.getAttribute('light')).toBe('true');
      expect(status.querySelector('.spinner-border-sm')?.getAttribute('aria-hidden')).toBe('true');
    });
  }

  it('announces page loading when the visible label is empty', () => {
    Object.assign(fixture.componentInstance, { mode: 'container', label: '' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"] .sr-only')?.textContent).toContain(
      'Loading...',
    );
  });
});
