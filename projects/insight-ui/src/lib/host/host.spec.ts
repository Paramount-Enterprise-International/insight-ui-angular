import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IHContent, IHTitleBreadcrumbService } from './host';

describe('IHContent', () => {
  let fixture: ComponentFixture<IHContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IHContent, RouterTestingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/-/' }],
    }).compileComponents();

    fixture = TestBed.createComponent(IHContent);
    fixture.detectChanges();
  });

  it('renders host and title', () => {
    const shell = TestBed.inject(IHTitleBreadcrumbService);
    shell.setTitle('Dashboard');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const title = host.querySelector('.ih-content-header h1');

    expect(title?.textContent).toContain('Dashboard');
  });
});
