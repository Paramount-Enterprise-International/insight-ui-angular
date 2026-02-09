import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IButton, ICodeViewer, IFCInput, IInput, ISectionModule } from '@insight/ui';

@Component({
  selector: 'ir-input',
  imports: [
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    RouterLink,
    IButton,
    ICodeViewer,
    ISectionModule,
    IInput,
    IFCInput,
  ],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class IRInput {
  formBuilder: FormBuilder = inject(FormBuilder);
  basicFormControl1 = new FormControl('', [Validators.required]);
  basicFormControl2 = new FormControl('');
  basicFormGroup: FormGroup = this.formBuilder.group({
    basicFormControl1: this.basicFormControl1,
    basicFormControl2: this.basicFormControl2,
  });

  inputAddonClick(): void {
    console.log('input 4 click 2');
  }
}
