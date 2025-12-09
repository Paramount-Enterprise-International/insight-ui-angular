import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IInput } from './input';

describe('Input', () => {
  let component: IInput;
  let fixture: ComponentFixture<IInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IInput],
    }).compileComponents();

    fixture = TestBed.createComponent(IInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
