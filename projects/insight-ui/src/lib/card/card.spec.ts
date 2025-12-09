import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ICard } from './card';

describe('Card', () => {
  let component: ICard;
  let fixture: ComponentFixture<ICard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ICard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ICard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
