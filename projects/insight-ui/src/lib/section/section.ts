/**
 * ISection
 * Version: 1.0.0
 * <i-section>
 *   <i-section-header></i-section-header>
 *   <i-section-filter></i-section-filter>
 *   <i-section-body></i-section-body>
 *   <i-section-footer></i-section-footer>
 * </i-section>
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

@Component({
  selector: 'i-section',
  imports: [],
  template: `<ng-content />`,
})
export class ISection {}

@Component({
  selector: 'i-section-header',
  imports: [],
  template: `<h4><ng-content /></h4>`,
})
export class ISectionHeader {}

@Component({
  selector: 'i-section-sub-header',
  imports: [],
  template: `<h6><ng-content /></h6>`,
})
export class ISectionSubHeader {}

@Component({
  selector: 'i-section-filter',
  imports: [],
  template: `<ng-content />`,
})
export class ISectionFilter {}

@Component({
  selector: 'i-section-body',
  imports: [],
  template: `<ng-content />`,
})
export class ISectionBody {}

@Component({
  selector: 'i-section-footer',
  imports: [],
  template: `<ng-content />`,
})
export class ISectionFooter {}

@Component({
  selector: 'i-section-code',
  standalone: true,
  template: ` <pre><code [innerText]="code"></code></pre> `,
})
export class ISectionCode {
  @Input() code = '';

  get inputCode() {
    return this.code.trim();
  }
}

@Component({
  selector: 'i-section-markdown',
  standalone: true,
  template: ` <div class="i-section-markdown" [innerHTML]="rendered"></div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ISectionMarkdown {
  @Input() set markdown(value: string) {
    this._markdown = value ?? '';
    this.update();
  }

  // if you ever want to support another input name
  @Input() set content(value: string) {
    this._markdown = value ?? '';
    this.update();
  }

  private _markdown = '';
  rendered: SafeHtml | string = '';

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  private async update(): Promise<void> {
    const src = this._markdown.trim();
    if (!src) {
      this.rendered = '';
      this.cdr.markForCheck();
      return;
    }

    // marked.parse is typed as string | Promise<string>, so we await it
    const rawHtml = await marked.parse(src); // now typed as string

    const clean = DOMPurify.sanitize(rawHtml);
    this.rendered = this.sanitizer.bypassSecurityTrustHtml(clean);

    this.cdr.markForCheck();
  }
}

@NgModule({
  imports: [
    ISection,
    ISectionHeader,
    ISectionSubHeader,
    ISectionFilter,
    ISectionBody,
    ISectionFooter,
    ISectionCode,
    ISectionMarkdown,
  ],
  exports: [
    ISection,
    ISectionHeader,
    ISectionSubHeader,
    ISectionFilter,
    ISectionBody,
    ISectionFooter,
    ISectionCode,
    ISectionMarkdown,
  ],
})
export class ISectionModule {}
