import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scroll } from './scroll';

describe('Scroll', () => {
  let component: Scroll;
  let fixture: ComponentFixture<Scroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scroll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scroll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
