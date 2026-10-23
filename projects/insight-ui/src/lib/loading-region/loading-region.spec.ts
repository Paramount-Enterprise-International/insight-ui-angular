import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ILoadingRegion } from './loading-region';
@Component({
  imports: [ILoadingRegion],
  template: `<i-loading-region #region [contextKey]="context" [error]="error" [loading]="loading">
    @if (loading && !region.hasLoaded) {
    } @else if (error) {
      <button type="button" (click)="retry()">Retry</button>
    } @else {
      <input value="Original" />
    }
  </i-loading-region>`,
})
class Host {
  loading = true;
  error: string | null = null;
  context = 'first';
  retry(): void {
    this.error = null;
    this.loading = true;
  }
}
describe('ILoadingRegion', () => {
  function setup(): ComponentFixture<Host> {
    TestBed.configureTestingModule({ imports: [Host] });
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    return f;
  }

  it('uses the shared baseline until loaded and forwards an explicit override', () => {
    const f = TestBed.createComponent(ILoadingRegion);
    f.componentRef.setInput('loading', true);
    f.detectChanges();
    const region = f.componentInstance;
    expect(region.minHeight).toBe('var(--i-state-min-height, min(40vh, 240px))');
    spyOn(
      f.nativeElement.querySelector('[data-i-loading-content]'),
      'getBoundingClientRect',
    ).and.returnValue(new DOMRect(0, 0, 400, 84));
    f.componentRef.setInput('contextKey', 'new');
    f.detectChanges();
    expect(region.minHeight).toBe('var(--i-state-min-height, min(40vh, 240px))');
    f.componentRef.setInput('initialMinHeight', '180px');
    f.detectChanges();
    expect(region.minHeight).toBe('180px');
    expect(f.nativeElement.style.getPropertyValue('--i-region-state-min-height')).toBe('180px');
  });
  it('reserves space and blocks initial interaction', () => {
    const f = setup();
    expect(f.nativeElement.querySelector('i-loading')).not.toBeNull();
    expect(f.nativeElement.querySelector('input')).toBeNull();
    expect(f.nativeElement.querySelector('[aria-busy]').getAttribute('aria-busy')).toBe('true');
    expect(f.nativeElement.querySelector('[inert]')).not.toBeNull();
  });
  it('retains the same DOM, unsaved value and height during refresh', () => {
    const f = setup();
    f.componentInstance.loading = false;
    f.detectChanges();
    const input = f.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'Unsaved';
    spyOn(input.parentElement!, 'getBoundingClientRect').and.returnValue(
      new DOMRect(0, 0, 400, 280),
    );
    f.componentInstance.loading = true;
    f.detectChanges();
    expect(f.nativeElement.querySelector('input')).toBe(input);
    expect(input.value).toBe('Unsaved');
    expect(f.nativeElement.querySelector('[aria-busy]').style.minHeight).toBe('280px');
    f.componentInstance.loading = false;
    f.detectChanges();
    expect(f.nativeElement.querySelector('[inert]')).toBeNull();
  });
  it('hides the old context while loading and restores retry interaction', () => {
    const f = setup();
    f.componentInstance.loading = false;
    f.detectChanges();
    f.componentInstance.context = 'second';
    f.componentInstance.loading = true;
    f.detectChanges();
    expect(f.nativeElement.querySelector('[data-i-loading-content]').style.visibility).toBe(
      'hidden',
    );
    f.componentInstance.loading = false;
    f.componentInstance.error = 'Failed';
    f.detectChanges();
    f.nativeElement.querySelector('button').click();
    f.detectChanges();
    expect(f.nativeElement.querySelector('i-loading')).not.toBeNull();
  });
});
