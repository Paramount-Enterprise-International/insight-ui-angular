import { TestBed } from '@angular/core/testing';
import { ILoadError } from './load-error';
describe('ILoadError', () => {
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
