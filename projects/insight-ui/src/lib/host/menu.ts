import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IHighlightSearchPipe } from '../highlight-search.pipe';

export type Menu = {
  menuId: number;
  menuName: string;
  route?: string | null;
  menuTypeId: number;
  parentId: number;
  sequence: number;
  icon?: string | null;
  child?: Menu[];
  level: number;
  visibility?: string;
  selected?: boolean;
  openInId?: number;
  versionCode?: string;
  applicationCode?: string;
  applicationUrl?: string;
};

@Component({
  selector: 'ih-menu',
  imports: [NgClass, RouterLink, IHighlightSearchPipe],
  template: `
    @if (menu) {
      @let hasChild = !!menu.child?.length;
      <li
        [class.is-module]="menu.menuTypeId === 2"
        [ngClass]="+menu.menuTypeId === 2 ? menu.visibility : ''"
      >
        @if (+menu.menuTypeId === 2) {
          <small [innerHTML]="menu.menuName | highlightSearch: filter"></small>
        } @else if (+menu.menuTypeId === 3) {
          @if (hasChild) {
            <!-- group with children -->
            <div (click)="click()">
              @if (menu.level > 0) {
                @for (i of [].constructor(menu.level); track i) {
                  <span></span>
                }
              }
              <i [class]="menu.icon"></i>
              <h6 [innerHTML]="menu.menuName | highlightSearch: filter"></h6>
              <i
                [ngClass]="menu.visibility === 'expanded' ? 'fas fa-angle-up' : 'fas fa-angle-down'"
              ></i>
            </div>
          } @else {
            <!-- leaf items: add #menuItem and is-selected -->
            @if (menu.applicationCode === 'INS5') {
              <a #menuItem [class.is-selected]="isSelected" [routerLink]="menu.route">
                @if (menu.level > 0) {
                  @for (i of [].constructor(menu.level); track i) {
                    <span></span>
                  }
                }
                <i [class]="menu.icon"></i>
                <h6 [innerHTML]="menu.menuName | highlightSearch: filter"></h6>
              </a>
            } @else {
              <a #menuItem [class.is-selected]="isSelected" [href]="menu.applicationUrl">
                @if (menu.level > 0) {
                  @for (i of [].constructor(menu.level); track i) {
                    <span></span>
                  }
                }
                <i [class]="menu.icon"></i>
                <h6 [innerHTML]="menu.menuName | highlightSearch: filter"></h6>
              </a>
            }
          }
        }

        @if (hasChild) {
          <ul [ngClass]="menu.menuTypeId === 3 ? menu.visibility : ''">
            @for (m of menu.child; track m.menuId) {
              <ih-menu [filter]="filter" [menu]="m" [selectedMenuId]="selectedMenuId" />
            }
          </ul>
        }
      </li>
    }
  `,
})
export class IHMenu implements OnChanges {
  @Input() menu: Menu | undefined;
  @Input() selectedMenuId: number | null = null;
  @Input() filter = '';

  @Output() readonly clicked = new EventEmitter<any>();
  @ViewChildren(IHMenu) menus!: QueryList<IHMenu>;

  // the actual clickable DOM element (only on leaf items)
  @ViewChild('menuItem', { static: false })
  menuItemRef!: ElementRef<HTMLElement>;

  @HostBinding('class.hidden') isHidden = false;

  /** only true for the *leaf* menu that matches selectedMenuId */
  get isSelected(): boolean {
    if (!this.menu) return false;

    const matchesId = this.menu.menuId === this.selectedMenuId;
    if (!matchesId) return false;

    const children = this.menu.child ?? [];
    const hasChildren = children.length > 0;

    // keep selection only on "leaf" items (same rule as flattenNavigableMenus)
    const isLeaf =
      +this.menu.menuTypeId === 3 && (!hasChildren || this.menu.visibility === 'no-child');

    return isLeaf;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // whenever selectedMenuId changes, scroll the selected item into view
    if (changes['selectedMenuId'] && this.isSelected && this.menuItemRef) {
      this.menuItemRef.nativeElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }

  click(): void {
    if (!this.menu) return;
    if (this.menu.visibility !== 'no-child') {
      if (this.menu.visibility === 'expanded') {
        this.menu.visibility = 'collapsed';
      } else {
        this.menu.visibility = 'expanded';
      }
    } else {
      this.clicked.emit(this.menu);
    }
  }
}
