import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spacing } from './spacing';

describe('Spacing', () => {
  let component: Spacing;
  let fixture: ComponentFixture<Spacing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spacing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Spacing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
