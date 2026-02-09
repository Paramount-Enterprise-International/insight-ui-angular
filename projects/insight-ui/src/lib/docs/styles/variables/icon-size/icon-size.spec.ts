import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSize } from './icon-size';

describe('IconSize', () => {
  let component: IconSize;
  let fixture: ComponentFixture<IconSize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconSize]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconSize);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
