import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IHSidebar } from './sidebar';

describe('Sidebar', () => {
  let component: IHSidebar;
  let fixture: ComponentFixture<IHSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IHSidebar]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IHSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
