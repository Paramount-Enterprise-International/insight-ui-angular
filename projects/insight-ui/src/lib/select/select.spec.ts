import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ISelect } from './select';

describe('ISelect', () => {
  let component: ISelect;
  let fixture: ComponentFixture<ISelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ISelect],
    }).compileComponents();

    fixture = TestBed.createComponent(ISelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
