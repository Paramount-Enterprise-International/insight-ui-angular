import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundColor } from './background-color';

describe('BackgroundColor', () => {
  let component: BackgroundColor;
  let fixture: ComponentFixture<BackgroundColor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundColor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundColor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
