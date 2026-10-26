import { inject, Injectable, InjectionToken, signal } from '@angular/core';
import type { ISnackbarDefaults } from './snackbar.types';

export const I_SNACKBAR_DEFAULTS = new InjectionToken<ISnackbarDefaults>('I_SNACKBAR_DEFAULTS', {
  providedIn: 'root',
  factory: (): ISnackbarDefaults => ({}),
});

@Injectable({ providedIn: 'root' })
export class SnackbarSettings {
  readonly defaults = signal<ISnackbarDefaults>(inject(I_SNACKBAR_DEFAULTS));
}
