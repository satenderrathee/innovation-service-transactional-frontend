import { FormEngineModel, WizardEngineModel, WizardStepType, WizardSummaryType } from '@modules/shared/forms';

import { sectionType } from '../shared.types';

import { InnovationSections } from './catalog.types';
import { DocumentType202304 } from './document.types';
import { innovationPathwayKnowledgeItems } from './forms.config';


// Labels.
const stepsLabels = {
  q1: {
    label: 'Does your innovation relate to a current NHS care pathway?',
    description: `An NHS care pathway outlines the entire patient journey and the actions taken in different parts of the healthcare system. It's key to understand the existing routines of clinical and care professionals, administrators and others who will be impacted by your innovation. If your innovation does not play a role in the delivery of care, select 'does not form part of a care pathway.`
  },
  q2: {
    label: 'Describe the potential care pathway with your innovation in use',
    description: 'Focus on any areas that will be impacted by introducing your innovation to the care pathway.'
  }
};


// Types.
type InboundPayloadType = DocumentType202304['CURRENT_CARE_PATHWAY'];
type StepPayloadType = InboundPayloadType;


export const SECTION_3_2: sectionType<InnovationSections> = {
  id: 'CURRENT_CARE_PATHWAY',
  title: 'Current care pathway',
  wizard: new WizardEngineModel({
    steps: [
      new FormEngineModel({
        parameters: [{
          id: 'innovationPathwayKnowledge', dataType: 'radio-group', label: stepsLabels.q1.label, description: stepsLabels.q1.description,
          validations: { isRequired: [true, 'Choose one option'] },
          items: innovationPathwayKnowledgeItems
        }]
      })
    ],
    runtimeRules: [(steps: WizardStepType[], currentValues: StepPayloadType, currentStep: number | 'summary') => runtimeRules(steps, currentValues, currentStep)],
    summaryParsing: (data: StepPayloadType) => summaryParsing(data),
    summaryPDFParsing: (data: StepPayloadType) => summaryPDFParsing(data),
    showSummary: true
  })
};

function runtimeRules(steps: WizardStepType[], currentValues: StepPayloadType, currentStep: number | 'summary'): void {

  steps.splice(1);

  if (['DONT_KNOW', 'NOT_PART_PATHWAY'].includes(currentValues.innovationPathwayKnowledge || 'DONT_KNOW')) {
    delete currentValues.potentialPathway;
    return;
  }

  steps.push(
    new FormEngineModel({
      parameters: [{
        id: 'potentialPathway', dataType: 'textarea', label: stepsLabels.q2.label,
        description: 'Please focus on any areas that will be impacted by introducing your innovation to the care pathway.',
        validations: { isRequired: [true, 'Description is required'] },
        lengthLimit: 'mediumUp'
      }]
    })
  );

}

function summaryParsing(data: StepPayloadType): WizardSummaryType[] {

  const toReturn: WizardSummaryType[] = [];


  toReturn.push({
    label: stepsLabels.q1.label,
    value: innovationPathwayKnowledgeItems.find(item => item.value === data.innovationPathwayKnowledge)?.label,
    editStepNumber: 1
  });

  if (!['DONT_KNOW', 'NOT_PART_PATHWAY'].includes(data.innovationPathwayKnowledge || 'DONT_KNOW')) {
    toReturn.push({
      label: stepsLabels.q2.label,
      value: data.potentialPathway,
      editStepNumber: 2
    });
  }

  return toReturn;

}

function summaryPDFParsing(data: StepPayloadType): WizardSummaryType[] {
  return summaryParsing(data);
}
