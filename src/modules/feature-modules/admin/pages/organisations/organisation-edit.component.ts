import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CoreComponent } from '@app/base';
import { FormGroup } from '@app/base/forms';
import { MappedObjectType } from '@app/base/types';

import { AdminOrganisationsService } from '@modules/feature-modules/admin/services/admin-organisations.service';
import { FormEngineComponent, WizardEngineModel } from '@modules/shared/forms';
import { OrganisationsService } from '@modules/shared/services/organisations.service';

import { EDIT_ORGANISATION_UNIT_QUESTIONS } from './organisation-edit-unit.config';
import { EDIT_ORGANISATIONS_QUESTIONS } from './organisation-edit.config';


@Component({
  selector: 'app-admin-pages-organisations-organisations-edit',
  templateUrl: './organisation-edit.component.html'
})
export class PageOrganisationEditComponent extends CoreComponent implements OnInit {

  organisationId: string;
  unitId: string;
  submitBtnClicked = false;
  securityConfirmation = { id: '', code: '' };

  module: 'Organisation' | 'Unit';
  pageStep: 'RULES_LIST' | 'CODE_REQUEST' | 'SUCCESS' = 'RULES_LIST';

  form = new FormGroup({
    code: new UntypedFormControl('')
  }, { updateOn: 'blur' });

  wizard: WizardEngineModel = new WizardEngineModel({});

  @ViewChild(FormEngineComponent) formEngineComponent?: FormEngineComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminOrganisationsService: AdminOrganisationsService,
    private organisationsService: OrganisationsService
  ) {
    super();
    this.module = this.activatedRoute.snapshot.data.module;
    this.organisationId = this.activatedRoute.snapshot.params.organisationId;
    this.unitId = this.activatedRoute.snapshot.params.organisationUnitId;

    switch (this.module) {
      case 'Organisation':
        this.wizard = new WizardEngineModel(EDIT_ORGANISATIONS_QUESTIONS);
        break;
      case 'Unit':
        this.wizard = new WizardEngineModel(EDIT_ORGANISATION_UNIT_QUESTIONS);
        break;
      default:
        break;
    }

    this.setPageTitle(`Edit ${this.module}`);
  }

  ngOnInit(): void {
    this.organisationsService.getOrganisationInfo(this.organisationId).subscribe((organisation) => {
      const data = (this.module === 'Organisation') ? ({ name: organisation.name, acronym: organisation.acronym }) : organisation.organisationUnits.filter(unit => (unit.id === this.unitId))[0];
      this.wizard.gotoStep(1).setAnswers(this.wizard.runInboundParsing({ ...data })).runRules();
      this.setPageStatus('READY');
    },
      () => {
        this.setPageStatus('ERROR');
        this.alert = {
          type: 'ERROR',
          title: 'Unable to fetch organisations information',
          message: 'Please try again or contact us for further help'
        };
      }
    );

  }

  onSubmitStep(action: 'previous' | 'next'): void {

    const formData = this.formEngineComponent?.getFormValues() || { valid: false, data: {} };

    if (action === 'next' && !formData.valid) { // Don't move forward if step is NOT valid.
      return;
    }

    this.wizard.addAnswers(formData.data).runRules();

    switch (action) {
      case 'previous':
        if (this.wizard.isFirstStep()) { this.redirectTo(`organisations/${this.organisationId}`); }
        else { this.wizard.previousStep(); }
        break;
      case 'next':
        this.wizard.nextStep();
        break;
      default: // Should NOT happen!
        break;
    }

  }

  onSubmitWizard(): void {
    const body: MappedObjectType = this.wizard.runOutboundParsing();
    this.securityConfirmation.code = this.form.get('code')!.value;
    this.submitBtnClicked = true;

    switch (this.module) {
      case 'Organisation':
        this.adminOrganisationsService.updateOrganisation(body, this.securityConfirmation, this.organisationId).subscribe(
          response => {
            (response.organisationId) ?
              this.redirectTo(`admin/organisations/${response.organisationId}`, { alert: 'updateOrganisationSuccess' })
              : this.alert = { type: 'ERROR', title: 'Error updating organisation' };
            this.submitBtnClicked = false;
          },
          error => this.errorResponse(error)
        );
        break;
      case 'Unit':
        this.adminOrganisationsService.updateUnit(body, this.securityConfirmation, this.unitId, this.organisationId).subscribe({
          next: (response) => {
            if (response.unitId) {
              this.setRedirectAlertSuccess('You have successfully updated the organisation unit.');
            } else {
              this.setRedirectAlertError('Error updating unit')
            }
            this.redirectTo(`admin/organisations/${this.organisationId}/unit/${this.unitId}`);

            this.submitBtnClicked = false;
          },
          error: (err) => this.errorResponse(err)
        });
        break;
      default:
        break;
    }

  }

  errorResponse(error: { id: string }): void {
    this.submitBtnClicked = false;

    if (!this.securityConfirmation.id && error.id) {
      this.securityConfirmation.id = error.id;
      this.pageStep = 'CODE_REQUEST';

    } else {

      this.form.get('code')!.setErrors({ customError: true, message: 'The code is invalid. Please, verify if you are entering the code received on your email' });

    }

  }
}
