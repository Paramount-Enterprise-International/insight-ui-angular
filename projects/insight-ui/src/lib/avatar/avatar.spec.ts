import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IIcon } from '../icon';
import { IAvatar } from './avatar';

// ─── Host component for testing ──────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [IAvatar],
  template: `<i-avatar
    [alt]="alt"
    [className]="className"
    [fallbackSrc]="fallbackSrc"
    [shape]="shape"
    [size]="size"
    [src]="src"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHost {
  src?: string = undefined;
  alt?: string = undefined;
  size: number | string = 40;
  shape?: 'circle' | 'square' | 'rounded-square' = 'circle';
  fallbackSrc?: string = undefined;
  className?: string = undefined;
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('IAvatar', () => {
  let host: TestHost;
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Default (no src) ──────────────────────────────────────────────────

  it('should render the user icon when no src is provided', () => {
    const icon = fixture.debugElement.query(By.directive(IIcon));
    expect(icon).toBeTruthy();
    expect(icon.componentInstance.icon).toBe('user');
  });

  // ─── With src ──────────────────────────────────────────────────────────

  it('should render an img when src is provided', () => {
    host.src = '/test-photo.jpg';
    host.alt = 'Test User';
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.src).toContain('/test-photo.jpg');
    expect(img.nativeElement.alt).toBe('Test User');
  });

  // ─── Shape attribute ───────────────────────────────────────────────────

  it('should set data-shape="circle" by default', () => {
    const el = fixture.debugElement.query(By.directive(IAvatar));
    expect(el.nativeElement.getAttribute('data-shape')).toBe('circle');
  });

  it('should set data-shape="square" when shape is square', () => {
    host.shape = 'square';
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.directive(IAvatar));
    expect(el.nativeElement.getAttribute('data-shape')).toBe('square');
  });

  it('should set data-shape="rounded-square" when shape is rounded-square', () => {
    host.shape = 'rounded-square';
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.directive(IAvatar));
    expect(el.nativeElement.getAttribute('data-shape')).toBe('rounded-square');
  });

  // ─── Size (number) ─────────────────────────────────────────────────────

  it('should set width and height in px when size is a number', () => {
    host.size = 200;
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.directive(IAvatar)).nativeElement;
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('200px');
  });

  // ─── Size (IIconSize string) ───────────────────────────────────────────

  it('should map "lg" to 64px', () => {
    host.size = 'lg';
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.directive(IAvatar)).nativeElement;
    expect(el.style.width).toBe('64px');
    expect(el.style.height).toBe('64px');
  });

  // ─── Class injection ───────────────────────────────────────────────────

  it('should inject className onto the host element', () => {
    host.className = 'border-2 border-primary';
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.directive(IAvatar)).nativeElement;
    expect(el.classList).toContain('border-2');
    expect(el.classList).toContain('border-primary');
  });

  // ─── Fallback on img error ─────────────────────────────────────────────

  it('should fall back to user icon when src triggers error', () => {
    host.src = '/broken.jpg';
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('img'));
    img.triggerEventHandler('error', null);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.directive(IIcon));
    expect(icon).toBeTruthy();
    expect(icon.componentInstance.icon).toBe('user');
  });

  // ─── Base class ────────────────────────────────────────────────────────

  it('should have the i-avatar CSS class on the host', () => {
    const el = fixture.debugElement.query(By.directive(IAvatar)).nativeElement;
    expect(el.classList).toContain('i-avatar');
  });
});
