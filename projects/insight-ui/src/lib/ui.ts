import { NgModule } from '@angular/core';
import { IActionPlaceholder } from './action-placeholder';
import { IAvatar } from './avatar';
import { IBanner } from './banner';
import { IButton } from './button';
import { ICardModule } from './card';
import { ICodeViewerModule } from './code-viewer';
import { IDatepicker, IFCDatepicker } from './datepicker';
import { IDialogModule } from './dialog';
import { IEmptyState } from './empty-state';
import { IErrorPage } from './error-page';
import { IGridModule } from './grid';
import { IHighlightSearch } from './highlight-search';
import { IHContent, IHSidebar } from './host';
import { IIcon } from './icon';
import { IImageCropper } from './image-cropper';
import { IInputModule } from './input';
import { ILoadError } from './load-error';
import { ILoading } from './loading';
import { ILoadingRegion } from './loading-region';
import { IPill } from './pill/pill';
import { ISectionModule } from './section';
import { IFCSelect, ISelect } from './select';
import { IFCTextArea, ITextArea } from './textarea';
import { IToggle } from './toggle';

@NgModule({
  imports: [
    IActionPlaceholder,
    IAvatar,
    IBanner,
    IButton,
    ICardModule,
    ICodeViewerModule,
    IDatepicker,
    IDialogModule,
    IEmptyState,
    IErrorPage,
    IFCDatepicker,
    IFCSelect,
    IFCTextArea,
    IGridModule,
    IHContent,
    IHighlightSearch,
    IHSidebar,
    IIcon,
    IImageCropper,
    IInputModule,
    ILoadError,
    ILoading,
    ILoadingRegion,
    IPill,
    ISectionModule,
    ISelect,
    ITextArea,
    IToggle,
  ],
  exports: [
    IActionPlaceholder,
    IAvatar,
    IBanner,
    IButton,
    ICardModule,
    ICodeViewerModule,
    IDatepicker,
    IDialogModule,
    IEmptyState,
    IErrorPage,
    IFCDatepicker,
    IFCSelect,
    IFCTextArea,
    IGridModule,
    IHContent,
    IHighlightSearch,
    IHSidebar,
    IIcon,
    IImageCropper,
    IInputModule,
    ILoadError,
    ILoading,
    ILoadingRegion,
    IPill,
    ISectionModule,
    ISelect,
    ITextArea,
    IToggle,
  ],
})
export class IUI {}
