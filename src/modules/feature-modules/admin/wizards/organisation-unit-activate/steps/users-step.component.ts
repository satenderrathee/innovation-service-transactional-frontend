import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CoreComponent, FormArray, FormControl, FormGroup } from '@app/base';
import { TableModel } from '@app/base/models';
import { CustomValidators, FormEngineHelper } from '@app/base/forms';
import { MappedObjectType, WizardStepComponentType, WizardStepEventType } from '@app/base/types';

import { UsersStepInputType, UsersStepOutputType } from './users-step.types';

import { GetOrganisationUnitUsersOutDTO, OrganisationsService } from '@modules/feature-modules/admin/services/organisations.service';
import { AccessorOrganisationRoleEnum } from '@modules/stores/authentication/authentication.enums';


@Component({
  selector: 'app-admin-wizards-organisation-unit-activate-users-step',
  templateUrl: './users-step.component.html'
})
export class WizardOrganisationUnitActivateUsersStepComponent extends CoreComponent implements WizardStepComponentType<UsersStepInputType, UsersStepOutputType>, OnInit {

  @Input() title = '';
  @Input() data: UsersStepInputType = {
    organisation: { id: '' },
    organisationUnit: { id: '', name: '' },
    agreeUsers: false,
    users: []
  };
  @Output() cancelEvent = new EventEmitter<WizardStepEventType<UsersStepOutputType>>();
  @Output() previousStepEvent = new EventEmitter<WizardStepEventType<UsersStepOutputType>>();
  @Output() nextStepEvent = new EventEmitter<WizardStepEventType<UsersStepOutputType>>();
  @Output() submitEvent = new EventEmitter<WizardStepEventType<UsersStepOutputType>>();


  tableList = new TableModel<GetOrganisationUnitUsersOutDTO['data'][0], { onlyActive: boolean }>({
    pageSize: 1000
  });

  form = new FormGroup({
    users: new FormArray([]),
    agreeUsers: new FormControl(false, CustomValidators.required('You need to confirm to proceed'))
  }, { updateOn: 'blur' });


  get fieldArrayControl(): FormArray { return this.form.get('users') as FormArray; }
  get usersArrayHasError(): boolean { return (this.fieldArrayControl.invalid && (this.fieldArrayControl.touched || this.fieldArrayControl.dirty)); }
  get usersArrayErrorMessage(): { message: string, params: MappedObjectType } { return this.usersArrayHasError ? FormEngineHelper.getValidationMessage(this.fieldArrayControl.errors) : { message: '', params: {} }; }


  constructor(
    private organisationsService: OrganisationsService
  ) {

    super();
    this.setPageTitle(this.title);

  }

  ngOnInit(): void {

    this.tableList.setVisibleColumns({
      name: { label: 'Name', orderable: false },
      role: { label: 'Role', orderable: false },
      isActive: { label: 'Active', orderable: false, align: 'right' }
    }).setFilters({ onlyActive: false });

    this.form.get('agreeUsers')!.setValue(this.data.agreeUsers);
    this.data.users.forEach(item => this.fieldArrayControl.push(new FormControl(item.id)));

    this.getUsersList();

  }


  getUsersList(): void {

    this.organisationsService.getOrganisationUnitUsers(this.data.organisation.id, this.data.organisationUnit.id, this.tableList.getAPIQueryParams()).subscribe(
      response => {
        this.tableList.setData(response.data, response.count);
        this.setPageStatus('READY');
      },
      () => {
        this.setPageStatus('ERROR');
        this.setAlertDataLoadError();
      }
    );

  }


  usersListCheckboxesIsChecked(value: string): boolean {
    return this.fieldArrayControl.value.includes(value);
  }

  usersListCheckboxesOnChanged(e: Event): void {

    const event = e.target as HTMLInputElement;
    const valueIndex = (this.fieldArrayControl.value as string[]).indexOf(event.value);

    if (event.checked && valueIndex === -1) {
      this.fieldArrayControl.push(new FormControl(event.value));
    }

    if (!event.checked && valueIndex > -1) {
      this.fieldArrayControl.removeAt(valueIndex);
    }

  }



  verifyOutputData(): { valid: boolean, data: WizardStepEventType<UsersStepOutputType> } {

    let hasError = false;

    if (!this.form.get('agreeUsers')!.value) { hasError = true; }

    const outputData = {
      isComplete: true,
      data: {
        agreeUsers: this.form.get('agreeUsers')!.value,
        users: (this.fieldArrayControl.value as string[])
          .map(item => this.tableList.getRecords().find(record => record.id === item))
          .filter(item => item)
          .map(item => ({
            id: item!.id,
            name: item!.name,
            organisationRole: item!.organisationRole
          }))
      }
    };

    if (!outputData.data.users.some(item => item.organisationRole === AccessorOrganisationRoleEnum.QUALIFYING_ACCESSOR)) {
      hasError = true;
      this.form.get('users')!.setErrors({ customError: true, message: 'You need to choose at least one Qualifying accessor' });
    }


    if (hasError) {
      this.form.markAllAsTouched();
      return { valid: false, data: outputData };
    }


    return { valid: true, data: outputData };

  }


  onPreviousStep(): void {

    const outputData = this.verifyOutputData();

    this.previousStepEvent.emit(outputData.data);

  }

  onNextStep(): void {

    const outputData = this.verifyOutputData();

    if (!outputData.valid) { return; }

    this.nextStepEvent.emit(outputData.data);

  }

}