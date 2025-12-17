import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IButton } from './../button/button';

type ICodeHighlighter = 'auto' | 'hljs' | 'prism' | 'none';

function isAbsoluteUrl(path: string): boolean {
  return /^https?:\/\//i.test(path) || /^\/\//.test(path);
}

function resolveFileUrl(file: string): string {
  const f = (file ?? '').trim();
  if (!f) return f;

  // If absolute URL or root-absolute, keep it as-is
  if (isAbsoluteUrl(f) || f.startsWith('/')) return f;

  // Resolve relative to the remote bundle URL (NOT the host app URL)
  const base = (import.meta as any).url as string; // ESM
  return new URL(f.replace(/^\.\//, ''), base).toString();
}

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

function detectGlobalHighlighter(): { kind: 'hljs' | 'prism' | null; api: any } {
  const w = globalThis as any;
  if (w?.hljs?.highlight && w?.hljs?.highlightAuto) return { kind: 'hljs', api: w.hljs };
  if (w?.Prism?.highlight && w?.Prism?.languages) return { kind: 'prism', api: w.Prism };
  return { kind: null, api: null };
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
    case 'sass':
      return 'sass';
    case 'less':
      return 'less';
    case 'xml':
      return 'xml';
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
    case 'zsh':
      return 'zsh';
    case 'go':
      return 'go';
    case 'java':
      return 'java';
    case 'kt':
    case 'kts':
      return 'kotlin';
    case 'cs':
      return 'csharp';
    case 'c':
      return 'c';
    case 'cpp':
    case 'cc':
    case 'cxx':
      return 'cpp';
    case 'rs':
      return 'rust';
    case 'php':
      return 'php';
    case 'dart':
      return 'dart';
    case 'txt':
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

@Component({
  selector: 'i-code-viewer',
  standalone: true,
  imports: [CommonModule, IButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="i-code-viewer" [class.compact]="compact" [class.wrap]="wrap">
      @if (showHeader) {
      <div class="i-code-viewer-header">
        <div class="i-code-viewer-title">
          @if (title) {
          <span class="i-code-viewer-title-text">{{ title }}</span>
          } @else {
          <span class="i-code-viewer-title-text">{{ languageLabel }}</span>
          }
        </div>

        <div class="i-code-viewer-actions">
          @if (copy) {
          <i-button
            class="i-code-viewer-copy-btn"
            size="xs"
            variant="primary"
            (click)="onCopy()"
            [disabled]="loading"
          >
            {{ copied ? 'Copied' : 'Copy' }}
          </i-button>
          }
        </div>
      </div>
      } @if (loading) {
      <div class="i-code-viewer-loading">Loading…</div>
      } @if (error) {
      <div class="i-code-viewer-error">{{ error }}</div>
      }

      <div class="i-code-viewer-body">
        @if (lineNumbers) {
        <div class="i-code-viewer-gutter" aria-hidden="true">
          @for (n of lineNumberList; track n) {
          <div class="i-code-viewer-line">{{ n }}</div>
          }
        </div>
        }

        <pre
          class="i-code-viewer-pre"
          [class.scroll]="scrollEffective"
          [class.scroll-y]="scrollEffective"
          [style.height.px]="heightPx"
        ><code
          #codeEl
          class="i-code-viewer-code"
          [attr.data-language]="effectiveLanguage"
          [innerHTML]="renderedHtml"
        ></code></pre>
      </div>
    </div>
  `,
})
export class ICodeViewer {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly http = inject(HttpClient);

  @ViewChild('codeEl', { static: false }) codeEl?: ElementRef<HTMLElement>;

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
    // manual code overrides rendered output immediately
    this._code = v ?? '';
    this.recompute();
  }
  get code(): string {
    return this._code;
  }

  @Input({ transform: coerceBool }) copy = true;
  @Input({ transform: coerceBool }) lineNumbers = false;
  @Input({ transform: coerceBool }) wrap = false;
  @Input({ transform: coerceBool }) compact = false;

  /** If true, enables your "scroll scroll-y" classes. Fixed height also forces scroll. */
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

  @Input() highlighter: ICodeHighlighter = 'auto';

  // Optional: emit when file loaded
  @Output() fileLoaded = new EventEmitter<{ file: string; language: string }>();

  // ===== State =====

  loading = false;
  error = '';
  renderedHtml = '';
  copied = false;
  lineNumberList: number[] = [];

  private requestSeq = 0;
  private _fileLanguage: string = 'text';

  // ===== Derived =====

  get heightPx(): number | null {
    return this._heightPx;
  }

  get scrollEffective(): boolean {
    return this.scroll || this._heightPx !== null;
  }

  get showHeader(): boolean {
    return !!this.title || this.copy;
  }

  get effectiveLanguage(): string {
    // explicit language wins
    if (this._languageOverride) return this._languageOverride;

    // if file provided, we infer from file extension
    if (this._file) return this._fileLanguage;

    // otherwise plain
    return 'text';
  }

  get languageLabel(): string {
    const l = (this.effectiveLanguage || 'text').toUpperCase();
    return l === 'TEXT' ? 'CODE' : l;
  }

  // ===== Core =====

  private recompute(): void {
    // line numbers
    if (this.lineNumbers) {
      const lines = this._code.length ? this._code.split('\n').length : 1;
      this.lineNumberList = Array.from({ length: lines }, (_, i) => i + 1);
    } else {
      this.lineNumberList = [];
    }

    this.renderedHtml = this.renderToHtml(this._code, this.effectiveLanguage);
    this.cdr.markForCheck();
  }

  private renderToHtml(raw: string, language: string): string {
    const text = raw ?? '';
    if (!text) return '';

    if (this.highlighter === 'none') return escapeHtml(text);

    const detected = detectGlobalHighlighter();
    const mode =
      this.highlighter === 'auto'
        ? detected.kind
        : this.highlighter === 'hljs' || this.highlighter === 'prism'
        ? this.highlighter
        : null;

    try {
      if (mode === 'hljs' && detected.kind === 'hljs') {
        const hljs = detected.api;
        if (language && hljs.getLanguage?.(language)) {
          return hljs.highlight(text, { language }).value;
        }
        return hljs.highlightAuto(text).value;
      }

      if (mode === 'prism' && detected.kind === 'prism') {
        const Prism = detected.api;
        const lang = Prism.languages?.[language] ?? Prism.languages?.plaintext;
        if (!lang) return escapeHtml(text);
        return Prism.highlight(text, lang, language);
      }
    } catch {
      // fallback
    }

    return escapeHtml(text);
  }

  private async loadFile(path: string): Promise<void> {
    const seq = ++this.requestSeq;

    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    // infer language from extension
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
  imports: [ICodeViewer],
  exports: [ICodeViewer],
})
export class ICodeViewerModule {}
