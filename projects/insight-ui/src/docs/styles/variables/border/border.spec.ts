import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Border } from './border';

describe('Border', () => {
  let component: Border;
  let fixture: ComponentFixture<Border>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Border]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Border);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
