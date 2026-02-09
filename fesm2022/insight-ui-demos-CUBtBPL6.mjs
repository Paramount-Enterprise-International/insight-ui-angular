import * as i0 from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUI, ICard, ICardBody, ISection, ISectionBody } from './insight-ui.mjs';

class IRDemos {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IRDemos, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: IRDemos, isStandalone: true, selector: "ir-demos", ngImport: i0, template: "<i-section>\n  <i-section-body>\n    <div class=\"flex flex-col gap-md\">\n      <h1>Demos</h1>\n      <br />\n      <div class=\"flex flex-row flex-wrap gap-md\">\n        <i-card class=\"h-25 flex-fill\" routerLink=\"heracles\">\n          <i-card-body class=\"flex justify-center align-center\">Heracles</i-card-body>\n        </i-card>\n        <i-card class=\"h-25 flex-fill\" routerLink=\"work-order\">\n          <i-card-body class=\"flex justify-center align-center\">Work Order</i-card-body>\n        </i-card>\n      </div>\n    </div>\n  </i-section-body>\n</i-section>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: IUI }, { kind: "component", type: ICard, selector: "i-card", inputs: ["href", "routerLink", "queryParams", "fragment", "replaceUrl", "skipLocationChange", "state", "target", "rel", "disabled"], outputs: ["onClick"] }, { kind: "component", type: ICardBody, selector: "i-card-body" }, { kind: "component", type: ISection, selector: "i-section" }, { kind: "component", type: ISectionBody, selector: "i-section-body" }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IRDemos, decorators: [{
            type: Component,
            args: [{ selector: 'ir-demos', imports: [IUI, RouterLink], template: "<i-section>\n  <i-section-body>\n    <div class=\"flex flex-col gap-md\">\n      <h1>Demos</h1>\n      <br />\n      <div class=\"flex flex-row flex-wrap gap-md\">\n        <i-card class=\"h-25 flex-fill\" routerLink=\"heracles\">\n          <i-card-body class=\"flex justify-center align-center\">Heracles</i-card-body>\n        </i-card>\n        <i-card class=\"h-25 flex-fill\" routerLink=\"work-order\">\n          <i-card-body class=\"flex justify-center align-center\">Work Order</i-card-body>\n        </i-card>\n      </div>\n    </div>\n  </i-section-body>\n</i-section>\n" }]
        }] });

export { IRDemos };
//# sourceMappingURL=insight-ui-demos-CUBtBPL6.mjs.map
