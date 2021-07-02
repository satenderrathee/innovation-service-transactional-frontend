import { Component, Input, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef, Injector, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AbstractControl, ControlContainer, FormArray, FormControl } from '@angular/forms';

import { RandomGeneratorHelper } from '@modules/core';

import { FormEngineHelper } from '../engine/helpers/form-engine.helper';

import { FormEngineParameterModel } from '../engine/models/form-engine.models';


@Component({
  selector: 'theme-form-checkbox-array',
  templateUrl: './checkbox-array.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCheckboxArrayComponent implements OnInit, DoCheck {

  @Input() id?: string;
  @Input() arrayName = '';
  @Input() label?: string;
  @Input() description?: string;
  @Input() items: FormEngineParameterModel['items'] = [];
  @Output() customOnChangeFunc = new EventEmitter<{ checked: boolean, item: string }>();
  hasError = false;
  errorMessage = '';

  isRunningOnBrowser: boolean;
  isRunningOnServer: boolean;

  // Return parent FormGroup (or FormArray) instance.
  get parentFieldControl(): AbstractControl | null { return this.injector.get(ControlContainer).control; }
  get fieldArrayControl(): FormArray { return this.parentFieldControl?.get(this.arrayName) as FormArray; }
  get fieldArrayValues(): string[] { return this.fieldArrayControl.value as string[]; }

  conditionalFormControl(f: string): FormControl { return this.parentFieldControl?.get(f) as FormControl; }

  isConditionalFieldVisible(conditionalFieldId: string): boolean {
    return (this.items || []).filter(item => this.fieldArrayValues.includes(item.value) && item.conditional?.id === conditionalFieldId).length > 0;
  }

  isConditionalFieldError(f: string): boolean {
    const control = this.conditionalFormControl(f);
    return (control.invalid && (control.touched || control.dirty));
  }


  constructor(
    private injector: Injector,
    private cdr: ChangeDetectorRef
  ) {

    this.isRunningOnBrowser = isPlatformBrowser(injector.get(PLATFORM_ID));
    this.isRunningOnServer = isPlatformServer(injector.get(PLATFORM_ID));

    this.id = this.id || RandomGeneratorHelper.generateRandom();

  }


  ngOnInit(): void {

    // This will filter any value not available on the items variable.
    const itemsValues = (this.items || []).map(item => item.value);
    this.fieldArrayValues.forEach((item) => {
      if (!itemsValues.includes(item)) {
        const index = (this.fieldArrayControl.value as string[]).indexOf(item);
        this.fieldArrayControl.removeAt(index);
      }
    });

  }

  ngDoCheck(): void {

    this.hasError = (this.fieldArrayControl.invalid && (this.fieldArrayControl.touched || this.fieldArrayControl.dirty));
    this.errorMessage = this.hasError ? FormEngineHelper.getValidationMessage(this.fieldArrayControl.errors) : '';

    this.items?.filter(item => item.conditional).forEach(item => {

      if (item.conditional) {

        if (item.conditional.isVisible && this.isConditionalFieldVisible(item.conditional.id)) {
          this.conditionalFormControl(item.conditional.id).setValidators(FormEngineHelper.getParameterValidators(item.conditional));
        }
        else {
          this.conditionalFormControl(item.conditional.id).setValidators(null);
          this.conditionalFormControl(item.conditional.id).reset();
        }
        this.conditionalFormControl(item.conditional.id).updateValueAndValidity();

      }

    });

    this.cdr.detectChanges();

  }


  isChecked(value: string): boolean {
    return this.fieldArrayValues.includes(value);
  }

  onChanged(e: Event): void {

    const event = e.target as HTMLInputElement;
    const valueIndex = (this.fieldArrayControl.value as string[]).indexOf(event.value);

    if (event.checked && valueIndex === -1) {
      this.fieldArrayControl.push(new FormControl(event.value));
    }

    if (!event.checked && valueIndex > -1) {
      this.fieldArrayControl.removeAt(valueIndex);
    }

    this.customOnChangeFunc.emit({checked: event.checked, item: event.value});
  }

}
