export class InnovationModel {

  isSignIn: boolean;

  user?: {
    id: string;
    displayName: string;
    type: '' | 'ACCESSOR' | 'INNOVATOR',
    organisations: { id: string, name: string, role: 'OWNER' | 'QUALIFYING_ACCESSOR' | 'ACCESSOR' }[]
    innovations: { id: string, name: string }[];
  };

  didFirstTimeSignIn?: boolean;


  constructor() {

    this.isSignIn = false;

  }

}


export const INNOVATION_STATUS = {
  WAITING_NEEDS_ASSESSMENT: { label: 'Waiting', cssClass: 'nhsuk-tag--wellow' },
  NEEDS_ASSESSMENT_REVIEW: { label: 'In review', cssClass: 'nhsuk-tag--wellow' },
  IN_PROGRESS: { label: 'In progress', cssClass: 'nhsuk-tag--wellow' },
  ABANDONED: { label: 'Abandoned', cssClass: 'nhsuk-tag--grey' },
  COMPLETE: { label: 'Complete', cssClass: 'nhsuk-tag--green' }
};

export const INNOVATION_SUPPORT_STATUS = {
  UNNASSIGNED: { label: 'Unassigned', cssClass: 'nhsuk-tag--red' },
  FURTHER_INFO_REQUIRED: { label: 'Further info', cssClass: 'nhsuk-tag--yellow' },
  WAITING: { label: 'Waiting', cssClass: 'nhsuk-tag--grey' },
  NOT_YET: { label: 'Waiting', cssClass: 'nhsuk-tag--grey' },
  ENGAGING: { label: 'Engaging', cssClass: 'nhsuk-tag--green' },
  UNSUITABLE: { label: 'Waiting', cssClass: 'nhsuk-tag--grey' },
  WITHDRAWN: { label: 'Waiting', cssClass: 'nhsuk-tag--grey' },
  COMPLETE: { label: 'Waiting', cssClass: 'nhsuk-tag--grey' },
};

export const INNOVATION_SECTION_STATUS = {
  UNKNOWN: null,
  NOT_STARTED: { label: 'Not started', isCompleteState: false },
  DRAFT: { label: 'Draft', isCompleteState: false },
  SUBMITTED: { label: 'Submitted', isCompleteState: true }
};

export const INNOVATION_SECTION_ACTION_STATUS = {
  '': null,
  REQUESTED: { label: 'Requested', cssClass: 'nhsuk-tag--blue' },
  STARTED: { label: 'Started', cssClass: 'nhsuk-tag--green' },
  CONTINUE: { label: 'Continue', cssClass: 'nhsuk-tag--blue' },
  IN_REVIEW: { label: 'In review', cssClass: 'nhsuk-tag--yellow' },
  DELETED: { label: 'Deleted', cssClass: 'nhsuk-tag--grey' },
  DECLINED: { label: 'Declined', cssClass: 'nhsuk-tag--grey' },
  COMPLETED: { label: 'Completed', cssClass: 'nhsuk-tag--green' }
};


export enum InnovationSectionsIds {
  INNOVATION_DESCRIPTION = 'INNOVATION_DESCRIPTION',
  VALUE_PROPOSITION = 'VALUE_PROPOSITION',
  UNDERSTANDING_OF_NEEDS = 'UNDERSTANDING_OF_NEEDS',
  UNDERSTANDING_OF_BENEFITS = 'UNDERSTANDING_OF_BENEFITS',
  EVIDENCE_OF_EFFECTIVENESS = 'EVIDENCE_OF_EFFECTIVENESS',
  MARKET_RESEARCH = 'MARKET_RESEARCH',
  INTELLECTUAL_PROPERTY = 'INTELLECTUAL_PROPERTY',
  REGULATIONS_AND_STANDARDS = 'REGULATIONS_AND_STANDARDS',
  CURRENT_CARE_PATHWAY = 'CURRENT_CARE_PATHWAY',
  TESTING_WITH_USERS = 'TESTING_WITH_USERS',
  COST_OF_INNOVATION = 'COST_OF_INNOVATION',
  COMPARATIVE_COST_BENEFIT = 'COMPARATIVE_COST_BENEFIT',
  REVENUE_MODEL = 'REVENUE_MODEL',
  IMPLEMENTATION_PLAN = 'IMPLEMENTATION_PLAN',
}



export type sectionType = {
  id: null | string;
  section: InnovationSectionsIds;
  status: keyof typeof INNOVATION_SECTION_STATUS;
  actionStatus: keyof typeof INNOVATION_SECTION_ACTION_STATUS;
  updatedAt: string;
};

export type getInnovationInfoEndpointDTO = {
  id: string;
  name: string;
  company: string;
  description: string;
  countryName: string;
  postcode: string;
  actions: string[]; // actionsCount: number;
  comments: string[]; // commentsCount: number
};

export type getInnovationInfoResponse = {
  id: string;
  name: string;
  company: string;
  location: string;
  description: string;
  openActionsNumber: number;
  openCommentsNumber: number;
};

export type getInnovationSectionsDTO = {
  id: string;
  name: string;
  sections: sectionType[];
};


export type SectionsSummaryModel = {
  title: string;
  sections: {
    id: InnovationSectionsIds;
    title: string;
    status: keyof typeof INNOVATION_SECTION_STATUS;
    actionStatus: keyof typeof INNOVATION_SECTION_ACTION_STATUS;
    isCompleted: boolean;
  }[]
};
