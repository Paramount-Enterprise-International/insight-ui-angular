import { NgModule } from '@angular/core';
import { IAlert } from './alert/alert';
import { IButton } from './button/button';
import { ICardModule } from './card/card';
import { IConfirm } from './confirm/confirm';
import { IDatepicker, IFCDatepicker } from './datepicker/datepicker';
import { IDialogModule } from './dialog/dialog';
import { IGridModule } from './grid/grid';
import { IIcon } from './icon/icon';
import { IInputModule } from './input/input';
import { ILoading } from './loading/loading';
import { ISectionModule } from './section/section';
import { IFCSelect, ISelect } from './select/select';
import { ITextArea } from './textarea/textarea';
import { IHContent } from './host/content/content';

@NgModule({
  imports: [
    IAlert,
    IButton,
    ICardModule,
    IConfirm,
    IDatepicker,
    IFCDatepicker,
    IDialogModule,
    IGridModule,
    IIcon,
    IInputModule,
    ILoading,
    ISectionModule,
    ISelect,
    IFCSelect,
    ITextArea,
    IHContent,
  ],
  exports: [
    IAlert,
    IButton,
    ICardModule,
    IConfirm,
    IDatepicker,
    IFCDatepicker,
    IDialogModule,
    IGridModule,
    IIcon,
    IInputModule,
    ILoading,
    ISectionModule,
    ISelect,
    IFCSelect,
    ITextArea,
    IHContent,
  ],
})
export class IUI {}
