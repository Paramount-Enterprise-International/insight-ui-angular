import { Component } from '@angular/core';
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
