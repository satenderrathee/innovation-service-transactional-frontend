
import { AuthenticationModel } from '@modules/stores/authentication/authentication.models';

import { FormEngineModel, FormEngineParameterModel, WizardEngineModel, WizardSummaryType } from '@modules/shared/forms';


// Types.
type InboundPayloadType = Required<AuthenticationModel>['user'];

type StepPayloadType = {
  displayName: string,
  contactPreferences: string[],
  phoneTimePreferences: null | string,
  mobilePhone: null | string,
  contactDetails: null | string,
  isCompanyOrOrganisation: 'YES' | 'NO',
  organisationName: null | string,
  organisationSize: null | string,
  organisationAdditionalInformation: { id: string }
};

type OutboundPayloadType = {
  displayName: string,
  contactPreferences: null | string,
  phoneTimePreferences: null | string,
  mobilePhone: null | string,
  contactDetails: null | string,
  organisation?: {
    id: string,
    isShadow: boolean,
    name: null | string,
    size: null | string,
  }
};


export const ACCOUNT_DETAILS_INNOVATOR: WizardEngineModel = new WizardEngineModel({
  steps: [
    new FormEngineModel({
      parameters: [{
        id: 'displayName',
        dataType: 'text',
        label: 'What\'s your full name?',
        validations: { isRequired: [true, 'Name is required'] }
      }]
    }),
    
    new FormEngineModel({
      parameters: [{ 
        id: 'contactPreferences', 
        dataType: 'checkbox-array', 
        label: 'If we have any questions about your innovation, how do you want us to contact you?',
        description: 'Select your preferred ways of contact',
        items: [
          {
            value: 'Phone',
            label: 'By phone',
            conditional: new FormEngineParameterModel({ 
              id: 'phoneTimePreferences', 
              dataType: 'radio-group',
              label: 'Select the best time to reach you on week days (UK time)',
              validations: { isRequired: [true, 'Choose one option'] },
              items: [{
                value: '9am to 12pm',
                label: 'Morning, 9am to 12pm',
              }, {
                value: '1pm to 5pm',
                label: 'Afternoon, 1pm to 5pm'
              }, {
                value: '9am to 12pm or 1pm to 5pm',
                label: 'Either'
              }]
            })
          },
          { value: 'Email', label: 'By email' }
        ]
      }]
    }),

    new FormEngineModel({
      parameters: [{ 
        id: 'mobilePhone', 
        dataType: 'number', 
        label: 'What is your phone number?',
        description: 'If you would like to be contacted by phone about your innovation, please provide a contact number.',
      }]
    }),

    new FormEngineModel({
      parameters: [{ 
        id: 'contactDetails', 
        dataType: 'textarea', 
        label: 'Is there anything else we should know about communicating with you?',
        description: 'For example, non-working days, visual or hearing impairments, or other accessibility needs.',
        lengthLimit: 'small',
      }]
    }),

    new FormEngineModel({

      parameters: [{
        id: 'isCompanyOrOrganisation',
        dataType: 'radio-group',
        label: 'Are you creating this innovation as part of a company or organisation?',
        validations: { isRequired: [true, 'Choose one option'] },
        items: [
          {
            value: 'YES',
            label: 'Yes',
            conditional: new FormEngineParameterModel({ id: 'organisationName', dataType: 'text', label: 'Company or organisation name', validations: { isRequired: true, maxLength: 100 } })
          },
          { value: 'NO', label: 'No' }
        ]
      }]
    })

  ],
  runtimeRules: [(steps: FormEngineModel[], data: StepPayloadType, currentStep: number | 'summary') => runtimeRules(steps, data, currentStep)],
  inboundParsing: (data: InboundPayloadType) => inboundParsing(data),
  outboundParsing: (data: StepPayloadType) => outboundParsing(data),
  summaryParsing: (data: StepPayloadType) => summaryParsing(data)
});


function runtimeRules(steps: FormEngineModel[], data: StepPayloadType, currentStep: number | 'summary'): void {

  steps.splice(4);

  if (data.isCompanyOrOrganisation === 'NO') {
    data.organisationName = null;
    data.organisationSize = null;
    return;
  }

  steps.push(
    new FormEngineModel({
      parameters: [{
        id: 'organisationSize',
        dataType: 'radio-group',
        label: 'What\'s the size of your company or organisation?',
        validations: { isRequired: [true, 'Organisation size is required'] },
        items: [
          { value: '1 to 5 employees', label: '1 to 5 employees' },
          { value: '6 to 25 employees', label: '6 to 25 employees' },
          { value: '26 to 100 employees', label: '26 to 100 employees' },
          { value: 'More than 100 employees', label: 'More than 100 employees' }
        ]
      }]
    })
  );

}

function inboundParsing(data: InboundPayloadType): StepPayloadType {

  return {
    displayName: data.displayName,
    contactPreferences: data.contactPreferences?.split(',') ?? [],
    phoneTimePreferences: data.phoneTimePreferences,
    mobilePhone: data.phone,
    contactDetails: data.contactDetails,
    isCompanyOrOrganisation: !data.organisations[0].isShadow ? 'YES' : 'NO',
    organisationName: data.organisations[0].name,
    organisationSize: data.organisations[0].size,
    organisationAdditionalInformation: {
      id: data.organisations[0].id
    }
  };

}


function outboundParsing(data: StepPayloadType): OutboundPayloadType {

  return {
    displayName: data.displayName,
    contactPreferences: data.contactPreferences.toString(),
    mobilePhone: data.mobilePhone,
    phoneTimePreferences: data.phoneTimePreferences,
    contactDetails: data.contactDetails,
    organisation: {
      id: data.organisationAdditionalInformation.id,
      isShadow: data.isCompanyOrOrganisation === 'NO',
      name: data.organisationName,
      size: data.organisationSize,
    }
  };

}

function summaryParsing(data: StepPayloadType): WizardSummaryType[] {

  const toReturn: WizardSummaryType[] = [];

  toReturn.push(
    { label: 'Name', value: data.displayName, editStepNumber: 1 },
    { label: 'Contact Preference', value: getContactPreferenceValue(data), editStepNumber: 2, },
    { label: 'Phone number', value: data.mobilePhone, editStepNumber: 3, },
    { label: 'Contact details', value: data.contactDetails, editStepNumber: 4, },
    { label: 'Is company or organisation?', value: data.isCompanyOrOrganisation === 'YES' ? 'Yes' : 'No', editStepNumber: 5 }
  );

  if (data.isCompanyOrOrganisation === 'YES') {

    toReturn.push(
      { label: 'Company', value: data.organisationName, editStepNumber: 5 },
      { label: 'Company size', value: data.organisationSize, editStepNumber: 6 }
    );

  }

  return toReturn;

}

function getContactPreferenceValue(data: StepPayloadType): string {
  
  if (data.contactPreferences.length > 0) {    
    return data.contactPreferences.join(' ').replace('Email', 'By email.').replace('Phone', `By phone, ${data.phoneTimePreferences}.`);
  }

  return '';
}
