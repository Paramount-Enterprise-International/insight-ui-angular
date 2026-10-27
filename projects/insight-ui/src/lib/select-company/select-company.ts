import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChild,
  DestroyRef,
  effect,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  ISelect,
  type ISelectChange,
  type ISelectEmptyState,
  ISelectOptionDefDirective,
  type ISelectPanelPosition,
} from '../select';
import { IUserMenuStore } from '../store';
import { IH_STATE, type IHSelectionSnapshot } from '../state';
import type { IMenuCompanyDto } from '../user/user.types';

@Component({
  selector: 'i-select-company',
  standalone: true,
  imports: [ISelect, ISelectOptionDefDirective, NgTemplateOutlet],
  template: `
    <i-select
      [disabled]="disabled || (hosted() && companyLoading())"
      [displayWith]="displayWith ?? 'name'"
      [emptyState]="emptyState"
      [filterDelay]="filterDelay"
      [filterPredicate]="filterPredicate"
      [invalid]="invalid"
      [loading]="companyLoading()"
      [matchTriggerWidth]="matchTriggerWidth"
      [options]="companyOptions()"
      [panelOffset]="panelOffset"
      [panelPosition]="panelPosition"
      [placeholder]="placeholder"
      [portalToBody]="portalToBody"
      [trackBy]="trackCompany"
      [value]="selectedCompany()"
      (onChanged)="handleSelectChange($event)"
    >
      @if (optionDef; as option) {
        <ng-template iSelectOption let-row>
          <ng-container
            [ngTemplateOutlet]="option.template"
            [ngTemplateOutletContext]="{ $implicit: row, row: row }"
          />
        </ng-template>
      }
    </i-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ISelectCompany),
      multi: true,
    },
  ],
})
export class ISelectCompany implements ControlValueAccessor {
  private readonly hostState = inject(IH_STATE, { optional: true });
  private readonly scopeValue = signal<'auto' | 'local'>('auto');
  private readonly loadingValue = signal(false);
  private readonly selectionValue = signal<IHSelectionSnapshot | null>(this.hostState?.selection.getSnapshot() ?? null);
  private readonly selectionRevision = computed(() => this.selectionValue()?.revision);
  private syncedValue: IMenuCompanyDto | null | undefined;
  private readonly store = inject(IUserMenuStore);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly menuCodeValue = signal<string | null>(null);
  private readonly modelValue = signal<IMenuCompanyDto | null>(null);

  @ViewChild(ISelect) private innerSelect?: ISelect<IMenuCompanyDto>;
  @ContentChild(ISelectOptionDefDirective)
  protected optionDef?: ISelectOptionDefDirective<IMenuCompanyDto>;

  @Input() placeholder = '';
  @Input() emptyState: ISelectEmptyState = {};
  @Input() disabled = false;
  @Input() set loading(value: boolean) { this.loadingValue.set(value); }
  get loading(): boolean { return this.loadingValue(); }
  @Input() set stateScope(value: 'auto' | 'local') { this.scopeValue.set(value); }
  get stateScope(): 'auto' | 'local' { return this.scopeValue(); }
  @Input() invalid = false;
  @Input() filterDelay = 200;
  @Input() panelPosition: ISelectPanelPosition = 'bottom left';
  @Input() portalToBody = true;
  @Input() panelOffset = 6;
  @Input() matchTriggerWidth = false;
  @Input() displayWith?: ((row: IMenuCompanyDto | null) => string) | string;
  @Input() filterPredicate = (row: IMenuCompanyDto, term: string): boolean =>
    row.name.toLowerCase().includes(term.toLowerCase()) ||
    row.code.toLowerCase().includes(term.toLowerCase());

  @Input()
  set menuCode(value: string | null | undefined) {
    this.menuCodeValue.set(value?.trim() || null);
  }

  get menuCode(): string | null {
    return this.menuCodeValue();
  }

  @Input()
  set value(value: IMenuCompanyDto | null) {
    this.writeValue(value);
  }

  get value(): IMenuCompanyDto | null {
    return this.hosted() ? this.selectedCompany() : this.modelValue();
  }

  @Output() readonly onChanged = new EventEmitter<ISelectChange<IMenuCompanyDto>>();
  @Output() readonly onOptionSelected = new EventEmitter<ISelectChange<IMenuCompanyDto>>();

  protected readonly hosted = computed(() => !!this.hostState && this.scopeValue() !== 'local');
  private readonly effectiveMenuCode = computed(() => this.menuCodeValue() ??
    (this.hosted() ? this.selectionValue()?.menuCode ?? null : null));
  protected readonly companyLoading = computed(() => this.loadingValue() || (this.hosted() &&
    (!this.store.initialized() || this.store.initializing() || !this.effectiveMenuCode())));

  constructor() {
    const selection = this.hostState?.selection;
    if (selection) {
      const unsubscribe = selection.subscribe(() => this.selectionValue.set(selection.getSnapshot()));
      inject(DestroyRef).onDestroy(unsubscribe);
    }
    effect(() => {
      if (!this.hosted() || !selection) return;
      this.selectionRevision();
      const code = this.effectiveMenuCode();
      const error = this.store.loadErrors().authorizations;
      const status = this.companyLoading() ? 'loading' : error ? 'error' : 'ready';
      selection.validateCompanies(code, this.companyOptions().map((company) => company.id), status,
        error ? 'Unable to load company access.' : null);
    });
    effect(() => {
      if (!this.hosted()) return;
      const value = this.selectedCompany();
      if (value === this.syncedValue) return;
      this.syncedValue = value;
      this.onChange(value);
      this.onChanged.emit({ value, label: value?.name ?? '' });
    });
  }

  protected readonly companyOptions = computed(() => {
    const companies = this.store.companies();
    const code = this.effectiveMenuCode();
    if (this.hosted() && !code) return [];
    if (!code) return companies;

    const allowed = new Set(this.store.menuCompanies()[code] ?? []);
    return companies.filter((company) => allowed.has(company.code));
  });

  protected readonly selectedCompany = computed(() => {
    if (this.hosted()) {
      return this.companyOptions().find((company) => company.id === this.selectionValue()?.companyId) ?? null;
    }
    const value = this.modelValue();
    if (!value) return null;

    return this.companyOptions().find((company) => company.id === value.id) ?? value;
  });

  private onChange: (value: IMenuCompanyDto | null) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected readonly trackCompany = (_index: number, company: IMenuCompanyDto): string =>
    company.id;

  writeValue(value: IMenuCompanyDto | null): void {
    this.modelValue.set(value ?? null);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: IMenuCompanyDto | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.cdr.markForCheck();
  }

  focus(): void {
    if (!this.disabled) this.innerSelect?.focus();
  }

  protected handleSelectChange(change: ISelectChange<IMenuCompanyDto>): void {
    if (this.hosted() && !this.hostState?.selection.setCompany(change.value?.id ?? null)) return;
    this.syncedValue = change.value;
    this.modelValue.set(change.value);
    this.onChange(change.value);
    this.onTouched();
    this.onChanged.emit(change);
    this.onOptionSelected.emit(change);
  }
}
