import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Width } from './width';

describe('Width', () => {
  let component: Width;
  let fixture: ComponentFixture<Width>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Width]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Width);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
