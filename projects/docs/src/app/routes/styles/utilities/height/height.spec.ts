import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Height } from './height';

describe('Height', () => {
  let component: Height;
  let fixture: ComponentFixture<Height>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Height]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Height);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
