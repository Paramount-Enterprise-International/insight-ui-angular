import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectFit } from './object-fit';

describe('ObjectFit', () => {
  let component: ObjectFit;
  let fixture: ComponentFixture<ObjectFit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectFit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectFit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
