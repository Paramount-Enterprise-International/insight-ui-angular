import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IDialogOutlet } from './dialog';

describe('IDialogOutlet', () => {
  let fixture: ComponentFixture<IDialogOutlet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IDialogOutlet],
    }).compileComponents();

    fixture = TestBed.createComponent(IDialogOutlet);
    fixture.detectChanges();
  });

  it('renders empty outlet', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-dialog-container')).toBeNull();
  });
});
