import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  type IImageCropperExportOptions,
  type IImageCropperResult,
  ImageCropperEngine,
} from './image-cropper-engine';
@Component({
  selector: 'i-image-cropper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'i-image-cropper' },
  template: `
    <div
      class="i-image-cropper__stage"
      role="group"
      [attr.aria-busy]="loading"
      [attr.aria-disabled]="disabled"
      [attr.aria-label]="panLabel"
      [attr.tabindex]="disabled || !ready ? -1 : 0"
      [class.i-image-cropper__stage--circle]="shape === 'circle'"
      [style.height.px]="engine.size"
      [style.width.px]="engine.size"
      (keydown)="keydown($event)"
      (lostpointercapture)="panEnd()"
      (pointercancel)="panEnd()"
      (pointerdown)="panStart($event)"
      (pointermove)="panMove($event)"
      (pointerup)="panEnd()"
    >
      @if (ready) {
        <img
          class="i-image-cropper__image"
          draggable="false"
          [alt]="alt"
          [src]="src"
          [style.height]="engine.imageStyle?.height"
          [style.left]="engine.imageStyle?.left"
          [style.top]="engine.imageStyle?.top"
          [style.width]="engine.imageStyle?.width"
        />
      }
      <span aria-hidden="true" class="i-image-cropper__ring"></span>
    </div>
    <label class="i-image-cropper__zoom"
      ><span>{{ zoomLabel }}</span
      ><input
        step="0.05"
        type="range"
        [disabled]="disabled || !ready"
        [max]="engine.maxZoom"
        [min]="engine.minZoom"
        [value]="engine.zoom"
        (input)="zoomInput($event)"
    /></label>
  `,
})
export class IImageCropper implements OnChanges, OnDestroy {
  @Input() src: string | null | undefined = null;
  @Input() disabled = false;
  @Input() viewportSize = 240;
  @Input() shape: 'square' | 'circle' = 'square';
  @Input() minZoom = 1;
  @Input() maxZoom = 3;
  @Input() alt = 'Image crop preview';
  @Input() zoomLabel = 'Zoom';
  @Input() panLabel = 'Reposition image using arrow keys or drag';
  @Output() readonly onReady = new EventEmitter<void>();
  @Output() readonly onError = new EventEmitter<Error>();
  readonly engine = new ImageCropperEngine();
  ready = false;
  loading = false;
  private requestVersion = 0;
  private pointer: { x: number; y: number; id: number } | null = null;
  private readonly cdr = inject(ChangeDetectorRef);
  ngOnChanges(changes: SimpleChanges): void {
    this.engine.configure(this.viewportSize, this.minZoom, this.maxZoom);
    if (changes['src']) void this.load();
  }
  private async load(): Promise<void> {
    const version = ++this.requestVersion;
    this.ready = false;
    this.loading = Boolean(this.src);
    this.pointer = null;
    try {
      const ready = await this.engine.load(this.src);
      if (version !== this.requestVersion) return;
      this.ready = ready;
      if (ready) this.onReady.emit();
    } catch (error) {
      if (version === this.requestVersion)
        this.onError.emit(error instanceof Error ? error : new Error('Unable to load image.'));
    } finally {
      if (version === this.requestVersion) {
        this.loading = false;
        this.cdr.markForCheck();
      }
    }
  }
  zoomInput(event: Event): void {
    if (!this.disabled && this.ready)
      this.engine.setZoom(Number((event.target as HTMLInputElement).value));
  }
  panStart(event: PointerEvent): void {
    if (this.disabled || !this.ready || event.button !== 0) return;
    event.preventDefault();
    this.pointer = { x: event.clientX, y: event.clientY, id: event.pointerId };
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  }
  panMove(event: PointerEvent): void {
    if (this.disabled || !this.pointer || event.pointerId !== this.pointer.id) return;
    this.engine.panBy(event.clientX - this.pointer.x, event.clientY - this.pointer.y);
    this.pointer.x = event.clientX;
    this.pointer.y = event.clientY;
  }
  panEnd(): void {
    this.pointer = null;
  }
  keydown(event: KeyboardEvent): void {
    if (this.disabled || !this.ready) return;
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-5, 0],
      ArrowRight: [5, 0],
      ArrowUp: [0, -5],
      ArrowDown: [0, 5],
    };
    const move = delta[event.key];
    if (move) {
      event.preventDefault();
      this.engine.panBy(...move);
    }
  }
  async exportImage(options: IImageCropperExportOptions = {}): Promise<IImageCropperResult> {
    try {
      return await this.engine.exportImage(options);
    } catch (error) {
      if (this.ready && !(error instanceof DOMException && error.name === 'AbortError'))
        this.onError.emit(error instanceof Error ? error : new Error('Unable to export image.'));
      throw error;
    }
  }
  ngOnDestroy(): void {
    this.ready = false;
    ++this.requestVersion;
    this.engine.dispose();
  }
}
