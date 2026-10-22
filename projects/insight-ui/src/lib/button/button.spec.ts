import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IButton } from './button';

@Component({
  standalone: true,
  imports: [IButton],
  template: `<i-button>Save</i-button>`,
})
class ButtonHost {}

describe('IButton', () => {
  let fixture: ComponentFixture<ButtonHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonHost);
    fixture.detectChanges();
  });

  it('renders host and inner button', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-button')).toBeTruthy();
    expect(host.querySelector('i-button .i-button-inner')).toBeTruthy();
  });
});

describe('IButton placeholder', () => {
  for (const size of ['3xs', '2xs', 'xs', 'sm', 'md', 'lg'] as const)
    it(`uses caller size ${size} and removes interactive content`, () => {
      TestBed.configureTestingModule({ imports: [IButton] });
      const f = TestBed.createComponent(IButton);
      f.componentRef.setInput('size', size);
      f.componentRef.setInput('placeholder', true);
      f.componentRef.setInput('loading', true);
      f.componentRef.setInput('icon', 'edit');
      f.componentRef.setInput('href', 'https://example.com');
      f.detectChanges();
      const slot = f.nativeElement.querySelector('i-action-placeholder');
      expect(slot.getAttribute('size')).toBe(size);
      expect(f.nativeElement.querySelector('button,a,i-icon,i-loading')).toBeNull();
      f.componentRef.setInput('size', 'lg');
      f.detectChanges();
      expect(slot.style.height).toBe('var(--i-size-lg)');
    });
  it('suppresses clicks and restores the correct element after toggling', () => {
    TestBed.configureTestingModule({ imports: [IButton] });
    const f = TestBed.createComponent(IButton);
    const emitted = jasmine.createSpy('click');
    f.componentInstance.onClick.subscribe(emitted);
    f.componentRef.setInput('placeholder', true);
    f.componentRef.setInput('href', 'https://example.com');
    f.detectChanges();
    f.componentInstance.handleClick(new MouseEvent('click'));
    expect(emitted).not.toHaveBeenCalled();
    f.componentRef.setInput('placeholder', false);
    f.detectChanges();
    expect(f.nativeElement.querySelector('a').getAttribute('href')).toBe('https://example.com');
  });
});
