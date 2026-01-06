import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ILoading } from './loading';

describe('ILoading', () => {
  let component: ILoading;
  let fixture: ComponentFixture<ILoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ILoading],
    }).compileComponents();

    fixture = TestBed.createComponent(ILoading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
