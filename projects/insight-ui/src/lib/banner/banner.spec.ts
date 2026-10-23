import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IBanner, type IBannerVariant } from './banner';
@Component({
  imports: [IBanner],
  template: `<i-banner
    [closable]="closable"
    [defaultOpen]="defaultOpen"
    [message]="message"
    [open]="open"
    [prefixIcon]="prefix"
    [suffixIcon]="suffix"
    [variant]="variant"
    (onClose)="closed = closed + 1"
    (openChange)="changes.push($event)"
  >
    @if (children) {
      <button type="button" (click)="clicked = clicked + 1">Child action</button>
    }
  </i-banner>`,
})
class Host {
  message: string | null = 'Notice';
  variant: IBannerVariant = 'info';
  prefix = '';
  suffix = '';
  closable = false;
  open: boolean | undefined;
  defaultOpen = true;
  children = false;
  changes: boolean[] = [];
  closed = 0;
  clicked = 0;
}
describe('IBanner', () => {
  function setup(options: Partial<Pick<Host, 'message' | 'children'>> = {}): ComponentFixture<Host> {
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    Object.assign(fixture.componentInstance, options);
    fixture.detectChanges();
    return fixture;
  }

  async function updateChildren(fixture: ComponentFixture<Host>, children: boolean): Promise<void> {
    const content = fixture.nativeElement.querySelector('.i-banner__content') as HTMLElement;
    const mutation = new Promise<void>((resolve) => {
      const observer = new MutationObserver(() => {
        observer.disconnect();
        resolve();
      });
      observer.observe(content, { childList: true });
    });
    fixture.componentInstance.children = children;
    fixture.detectChanges();
    await mutation;
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('hides empty messages and preserves literal text', () => {
    const f = setup();
    f.componentInstance.message = '  ';
    f.detectChanges();
    expect(f.nativeElement.querySelector('i-banner').style.display).toBe('none');
    f.componentInstance.message = '<strong>Blocked</strong>';
    f.detectChanges();
    expect(f.nativeElement.querySelector('.i-banner__message').textContent).toBe(
      '<strong>Blocked</strong>',
    );
    expect(f.nativeElement.querySelector('strong')).toBeNull();
  });
  it('renders interactive children without a message', async () => {
    const f = setup();
    f.componentInstance.message = null;
    await updateChildren(f, true);
    expect(f.nativeElement.querySelector('i-banner').style.display).not.toBe('none');
    f.nativeElement.querySelector('button').click();
    expect(f.componentInstance.clicked).toBe(1);
  });
  it('renders children present on the initial render without a message', async () => {
    const f = setup({ message: null, children: true });
    await f.whenStable();
    f.detectChanges();
    expect(f.nativeElement.querySelector('i-banner').style.display).not.toBe('none');
    f.nativeElement.querySelector('button').click();
    expect(f.componentInstance.clicked).toBe(1);
  });
  it('hides again when projected children are removed', async () => {
    const f = setup({ message: null, children: true });
    await f.whenStable();
    f.detectChanges();
    expect(f.nativeElement.querySelector('i-banner').style.display).not.toBe('none');
    await updateChildren(f, false);
    expect(f.nativeElement.querySelector('i-banner').style.display).toBe('none');
    expect(f.nativeElement.querySelector('button')).toBeNull();
  });
  for (const variant of ['neutral', 'primary', 'success', 'info', 'warning', 'danger'] as const)
    it(`exposes ${variant} semantics`, () => {
      const f = setup();
      f.componentInstance.variant = variant;
      f.detectChanges();
      expect(f.nativeElement.querySelector('i-banner').getAttribute('variant')).toBe(variant);
      expect(f.nativeElement.querySelector('i-banner').getAttribute('role')).toBe(
        variant === 'danger' ? 'alert' : 'status',
      );
    });
  it('has no close control by default and supports both icons with close', () => {
    const f = setup();
    expect(f.nativeElement.querySelector('.i-banner__close')).toBeNull();
    f.componentInstance.closable = true;
    f.componentInstance.prefix = 'info';
    f.componentInstance.suffix = 'sync';
    f.detectChanges();
    expect(f.nativeElement.querySelectorAll('.i-banner__icon').length).toBe(2);
    expect(f.nativeElement.querySelector('.i-banner__close').getAttribute('type')).toBe('button');
  });
  it('closes immediately in uncontrolled mode without reopening on content updates', () => {
    const f = setup();
    f.componentInstance.closable = true;
    f.detectChanges();
    f.nativeElement.querySelector('.i-banner__close').click();
    f.detectChanges();
    expect(f.componentInstance.changes).toEqual([false]);
    expect(f.componentInstance.closed).toBe(1);
    expect(f.nativeElement.querySelector('i-banner').style.display).toBe('none');
    f.componentInstance.message = 'Another notice';
    f.detectChanges();
    expect(f.nativeElement.querySelector('i-banner').style.display).toBe('none');
  });
  it('delegates controlled visibility and supports reopening', () => {
    const f = setup();
    f.componentInstance.open = true;
    f.componentInstance.closable = true;
    f.detectChanges();
    f.nativeElement.querySelector('.i-banner__close').click();
    f.detectChanges();
    expect(f.componentInstance.changes).toEqual([false]);
    expect(f.nativeElement.querySelector('i-banner').style.display).not.toBe('none');
    f.componentInstance.open = false;
    f.detectChanges();
    expect(f.nativeElement.querySelector('i-banner').style.display).toBe('none');
    f.componentInstance.open = true;
    f.detectChanges();
    expect(f.nativeElement.querySelector('i-banner').style.display).not.toBe('none');
  });
});
