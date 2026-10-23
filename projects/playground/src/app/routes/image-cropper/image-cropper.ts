import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { IBanner, IImageCropper, IUI } from '@insight/ui';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IUI, IBanner],
  templateUrl: './image-cropper.html',
})
export class ImageCropperDemo {
  @ViewChild(IImageCropper) cropper?: IImageCropper;
  private readonly cdr = inject(ChangeDetectorRef);
  ready = false;
  disabled = false;
  exported = '';
  error = '';
  readonly image =
    'data:image/svg+xml,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320">' +
        '<rect width="480" height="320" fill="#e0f2fe"/>' +
        '<circle cx="240" cy="160" r="100" fill="#2563eb"/></svg>',
    );
  async exportImage(mimeType: 'image/png' | 'image/jpeg'): Promise<void> {
    try {
      this.exported = (await this.cropper!.exportImage({ mimeType })).dataUrl;
      this.error = '';
    } catch {
      this.error = 'Unable to export image.';
    }
    this.cdr.markForCheck();
  }
}
