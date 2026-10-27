import { fakeAsync, TestBed, tick } from '@angular/core/testing';
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
    expect(fixture.nativeElement.querySelector('input').disabled).toBeTrue();
    expect(inner.appendAddon.type).toBe('loading');
    fixture.componentInstance.setDisabledState(true);
    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();
    expect(inner.disabled).toBeTrue();
    fixture.componentInstance.setDisabledState(false);
    fixture.detectChanges();
    expect(inner.disabled).toBeFalse();
    expect(fixture.nativeElement.querySelector('input').disabled).toBeFalse();
  });
});

for (const Select of [ISelect, IFCSelect]) {
  describe(`${Select.name} native disabled state`, () => {
    for (const options of [[], ['Project A']]) {
      it(`disables the input and trigger and closes an open panel with ${options.length} options`, fakeAsync(() => {
        TestBed.configureTestingModule({ imports: [Select] });
        const fixture = TestBed.createComponent<ISelect | IFCSelect>(Select);
        fixture.componentRef.setInput('options', options);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        const button = (): HTMLButtonElement => fixture.nativeElement.querySelector('button');
        button().click();
        fixture.detectChanges();
        expect(document.querySelector('i-options')).not.toBeNull();
        const select = fixture.componentInstance instanceof ISelect
          ? fixture.componentInstance : fixture.componentInstance.innerSelect;
        const changed = jasmine.createSpy('changed');
        select.onChanged.subscribe(changed);
        fixture.componentRef.setInput('disabled', true);
        fixture.detectChanges();
        expect(input.disabled).toBeTrue();
        expect(button().disabled).toBeTrue();
        expect(fixture.nativeElement.querySelector('i-select')?.getAttribute('aria-disabled') ??
          fixture.nativeElement.getAttribute('aria-disabled')).toBe('true');
        expect(document.querySelector('i-options')).toBeNull();
        button().click();
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        tick(50);
        fixture.detectChanges();
        expect(document.querySelector('i-options')).toBeNull();
        expect(changed).not.toHaveBeenCalled();
        fixture.componentRef.setInput('disabled', false);
        fixture.detectChanges();
        expect(input.disabled).toBeFalse();
        expect(button().disabled).toBeFalse();
        expect(document.querySelector('i-options')).toBeNull();
        button().click();
        fixture.detectChanges();
        expect(document.querySelector('i-options')).not.toBeNull();
        fixture.destroy();
        tick(50);
      }));
    }
  });
}
