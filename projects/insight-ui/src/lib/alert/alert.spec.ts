import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IAlert } from './alert';

describe('Alert', () => {
  let component: IAlert;
  let fixture: ComponentFixture<IAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IAlert]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
