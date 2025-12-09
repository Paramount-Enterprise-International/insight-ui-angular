import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IConfirm } from './confirm';

describe('Confirm', () => {
  let component: IConfirm;
  let fixture: ComponentFixture<IConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IConfirm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IConfirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
