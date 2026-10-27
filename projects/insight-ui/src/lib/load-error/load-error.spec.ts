import { TestBed } from '@angular/core/testing';
import { ILoadError } from './load-error';
describe('ILoadError', () => {
  it('updates content styling while preserving the built-in class', () => {
    TestBed.configureTestingModule({ imports: [ILoadError] });
    const f = TestBed.createComponent(ILoadError);
    f.componentRef.setInput('message', 'Failed');
    f.componentRef.setInput('contentClass', 'custom-content');
    f.componentRef.setInput('contentStyle', { padding: '24px', gap: '16px' });
    f.detectChanges();
    const content: HTMLElement = f.nativeElement.querySelector('[role="alert"]');
    expect(content.classList.contains('i-load-error__content')).toBeTrue();
    expect(content.classList.contains('custom-content')).toBeTrue();
    expect(content.style.padding).toBe('24px');
    expect(content.style.gap).toBe('16px');
    f.componentRef.setInput('contentClass', 'updated-content');
    f.componentRef.setInput('contentStyle', { padding: '8px' });
    f.detectChanges();
    expect(content.classList.contains('i-load-error__content')).toBeTrue();
    expect(content.classList.contains('custom-content')).toBeFalse();
    expect(content.classList.contains('updated-content')).toBeTrue();
    expect(content.style.padding).toBe('8px');
    expect(content.style.gap).toBe('');
  });

  it('renders text and emits Retry only when available', () => {
    TestBed.configureTestingModule({ imports: [ILoadError] });
    const f = TestBed.createComponent(ILoadError);
    const retry = jasmine.createSpy('retry');
    f.componentInstance.onRetry.subscribe(retry);
    f.componentRef.setInput('message', '<b>Failed</b>');
    f.detectChanges();
    expect(f.nativeElement.querySelector('b')).toBeNull();
    f.nativeElement.querySelector('button').click();
    expect(retry).toHaveBeenCalledTimes(1);
    f.componentRef.setInput('retryDisabled', true);
    f.detectChanges();
    f.componentInstance.retry();
    expect(retry).toHaveBeenCalledTimes(1);
    f.componentRef.setInput('retryDisabled', false);
    f.componentRef.setInput('retryLoading', true);
    f.detectChanges();
    f.componentInstance.retry();
    expect(retry).toHaveBeenCalledTimes(1);
    f.componentRef.setInput('message', '');
    f.detectChanges();
    expect(f.nativeElement.style.display).toBe('none');
  });
});
