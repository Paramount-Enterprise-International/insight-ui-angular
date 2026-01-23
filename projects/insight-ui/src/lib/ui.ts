import { NgModule } from '@angular/core';

import { IButton } from './button';
import { ICardModule } from './card';
import { IDatepicker, IFCDatepicker } from './datepicker';
import { IDialogModule } from './dialog';
import { IGridModule } from './grid';
import { IIcon } from './icon';
import { IInputModule } from './input';
import { ILoading } from './loading';
import { ISectionModule } from './section';
import { IFCSelect, ISelect } from './select';
import { IFCTextArea, ITextArea } from './textarea';
import { ICodeViewerModule } from './code-viewer';
import { IHContent, IHSidebar } from './host';
import { IToggle } from './toggle';
import { IPill } from './pill/pill';

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
    IFCTextArea,
    IToggle,
    IPill,
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
    IFCTextArea,
    IToggle,
    IPill,
  ],
})
export class IUI {}
