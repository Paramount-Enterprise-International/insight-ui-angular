import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTable } from './location-table';

describe('LocationTable', () => {
  let component: LocationTable;
  let fixture: ComponentFixture<LocationTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
