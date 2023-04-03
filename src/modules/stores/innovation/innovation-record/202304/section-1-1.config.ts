import { FormEngineModel, FormEngineParameterModel, WizardEngineModel, WizardStepType, WizardSummaryType } from '@modules/shared/forms';

import { sectionType } from '../shared.types';

import { catalogOfficeLocation, catalogYesNo, InnovationSections } from './catalog.types';
import { DocumentType202304 } from './document.types';
import { areasItems, careSettingsItems, categoriesItems, countriesItems, involvedAACProgrammesItems, locationItems, mainPurposeItems } from './forms.config';


// Labels.
const stepsLabels = {
  q1: { label: 'What is the name of your innovation?', description: 'Enter the name of your innovation with a maximum of 100 characters' },
  q2: { label: 'Provide a short description of your innovation', description: 'Provide a high-level overview of your innovation. You will have the opportunity to explain its impact, target population, testing and revenue model later in the innovation record.' },
  q3: {
    label: 'Where is your head office located?',
    description: `<div>If your head office if overseas but you have a UK office, use the UK address.</div>
                  <div>If you are not part of a company or organisation, put where you are based.</div>
                  <div>We ask this to identify the organisations and people who are in the best position to support you.</div>`,
  },
  q4: { label: 'Please, insert the postcode' },
  q5: { label: 'Please, insert the country' },
  q6: { label: 'Does your innovation have a website?' },
  q7: { label: 'Select all the categories that can be used to describe your innovation' },
  q8: { label: 'Select a primary category to describe your innovation', description: 'Your innovation may be a combination of various categories. Selecting the primary category will help us find the right people to support you.' },
  q9: { label: 'Is your innovation relevant to any of the following areas?', description: 'We ask this to identify the organisations and people who are in the best position to support you.' },
  q10: { label: 'In which care settings is your innovation relevant?', description: 'We\'re asking this so that we can find the organisations and people who are in the best position to support you.' },
  q11: { label: 'What is the main purpose of your innovation?', description: 'We ask this to identify the organisations and people who are in the best position to support you.' },
  q12: {
    label: 'What support are you seeking from the Innovation Service?',
    description: `For example, support with:
    <ul class="nhsuk-list">
    <li>* adoption</li>
    <li>* health technology assessment</li>
    <li>* bringing your product to or from the UK</li>
    <li>* clinical trials and testing</li>
    <li>* commercial support and advice</li>
    <li>* procurement</li>
    <li>* product development and regulatory advice</li>
    <li>* real-world evidence and evaluation</li>
    <li>* understanding funding channels</li>
    </ul>
    You will have opportunity to explain how your innovation works and its benefits later in the record.`
  },
  q13: {
    label: 'Are you currently receiving any support for your innovation?',
    description: `This can include any UK funding to support the development of your innovation, or any support you are currently receiving from <a href="about-the-service/who-we-are#The%20organisations%20behind%20the%20service" target="_blank" rel="noopener noreferrer">NHS Innovation Service organisations (opens in new window)</a>.`
  },
  q14: { label: 'Are you involved with any Accelerated Access Collaborative programmes?' }
};


// Types.
type InboundPayloadType = DocumentType202304['INNOVATION_DESCRIPTION'];
type StepPayloadType = InboundPayloadType & { hasWebsite: catalogYesNo, officeLocation: catalogOfficeLocation, countryLocation: null | string[] };
type OutboundPayloadType = InboundPayloadType;


export const SECTION_1_1: sectionType<InnovationSections> = {
  id: 'INNOVATION_DESCRIPTION',
  title: 'Description of innovation',
  wizard: new WizardEngineModel({
    steps: [
      new FormEngineModel({
        parameters: [{
          id: 'name', dataType: 'text', label: stepsLabels.q1.label, description: stepsLabels.q1.description,
          validations: { isRequired: [true, 'Innovation name is required'], maxLength: 100 }
        }]
      }),
      new FormEngineModel({
        parameters: [{
          id: 'description', dataType: 'textarea', label: stepsLabels.q2.label, description: stepsLabels.q2.description,
          validations: { isRequired: [true, 'Description is required'] },
          lengthLimit: 'medium'
        }]
      }),
      new FormEngineModel({
        parameters: [{
          id: 'officeLocation', dataType: 'radio-group', label: stepsLabels.q3.label, description: stepsLabels.q3.description,
          validations: { isRequired: [true, 'Choose one option'] },
          items: locationItems
        }]
      }),
    ],
    showSummary: true,
    runtimeRules: [(steps: WizardStepType[], currentValues: StepPayloadType, currentStep: number | 'summary') => runtimeRules(steps, currentValues, currentStep)],
    inboundParsing: (data: InboundPayloadType) => inboundParsing(data),
    outboundParsing: (data: StepPayloadType) => outboundParsing(data),
    summaryParsing: (data: StepPayloadType) => summaryParsing(data),
    summaryPDFParsing: (data: StepPayloadType) => summaryPDFParsing(data)
  })
};

function runtimeRules(steps: WizardStepType[], currentValues: StepPayloadType, currentStep: number | 'summary'): void {

  steps.splice(3);

  if (currentValues.officeLocation !== 'Based outside UK') {

    currentValues.countryLocation = null;
    currentValues.countryName = currentValues.officeLocation;

    steps.push(new FormEngineModel({
      parameters: [{
        id: 'postcode', dataType: 'text', label: stepsLabels.q4.label,
        validations: { isRequired: [true, 'Postcode is required'], maxLength: 20 }
      }]
    }));

  } else {

    delete currentValues.postcode;

    // if (currentValues.countryName && locationItems.filter(item => !['', 'Based outside UK'].includes(item.value)).map(item => item.value as string).includes(currentValues.countryName)) {
    //   delete currentValues.countryName; // Clears country if changing from 1 of other countries to "other".
    //   currentValues.countryLocation = null;
    // }

    steps.push(new FormEngineModel({
      parameters: [{
        id: 'countryLocation', dataType: 'autocomplete-array', label: stepsLabels.q5.label,
        validations: { isRequired: [true, 'You must choose one country'], max: [1, 'Only 1 country is allowed'] },
        items: countriesItems
      }]
    }));

  }

  steps.push(
    new FormEngineModel({
      parameters: [{
        id: 'hasWebsite', dataType: 'radio-group', label: stepsLabels.q6.label,
        validations: { isRequired: [true, 'Choose one option'] },
        items: [
          { value: 'YES', label: 'Yes', conditional: new FormEngineParameterModel({ id: 'website', dataType: 'text', label: 'Website', validations: { isRequired: [true, 'Website url is required'], maxLength: 100 } }) },
          { value: 'NO', label: 'No' }
        ]
      }]
    }),
    new FormEngineModel({
      parameters: [{
        id: 'categories', dataType: 'checkbox-array', label: stepsLabels.q7.label,
        validations: { isRequired: [true, 'Choose at least one category'] },
        items: [
          ...categoriesItems,
          { value: 'OTHER', label: 'Other', conditional: new FormEngineParameterModel({ id: 'otherCategoryDescription', dataType: 'text', label: 'Other category', validations: { isRequired: [true, 'Other category description is required'] } }) }
        ]
      }]
    })
  );

  if (currentValues.categories?.length === 0) {
    delete currentValues.mainCategory;
  } else if (currentValues.categories?.length === 1) {
    currentValues.mainCategory = currentValues.categories[0];
  } else {

    // Set chosen categories adding OTHER if also chosen.
    const selectedCategories = categoriesItems.filter(item => currentValues.categories?.some(e => e === item.value));
    if (currentValues.categories?.includes('OTHER')) {
      selectedCategories.push({ value: 'OTHER', label: 'Other', conditional: new FormEngineParameterModel({ id: 'otherCategoryDescription', dataType: 'text', label: 'Other category', validations: { isRequired: [true, 'Other category description is required'] } }) });
    }

    // Clears previous value if it doesn't exist on new chosen list.
    if (currentValues.mainCategory && !currentValues.categories?.includes(currentValues.mainCategory)) {
      delete currentValues.mainCategory;
    }

    steps.push(new FormEngineModel({
      parameters: [{
        id: 'mainCategory', dataType: 'radio-group', label: stepsLabels.q8.label, description: stepsLabels.q8.description,
        validations: { isRequired: [true, 'Choose one option'] },
        items: selectedCategories
      }]
    }));

  }

  steps.push(
    new FormEngineModel({
      parameters: [{
        id: 'areas', dataType: 'checkbox-array', label: stepsLabels.q9.label, description: stepsLabels.q9.description,
        items: areasItems
      }]
    }),
    new FormEngineModel({
      parameters: [{
        id: 'careSettings', dataType: 'checkbox-array', label: stepsLabels.q10.label, description: stepsLabels.q10.description,
        items: [
          ...careSettingsItems,
          { value: 'OTHER', label: 'Other', conditional: new FormEngineParameterModel({ id: 'otherCareSetting', dataType: 'text', label: 'Other care setting', validations: { isRequired: [true, 'Other care setting description is required'] } }) }
        ]
      }]
    }),
    new FormEngineModel({
      parameters: [{
        id: 'mainPurpose', dataType: 'radio-group', label: stepsLabels.q11.label, description: stepsLabels.q11.description,
        validations: { isRequired: [true, 'Choose one option'] },
        items: mainPurposeItems
      }]
    }),
    new FormEngineModel({
      parameters: [{
        id: 'supportDescription', dataType: 'textarea', label: stepsLabels.q12.label, description: stepsLabels.q12.description,
        validations: { isRequired: [true, 'Description is required'] },
        lengthLimit: 'large'
      }]
    }),
    new FormEngineModel({
      parameters: [{
        id: 'currentlyReceivingSupport', dataType: 'textarea', label: stepsLabels.q13.label, description: stepsLabels.q13.description,
        lengthLimit: 'large'
      }]
    }),
    new FormEngineModel({
      parameters: [{
        id: 'involvedAACProgrammes', dataType: 'checkbox-array', label: stepsLabels.q14.label,
        items: involvedAACProgrammesItems
      }]
    })
  );

}

function inboundParsing(data: InboundPayloadType): StepPayloadType {

  return {
    ...data,
    hasWebsite: data.website ? 'YES' : 'NO',
    countryLocation: data.countryName && countriesItems.some(item => item.value === data.countryName) ? [data.countryName] : null,
    officeLocation: (data.countryName && catalogOfficeLocation.some(item => item === data.countryName) ? data.countryName : 'Based outside UK') as catalogOfficeLocation
  };

}

function outboundParsing(data: StepPayloadType): OutboundPayloadType {

  const { officeLocation, hasWebsite, countryLocation, ...parsedData } = data;
  return parsedData;

}

function summaryParsing(data: StepPayloadType): WizardSummaryType[] {

  const toReturn: WizardSummaryType[] = [];

  let editStepNumber = 1;

  toReturn.push(
    {
      label: stepsLabels.q1.label,
      value: data.name,
      editStepNumber: editStepNumber++
    },
    {
      label: stepsLabels.q2.label,
      value: data.description,
      editStepNumber: editStepNumber++
    },
    {
      label: stepsLabels.q3.label,
      value: `${data.officeLocation}, ${data.postcode ?? data.countryName}`,
      editStepNumber: editStepNumber++
    }
  );

  editStepNumber++;

  toReturn.push(
    {
      label: stepsLabels.q6.label,
      value: data.website ?? 'No',
      editStepNumber: editStepNumber++
    },
    {
      label: stepsLabels.q7.label,
      value: data.categories?.map(v => v === 'OTHER' ? data.otherCategoryDescription : categoriesItems.find(item => item.value === v)?.label).join('\n'),
      editStepNumber: editStepNumber++
    }
  );

  if (data.categories && data.categories.length > 1) {
    toReturn.push({
      label: stepsLabels.q8.label,
      value: data.otherMainCategoryDescription || categoriesItems.find(item => item.value === data.mainCategory)?.label,
      editStepNumber: editStepNumber++
    });
  }

  toReturn.push(
    {
      label: stepsLabels.q9.label,
      value: data.areas?.map(v => areasItems.find(item => item.value === v)?.label).join('\n'),
      editStepNumber: editStepNumber++
    },
    {
      label: stepsLabels.q10.label,
      value: data.careSettings?.map(v => v === 'OTHER' ? data.otherCareSetting : careSettingsItems.find(item => item.value === v)?.label).join('\n'),
      editStepNumber: editStepNumber++
    },
    {
      label: stepsLabels.q11.label,
      value: mainPurposeItems.find(item => item.value === data.mainPurpose)?.label,
      editStepNumber: editStepNumber++
    },
    {
      label: stepsLabels.q12.label,
      value: data.supportDescription,
      editStepNumber: editStepNumber++
    },
    {
      label: stepsLabels.q13.label,
      value: data.currentlyReceivingSupport,
      editStepNumber: editStepNumber++
    },
    {
      label: stepsLabels.q12.label,
      value: data.involvedAACProgrammes?.map(v => involvedAACProgrammesItems.find(item => item.value === v)?.label).join('\n'),
      editStepNumber: editStepNumber++
    }
  );

  return toReturn;

}

function summaryPDFParsing(data: StepPayloadType): WizardSummaryType[] {
  return summaryParsing(data);
}
