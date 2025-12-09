import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { IButton, IButtonVariant } from '../button/button';
import { IIcon } from '../icon/icon';
import { ILoading } from '../loading/loading';

export type IInputAddonKind = 'icon' | 'text' | 'button' | 'link' | 'loading';

export type IInputAddonType = {
  type: IInputAddonKind;
};

export type IInputAddonLoading = {
  type: 'loading';
  visible?: boolean;
} & IInputAddonType;

export type IInputAddonIcon = {
  type: 'icon';
  icon: string;
  visible?: boolean;
} & IInputAddonType;

export type IInputAddonText = {
  type: 'text';
  text: string;
  visible?: boolean;
} & IInputAddonType;

export type IInputAddonButton = {
  type: 'button';
  icon: string;
  onClick?: () => void;
  visible?: boolean;
  variant?: IButtonVariant;
} & IInputAddonType;

export type IInputAddonLink = {
  type: 'link';
  icon: string;
  href?: string;
  visible?: boolean;
  variant?: IButtonVariant;
} & IInputAddonType;

export type IInputAddons =
  | IInputAddonLoading
  | IInputAddonIcon
  | IInputAddonText
  | IInputAddonButton
  | IInputAddonLink;

@Component({
  selector: 'i-input-addon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IButton, IIcon, ILoading],
  template: `
    @if (!addon || addon.visible === false) {
      <!-- render nothing -->
    } @else if (addon.type === 'button') {
      <i-button
        type="button"
        size="xs"
        [icon]="addon.icon"
        [variant]="addon.variant ?? 'primary'"
        (onClick)="addon.onClick ? addon.onClick() : null">
      </i-button>
    } @else if (addon.type === 'link') {
      <a
        class="i-btn i-btn-xs"
        [href]="addon.href"
        [attr.variant]="addon.variant ?? 'primary'"
        target="_blank">
        <ic [icon]="addon.icon" size="xs" />
      </a>
    } @else if (addon.type === 'icon') {
      <ic [icon]="addon.icon" size="sm" />
    } @else if (addon.type === 'loading') {
      <i-loading label=""></i-loading>
    } @else {
      <!-- text -->
      <span>{{ addon.text }}</span>
    }
  `,
})
export class IInputAddon {
  @Input({ required: true }) addon!: IInputAddons | undefined;

  @HostBinding('attr.kind')
  get addonKind(): string {
    return this.addon?.type + '';
  }
}
