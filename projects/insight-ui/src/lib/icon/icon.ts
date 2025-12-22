/**
 * IIcon
 * Version: 1.0.0
 * <ic />
 */

import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

export const I_ICON_NAMES = {
  add: 'fa-solid fa-plus',
  'angle-down': 'fa-solid fa-angle-down',
  'angle-up': 'fa-solid fa-angle-up',
  'arrow-down': 'fa-solid fa-arrow-down',
  'arrow-up': 'fa-solid fa-arrow-up',
  back: 'fa-solid fa-chevron-left',
  bars: 'fa-solid fa-bars',
  cancel: 'fa-solid fa-xmark',
  calendar: 'fa-solid fa-calendar-days',

  check: 'fa-solid fa-check',
  'check-circle': 'fa-solid fa-circle-check',
  code: 'fa-solid fa-code',
  delete: 'fa-solid fa-trash',
  edit: 'fa-solid fa-pen',
  ellipsis: 'fa-solid fa-ellipsis',

  exclamation: 'fa-solid fa-circle-exclamation',
  'file-excel': 'fa-solid fa-file-excel',
  'file-pdf': 'fa-solid fa-file-pdf',
  'folder-open': 'fa-solid fa-folder-open',
  hashtag: 'fa-solid fa-hashtag',
  info: 'fa-solid fa-circle-info',

  'layer-group': 'fa-solid fa-layer-group',
  link: 'fa-solid fa-arrow-up-right-from-square',
  maximize: 'fa-solid fa-window-maximize',
  'map-marker': 'fa-solid fa-location-dot',
  next: 'fa-solid fa-chevron-right',
  prev: 'fa-solid fa-chevron-left',
  up: 'fa-solid fa-angle-up',
  down: 'fa-solid fa-angle-down',
  save: 'fa-solid fa-floppy-disk',
  signature: 'fa-solid fa-file-signature',
  'sort-asc': 'fa-solid fa-arrow-down-a-z',
  'sort-dsc': 'fa-solid fa-arrow-down-z-a',
  sync: 'fa-solid fa-arrows-rotate',

  tags: 'fa-solid fa-tags',
  user: 'fa-solid fa-user',
  users: 'fa-solid fa-users',
  unlock: 'fa-solid fa-unlock',
  upload: 'fa-solid fa-cloud-arrow-up',

  view: 'fa-solid fa-eye',
  x: 'fa-solid fa-xmark',
  'x-circle': 'fa-solid fa-circle-xmark',
} as const;

export const I_ICON_SIZES = {
  '2xs': 'i-icon-2xs',
  xs: 'i-icon-xs',
  sm: 'i-icon-sm',
  md: 'i-icon-md',
  lg: 'i-icon-lg',
  xl: 'i-icon-xl',
  '2xl': 'i-icon-2xl',
} as const;

export type IIconName = keyof typeof I_ICON_NAMES;
export type IIconSize = keyof typeof I_ICON_SIZES;

@Component({
  selector: 'ic',
  imports: [NgClass],
  template: `<i [ngClass]="iconClass"></i>`,
})
export class IIcon {
  @Input() icon!: IIconName | string;
  @Input() size: IIconSize = 'md';

  get iconSize() {
    return I_ICON_SIZES[this.size] || 'sm';
  }

  get iconClass() {
    return `${I_ICON_NAMES[this.icon as IIconName] || this.icon} ${this.iconSize}`;
  }
}
