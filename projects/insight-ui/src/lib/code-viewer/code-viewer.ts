import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IButton } from '../button/button';

type ICodeHighlighter = 'auto' | 'hljs' | 'none';

function coerceBool(v: any): boolean {
  return v !== null && v !== undefined && `${v}` !== 'false';
}

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getExtFromPath(path: string): string {
  const clean = (path || '').split('?')[0].split('#')[0];
  const file = clean.split('/').pop() ?? '';
  const idx = file.lastIndexOf('.');
  return idx >= 0 ? file.slice(idx + 1).toLowerCase() : '';
}

function languageFromExt(ext: string): string {
  switch ((ext || '').toLowerCase()) {
    case 'ts':
      return 'typescript';
    case 'tsx':
      return 'tsx';
    case 'js':
    case 'mjs':
    case 'cjs':
      return 'javascript';
    case 'jsx':
      return 'jsx';
    case 'json':
      return 'json';
    case 'html':
    case 'htm':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
      return 'scss';
    case 'yml':
    case 'yaml':
      return 'yaml';
    case 'md':
      return 'markdown';
    case 'sql':
      return 'sql';
    case 'sh':
    case 'bash':
      return 'bash';
    case 'txt':
      return 'text';
    default:
      return 'text';
  }
}

function parseHeight(v: any): number | null {
  if (v === null || v === undefined) return null;

  const s = String(v).trim().toLowerCase();
  if (s === '' || s === 'wrap' || s === 'auto') return null;

  if (s.endsWith('px')) {
    const n = Number(s.slice(0, -2).trim());
    return Number.isFinite(n) && n > 0 ? n : null;
  }

  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function isAbsoluteUrl(path: string): boolean {
  return /^https?:\/\//i.test(path) || /^\/\//.test(path);
}

/**
 * MF remote-safe: resolve relative file path against the remote bundle URL,
 * not the host shell base href.
 */
function resolveFileUrl(file: string): string {
  const f = (file ?? '').trim();
  if (!f) return f;

  if (isAbsoluteUrl(f) || f.startsWith('/')) return f;

  const base = (import.meta as any).url as string;
  return new URL(f.replace(/^\.\//, ''), base).toString();
}

function normalizeHljsLanguage(lang: string): string {
  // highlight.js commonly treats HTML under "xml"
  if (lang === 'html') return 'xml';
  return lang;
}

@Component({
  selector: 'i-code-viewer',
  standalone: true,
  imports: [CommonModule, IButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Capture projected code for fallback usage -->
    <ng-template #projected>
      <ng-content></ng-content>
    </ng-template>

    <div class="i-code-viewer" [class.compact]="compact" [class.wrap]="wrap">
      @if (showHeader) {
      <div class="i-code-viewer-header">
        <div class="i-code-viewer-header-main">
          <div class="i-code-viewer-header-title">
            {{ title || languageLabel }}
          </div>

          <div class="i-code-viewer-header-actions">
            @if (copy) {
            <i-button size="xs" variant="outline" (click)="onCopy()" [disabled]="loading">
              {{ copied ? 'Copied' : 'Copy' }}
            </i-button>
            }
          </div>
        </div>

        @if (fileName) {
        <div class="i-code-viewer-header-sub">{{ fileName }}</div>
        }
      </div>
      } @if (loading) {
      <div class="i-code-viewer-loading">Loading…</div>
      } @if (error) {
      <div class="i-code-viewer-error">{{ error }}</div>
      }

      <!-- ONE scroll container so gutter + code always scroll together -->
      <div
        class="i-code-viewer-scroll"
        [class.scroll]="scrollEffective"
        [class.scroll-y]="scrollEffective"
        [style.height.px]="heightPx"
      >
        @if (lineNumbers) {
        <div class="i-code-viewer-gutter" aria-hidden="true">
          @for (n of lineNumberList; track n) {
          <div class="i-code-viewer-line">{{ n }}</div>
          }
        </div>
        }

        <pre class="i-code-viewer-pre">
<code
  class="i-code-viewer-code hljs"
  [attr.data-language]="effectiveLanguage"
  [innerHTML]="renderedHtml"
></code>
        </pre>
      </div>
    </div>
  `,
})
export class ICodeViewer {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly http = inject(HttpClient);

  @ViewChild('projected', { static: true }) private projectedTpl!: TemplateRef<unknown>;

  // ===== Inputs =====
  @Input() title: string = '';

  private _languageOverride: string | null = null;
  @Input()
  set language(v: string | null | undefined) {
    const s = (v ?? '').trim();
    this._languageOverride = s ? s : null;
    this.recompute();
  }
  get language(): string | null {
    return this._languageOverride;
  }

  private _file: string = '';
  @Input()
  set file(v: string | null | undefined) {
    const next = (v ?? '').trim();
    if (next === this._file) return;

    this._file = next;

    if (this._file) {
      this.loadFile(this._file);
    } else {
      this.loading = false;
      this.error = '';
      this.recompute();
    }
  }
  get file(): string {
    return this._file;
  }

  private _code = '';
  @Input()
  set code(v: string | null | undefined) {
    this._code = v ?? '';
    this.recompute();
  }
  get code(): string {
    return this._code;
  }

  @Input({ transform: coerceBool }) copy = true;
  @Input({ transform: coerceBool }) wrap = false;
  @Input({ transform: coerceBool }) compact = false;

  /** ✅ Default true */
  @Input({ transform: coerceBool }) lineNumbers = true;

  /** If true, enable scroll (fixed height also forces scroll) */
  @Input({ transform: coerceBool }) scroll = false;

  /** height="wrap"(default) or height="300" (px) */
  private _heightPx: number | null = null;
  @Input()
  set height(v: any) {
    this._heightPx = parseHeight(v);
    this.cdr.markForCheck();
  }
  get height(): any {
    return this._heightPx ?? 'wrap';
  }

  /** Highlight engine */
  @Input() highlighter: ICodeHighlighter = 'auto';

  @Output() fileLoaded = new EventEmitter<{ file: string; language: string }>();

  // ===== State =====
  loading = false;
  error = '';
  renderedHtml = '';
  copied = false;

  lineNumberList: number[] = [];

  private requestSeq = 0;
  private _fileLanguage: string = 'text';

  // highlight.js lazy
  private hljsPromise: Promise<any> | null = null;
  private hljs: any | null = null;

  // ===== Derived =====
  get heightPx(): number | null {
    return this._heightPx;
  }

  get scrollEffective(): boolean {
    return this.scroll || this._heightPx !== null;
  }

  get showHeader(): boolean {
    // keep header visible if copy enabled, title exists, or file exists
    return !!this.title || this.copy || !!this._file;
  }

  get effectiveLanguage(): string {
    if (this._languageOverride) return this._languageOverride;
    if (this._file) return this._fileLanguage;
    return 'text';
  }

  get languageLabel(): string {
    const l = (this.effectiveLanguage || 'text').toUpperCase();
    return l === 'TEXT' ? 'CODE' : l;
  }

  get fileName(): string | null {
    if (!this._file) return null;
    const clean = this._file.split('?')[0].split('#')[0];
    return clean.split('/').pop() ?? null;
  }

  // ===== Core =====
  private recompute(): void {
    // fallback: projected content (only when no [code] and no [file])
    if (!this._code && !this._file) {
      const projected = this.readProjectedContent();
      if (projected) this._code = projected;
    }

    // line numbers
    if (this.lineNumbers) {
      const lines = this.countLines(this._code);
      this.lineNumberList = Array.from({ length: lines }, (_, i) => i + 1);
    } else {
      this.lineNumberList = [];
    }

    // render sync first (escaped or hljs if already loaded)
    this.renderedHtml = this.renderToHtmlSync(this._code, this.effectiveLanguage);
    this.cdr.markForCheck();

    // then async highlight if needed
    this.maybeHighlightAsync();
  }

  private countLines(text: string): number {
    if (!text) return 1;
    // preserve last empty line if code ends with \n
    return text.endsWith('\n') ? text.split('\n').length : text.split('\n').length;
  }

  private readProjectedContent(): string {
    const host = document.createElement('div');
    const view = this.projectedTpl.createEmbeddedView({});
    view.detectChanges();

    view.rootNodes.forEach((n: any) => {
      if (typeof n === 'string') host.append(n);
      else if (n?.textContent) host.append(n.textContent);
    });

    view.destroy();
    return host.textContent?.trim() ?? '';
  }

  private shouldUseHljs(): boolean {
    return this.highlighter === 'hljs' || this.highlighter === 'auto';
  }

  private renderToHtmlSync(raw: string, language: string): string {
    const text = raw ?? '';
    if (!text) return '';

    if (this.highlighter === 'none') return escapeHtml(text);

    if (this.shouldUseHljs() && this.hljs) {
      return this.highlightWithHljs(text, language);
    }

    return escapeHtml(text);
  }

  private async maybeHighlightAsync(): Promise<void> {
    if (!this.shouldUseHljs()) return;
    if (!this._code) return;

    if (!this.hljs) {
      await this.loadHljsIfNeeded();
      if (!this.hljs) return;
    }

    this.renderedHtml = this.highlightWithHljs(this._code, this.effectiveLanguage);
    this.cdr.markForCheck();
  }

  private highlightWithHljs(text: string, language: string): string {
    try {
      const hljs = this.hljs;
      const lang = normalizeHljsLanguage(language);

      if (lang && hljs.getLanguage?.(lang)) {
        return hljs.highlight(text, { language: lang }).value;
      }
      return hljs.highlightAuto(text).value;
    } catch {
      return escapeHtml(text);
    }
  }

  private async loadHljsIfNeeded(): Promise<void> {
    if (this.hljs) return;

    // allow global window.hljs if you ever decide to load it globally
    const w = globalThis as any;
    if (w?.hljs?.highlight && w?.hljs?.highlightAuto) {
      this.hljs = w.hljs;
      return;
    }

    if (!this.hljsPromise) {
      this.hljsPromise = import('highlight.js').then((m: any) => m.default ?? m).catch(() => null);
    }

    const loaded = await this.hljsPromise;
    if (loaded?.highlight && loaded?.highlightAuto) {
      this.hljs = loaded;
    }
  }

  private async loadFile(path: string): Promise<void> {
    const seq = ++this.requestSeq;

    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    this._fileLanguage = languageFromExt(getExtFromPath(path));

    try {
      const url = resolveFileUrl(path);
      const content = await firstValueFrom(this.http.get(url, { responseType: 'text' }));

      if (seq !== this.requestSeq) return;

      this._code = content ?? '';
      this.loading = false;
      this.error = '';

      this.recompute();
      this.fileLoaded.emit({ file: url, language: this.effectiveLanguage });
    } catch {
      if (seq !== this.requestSeq) return;

      this.loading = false;
      this.error = `Failed to load: ${path}`;
      this.recompute();
    }
  }

  async onCopy(): Promise<void> {
    const text = this._code ?? '';
    if (!text || this.loading) return;

    const done = () => {
      this.copied = true;
      this.cdr.markForCheck();
      setTimeout(() => {
        this.copied = false;
        this.cdr.markForCheck();
      }, 1200);
    };

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        done();
        return;
      }
    } catch {
      // fallback below
    }

    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.top = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    } catch {
      // ignore
    }
  }
}

@NgModule({
  imports: [ICodeViewer, HttpClientModule],
  exports: [ICodeViewer],
})
export class ICodeViewerModule {}
