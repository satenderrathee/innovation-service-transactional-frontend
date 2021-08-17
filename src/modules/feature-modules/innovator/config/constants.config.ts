import { FormEngineModel, FormEngineParameterModel } from '@shared-module/forms';

export const FIRST_TIME_SIGNIN_QUESTIONS: FormEngineModel[] = [
  new FormEngineModel({
    parameters: [
      {
        id: 'innovatorName',
        dataType: 'text',
        label: 'Welcome to the NHS innovation service!',
        description: 'What\'s your name?',
        validations: { isRequired: true }
      }
    ]
  }),

  new FormEngineModel({
    parameters: [
      {
        id: 'innovationName',
        dataType: 'text',
        label: 'What should we call your innovation?',
        validations: { isRequired: true }
      }
    ]
  }),

  new FormEngineModel({
    parameters: [
      {
        id: 'innovationDescription',
        dataType: 'textarea',
        label: 'Please provide a short description of your innovation',
        validations: { isRequired: true }
      }
    ]
  }),

  new FormEngineModel({
    parameters: [
      {
        id: 'isCompanyOrOrganisation',
        dataType: 'radio-group',
        label: 'Are you creating this innovation as part of a company or organisation?',
        validations: { isRequired: true },
        items: [
          {
            value: 'yes',
            label: 'Yes',
            conditional: new FormEngineParameterModel({ id: 'organisationName', dataType: 'text', label: 'Company or organisation name', validations: { isRequired: true } })
          },
          { value: 'no', label: 'No' }
        ]
      }
    ]
  }),

  new FormEngineModel({
    parameters: [
      {
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
      }
    ],
    visibility: {
      parameter: 'isCompanyOrOrganisation',
      values: ['yes']
    }
  }),

  new FormEngineModel({
    parameters: [
      {
        id: 'location',
        dataType: 'radio-group',
        label: 'Where are you based?',
        validations: { isRequired: true },
        items: [
          {
            value: 'England',
            label: 'England',
            conditional: new FormEngineParameterModel({ id: 'englandPostCode', dataType: 'text', label: 'First part of your postcode', description: 'For example SW1', validations: { isRequired: true } })
          },
          { value: 'Scotland', label: 'Scotland' },
          { value: 'Wales', label: 'Wales' },
          { value: 'Northern Ireland', label: 'Northern Ireland' },
          { value: '', label: 'SEPARATOR' },
          {
            value: 'Based outside UK',
            label: 'I\'m based outside of the UK',
            conditional: new FormEngineParameterModel({ id: 'locationCountryName', dataType: 'text', label: 'Country', validations: { isRequired: true } })
          },
        ]
      }
    ]
  }),

  new FormEngineModel({
    parameters: [
      {
        id: 'organisationShares',
        dataType: 'checkbox-array',
        label: 'Finally, choose your data sharing preferences',
        validations: { isRequired: true },
        items: []
      }
    ]
  }),

];
