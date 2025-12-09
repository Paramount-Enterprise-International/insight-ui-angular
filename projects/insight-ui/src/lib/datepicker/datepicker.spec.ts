import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IDatepicker } from './datepicker';

describe('IDatepicker', () => {
  let component: IDatepicker;
  let fixture: ComponentFixture<IDatepicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IDatepicker],
    }).compileComponents();

    fixture = TestBed.createComponent(IDatepicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
