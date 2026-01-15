import { NgModule } from '@angular/core';

import { IButton } from './button/button';
import { ICardModule } from './card/card';

import { IDatepicker, IFCDatepicker } from './datepicker/datepicker';
import { IDialogModule } from './dialog/dialog';
import { IGridModule } from './grid/grid';
import { IIcon } from './icon/icon';
import { IInputModule } from './input/input';
import { ILoading } from './loading/loading';
import { ISectionModule } from './section/section';
import { IFCSelect, ISelect } from './select/select';
import { ITextArea } from './textarea/textarea';
import { IHContent } from './host/content';
import { IHSidebar } from './host/sidebar';
import { ICodeViewerModule } from './code-viewer/code-viewer';

@NgModule({
  imports: [
    IButton,
    ICardModule,
    ICodeViewerModule,
    IDatepicker,
    IFCDatepicker,
    IDialogModule,
    IGridModule,
    IHContent,
    IHSidebar,
    IIcon,
    IInputModule,
    ILoading,
    ISectionModule,
    ISelect,
    IFCSelect,
    ITextArea,
  ],
  exports: [
    IButton,
    ICardModule,
    ICodeViewerModule,
    IDatepicker,
    IFCDatepicker,
    IDialogModule,
    IGridModule,
    IHContent,
    IHSidebar,
    IIcon,
    IInputModule,
    ILoading,
    ISectionModule,
    ISelect,
    IFCSelect,
    ITextArea,
  ],
})
export class IUI {}
