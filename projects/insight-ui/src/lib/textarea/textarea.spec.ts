import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ITextArea } from './textarea';

describe('ITextarea', () => {
  let component: ITextArea;
  let fixture: ComponentFixture<ITextArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ITextArea],
    }).compileComponents();

    fixture = TestBed.createComponent(ITextArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
