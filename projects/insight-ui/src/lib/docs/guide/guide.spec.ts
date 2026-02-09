import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IRGuide } from './guide';

describe('IRGuide', () => {
  let component: IRGuide;
  let fixture: ComponentFixture<IRGuide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IRGuide],
    }).compileComponents();

    fixture = TestBed.createComponent(IRGuide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
