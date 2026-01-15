import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IHContent } from './content';

describe('IHContent', () => {
  let component: IHContent;
  let fixture: ComponentFixture<IHContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IHContent],
    }).compileComponents();

    fixture = TestBed.createComponent(IHContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
