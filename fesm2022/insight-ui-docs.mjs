const componentsRoutes = [
    {
        path: 'components',
        data: {
            title: 'Components',
        },
        children: [
            {
                path: '',
                loadComponent: () => import('./insight-ui-docs-components-DMf7a3VU.mjs').then((c) => c.IRComponents),
                data: {
                    title: '',
                },
            },
            {
                path: 'button',
                loadComponent: () => import('./insight-ui-docs-button-DmQZh-W7.mjs').then((c) => c.IRButton),
                data: {
                    title: 'Button',
                },
            },
            {
                path: 'card',
                loadComponent: () => import('./insight-ui-docs-card-Osx59VSn.mjs').then((c) => c.IRCard),
                data: {
                    title: 'Card',
                },
            },
            {
                path: 'datepicker',
                loadComponent: () => import('./insight-ui-docs-datepicker-DC96L8HG.mjs').then((c) => c.Datepicker),
                data: {
                    title: 'Pill',
                },
            },
            {
                path: 'dialog',
                loadComponent: () => import('./insight-ui-docs-dialog-DM5DJV4u.mjs').then((c) => c.IRDialog),
                data: {
                    title: 'Dialog',
                },
            },
            {
                path: 'grid',
                loadComponent: () => import('./insight-ui-docs-grid-DbUIQQ_A.mjs').then((c) => c.IRGrid),
                data: {
                    title: 'Grid',
                },
            },
            {
                path: 'icon',
                loadComponent: () => import('./insight-ui-docs-icon-CdJ9IHkp.mjs').then((c) => c.IRIcon),
                data: {
                    title: 'Icon',
                },
            },
            {
                path: 'input',
                loadComponent: () => import('./insight-ui-docs-input-DqVKbDbC.mjs').then((c) => c.IRInput),
                data: {
                    title: 'Input',
                },
            },
            {
                path: 'loading',
                loadComponent: () => import('./insight-ui-docs-loading-DRthNCXp.mjs').then((c) => c.IRLoading),
                data: {
                    title: 'Loading',
                },
            },
            {
                path: 'section',
                loadComponent: () => import('./insight-ui-docs-section-DjE5L9_M.mjs').then((c) => c.IRSection),
                data: {
                    title: 'Section',
                },
            },
            {
                path: 'select',
                loadComponent: () => import('./insight-ui-docs-select-D84up6kV.mjs').then((c) => c.IRSelect),
                data: {
                    title: 'Select',
                },
            },
            {
                path: 'textarea',
                loadComponent: () => import('./insight-ui-docs-textarea-ASV0_8o8.mjs').then((c) => c.IRTextarea),
                data: {
                    title: 'Textarea',
                },
            },
            {
                path: 'toggle',
                loadComponent: () => import('./insight-ui-docs-toggle-DoVRHh8Q.mjs').then((c) => c.Toggle),
                data: {
                    title: 'Toggle',
                },
            },
            {
                path: 'pill',
                loadComponent: () => import('./insight-ui-docs-pill-CNV83D1T.mjs').then((c) => c.Pill),
                data: {
                    title: 'Pill',
                },
            },
        ],
    },
];

const demosRoutes = [
    {
        path: 'demos',
        data: {
            title: 'Demos',
        },
        children: [
            {
                path: '',
                loadComponent: () => import('./insight-ui-docs-demos-CVB0YwaD.mjs').then((c) => c.IRDemos),
                data: {
                    title: '',
                },
            },
            {
                path: 'heracles',
                loadComponent: () => import('./insight-ui-docs-heracles-CBb8yKPz.mjs').then((c) => c.IRHeracles),
                data: {
                    title: 'Heracles',
                },
            },
            {
                path: 'work-order',
                loadComponent: () => import('./insight-ui-docs-work-order-BhvXBloM.mjs').then((c) => c.WorkOrder),
                data: {
                    title: 'Work Order',
                },
            },
        ],
    },
];

const guideRoutes = [
    {
        path: 'guide',
        loadComponent: () => import('./insight-ui-docs-guide-BJk9iSIt.mjs').then((c) => c.IRGuide),
        data: {
            title: '',
        },
    },
];

const utilitiesRoutes = [
    {
        path: 'utilities',
        data: {
            title: 'Utilities',
        },
        children: [
            {
                path: '',
                loadComponent: () => import('./insight-ui-docs-utilities-C5TexDGM.mjs').then((c) => c.IRUtilities),
                data: {
                    title: '',
                },
            },
            {
                path: 'background-color',
                loadComponent: () => import('./insight-ui-docs-background-color-B1JXY7MD.mjs').then((c) => c.IRUtilitiesBackgroundColor),
                data: {
                    title: 'Background Color',
                },
            },
            {
                path: 'border',
                loadComponent: () => import('./insight-ui-docs-border-B0JvNwRC.mjs').then((c) => c.IRUtilitiesBorder),
                data: {
                    title: 'Border',
                },
            },
            {
                path: 'display',
                loadComponent: () => import('./insight-ui-docs-display-DF90rF-0.mjs').then((c) => c.IRUtilitiesDisplay),
                data: {
                    title: 'Display',
                },
            },
            {
                path: 'flex',
                loadComponent: () => import('./insight-ui-docs-flex-DCKF5vIC.mjs').then((c) => c.IRUtilitiesFlex),
                data: {
                    title: 'Flex',
                },
            },
            {
                path: 'height',
                loadComponent: () => import('./insight-ui-docs-height-FrpHuEzO.mjs').then((c) => c.IRUtilitiesHeight),
                data: {
                    title: 'Height',
                },
            },
            {
                path: 'margin',
                loadComponent: () => import('./insight-ui-docs-margin-BJ2A_y7S.mjs').then((c) => c.IRUtilitiesMargin),
                data: {
                    title: 'Margin',
                },
            },
            {
                path: 'object-fit',
                loadComponent: () => import('./insight-ui-docs-object-fit-Dma89w_h.mjs').then((c) => c.IRUtilitiesObjectFit),
                data: {
                    title: 'Object Fit',
                },
            },
            {
                path: 'padding',
                loadComponent: () => import('./insight-ui-docs-padding-CTxPPzUs.mjs').then((c) => c.IRUtilitiesPadding),
                data: {
                    title: 'Padding',
                },
            },
            {
                path: 'scroll',
                loadComponent: () => import('./insight-ui-docs-scroll-BNZEEnPL.mjs').then((c) => c.IRUtilitiesScroll),
                data: {
                    title: 'Scroll',
                },
            },
            {
                path: 'typography',
                loadComponent: () => import('./insight-ui-docs-typography-BysBb4K3.mjs').then((c) => c.IRUtilitiesTypography),
                data: {
                    title: 'Typpgraphy',
                },
            },
            {
                path: 'width',
                loadComponent: () => import('./insight-ui-docs-width-CKhh55I5.mjs').then((c) => c.IRUtilitiesWidth),
                data: {
                    title: 'Width',
                },
            },
        ],
    },
];

const variablesRoutes = [
    {
        path: 'variables',
        data: {
            title: 'Variables',
        },
        children: [
            {
                path: '',
                loadComponent: () => import('./insight-ui-docs-variables-Bb5_AAmK.mjs').then((c) => c.IRVariables),
                data: {
                    title: '',
                },
            },
            {
                path: 'border',
                loadComponent: () => import('./insight-ui-docs-border-D62GZcee.mjs').then((c) => c.IRVariableBorder),
                data: {
                    title: 'Border',
                },
            },
            {
                path: 'color',
                loadComponent: () => import('./insight-ui-docs-color-CbVfECcI.mjs').then((c) => c.IRVariableColor),
                data: {
                    title: 'Color',
                },
            },
            {
                path: 'elevation',
                loadComponent: () => import('./insight-ui-docs-elevation-BjshH9D6.mjs').then((c) => c.IRVariableElevation),
                data: {
                    title: 'Elevation',
                },
            },
            {
                path: 'icon-size',
                loadComponent: () => import('./insight-ui-docs-icon-size-C3EzFV5C.mjs').then((c) => c.IRVariableIconSize),
                data: {
                    title: 'Elevation',
                },
            },
            {
                path: 'opacity',
                loadComponent: () => import('./insight-ui-docs-opacity-B_TCd4aH.mjs').then((c) => c.IRVariableOpacity),
                data: {
                    title: 'Opacity',
                },
            },
            {
                path: 'radius',
                loadComponent: () => import('./insight-ui-docs-radius-DLxDBUqC.mjs').then((c) => c.IRVariableRadius),
                data: {
                    title: 'Opacity',
                },
            },
            {
                path: 'semantic',
                loadComponent: () => import('./insight-ui-docs-semantic-BA5Qs8CW.mjs').then((c) => c.Semantic),
                data: {
                    title: 'Semantic',
                },
            },
            {
                path: 'shadow',
                loadComponent: () => import('./insight-ui-docs-shadow-D_lRibS-.mjs').then((c) => c.Shadow),
                data: {
                    title: 'Shadow',
                },
            },
            {
                path: 'spacing',
                loadComponent: () => import('./insight-ui-docs-spacing-DbAKtC_a.mjs').then((c) => c.Spacing),
                data: {
                    title: 'Spacing',
                },
            },
            {
                path: 'typography',
                loadComponent: () => import('./insight-ui-docs-typography-49Rd62UT.mjs').then((c) => c.Typography),
                data: {
                    title: 'Typography',
                },
            },
            {
                path: '',
                redirectTo: 'border',
                data: {
                    title: 'Border',
                },
                pathMatch: 'full',
            },
        ],
    },
];

const stylesRoutes = [
    {
        path: 'styles',
        data: {
            title: 'Styles',
        },
        children: [
            {
                path: '',
                loadComponent: () => import('./insight-ui-docs-styles-BeqTkXGU.mjs').then((c) => c.IRStyles),
                data: {
                    title: '',
                },
            },
            ...utilitiesRoutes,
            ...variablesRoutes,
        ],
    },
];

const docsRoutes = [
    {
        path: '',
        loadComponent: () => import('./insight-ui-docs-docs-BP1HmleD.mjs').then((c) => c.IRDocs),
        data: {
            title: '',
        },
    },
    ...componentsRoutes,
    ...demosRoutes,
    ...guideRoutes,
    ...stylesRoutes,
];

/**
 * Generated bundle index. Do not edit.
 */

export { docsRoutes };
//# sourceMappingURL=insight-ui-docs.mjs.map
