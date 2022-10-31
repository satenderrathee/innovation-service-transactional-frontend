export enum InnovationStatusEnum {
  CREATED = 'CREATED',
  WAITING_NEEDS_ASSESSMENT = 'WAITING_NEEDS_ASSESSMENT',
  NEEDS_ASSESSMENT = 'NEEDS_ASSESSMENT',
  IN_PROGRESS = 'IN_PROGRESS',
  // NEEDS_ASSESSMENT_REVIEW = 'NEEDS_ASSESSMENT_REVIEW',
  ABANDONED = 'ABANDONED',
  COMPLETE = 'COMPLETE'
}

export enum InnovationSupportStatusEnum {
  UNASSIGNED = 'UNASSIGNED',
  ENGAGING = 'ENGAGING',
  FURTHER_INFO_REQUIRED = 'FURTHER_INFO_REQUIRED',
  WAITING = 'WAITING',
  NOT_YET = 'NOT_YET',
  UNSUITABLE = 'UNSUITABLE',
  WITHDRAWN = 'WITHDRAWN',
  COMPLETE = 'COMPLETE'
}

export enum InnovationTransferStatusEnum {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  DECLINED = 'DECLINED',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED'
}

export enum InnovationSectionEnum {
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
  IMPLEMENTATION_PLAN = 'IMPLEMENTATION_PLAN'
}

export enum InnovationActionStatusEnum {
  REQUESTED = 'REQUESTED',
  STARTED = 'STARTED',
  CONTINUE = 'CONTINUE',
  IN_REVIEW = 'IN_REVIEW',
  DELETED = 'DELETED',
  DECLINED = 'DECLINED',
  COMPLETED = 'COMPLETED'
}

export enum ActivityLogTypesEnum {
  INNOVATION_MANAGEMENT = 'INNOVATION_MANAGEMENT',
  INNOVATION_RECORD = 'INNOVATION_RECORD',
  NEEDS_ASSESSMENT = 'NEEDS_ASSESSMENT',
  SUPPORT = 'SUPPORT',
  THREADS = 'THREADS',
  COMMENTS = 'COMMENTS',
  ACTIONS = 'ACTIONS'
}

export enum ActivityLogItemsEnum {
  INNOVATION_CREATION = 'INNOVATION_CREATION',
  OWNERSHIP_TRANSFER = 'OWNERSHIP_TRANSFER',
  SHARING_PREFERENCES_UPDATE = 'SHARING_PREFERENCES_UPDATE',
  SECTION_DRAFT_UPDATE = 'SECTION_DRAFT_UPDATE',
  SECTION_SUBMISSION = 'SECTION_SUBMISSION',
  INNOVATION_SUBMISSION = 'INNOVATION_SUBMISSION',
  NEEDS_ASSESSMENT_START = 'NEEDS_ASSESSMENT_START',
  NEEDS_ASSESSMENT_COMPLETED = 'NEEDS_ASSESSMENT_COMPLETED',
  ORGANISATION_SUGGESTION = 'ORGANISATION_SUGGESTION',
  SUPPORT_STATUS_UPDATE = 'SUPPORT_STATUS_UPDATE',
  THREAD_CREATION = 'THREAD_CREATION',
  THREAD_MESSAGE_CREATION = 'THREAD_MESSAGE_CREATION',
  COMMENT_CREATION = 'COMMENT_CREATION',
  ACTION_CREATION = 'ACTION_CREATION',
  ACTION_STATUS_IN_REVIEW_UPDATE = 'ACTION_STATUS_IN_REVIEW_UPDATE',
  ACTION_STATUS_DECLINED_UPDATE = 'ACTION_STATUS_DECLINED_UPDATE',
  ACTION_STATUS_COMPLETED_UPDATE = 'ACTION_STATUS_COMPLETED_UPDATE',
  ACTION_STATUS_CANCELLED_UPDATE = 'ACTION_STATUS_CANCELLED_UPDATE'
}
