import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDialogExample } from './component-dialog-example';

describe('ComponentDialogExample', () => {
  let component: ComponentDialogExample;
  let fixture: ComponentFixture<ComponentDialogExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentDialogExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentDialogExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
