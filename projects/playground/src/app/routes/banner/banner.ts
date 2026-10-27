import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import {
  IBanner,
  type IBannerVariant,
  type ISnackbarPosition,
  ISnackbarService,
  IUI,
} from '@insight/ui';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IUI, IBanner],
  templateUrl: './banner.html',
})
export class BannerDemo {
  readonly variants: IBannerVariant[] = [
    'neutral',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];
  readonly snackbar = inject(ISnackbarService);
  readonly positions: ISnackbarPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];
  private readonly snackbarIds = new Set<string>();
  snackOpen = false;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      for (const id of this.snackbarIds) this.snackbar.dismiss(id);
      this.snackbar.configure({});
    });
  }
  showSnackbar(
    position: ISnackbarPosition = 'bottom-right',
    variant: IBannerVariant = 'neutral',
  ): void {
    this.snackbarIds.add(
      this.snackbar.show(position + ' snackbar', { position, variant, actionLabel: 'Done' }).id,
    );
  }
  showPersistentSnackbar(): void {
    const id = 'snackbar-demo-fixed';
    this.snackbarIds.add(id);
    this.snackbar.show('This message stays until dismissed.', {
      id,
      durationMs: 0,
      title: 'Persistent snackbar',
    });
  }
  updateSnackbar(): void {
    this.snackbar.update('snackbar-demo-fixed', {
      message: 'Updated using the same ID.',
      variant: 'info',
      durationMs: 5000,
    });
  }
  open = true;
  count = 0;
  closed = 0;
}
