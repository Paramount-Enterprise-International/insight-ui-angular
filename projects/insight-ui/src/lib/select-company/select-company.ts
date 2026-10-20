import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChild,
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
  ISelectOptionDefDirective,
  type ISelectPanelPosition,
} from '../select';
import { IUserMenuStore } from '../store';
import type { IMenuCompanyDto } from '../user/user.types';

@Component({
  selector: 'i-select-company',
  standalone: true,
  imports: [ISelect, ISelectOptionDefDirective, NgTemplateOutlet],
  template: `
    <i-select
      [disabled]="disabled"
      [displayWith]="displayWith ?? 'name'"
      [filterDelay]="filterDelay"
      [filterPredicate]="filterPredicate"
      [invalid]="invalid"
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
  private readonly store = inject(IUserMenuStore);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly menuCodeValue = signal<string | null>(null);
  private readonly modelValue = signal<IMenuCompanyDto | null>(null);

  @ViewChild(ISelect) private innerSelect?: ISelect<IMenuCompanyDto>;
  @ContentChild(ISelectOptionDefDirective)
  protected optionDef?: ISelectOptionDefDirective<IMenuCompanyDto>;

  @Input() placeholder = '';
  @Input() disabled = false;
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
    return this.modelValue();
  }

  @Output() readonly onChanged = new EventEmitter<ISelectChange<IMenuCompanyDto>>();
  @Output() readonly onOptionSelected = new EventEmitter<ISelectChange<IMenuCompanyDto>>();

  protected readonly companyOptions = computed(() => {
    const companies = this.store.companies();
    const code = this.menuCodeValue();
    if (!code) return companies;

    const allowed = new Set(this.store.menuCompanies()[code] ?? []);
    return companies.filter((company) => allowed.has(company.code));
  });

  protected readonly selectedCompany = computed(() => {
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
    this.modelValue.set(change.value);
    this.onChange(change.value);
    this.onTouched();
    this.onChanged.emit(change);
    this.onOptionSelected.emit(change);
  }
}
