import { TestBed } from '@angular/core/testing';
import { IImageCropper } from './image-cropper';
import { ImageCropperEngine } from './image-cropper-engine';
describe('IImageCropper interaction', () => {
  it('supports keyboard panning, readiness and disabled interaction', async () => {
    spyOn(ImageCropperEngine.prototype, 'load').and.callFake(async function (
      this: ImageCropperEngine,
    ) {
      const image = document.createElement('img');
      Object.defineProperties(image, {
        naturalWidth: { value: 400 },
        naturalHeight: { value: 300 },
      });
      this.image = image;
      return true;
    });
    TestBed.configureTestingModule({ imports: [IImageCropper] });
    const f = TestBed.createComponent(IImageCropper);
    const ready = jasmine.createSpy('ready');
    f.componentInstance.onReady.subscribe(ready);
    f.componentRef.setInput('src', 'blob:fixture');
    f.detectChanges();
    await f.whenStable();
    f.detectChanges();
    expect(ready).toHaveBeenCalledTimes(1);
    const pan = spyOn(f.componentInstance.engine, 'panBy').and.callThrough();
    const stage = f.nativeElement.querySelector('[role="group"]');
    stage.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(pan).toHaveBeenCalledWith(5, 0);
    f.componentRef.setInput('disabled', true);
    f.detectChanges();
    stage.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(pan).toHaveBeenCalledTimes(1);
    expect(f.nativeElement.querySelector('input').disabled).toBeTrue();
    expect(stage.getAttribute('tabindex')).toBe('-1');
  });
});
