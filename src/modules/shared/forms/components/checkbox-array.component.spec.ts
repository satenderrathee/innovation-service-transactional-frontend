import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomValidators } from '../validators/custom-validators';

import { FormCheckboxArrayComponent } from './checkbox-array.component';

@Component({
  template: `
  <form [formGroup]="form">
    <theme-form-checkbox-array [id]="id" [formArrayName]="formArrayName" [items]="items"></theme-form-checkbox-array>
  </form>`
})
class HostComponent {

  @ViewChild(FormCheckboxArrayComponent) childComponent?: FormCheckboxArrayComponent;

  form = new FormGroup({
    testField: new FormArray([
      new FormControl('value 1'),
      new FormControl('value 4')
    ])
  });

  id = 'FormInputId';
  formArrayName = 'testField';
  items = [
    { value: 'value 1', label: 'label 1' },
    { value: 'value 2', label: 'label 2' },
    { value: 'value 3', label: 'label 3' }
  ];

}


describe('FormCheckboxArrayComponent tests Suite', () => {

  let hostComponent: HostComponent;
  let hostFixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        HostComponent,
        FormCheckboxArrayComponent,
      ],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;

  });

  it('should create the component', () => {
    hostFixture.detectChanges();
    expect(hostComponent).toBeTruthy();
  });

  it('should create the component even with items undefined', () => {
    hostComponent.items = undefined as any;
    hostFixture.detectChanges();
    expect(hostComponent).toBeTruthy();
  });

  it('should form control field be invalid and with error and field touched', () => {
    hostFixture.detectChanges();

    hostComponent.form.get('testField')?.setValidators(CustomValidators.requiredCheckboxArray());
    hostComponent.form.get('testField')?.updateValueAndValidity();
    (hostComponent.form.get('testField') as FormArray)?.clear();
    hostComponent.form.get('testField')?.markAsTouched();
    hostFixture.detectChanges();

    expect(hostComponent.childComponent?.hasError).toBe(true);
    expect(hostComponent.childComponent?.errorMessage).toBe('shared.forms_module.validations.required');
  });

  it('should form control field be invalid and with error and field dirty', () => {
    hostFixture.detectChanges();

    hostComponent.form.get('testField')?.setValidators(CustomValidators.requiredCheckboxArray());
    hostComponent.form.get('testField')?.updateValueAndValidity();
    (hostComponent.form.get('testField') as FormArray)?.clear();
    hostComponent.form.get('testField')?.markAsDirty();
    hostFixture.detectChanges();

    expect(hostComponent.childComponent?.hasError).toBe(true);
    expect(hostComponent.childComponent?.errorMessage).toBe('shared.forms_module.validations.required');
  });

  it('should form control field change values well', () => {
    hostFixture.detectChanges();

    // Simulates user clicking on checkboxes.
    hostComponent.childComponent?.onChanged({ target: { value: 'value 1', checked: false } } as any);
    hostComponent.childComponent?.onChanged({ target: { value: 'value 2', checked: true } } as any);
    hostComponent.childComponent?.onChanged({ target: { value: 'value 3', checked: true } } as any);
    hostFixture.detectChanges();

    const expected = ['value 2', 'value 3'];
    expect(hostComponent.childComponent?.fieldArrayControl.value).toEqual(expected);

  });

});
