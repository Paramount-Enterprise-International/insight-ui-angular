import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Opacity } from './opacity';

describe('Opacity', () => {
  let component: Opacity;
  let fixture: ComponentFixture<Opacity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Opacity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Opacity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
