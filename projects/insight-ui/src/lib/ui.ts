import { NgModule } from '@angular/core';

import { IAvatar } from './avatar';
import { IButton } from './button';
import { ICardModule } from './card';
import { ICodeViewerModule } from './code-viewer';
import { IDatepicker, IFCDatepicker } from './datepicker';
import { IDialogModule } from './dialog';
import { IGridModule } from './grid';
import { IHContent, IHSidebar } from './host';
import { IIcon } from './icon';
import { IInputModule } from './input';
import { ILoading } from './loading';
import { IPill } from './pill/pill';
import { ISectionModule } from './section';
import { IFCSelect, ISelect } from './select';
import { IFCTextArea, ITextArea } from './textarea';
import { IToggle } from './toggle';

@NgModule({
  imports: [
    IAvatar,
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
    IAvatar,
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
