import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shadow } from './shadow';

describe('Shadow', () => {
  let component: Shadow;
  let fixture: ComponentFixture<Shadow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shadow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shadow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
