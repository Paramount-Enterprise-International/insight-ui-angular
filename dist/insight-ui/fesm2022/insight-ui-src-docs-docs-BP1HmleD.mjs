import * as i0 from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as i1 from '@insight/ui';
import { IUI } from '@insight/ui';

class IRDocs {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IRDocs, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: IRDocs, isStandalone: true, selector: "ir-docs", ngImport: i0, template: "<i-section>\n  <i-section-body>\n    <div class=\"flex flex-col gap-md\">\n      <h1>Documentation</h1>\n      <p>Components, Styles and Demos</p>\n      <br />\n      <div class=\"flex flex-row flex-wrap gap-md\">\n        <i-card class=\"h-25 flex-fill\" routerLink=\"components\">\n          <i-card-body class=\"flex justify-center align-center\">Components</i-card-body>\n        </i-card>\n        <i-card class=\"h-25 flex-fill\" routerLink=\"styles\">\n          <i-card-body class=\"flex justify-center align-center\">Styles</i-card-body>\n        </i-card>\n        <i-card class=\"h-25 flex-fill\" routerLink=\"demos\">\n          <i-card-body class=\"flex justify-center align-center\">Demos</i-card-body>\n        </i-card>\n      </div>\n    </div>\n  </i-section-body>\n</i-section>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: IUI }, { kind: "component", type: i1.ICard, selector: "i-card", inputs: ["href", "routerLink", "queryParams", "fragment", "replaceUrl", "skipLocationChange", "state", "target", "rel", "disabled"], outputs: ["onClick"] }, { kind: "component", type: i1.ICardBody, selector: "i-card-body" }, { kind: "component", type: i1.ISection, selector: "i-section" }, { kind: "component", type: i1.ISectionBody, selector: "i-section-body" }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IRDocs, decorators: [{
            type: Component,
            args: [{ selector: 'ir-docs', imports: [IUI, RouterLink], template: "<i-section>\n  <i-section-body>\n    <div class=\"flex flex-col gap-md\">\n      <h1>Documentation</h1>\n      <p>Components, Styles and Demos</p>\n      <br />\n      <div class=\"flex flex-row flex-wrap gap-md\">\n        <i-card class=\"h-25 flex-fill\" routerLink=\"components\">\n          <i-card-body class=\"flex justify-center align-center\">Components</i-card-body>\n        </i-card>\n        <i-card class=\"h-25 flex-fill\" routerLink=\"styles\">\n          <i-card-body class=\"flex justify-center align-center\">Styles</i-card-body>\n        </i-card>\n        <i-card class=\"h-25 flex-fill\" routerLink=\"demos\">\n          <i-card-body class=\"flex justify-center align-center\">Demos</i-card-body>\n        </i-card>\n      </div>\n    </div>\n  </i-section-body>\n</i-section>\n" }]
        }] });

export { IRDocs };
//# sourceMappingURL=insight-ui-src-docs-docs-BP1HmleD.mjs.map
