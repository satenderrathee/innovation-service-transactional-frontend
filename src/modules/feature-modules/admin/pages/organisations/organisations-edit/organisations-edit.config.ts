import { FormEngineModel, SummaryParsingType, WizardEngineModel } from '@modules/shared/forms';


// Types.
type InboundPayloadType = {
  name: string,
  acronym: string
};

type OutboundPayloadType = InboundPayloadType;
type StepPayloadType = InboundPayloadType;


// This is a LET variable, because the organisations shares information is updated by the component that uses this variable.
export let EDIT_ORGANISATIONS_QUESTIONS: WizardEngineModel = new WizardEngineModel({
  showSummary: true,
  steps: [
    new FormEngineModel({
      parameters: [{
        id: 'name',
        dataType: 'text',
        label: 'Name',
        validations: {
          isRequired: [true, 'Name is required'],
          maxLength: 100
        }
      }]
    }),

    new FormEngineModel({
      parameters: [{
        id: 'acronym',
        dataType: 'text',
        label: 'Acronym',
        validations: { isRequired: [true, 'Acronym is required'], maxLength: 10 }
      }]
    }),
  ],
  runtimeRules: [(steps: FormEngineModel[], data: StepPayloadType, currentStep: number | 'summary') => runtimeRules(steps, data, currentStep)],
  inboundParsing: (data: InboundPayloadType) => inboundParsing(data),
  outboundParsing: (data: StepPayloadType) => outboundParsing(data),
  summaryParsing: (data: StepPayloadType, steps?: FormEngineModel[]) => summaryParsing(data, steps || [])
});


function runtimeRules(steps: FormEngineModel[], data: StepPayloadType, currentStep: number | 'summary'): void {

}

function inboundParsing(data: InboundPayloadType): StepPayloadType {
  return {
    name: data.name,
    acronym: data.acronym
  };

}

function outboundParsing(data: StepPayloadType): OutboundPayloadType {

  return {
    name: data.name,
    acronym: data.acronym,
  };

}

function summaryParsing(data: StepPayloadType, steps: FormEngineModel[]): SummaryParsingType[] {

  const toReturn: SummaryParsingType[] = [];

  toReturn.push(
    { label: 'Name', value: data.name, editStepNumber: 1 },
    { label: 'Acronym', value: data.acronym, editStepNumber: 2 },
  );

  return toReturn;
}
