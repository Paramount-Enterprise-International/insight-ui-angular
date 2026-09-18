import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { IButton } from '../button/button';
import { IIcon } from '../icon/icon';
import { ISection, ISectionBody } from '../section/section';
import {
  I_ERROR_PAGE_ACTIONS,
  I_ERROR_PAGE_PRESETS,
  I_ERROR_PAGE_SUPPORT_EMAIL,
  type IErrorPageAction,
  type IErrorPageKind,
  type IErrorPageMode,
} from './error-page.types';

@Component({
  selector: 'i-error-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, IButton, IIcon, ISection, ISectionBody],
  host: {
    class: 'i-error-page',
    '[class.i-error-page--not-found]': 'kind === "not-found"',
    '[class.i-error-page--fullpage]': 'mode === "fullpage"',
  },
  template: `
    @if (mode === 'contained') {
      <i-section class="i-error-page__section">
        <i-section-body class="i-error-page__body">
          <ng-container [ngTemplateOutlet]="content" />
        </i-section-body>
      </i-section>
    } @else {
      <div class="i-error-page__body">
        <ng-container [ngTemplateOutlet]="content" />
      </div>
    }

    <ng-template #content>
      <div class="i-error-page__content text-center">
        @if (resolved.icon || resolved.code) {
          <div class="i-error-page__visual">
            @if (resolved.icon) {
              <i-icon aria-hidden="true" size="4xl" [icon]="resolved.icon" />
            }
            @if (resolved.code) {
              <span class="i-error-page__code font-bold leading-none">
                {{ resolved.code }}
              </span>
            }
          </div>
        }
        @if (resolved.title) {
          <h1 class="m-0 text-3xl font-normal">{{ resolved.title }}</h1>
        }
        <div class="i-error-page__message text-md text-subtle leading-relaxed">
          @if (resolved.description) {
            <p class="m-0 text-subtle leading-relaxed">{{ resolved.description }}</p>
          }
          <div class="i-error-page__extra"><ng-content /></div>
          @if (supportEmail) {
            <p class="m-0 text-subtle leading-relaxed">
              {{ supportLabel }}
              <a
                class="i-error-page__support text-primary font-medium underline"
                [href]="'mailto:' + supportEmail"
                >{{ supportEmail }}</a
              >
            </p>
          }
        </div>
        <div class="i-error-page__actions">
          @for (action of actions; track $index) {
            <i-button
              type="button"
              [icon]="actionPresets[action].icon"
              [variant]="actionPresets[action].variant"
              (onClick)="onAction.emit(action)"
              >{{ actionPresets[action].label }}</i-button
            >
          }
          <ng-content select="[iErrorPageActions]" />
        </div>
      </div>
    </ng-template>
  `,
})
export class IErrorPage {
  @Input() kind: IErrorPageKind = 'not-found';
  @Input() mode: IErrorPageMode = 'contained';
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() icon: string | undefined;
  @Input() code: string | undefined;
  @Input() supportEmail = I_ERROR_PAGE_SUPPORT_EMAIL;
  @Input() actions: readonly IErrorPageAction[] = [];
  @Output() readonly onAction = new EventEmitter<IErrorPageAction>();

  protected readonly actionPresets = I_ERROR_PAGE_ACTIONS;

  protected get supportLabel(): string {
    return this.kind === 'application-access-denied'
      ? 'Please contact the IT Administrator to register your access:'
      : 'For assistance, please contact:';
  }

  protected get resolved(): { title: string; description: string; icon: string; code: string } {
    const preset = I_ERROR_PAGE_PRESETS[this.kind];
    return {
      title: this.title ?? preset.title,
      description: this.description ?? preset.description,
      icon: this.icon ?? preset.icon,
      code: this.code ?? preset.code,
    };
  }
}
