import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Heracles } from './heracles';

describe('Heracles', () => {
  let component: Heracles;
  let fixture: ComponentFixture<Heracles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Heracles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Heracles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
