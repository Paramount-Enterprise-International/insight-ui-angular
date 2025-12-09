import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IIcon } from './icon';

describe('Icon', () => {
  let component: IIcon;
  let fixture: ComponentFixture<IIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IIcon]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
