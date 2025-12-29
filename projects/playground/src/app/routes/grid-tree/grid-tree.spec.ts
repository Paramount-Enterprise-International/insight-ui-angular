import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTree } from './grid-tree';

describe('GridTree', () => {
  let component: GridTree;
  let fixture: ComponentFixture<GridTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridTree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridTree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
