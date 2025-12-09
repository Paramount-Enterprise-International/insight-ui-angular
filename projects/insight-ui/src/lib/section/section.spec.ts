import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ISection } from './section';

describe('Section', () => {
  let component: ISection;
  let fixture: ComponentFixture<ISection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ISection]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ISection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
