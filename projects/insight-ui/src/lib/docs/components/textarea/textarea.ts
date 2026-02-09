import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUI } from '../../../ui';
import { IFCTextArea } from '../../../textarea';

@Component({
  selector: 'ir-textarea',
  imports: [IUI, IFCTextArea, ReactiveFormsModule],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
})
export class IRTextarea {
  formBuilder: FormBuilder = inject(FormBuilder);
  basicFormControl1 = new FormControl('', [Validators.required]);
  basicFormGroup: FormGroup = this.formBuilder.group({
    basicFormControl1: this.basicFormControl1,
  });
}
