import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { IFCSelect, ISelect } from './select';

describe('select loading and disabled inputs', () => {
  it('combines explicit and observable loading and cleans up the option subscription', () => {
    TestBed.configureTestingModule({ imports: [ISelect] });
    const fixture = TestBed.createComponent(ISelect);
    const rows = new Subject<unknown[]>();
    fixture.componentRef.setInput('options$', rows);
    fixture.detectChanges();
    expect(fixture.componentInstance.appendAddon.type).toBe('loading');
    fixture.componentRef.setInput('loading', true);
    rows.next([]);
    fixture.detectChanges();
    expect(fixture.componentInstance.appendAddon.type).toBe('loading');
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
    expect(fixture.componentInstance.appendAddon.type).not.toBe('loading');
    fixture.destroy();
    expect(rows.observed).toBeFalse();
  });

  it('forwards form-control loading and combines input/form disabled state', () => {
    TestBed.configureTestingModule({ imports: [IFCSelect] });
    const fixture = TestBed.createComponent(IFCSelect);
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const inner = fixture.debugElement.query(By.directive(ISelect)).componentInstance as ISelect;
    expect(inner.disabled).toBeTrue();
    expect(inner.appendAddon.type).toBe('loading');
    fixture.componentInstance.setDisabledState(true);
    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();
    expect(inner.disabled).toBeTrue();
    fixture.componentInstance.setDisabledState(false);
    fixture.detectChanges();
    expect(inner.disabled).toBeFalse();
  });
});
