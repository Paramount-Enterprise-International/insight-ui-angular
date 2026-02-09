import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUI } from '@insight/ui';

@Component({
  selector: 'ir-toggle',
  imports: [IUI, ReactiveFormsModule, CommonModule],
  templateUrl: './toggle.html',
  styleUrl: './toggle.scss',
})
export class Toggle {
  settingsForm: FormGroup;
  toggleState: boolean = false;
  ischeck: boolean = true;
  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      notifications: [true],
      darkMode: [false],
      autoSave: [true],
      analytics: [false],
    });
  }

  onToggleChange(event: any): void {
    this.toggleState = event;
  }
  onToggleTouched(): void {}
}
