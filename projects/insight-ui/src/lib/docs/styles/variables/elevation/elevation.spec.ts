import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Elevation } from './elevation';

describe('Elevation', () => {
  let component: Elevation;
  let fixture: ComponentFixture<Elevation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Elevation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Elevation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
