import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IGrid, IGridColumn } from './grid';

@Component({
  standalone: true,
  imports: [IGrid, IGridColumn],
  template: `
    <i-grid [dataSource]="data">
      <i-grid-column fieldName="name" title="Name" />
    </i-grid>
  `,
})
class GridHostComponent {
  data = [{ name: 'Alice' }];
}

type TreeNode = {
  id: number;
  name: string;
  group?: boolean;
  disabled?: boolean;
  children?: TreeNode[];
};

@Component({
  standalone: true,
  imports: [IGrid, IGridColumn],
  template: `
    <i-grid
      #grid="iGrid"
      [dataSource]="data"
      [selectionMode]="selectionMode"
      [selectionRowDisabled]="selectionRowDisabled"
      [selectionRowHidden]="selectionRowHidden"
      [tree]="true"
      [treeColumn]="'name'"
      [treeInitialExpandLevel]="99"
      (onRowClick)="rowClicks.push($event)"
    >
      <i-grid-column fieldName="name" title="Name" />
    </i-grid>
  `,
})
class TreeGridHostComponent {
  @ViewChild('grid') grid!: IGrid<TreeNode>;

  selectionMode: 'multiple' | 'single' | false = 'multiple';
  selectionRowHidden = (row: TreeNode): boolean => !!row.group;
  selectionRowDisabled = (row: TreeNode): boolean => !!row.disabled;

  rowClicks: TreeNode[] = [];

  data: TreeNode[] = [
    {
      id: 1,
      name: 'Root A',
      group: true,
      children: [
        { id: 11, name: 'Child A.1' },
        { id: 12, name: 'Child A.2', disabled: true },
      ],
    },
  ];
}

describe('IGrid', () => {
  let fixture: ComponentFixture<GridHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridHostComponent);
    fixture.detectChanges();
  });

  it('renders grid structure', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-grid')).toBeTruthy();
    expect(host.querySelector('i-grid-header-row')).toBeTruthy();
    expect(host.querySelector('i-grid-row')).toBeTruthy();
  });
});

describe('IGrid — tree mode row click + conditional selection', () => {
  let fixture: ComponentFixture<TreeGridHostComponent>;
  let host: TreeGridHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeGridHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeGridHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getRowElements(): HTMLElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('i-grid-row'));
  }

  it('emits onRowClick when clicking the tree host cell text (not just the toggle/checkbox)', () => {
    const rows = getRowElements();
    // Root A is the first row; click its tree text span (not the toggle button/checkbox)
    const treeText = rows[0].querySelector('.i-grid-tree-text') as HTMLElement;
    treeText.click();

    expect(host.rowClicks.length).toBe(1);
    expect(host.rowClicks[0].name).toBe('Root A');
  });

  it('does not toggle selection when clicking a selectable row (tree mode)', () => {
    // treeInitialExpandLevel=99 already renders children by default.
    const rows = getRowElements();
    const childRow = rows.find((r) => r.textContent?.includes('Child A.1'))!;
    const treeText = childRow.querySelector('.i-grid-tree-text') as HTMLElement;
    treeText.click();
    fixture.detectChanges();

    expect(host.grid.selectedRows.some((r) => r.name === 'Child A.1')).toBe(false);
  });

  it('does not toggle selection when clicking a disabled row', () => {
    const rows = getRowElements();
    const disabledRow = rows.find((r) => r.textContent?.includes('Child A.2'))!;
    const treeText = disabledRow.querySelector('.i-grid-tree-text') as HTMLElement;
    treeText.click();
    fixture.detectChanges();

    expect(host.grid.selectedRows.some((r) => r.name === 'Child A.2')).toBe(false);
  });

  it('hides the selection control for hidden rows (group row) and disables it for disabled rows', () => {
    const rows = getRowElements();
    const groupRow = rows.find((r) => r.textContent?.includes('Root A'))!;
    const disabledRow = rows.find((r) => r.textContent?.includes('Child A.2'))!;

    expect(groupRow.querySelector('.i-grid-tree-checkbox')).toBeNull();
    expect(groupRow.querySelector('.i-grid-tree-checkbox-spacer')).toBeTruthy();

    const disabledCheckbox = disabledRow.querySelector('.i-grid-tree-checkbox') as HTMLInputElement;
    expect(disabledCheckbox).toBeTruthy();
    expect(disabledCheckbox.disabled).toBe(true);
  });

  it('excludes hidden/disabled rows from select-all state', () => {
    // Only 'Child A.1' is selectable (Root A is hidden/group, Child A.2 is disabled).
    expect(host.grid.allVisibleSelectableCount).toBe(1);
    expect(host.grid.allVisibleSelected).toBe(false);

    host.grid.onRowSelectionToggle(host.data[0].children![0]); // Child A.1
    fixture.detectChanges();

    expect(host.grid.allVisibleSelected).toBe(true);
  });

  it('setSelected selects selectable rows and ignores hidden/disabled rows', () => {
    host.grid.setSelected([
      host.data[0], // Root A — hidden (group) → ignored
      host.data[0].children![0], // Child A.1 — selectable → selected
      host.data[0].children![1], // Child A.2 — disabled → ignored
    ]);
    fixture.detectChanges();

    const selected = host.grid.selectedRows;
    expect(selected.length).toBe(1);
    expect(selected[0].name).toBe('Child A.1');
  });

  it('setSelected ignores rows not present in the data source', () => {
    host.grid.setSelected([{ id: 999, name: 'Ghost' }]);
    fixture.detectChanges();

    expect(host.grid.selectedRows.length).toBe(0);
  });

  it('setSelected replaces (not merges) an existing selection', () => {
    host.grid.onRowSelectionToggle(host.data[0].children![0]); // Child A.1
    fixture.detectChanges();

    // Child A.2 is disabled → filtered out → selection should become empty.
    host.grid.setSelected([host.data[0].children![1]]);
    fixture.detectChanges();

    expect(host.grid.selectedRows.length).toBe(0);
  });
});

