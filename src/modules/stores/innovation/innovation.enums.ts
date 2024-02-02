export enum InnovationStatusEnum {
  CREATED = 'CREATED',
  AWAITING_NEEDS_REASSESSMENT = 'AWAITING_NEEDS_REASSESSMENT',
  WAITING_NEEDS_ASSESSMENT = 'WAITING_NEEDS_ASSESSMENT',
  NEEDS_ASSESSMENT = 'NEEDS_ASSESSMENT',
  IN_PROGRESS = 'IN_PROGRESS',
  // NEEDS_ASSESSMENT_REVIEW = 'NEEDS_ASSESSMENT_REVIEW',
  ABANDONED = 'ABANDONED',
  COMPLETE = 'COMPLETE',
  WITHDRAWN = 'WITHDRAWN',
  ARCHIVED = 'ARCHIVED'
}

export enum InnovationGroupedStatusEnum {
  RECORD_NOT_SHARED = 'RECORD_NOT_SHARED',
  AWAITING_NEEDS_ASSESSMENT = 'AWAITING_NEEDS_ASSESSMENT',
  NEEDS_ASSESSMENT = 'NEEDS_ASSESSMENT',
  AWAITING_SUPPORT = 'AWAITING_SUPPORT',
  RECEIVING_SUPPORT = 'RECEIVING_SUPPORT',
  NO_ACTIVE_SUPPORT = 'NO_ACTIVE_SUPPORT',
  AWAITING_NEEDS_REASSESSMENT = 'AWAITING_NEEDS_REASSESSMENT',
  WITHDRAWN = 'WITHDRAWN'
}

export enum InnovationSupportStatusEnum {
  UNASSIGNED = 'UNASSIGNED',
  ENGAGING = 'ENGAGING',
  WAITING = 'WAITING',
  UNSUITABLE = 'UNSUITABLE',
  CLOSED = 'CLOSED'
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
  IMPLEMENTATION_PLAN = 'IMPLEMENTATION_PLAN',
  DEPLOYMENT = 'DEPLOYMENT'
}

export enum InnovationTaskStatusEnum {
  OPEN = 'OPEN',
  DONE = 'DONE',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED'
}

export enum ActivityLogTypesEnum {
  INNOVATION_MANAGEMENT = 'INNOVATION_MANAGEMENT',
  INNOVATION_RECORD = 'INNOVATION_RECORD',
  NEEDS_ASSESSMENT = 'NEEDS_ASSESSMENT',
  SUPPORT = 'SUPPORT',
  THREADS = 'THREADS',
  COMMENTS = 'COMMENTS',
  TASKS = 'TASKS'
}

export enum ActivityLogItemsEnum {
  INNOVATION_CREATION = 'INNOVATION_CREATION',
  INNOVATION_PAUSE = 'INNOVATION_PAUSE',
  OWNERSHIP_TRANSFER = 'OWNERSHIP_TRANSFER',
  SHARING_PREFERENCES_UPDATE = 'SHARING_PREFERENCES_UPDATE',
  SECTION_DRAFT_UPDATE = 'SECTION_DRAFT_UPDATE',
  SECTION_DRAFT_UPDATE_DEPRECATED = 'SECTION_DRAFT_UPDATE_DEPRECATED',
  SECTION_SUBMISSION = 'SECTION_SUBMISSION',
  SECTION_SUBMISSION_DEPRECATED = 'SECTION_SUBMISSION_DEPRECATED',
  INNOVATION_SUBMISSION = 'INNOVATION_SUBMISSION',
  NEEDS_ASSESSMENT_START = 'NEEDS_ASSESSMENT_START',
  NEEDS_ASSESSMENT_EDITED = 'NEEDS_ASSESSMENT_EDITED',
  NEEDS_ASSESSMENT_COMPLETED = 'NEEDS_ASSESSMENT_COMPLETED',
  NEEDS_ASSESSMENT_REASSESSMENT_REQUESTED = 'NEEDS_ASSESSMENT_REASSESSMENT_REQUESTED',
  ORGANISATION_SUGGESTION = 'ORGANISATION_SUGGESTION',
  SUPPORT_STATUS_UPDATE = 'SUPPORT_STATUS_UPDATE',
  THREAD_CREATION = 'THREAD_CREATION',
  THREAD_MESSAGE_CREATION = 'THREAD_MESSAGE_CREATION',
  COMMENT_CREATION = 'COMMENT_CREATION',
  TASK_CREATION = 'TASK_CREATION',
  TASK_CREATION_DEPRECATED = 'TASK_CREATION_DEPRECATED',
  TASK_STATUS_DONE_UPDATE = 'TASK_STATUS_DONE_UPDATE',
  TASK_STATUS_DECLINED_UPDATE = 'TASK_STATUS_DECLINED_UPDATE',
  TASK_STATUS_OPEN_UPDATE = 'TASK_STATUS_OPEN_UPDATE',
  TASK_STATUS_CANCELLED_UPDATE = 'TASK_STATUS_CANCELLED_UPDATE'
}

export enum InnovationExportRequestStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export enum InnovationCollaboratorStatusEnum {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
  REMOVED = 'REMOVED',
  LEFT = 'LEFT',
  EXPIRED = 'EXPIRED'
}
