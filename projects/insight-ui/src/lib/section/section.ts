// section.ts
/**
 * ISection
 * Version: 1.0.1
 * <i-section>
 *   <i-section-header></i-section-header>
 *   <i-section-filter></i-section-filter>
 *   <i-section-body></i-section-body>
 *   <i-section-footer></i-section-footer>
 *   <i-section-tabs></i-section-tabs>
 * </i-section>
 */

import { Component, NgModule } from '@angular/core';
import { ISectionTab, ISectionTabContent, ISectionTabHeader, ISectionTabs } from './section-tabs';

@Component({
  selector: 'i-section',
  imports: [],
  template: `<ng-content />`,
})
export class ISection {}

@Component({
  selector: 'i-section-header',
  imports: [],
  template: `<h4><ng-content /></h4>`,
})
export class ISectionHeader {}

@Component({
  selector: 'i-section-sub-header',
  imports: [],
  template: `<h6><ng-content /></h6>`,
})
export class ISectionSubHeader {}

@Component({
  selector: 'i-section-filter',
  imports: [],
  template: `<ng-content />`,
})
export class ISectionFilter {}

@Component({
  selector: 'i-section-body',
  imports: [],
  template: `<ng-content />`,
})
export class ISectionBody {}

@Component({
  selector: 'i-section-footer',
  imports: [],
  template: `<ng-content />`,
})
export class ISectionFooter {}

@NgModule({
  imports: [
    ISection,
    ISectionHeader,
    ISectionSubHeader,
    ISectionFilter,
    ISectionBody,
    ISectionFooter,
    ISectionTabs,
    ISectionTab,
    ISectionTabHeader,
    ISectionTabContent,
  ],
  exports: [
    ISection,
    ISectionHeader,
    ISectionSubHeader,
    ISectionFilter,
    ISectionBody,
    ISectionFooter,
    ISectionTabs,
    ISectionTab,
    ISectionTabHeader,
    ISectionTabContent,
  ],
})
export class ISectionModule {}
