import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IHMenu } from './menu';

describe('Menu', () => {
  let component: IHMenu;
  let fixture: ComponentFixture<IHMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IHMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(IHMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
