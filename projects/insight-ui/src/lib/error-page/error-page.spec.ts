import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IButton } from '../button/button';
import { IErrorPage } from './error-page';
import { I_ERROR_PAGE_PRESETS, type IErrorPageKind } from './error-page.types';

@Component({
  selector: 'i-error-page-test-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IErrorPage, IButton],
  template: `
    <i-error-page [mode]="mode()">
      <p>Additional guidance</p>
      <i-button iErrorPageActions>Contact Administrator</i-button>
    </i-error-page>
  `,
})
class ProjectionHost {
  readonly mode = signal<'contained' | 'fullpage'>('contained');
}

describe('IErrorPage', () => {
  let fixture: ComponentFixture<IErrorPage>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [IErrorPage, ProjectionHost] });
    fixture = TestBed.createComponent(IErrorPage);
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('defaults to a contained 404 with Paramount support and no actions', () => {
    expect(element.querySelector('i-section i-section-body')).not.toBeNull();
    expect(element.querySelector('h1')?.textContent).toBe('Page Not Found');
    expect(element.querySelector('.i-error-page__code')?.textContent?.trim()).toBe('404');
    expect(element.querySelector('a')?.getAttribute('href')).toBe(
      'mailto:it.helpdesk@paramountenterprise.co.id',
    );
    expect(element.querySelector('i-button')).toBeNull();
  });

  for (const kind of Object.keys(I_ERROR_PAGE_PRESETS) as IErrorPageKind[]) {
    it(`renders the ${kind} preset`, () => {
      fixture.componentRef.setInput('kind', kind);
      fixture.detectChanges();
      const preset = I_ERROR_PAGE_PRESETS[kind];
      expect(element.classList.contains('i-error-page--not-found')).toBe(kind === 'not-found');
      expect(element.querySelector('h1')?.textContent).toBe(preset.title);
      expect(element.textContent).toContain(preset.description);
      for (const iconClass of preset.icon.split(' ')) {
        expect(element.querySelector('i-icon i')?.classList.contains(iconClass)).toBeTrue();
      }
      expect(element.querySelector('.i-error-page__code')?.textContent?.trim() ?? '').toBe(preset.code);
    });
  }

  it('switches to fullpage without rendering a section and switches back', () => {
    fixture.componentRef.setInput('mode', 'fullpage');
    fixture.detectChanges();
    expect(element.classList.contains('i-error-page--fullpage')).toBeTrue();
    expect(element.querySelector('i-section')).toBeNull();
    expect(element.querySelector('h1')?.textContent).toBe('Page Not Found');
    fixture.componentRef.setInput('mode', 'contained');
    fixture.detectChanges();
    expect(element.classList.contains('i-error-page--fullpage')).toBeFalse();
    expect(element.querySelectorAll('i-section').length).toBe(1);
  });

  it('overrides content independently and honors empty overrides', () => {
    fixture.componentRef.setInput('title', 'Custom title');
    fixture.componentRef.setInput('description', 'Custom description');
    fixture.componentRef.setInput('icon', 'fa-solid fa-house');
    fixture.componentRef.setInput('code', 'CUSTOM');
    fixture.componentRef.setInput('supportEmail', 'support@example.com');
    fixture.detectChanges();
    expect(element.querySelector('h1')?.textContent).toBe('Custom title');
    expect(element.textContent).toContain('Custom description');
    expect(element.querySelector('i-icon i')?.className).toContain('fa-house');
    expect(element.querySelector('.i-error-page__code')?.textContent?.trim()).toBe('CUSTOM');
    expect(element.querySelector('a')?.getAttribute('href')).toBe('mailto:support@example.com');
    for (const name of ['title', 'description', 'icon', 'code', 'supportEmail']) {
      fixture.componentRef.setInput(name, '');
    }
    fixture.detectChanges();
    expect(element.querySelector('h1')).toBeNull();
    expect(element.querySelector('p')).toBeNull();
    expect(element.querySelector('.i-error-page__visual')).toBeNull();
    expect(element.querySelector('a')).toBeNull();
  });

  it('emits enabled actions without navigating or changing the content', () => {
    fixture.componentRef.setInput('actions', ['home', 'logout', 'retry']);
    fixture.detectChanges();
    const emit = spyOn(fixture.componentInstance.onAction, 'emit');
    const buttons = element.querySelectorAll<HTMLButtonElement>('button');
    expect(buttons.length).toBe(3);
    buttons.forEach((button) => button.click());
    expect(emit.calls.allArgs()).toEqual([['home'], ['logout'], ['retry']]);
    expect(element.querySelector('h1')?.textContent).toBe('Page Not Found');
    expect(element.querySelector('i-button[variant="danger"]')).not.toBeNull();
  });

  it('preserves projected content and custom actions in both modes', () => {
    const host = TestBed.createComponent(ProjectionHost);
    host.detectChanges();
    const projected = host.nativeElement as HTMLElement;
    expect(projected.querySelector('.i-error-page__extra')?.textContent).toContain(
      'Additional guidance',
    );
    expect(projected.querySelector('.i-error-page__actions')?.textContent).toContain(
      'Contact Administrator',
    );
    expect(projected.querySelector('.i-error-page__extra')?.textContent).not.toContain(
      'Contact Administrator',
    );
    host.componentInstance.mode.set('fullpage');
    host.detectChanges();
    expect(projected.querySelector('i-section')).toBeNull();
    expect(projected.querySelector('.i-error-page__extra')?.textContent).toContain(
      'Additional guidance',
    );
    expect(projected.querySelectorAll('.i-error-page__actions i-button').length).toBe(1);
  });
});
