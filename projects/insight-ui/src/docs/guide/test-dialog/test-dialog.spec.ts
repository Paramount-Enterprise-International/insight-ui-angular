import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDialog } from './test-dialog';

describe('TestDialog', () => {
  let component: TestDialog;
  let fixture: ComponentFixture<TestDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
