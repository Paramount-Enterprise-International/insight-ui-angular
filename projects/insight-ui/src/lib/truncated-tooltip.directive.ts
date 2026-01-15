import {
  AfterViewInit,
  booleanAttribute,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[truncatedTooltip]',
  standalone: true,
})
export class ITruncatedTooltipDirective implements AfterViewInit, OnDestroy {
  @Input({ alias: 'truncatedTooltip', transform: booleanAttribute }) enabled = true;

  private observer?: ResizeObserver;
  private el: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

  ngAfterViewInit(): void {
    if (!this.enabled) return;

    const el = this.el.nativeElement;

    const check = (): void => {
      const truncated = el.scrollWidth > el.clientWidth;
      if (truncated) {
        el.setAttribute('title', el.textContent?.trim() ?? '');
      } else {
        el.removeAttribute('title');
      }
    };

    check();

    this.observer = new ResizeObserver(check);
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
