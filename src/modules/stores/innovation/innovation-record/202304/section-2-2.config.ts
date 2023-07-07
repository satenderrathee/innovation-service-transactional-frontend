import { URLS } from '@app/base/constants';
import { FormEngineModel, WizardEngineModel, WizardStepType, WizardSummaryType } from '@modules/shared/forms';

import { InnovationSectionConfigType } from '../ir-versions.types';

import { InnovationSections } from './catalog.types';
import { DocumentType202304 } from './document.types';
import { needsSupportAnyAreaItems, yesNoItems, yesNotYetItems } from './forms.config';
import { SECTION_2_EVIDENCES } from './section-2-2-evidences.config';


// Labels.
const stepsLabels = {
  q1: { label: 'Do you have any evidence to show the impact or benefits of your innovation?', description: `You'll have the opportunity to add evidence at the end of this section.` },
  q2: { label: 'Are you currently collecting evidence, or have plans to collect evidence?' },
  q3: {
    label: 'Write a short summary of your ongoing or planned evidence gathering, including the IRAS number if known.',
    description: `An IRAS ID is a unique identifier, which is generated by IRAS when you first create a project. It is the accepted common study identifier, allowing research to be traced across its study lifecycle. For more information visit the <a href=${URLS.MY_RESEARCH_PROJECT} target="_blank" rel="noopener noreferrer">IRAS website (opens in a new window)</a>.`
  },
  q4: { label: 'Upload any documents relevant to this evidence collection', description: 'Files must be CSV, XLSX, DOCX or PDF, and can be up to 20MB each.' },
  q5: { label: 'Do you need support with any of these areas?' }
};


// Types.
type InboundPayloadType = DocumentType202304['EVIDENCE_OF_EFFECTIVENESS'] & {
  evidences?: { id: string, name: string, summary: string }[]
};
type StepPayloadType = InboundPayloadType;
type OutboundPayloadType = DocumentType202304['EVIDENCE_OF_EFFECTIVENESS'];

// Logic.
export const SECTION_2_2: InnovationSectionConfigType<InnovationSections> = {
  id: 'EVIDENCE_OF_EFFECTIVENESS',
  title: 'Evidence of impact and benefit',
  wizard: new WizardEngineModel({
    steps: [
      new FormEngineModel({
        parameters: [{
          id: 'hasEvidence', dataType: 'radio-group', label: stepsLabels.q1.label, description: stepsLabels.q1.description,
          validations: { isRequired: [true, 'Choose one option'] },
          items: yesNotYetItems
        }]
      }),
      new FormEngineModel({
        parameters: [{
          id: 'currentlyCollectingEvidence', dataType: 'radio-group', label: stepsLabels.q2.label,
          validations: { isRequired: [true, 'Choose one option'] },
          items: yesNoItems
        }]
      })
    ],
    showSummary: true,
    runtimeRules: [(steps: WizardStepType[], currentValues: StepPayloadType, currentStep: number | 'summary') => runtimeRules(steps, currentValues, currentStep)],
    outboundParsing: (data: StepPayloadType) => outboundParsing(data),
    summaryParsing: (data: StepPayloadType) => summaryParsing(data)
  }),
  evidences: SECTION_2_EVIDENCES
};

// Logic.
function runtimeRules(steps: WizardStepType[], data: StepPayloadType, currentStep: number | 'summary'): void {

  steps.splice(2);

  if (data.currentlyCollectingEvidence === 'YES') {

    steps.push(
      new FormEngineModel({
        parameters: [{
          id: 'summaryOngoingEvidenceGathering', dataType: 'textarea', label: stepsLabels.q3.label, description: stepsLabels.q3.description,
          validations: { isRequired: [true, 'A description is required'] },
          lengthLimit: 'l'
        }]
      })
    );

  } else {
    delete data.summaryOngoingEvidenceGathering;
  }

  steps.push(
    new FormEngineModel({
      parameters: [{
        id: 'needsSupportAnyArea', dataType: 'checkbox-array', label: stepsLabels.q5.label,
        validations: { isRequired: [true, 'Choose at least one item'] },
        items: needsSupportAnyAreaItems
      }]
    })
  );

}

function outboundParsing(data: StepPayloadType): OutboundPayloadType {

  return {
    ...(data.hasEvidence && { hasEvidence: data.hasEvidence }),
    ...(data.currentlyCollectingEvidence && { currentlyCollectingEvidence: data.currentlyCollectingEvidence }),
    ...(data.summaryOngoingEvidenceGathering && { summaryOngoingEvidenceGathering: data.summaryOngoingEvidenceGathering }),
    ...((data.needsSupportAnyArea ?? []).length > 0 && { needsSupportAnyArea: data.needsSupportAnyArea })
  };

}


function summaryParsing(data: StepPayloadType): WizardSummaryType[] {

  const toReturn: WizardSummaryType[] = [];

  let editStepNumber = 1;

  toReturn.push(
    {
      label: stepsLabels.q1.label,
      value: yesNotYetItems.find(item => item.value === data.hasEvidence)?.label,
      editStepNumber: editStepNumber++
    },
    {
      label: stepsLabels.q2.label,
      value: yesNoItems.find(item => item.value === data.currentlyCollectingEvidence)?.label,
      editStepNumber: editStepNumber++
    }
  );

  if (data.currentlyCollectingEvidence === 'YES') {

    toReturn.push({
      label: stepsLabels.q3.label,
      value: data.summaryOngoingEvidenceGathering,
      editStepNumber: editStepNumber++
    });

  }

  toReturn.push({
    label: stepsLabels.q5.label,
    value: data.needsSupportAnyArea?.map(v => needsSupportAnyAreaItems.find(item => item.value === v)?.label).join('\n'),
    editStepNumber: editStepNumber++
  });

  data.evidences?.forEach((item, i) => {
    toReturn.push({
      label: `Evidence ${i + 1}`,
      value: item.name,
      evidenceId: item.id
    });
  });

  return toReturn;

}
