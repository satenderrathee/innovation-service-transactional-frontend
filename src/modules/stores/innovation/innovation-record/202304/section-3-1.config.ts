import { FormEngineModel, WizardEngineModel, WizardStepType, WizardSummaryType } from '@modules/shared/forms';

import { sectionType } from '../shared.types';

import { InnovationSections } from './catalog.types';
import { DocumentType202304 } from './document.types';
import { hasMarketResearchItems, optionBestDescribesInnovationItems } from './forms.config';


// Labels.
const stepsLabels = {
  q1: {
    label: 'Have you conducted market research to determine the demand and need for your innovation in the UK?',
    description: 'By this, we mean any research you have done to determine the market opportunity for your innovation. You will be able to explain any testing you have done with users later in the record.'
  },
  q2: {
    label: 'Describe the market research you have done, or are doing, within the UK market',
    description: `There are different methodologies available and could include a mix of the following:
    <ul class="nhsuk-list">
    <li>* in-depth interviews</li>
    <li>* focus groups </li>
    <li>* telephone interviews</li>
    <li>* patient record forms</li>
    <li>* computer-assisted telephone interviews</li>
    <li>* online surveys</li>
    <li>* market research online communities</li>
    <li>* ethnography"</li>
    </ul>`
  },
  q3: { label: 'Which option best describes your innovation?' },
  q4: {
    label: 'What competitors or alternatives exist, or how is the problem addressed in current practice?',
    description: 'Include how your innovation is different to the alternatives in the market.'
  },
};


// Types.
type InboundPayloadType = DocumentType202304['MARKET_RESEARCH'];
type StepPayloadType = InboundPayloadType;


export const SECTION_3_1: sectionType<InnovationSections> = {
  id: 'MARKET_RESEARCH',
  title: 'Market research',
  wizard: new WizardEngineModel({
    steps: [
      new FormEngineModel({
        parameters: [{
          id: 'hasMarketResearch', dataType: 'radio-group', label: stepsLabels.q1.label, description: stepsLabels.q1.description,
          validations: { isRequired: [true, 'Choose one option'] },
          items: hasMarketResearchItems
        }]
      }),
    ],
    showSummary: true,
    runtimeRules: [(steps: WizardStepType[], currentValues: StepPayloadType, currentStep: number | 'summary') => runtimeRules(steps, currentValues, currentStep)],
    summaryParsing: (data: StepPayloadType) => summaryParsing(data),
    summaryPDFParsing: (data: StepPayloadType) => summaryPDFParsing(data)
  })
};



function runtimeRules(steps: WizardStepType[], currentValues: StepPayloadType, currentStep: number | 'summary'): void {

  steps.splice(1);

  if (['NOT_YET'].includes(currentValues.hasMarketResearch || 'NOT_YET')) {
    delete currentValues.marketResearch;
    delete currentValues.optionBestDescribesInnovation;
    delete currentValues.whatCompetitorsAlternativesExist;
    return;
  }

  steps.push(
    new FormEngineModel({
      parameters: [{
        id: 'marketResearch', dataType: 'textarea', label: stepsLabels.q2.label,
        validations: { isRequired: [true, 'A description of the market research is required'] },
        lengthLimit: 'largeDown'
      }]
    }),
    new FormEngineModel({
      parameters: [{
        id: 'optionBestDescribesInnovation', dataType: 'radio-group', label: stepsLabels.q3.label,
        validations: { isRequired: [true, 'Choose one option'] },
        items: optionBestDescribesInnovationItems
      }]
    }),
    new FormEngineModel({
      parameters: [{
        id: 'whatCompetitorsAlternativesExist', dataType: 'textarea', label: stepsLabels.q4.label, description: stepsLabels.q4.description,
        validations: { isRequired: [true, 'A description is required'] },
        lengthLimit: 'largeDown'
      }]
    })
  );

}


function summaryParsing(data: StepPayloadType): WizardSummaryType[] {

  const toReturn: WizardSummaryType[] = [];

  toReturn.push({
    label: stepsLabels.q1.label,
    value: hasMarketResearchItems.find(item => item.value === data.hasMarketResearch)?.label,
    editStepNumber: 1
  });

  if (['YES', 'IN_PROGRESS'].includes(data.hasMarketResearch || 'NOT_YET')) {
    toReturn.push(
      {
        label: stepsLabels.q2.label,
        value: data.marketResearch,
        editStepNumber: 2
      },
      {
        label: stepsLabels.q3.label,
        value: optionBestDescribesInnovationItems.find(item => item.value === data.optionBestDescribesInnovation)?.label,
        editStepNumber: 3
      },
      {
        label: stepsLabels.q4.label,
        value: data.whatCompetitorsAlternativesExist,
        editStepNumber: 4
      }
    );
  }

  return toReturn;

}

function summaryPDFParsing(data: StepPayloadType): WizardSummaryType[] {
  return summaryParsing(data);
}