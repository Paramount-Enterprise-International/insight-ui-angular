import { Component, computed, signal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ISelect, type ISelectChange, ISelectOptionDefDirective } from '../select';
import { IUserMenuStore } from '../store';
import { collectAuthorizationScope } from '../user/user.mapper';
import type { IEffectiveAuthorizationDto, IMenuCompanyDto } from '../user/user.types';
import { ISelectCompany } from './select-company';
import { IFCSelectCompany } from './fc-select-company';
import { IH_STATE, IHStateOwner } from '../state';

const jakarta: IMenuCompanyDto = { id: 'c1', code: 'JKT', name: 'Jakarta' };
const bandung: IMenuCompanyDto = { id: 'c2', code: 'BDG', name: 'Bandung' };

function authorizations(company = jakarta): IEffectiveAuthorizationDto[] {
  return [
    { menuCode: 'sales', menuId: 'm1', type: 'item', companies: [company] },
    { menuCode: 'report', menuId: 'm2', type: 'function', companies: [company, bandung] },
  ];
}

class CompanyStoreStub {
  readonly initialized = signal(true);
  readonly initializing = signal(false);
  readonly loadErrors = signal({ authorizations: null });
  readonly authorizations = signal<IEffectiveAuthorizationDto[]>([]);
  private readonly scope = computed(() => collectAuthorizationScope(this.authorizations()));
  readonly companies = computed(() => this.scope().companies);
  readonly menuCompanies = computed(() => this.scope().menuCompanies);
  readonly load = jasmine.createSpy('load');
}

@Component({
  standalone: true,
  imports: [
    ISelectCompany,
    IFCSelectCompany,
    FormsModule,
    ReactiveFormsModule,
    ISelectOptionDefDirective,
  ],
  template: `
    @if (wrapped) {
      @switch (mode) {
        @case ('control') {
          <i-fc-select-company
            label="Company"
            [formControl]="control"
            [portalToBody]="false"
            (onChanged)="changes.push($event)"
            (onOptionSelected)="selected.push($event)"
          />
        }
        @case ('name') {
          <form [formGroup]="form">
            <i-fc-select-company
              formControlName="company"
              label="Company"
              [portalToBody]="false"
              (onChanged)="changes.push($event)"
              (onOptionSelected)="selected.push($event)"
            />
          </form>
        }
        @default {
          <i-fc-select-company
            label="Company"
            [portalToBody]="false"
            [(ngModel)]="model"
            (onChanged)="changes.push($event)"
            (onOptionSelected)="selected.push($event)"
          >
            <ng-template iSelectOption let-company="row" let-row>
              <span class="company-code" [attr.data-company-name]="company.name">{{
                row.code
              }}</span>
            </ng-template>
          </i-fc-select-company>
        }
      }
    } @else {
      @switch (mode) {
        @case ('control') {
          <i-select-company
            [formControl]="control"
            [portalToBody]="false"
            (onChanged)="changes.push($event)"
            (onOptionSelected)="selected.push($event)"
          />
        }
        @case ('name') {
          <form [formGroup]="form">
            <i-select-company
              formControlName="company"
              [portalToBody]="false"
              (onChanged)="changes.push($event)"
              (onOptionSelected)="selected.push($event)"
            />
          </form>
        }
        @default {
          <i-select-company
            [portalToBody]="false"
            [(ngModel)]="model"
            (onChanged)="changes.push($event)"
            (onOptionSelected)="selected.push($event)"
          >
            <ng-template iSelectOption let-company="row" let-row>
              <span class="company-code" [attr.data-company-name]="company.name">{{
                row.code
              }}</span>
            </ng-template>
          </i-select-company>
        }
      }
    }
  `,
})
class FormHost {
  wrapped = false;
  mode = 'control';
  control = new FormControl<IMenuCompanyDto | null>(null);
  form = new FormGroup({ company: this.control });
  model: IMenuCompanyDto | null = null;
  changes: ISelectChange<IMenuCompanyDto>[] = [];
  selected: ISelectChange<IMenuCompanyDto>[] = [];
}

function open(fixture: ComponentFixture<unknown>): void {
  fixture.nativeElement
    .querySelector('input')
    .dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
  fixture.detectChanges();
}

function labels(fixture: ComponentFixture<unknown>): string[] {
  return Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.i-option-label')).map(
    (element) => element.textContent?.trim() ?? '',
  );
}

describe('ISelectCompany', () => {
  let store: CompanyStoreStub;
  let fixture: ComponentFixture<ISelectCompany>;

  beforeEach(() => {
    store = new CompanyStoreStub();
    TestBed.configureTestingModule({
      imports: [ISelectCompany, FormHost],
      providers: [{ provide: IUserMenuStore, useValue: store }],
    });
    fixture = TestBed.createComponent(ISelectCompany);
    fixture.componentRef.setInput('portalToBody', false);
    fixture.detectChanges();
  });

  it('reacts to hydration and reset without loading or selecting a company', () => {
    open(fixture);
    expect(labels(fixture)).toEqual([]);

    store.authorizations.set(authorizations());
    fixture.detectChanges();
    expect(labels(fixture)).toEqual(['Jakarta', 'Bandung']);
    expect(fixture.componentInstance.value).toBeNull();
    expect(store.load).not.toHaveBeenCalled();

    store.authorizations.set([]);
    fixture.detectChanges();
    expect(labels(fixture)).toEqual([]);
  });

  it('filters reactively by menu code and never falls back for unknown menus', () => {
    store.authorizations.set(authorizations());
    open(fixture);
    for (const [menuCode, expected] of [
      [null, ['Jakarta', 'Bandung']],
      ['   ', ['Jakarta', 'Bandung']],
      [' sales ', ['Jakarta']],
      ['unknown', []],
      ['report', ['Jakarta', 'Bandung']],
    ] as const) {
      fixture.componentRef.setInput('menuCode', menuCode);
      fixture.detectChanges();
      expect(labels(fixture)).toEqual([...expected]);
    }
  });

  it('matches refreshed objects by id and retains an out-of-scope value without events', () => {
    const initial = { ...jakarta };
    const changed = jasmine.createSpy('changed');
    const selected = jasmine.createSpy('selected');
    fixture.componentInstance.onChanged.subscribe(changed);
    fixture.componentInstance.onOptionSelected.subscribe(selected);
    fixture.componentRef.setInput('value', initial);
    fixture.detectChanges();

    store.authorizations.set(authorizations());
    open(fixture);
    expect(fixture.nativeElement.querySelector('.i-option.selected')?.textContent).toContain(
      'Jakarta',
    );

    store.authorizations.set(authorizations({ ...jakarta, name: 'Jakarta Updated' }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('input').value).toBe('Jakarta Updated');
    expect(fixture.nativeElement.querySelector('.i-option.selected')?.textContent).toContain(
      'Jakarta Updated',
    );

    fixture.componentRef.setInput('menuCode', 'unknown');
    fixture.detectChanges();
    expect(labels(fixture)).toEqual([]);
    expect(fixture.nativeElement.querySelector('input').value).toBe('Jakarta');
    expect(fixture.componentInstance.value).toBe(initial);
    store.authorizations.set([]);
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(initial);
    expect(changed).not.toHaveBeenCalled();
    expect(selected).not.toHaveBeenCalled();
  });

  it('searches company names and codes and supports display and filter overrides', fakeAsync(() => {
    store.authorizations.set(authorizations());
    fixture.componentRef.setInput('filterDelay', 0);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    for (const query of ['jAk', 'jKt']) {
      input.value = query;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      tick();
      fixture.detectChanges();
      expect(labels(fixture)).toEqual(['Jakarta']);
    }

    fixture.componentRef.setInput('displayWith', 'code');
    fixture.componentRef.setInput('filterPredicate', (row: IMenuCompanyDto) => row.id === 'c2');
    fixture.detectChanges();
    expect(labels(fixture)).toEqual(['BDG']);
    fixture.destroy();
    tick();
  }));

  for (const wrapped of [false, true]) {
    it(`preserves custom option context and DOM nodes after refresh with wrapped=${wrapped}`, fakeAsync(() => {
      store.authorizations.set(authorizations());
      const host = TestBed.createComponent(FormHost);
      host.componentInstance.mode = 'model';
      host.componentInstance.wrapped = wrapped;
      host.detectChanges();
      tick();
      host.detectChanges();
      open(host);

      const firstOption = host.nativeElement.querySelector('.i-option');
      const firstCode = host.nativeElement.querySelector('.company-code');
      expect(labels(host)).toEqual(['JKT', 'BDG']);
      expect(firstCode?.getAttribute('data-company-name')).toBe('Jakarta');

      const updated = { ...jakarta, name: 'Jakarta Updated' };
      store.authorizations.set(authorizations(updated));
      host.detectChanges();
      expect(host.nativeElement.querySelector('.i-option')).toBe(firstOption);
      expect(host.nativeElement.querySelector('.company-code')).toBe(firstCode);
      expect(firstCode?.getAttribute('data-company-name')).toBe('Jakarta Updated');
      expect(labels(host)).toEqual(['JKT', 'BDG']);
      expect(host.componentInstance.changes).toEqual([]);

      host.nativeElement
        .querySelector('.i-option')
        .dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      host.detectChanges();
      tick();
      expect(host.componentInstance.model).toEqual(updated);
      expect(host.componentInstance.changes).toEqual([
        { value: updated, label: 'Jakarta Updated' },
      ]);
      expect(host.componentInstance.selected).toEqual(host.componentInstance.changes);
      host.destroy();
      tick();
    }));

    for (const mode of ['control', 'name', 'model']) {
      it(`supports ${mode} binding with wrapped=${wrapped} and emits each selection event once`, fakeAsync(() => {
        store.authorizations.set(authorizations());
        const host = TestBed.createComponent(FormHost);
        host.componentInstance.mode = mode;
        host.componentInstance.wrapped = wrapped;
        host.detectChanges();
        tick();
        host.detectChanges();
        open(host);
        if (mode === 'model') {
          expect(host.nativeElement.querySelector('.company-code')?.textContent).toBe('JKT');
        }
        host.nativeElement
          .querySelector('.i-option')
          .dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        host.detectChanges();
        tick();
        expect(host.componentInstance.changes).toEqual([{ value: jakarta, label: 'Jakarta' }]);
        expect(host.componentInstance.selected).toEqual(host.componentInstance.changes);
        if (mode === 'model') {
          expect(host.componentInstance.model).toEqual(jakarta);
        } else {
          expect(host.componentInstance.control.value).toEqual(jakarta);
          expect(host.componentInstance.control.touched).toBeTrue();
          expect(host.componentInstance.control.dirty).toBeTrue();
          host.componentInstance.control.disable();
          host.detectChanges();
          expect(host.nativeElement.querySelector('input').readOnly).toBeTrue();
          host.componentInstance.control.reset();
          host.detectChanges();
          expect(host.nativeElement.querySelector('input').value).toBe('');
        }
        host.destroy();
        tick();
      }));
    }
  }

  for (const mode of ['control', 'name']) {
    it(`shows counterpart errors after ${mode === 'name' ? 'submit' : 'touch'}`, () => {
      const host = TestBed.createComponent(FormHost);
      host.componentInstance.wrapped = true;
      host.componentInstance.mode = mode;
      host.componentInstance.control.addValidators(Validators.required);
      host.componentInstance.control.updateValueAndValidity();
      host.detectChanges();
      expect(host.nativeElement.querySelector('.i-fc-select__required')).toBeTruthy();
      expect(host.nativeElement.querySelector('.i-fc-select__error')).toBeNull();
      if (mode === 'name') {
        host.nativeElement
          .querySelector('form')
          .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      } else {
        host.componentInstance.control.markAsTouched();
        host.componentInstance.control.setValue(null);
      }
      host.detectChanges();
      expect(host.nativeElement.querySelector('.i-fc-select__error')?.textContent).toBe(
        'Company is required.',
      );
      host.componentInstance.control.setValue(jakarta);
      host.detectChanges();
      expect(host.nativeElement.querySelector('.i-fc-select__error')).toBeNull();
    });
  }

  it('delegates focus and respects the disabled input', () => {
    const inner = fixture.debugElement.query(By.directive(ISelect))
      .componentInstance as ISelect<IMenuCompanyDto>;
    const focus = spyOn(inner, 'focus');
    fixture.componentInstance.focus();
    expect(focus).toHaveBeenCalledTimes(1);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    fixture.componentInstance.focus();
    open(fixture);
    expect(focus).toHaveBeenCalledTimes(1);
    expect(labels(fixture)).toEqual([]);
  });
});


describe('hosted company selection', () => {
  let state: IHStateOwner;
  let fixture: ComponentFixture<ISelectCompany>;
  let store: CompanyStoreStub;

  beforeEach(() => {
    sessionStorage.clear();
    state = new IHStateOwner('angular-hosted-select');
    state.setIdentity('user');
    state.selection.activateMenu('report');
    state.selection.validateCompanies('report', ['c1', 'c2'], 'ready');
    state.selection.setCompany('c2');
    store = new CompanyStoreStub();
    store.authorizations.set(authorizations());
    TestBed.configureTestingModule({ imports: [ISelectCompany], providers: [
      { provide: IH_STATE, useValue: state }, { provide: IUserMenuStore, useValue: store },
    ] });
    fixture = TestBed.createComponent(ISelectCompany);
    fixture.componentRef.setInput('portalToBody', false);
  });

  it('uses host state over initial bindings and synchronizes invalidation without selection events', () => {
    const changes = jasmine.createSpy('changes');
    const selected = jasmine.createSpy('selected');
    fixture.componentInstance.registerOnChange(changes);
    fixture.componentInstance.onOptionSelected.subscribe(selected);
    fixture.componentRef.setInput('value', jakarta);
    fixture.detectChanges();
    expect(fixture.componentInstance.value?.id).toBe('c2');
    expect(changes).toHaveBeenCalledWith(bandung);
    state.selection.activateMenu('sales');
    fixture.detectChanges();
    expect(state.selection.getSnapshot().companyId).toBeNull();
    expect(fixture.componentInstance.value).toBeNull();
    expect(selected).not.toHaveBeenCalled();
  });

  it('keeps explicit local controls independent and forwards loading', () => {
    fixture.componentRef.setInput('stateScope', 'local');
    fixture.componentRef.setInput('value', jakarta);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.value?.id).toBe('c1');
    expect(state.selection.getSnapshot().companyId).toBe('c2');
    const inner = fixture.debugElement.query(By.directive(ISelect)).componentInstance as ISelect;
    expect(inner.loading).toBeTrue();
    expect(inner.appendAddon.type).toBe('loading');
  });

  it('revalidates when navigation changes context within the same menu', () => {
    fixture.detectChanges();
    state.selection.activateMenu('report');
    expect(state.selection.getSnapshot().companyStatus).toBe('loading');
    fixture.detectChanges();
    expect(state.selection.getSnapshot().companyStatus).toBe('ready');
    expect(state.selection.getSnapshot().companyId).toBe('c2');
  });
});

for (const Select of [ISelectCompany, IFCSelectCompany]) {
  describe(`${Select.name} empty state forwarding`, () => {
    it('forwards string and object messages through company wrappers', fakeAsync(() => {
      const store = new CompanyStoreStub();
      TestBed.configureTestingModule({
        imports: [Select],
        providers: [{ provide: IUserMenuStore, useValue: store }],
      });
      const fixture = TestBed.createComponent<ISelectCompany | IFCSelectCompany>(Select);
      fixture.componentRef.setInput('portalToBody', false);
      fixture.componentRef.setInput('filterDelay', 0);
      fixture.componentRef.setInput('emptyState', 'No companies');
      fixture.detectChanges();
      open(fixture);
      const message = (): string | undefined => fixture.nativeElement.querySelector('.i-options__empty')?.textContent;
      expect(message()).toBe('No companies');
      fixture.componentRef.setInput('emptyState', { empty: 'Empty companies', notFound: 'Company not found' });
      fixture.detectChanges();
      expect(message()).toBe('Empty companies');
      store.authorizations.set(authorizations());
      fixture.detectChanges();
      expect(message()).toBeUndefined();
      const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
      input.value = 'missing';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      tick();
      fixture.detectChanges();
      expect(message()).toBe('Company not found');
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      expect(message()).toBeUndefined();
      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();
      expect(message()).toBe('Company not found');
      store.authorizations.set([]);
      fixture.detectChanges();
      expect(message()).toBe('Empty companies');
      fixture.destroy();
      tick(50);
    }));
  });
}
