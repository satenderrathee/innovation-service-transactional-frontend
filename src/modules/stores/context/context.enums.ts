export enum NotificationCategoryTypeEnum {
  TASK = 'TASK',
  DOCUMENTS = 'DOCUMENTS',
  MESSAGES = 'MESSAGES',
  SUPPORT = 'SUPPORT',
  NEEDS_ASSESSMENT = 'NEEDS_ASSESSMENT',
  ORGANISATION_SUGGESTIONS = 'ORGANISATION_SUGGESTIONS',
  INNOVATION_MANAGEMENT = 'INNOVATION_MANAGEMENT',
  ADMIN = 'ADMIN',
  ACCOUNT = 'ACCOUNT',
  AUTOMATIC = 'AUTOMATIC',

  //TO DO - DELETE OLD ONES
  INNOVATION = 'INNOVATION',
  REMINDER = 'REMINDER',
  THREAD = 'THREAD',
  SUPPORT_SUMMARY = 'SUPPORT_SUMMARY',
  SUGGEST_SUPPORT = 'SUGGEST_SUPPORT',
  // COMMENT = 'COMMENT'
  DATA_SHARING = 'DATA_SHARING'
}

export enum NotificationContextDetailEnum {
  LOCK_USER = 'LOCK_USER',

  //// To be removed?
  // COMMENT_CREATION = 'COMMENT_CREATION',
  // COMMENT_REPLY = 'COMMENT_REPLY',
  //// OLD - TO BE DELETED
  THREAD_CREATION = 'THREAD_CREATION',
  THREAD_MESSAGE_CREATION = 'THREAD_MESSAGE_CREATION',
  TASK_CREATION = 'TASK_CREATION',
  TASK_UPDATE = 'TASK_UPDATE',
  NEEDS_ASSESSMENT_STARTED = 'NEEDS_ASSESSMENT_STARTED',
  NEEDS_ASSESSMENT_COMPLETED = 'NEEDS_ASSESSMENT_COMPLETED',
  NEEDS_ASSESSMENT_COMPLETED_TO_INNOVATOR = 'NEEDS_ASSESSMENT_COMPLETED_TO_INNOVATOR',
  NEEDS_ASSESSMENT_ORGANISATION_SUGGESTION = 'NEEDS_ASSESSMENT_ORGANISATION_SUGGESTION',
  INNOVATION_SUBMISSION = 'INNOVATION_SUBMISSION',
  INNOVATION_SUBMISSION_TO_INNOVATORS = 'INNOVATION_SUBMISSION_TO_INNOVATORS',
  INNOVATION_SUBMISSION_REASSESSMENT = 'INNOVATION_SUBMISSION_REASSESSMENT',
  SUPPORT_STATUS_UPDATE = 'SUPPORT_STATUS_UPDATE',
  SUPPORT_SUMMARY_UPDATE = 'SUPPORT_SUMMARY_UPDATE',
  COLLABORATOR_INVITE = 'COLLABORATOR_INVITE',
  COLLABORATOR_UPDATE = 'COLLABORATOR_UPDATE',
  TRANSFER_PENDING = 'TRANSFER_PENDING',
  TRANSFER_REMINDER = 'TRANSFER_REMINDER',
  TRANSFER_EXPIRED = 'TRANSFER_EXPIRED',
  INNOVATION_WITHDRAWN = 'INNOVATION_WITHDRAWN',
  INNOVATION_ORGANISATION_SUGGESTION_NOT_SHARED = 'INNOVATION_ORGANISATION_SUGGESTION_NOT_SHARED',
  // NEW - TASK
  TA01_TASK_CREATION_TO_INNOVATOR = 'TA01_TASK_CREATION_TO_INNOVATOR',
  TA02_TASK_RESPONDED_TO_OTHER_INNOVATORS = 'TA02_TASK_RESPONDED_TO_OTHER_INNOVATORS',
  TA03_TASK_DONE_TO_ACCESSOR_OR_ASSESSMENT = 'TA03_TASK_DONE_TO_ACCESSOR_OR_ASSESSMENT',
  TA04_TASK_DECLINED_TO_ACCESSOR_OR_ASSESSMENT = 'TA04_TASK_DECLINED_TO_ACCESSOR_OR_ASSESSMENT',
  TA05_TASK_CANCELLED_TO_INNOVATOR = 'TA05_TASK_CANCELLED_TO_INNOVATOR',
  TA06_TASK_REOPEN_TO_INNOVATOR = 'TA06_TASK_REOPEN_TO_INNOVATOR',
  // New - DOCUMENT
  DC01_UPLOADED_DOCUMENT_TO_INNOVATOR = 'DC01_UPLOADED_DOCUMENT_TO_INNOVATOR',
  // New - SUPPORT
  ST01_SUPPORT_STATUS_TO_ENGAGING = 'ST01_SUPPORT_STATUS_TO_ENGAGING',
  ST02_SUPPORT_STATUS_TO_OTHER = 'ST02_SUPPORT_STATUS_TO_OTHER',
  ST03_SUPPORT_STATUS_TO_WAITING = 'ST03_SUPPORT_STATUS_TO_WAITING',
  ST04_SUPPORT_NEW_ASSIGNED_ACCESSORS_TO_INNOVATOR = 'ST04_SUPPORT_NEW_ASSIGNED_ACCESSORS_TO_INNOVATOR',
  ST05_SUPPORT_NEW_ASSIGNED_ACCESSOR_TO_NEW_QA = 'ST05_SUPPORT_NEW_ASSIGNED_ACCESSOR_TO_NEW_QA',
  ST06_SUPPORT_NEW_ASSIGNED_ACCESSOR_TO_OLD_QA = 'ST06_SUPPORT_NEW_ASSIGNED_ACCESSOR_TO_OLD_QA',
  ST07_SUPPORT_STATUS_CHANGE_REQUEST = 'ST07_SUPPORT_STATUS_CHANGE_REQUEST',
  // New - NEEDS ASSESSMENT
  NA01_INNOVATOR_SUBMITS_FOR_NEEDS_ASSESSMENT_TO_INNOVATOR = 'NA01_INNOVATOR_SUBMITS_FOR_NEEDS_ASSESSMENT_TO_INNOVATOR',
  NA02_INNOVATOR_SUBMITS_FOR_NEEDS_ASSESSMENT_TO_ASSESSMENT = 'NA02_INNOVATOR_SUBMITS_FOR_NEEDS_ASSESSMENT_TO_ASSESSMENT',
  NA03_NEEDS_ASSESSMENT_STARTED_TO_INNOVATOR = 'NA03_NEEDS_ASSESSMENT_STARTED_TO_INNOVATOR',
  NA04_NEEDS_ASSESSMENT_COMPLETE_TO_INNOVATOR = 'NA04_NEEDS_ASSESSMENT_COMPLETE_TO_INNOVATOR',
  NA05_NEEDS_ASSESSOR_REMOVED = 'NA05_NEEDS_ASSESSOR_REMOVED',
  NA06_NEEDS_ASSESSOR_REMOVED = 'NA06_NEEDS_ASSESSOR_REMOVED',
  NA07_NEEDS_ASSESSOR_ASSIGNED = 'NA07_NEEDS_ASSESSOR_ASSIGNED',
  // New - AUTOMATIC
  AU01_INNOVATOR_INCOMPLETE_RECORD = 'AU01_INNOVATOR_INCOMPLETE_RECORD',
  AU02_ACCESSOR_IDLE_ENGAGING_SUPPORT = 'AU02_ACCESSOR_IDLE_ENGAGING_SUPPORT',
  AU04_SUPPORT_KPI_REMINDER = 'AU04_SUPPORT_KPI_REMINDER',
  AU05_SUPPORT_KPI_OVERDUE = 'AU05_SUPPORT_KPI_OVERDUE',
  AU08_TRANSFER_ONE_WEEK_REMINDER_EXISTING_USER = 'AU08_TRANSFER_ONE_WEEK_REMINDER_EXISTING_USER',
  AU09_TRANSFER_EXPIRED = 'AU09_TRANSFER_EXPIRED',
  // New - ORGANISATIONS SUGGESTIONS
  OS01_UNITS_SUGGESTION_TO_SUGGESTED_UNITS_QA = 'OS01_UNITS_SUGGESTION_TO_SUGGESTED_UNITS_QA',
  OS02_UNITS_SUGGESTION_NOT_SHARED_TO_INNOVATOR = 'OS02_UNITS_SUGGESTION_NOT_SHARED_TO_INNOVATOR',
  OS03_INNOVATION_DELAYED_SHARED_SUGGESTION = 'OS03_INNOVATION_DELAYED_SHARED_SUGGESTION',
  // New - SUPPORT SUMMARY
  SS01_SUPPORT_SUMMARY_UPDATE_TO_INNOVATORS = 'SS01_SUPPORT_SUMMARY_UPDATE_TO_INNOVATORS',
  SS02_SUPPORT_SUMMARY_UPDATE_TO_OTHER_ENGAGING_ACCESSORS = 'SS02_SUPPORT_SUMMARY_UPDATE_TO_OTHER_ENGAGING_ACCESSORS',
  // New - INNOVATION MANAGEMENT
  RE01_EXPORT_REQUEST_SUBMITTED = 'RE01_EXPORT_REQUEST_SUBMITTED',
  RE02_EXPORT_REQUEST_APPROVED = 'RE02_EXPORT_REQUEST_APPROVED',
  RE03_EXPORT_REQUEST_REJECTED = 'RE03_EXPORT_REQUEST_REJECTED',
  WI01_INNOVATION_WITHDRAWN = 'WI01_INNOVATION_WITHDRAWN',
  SH01_INNOVATION_STOPPED_SHARED_TO_ASSIGNED_USERS = 'SH01_INNOVATION_STOPPED_SHARED_TO_ASSIGNED_USERS',
  SH03_INNOVATION_STOPPED_SHARED_TO_SELF = 'SH03_INNOVATION_STOPPED_SHARED_TO_SELF',
  DA01_OWNER_DELETED_ACCOUNT_WITH_PENDING_TRANSFER_TO_COLLABORATOR = 'DA01_OWNER_DELETED_ACCOUNT_WITH_PENDING_TRANSFER_TO_COLLABORATOR',
  TO01_TRANSFER_OWNERSHIP_NEW_USER = 'TO01_TRANSFER_OWNERSHIP_NEW_USER',
  TO02_TRANSFER_OWNERSHIP_EXISTING_USER = 'TO02_TRANSFER_OWNERSHIP_EXISTING_USER',
  TO06_TRANSFER_OWNERSHIP_ACCEPTS_PREVIOUS_OWNER = 'TO06_TRANSFER_OWNERSHIP_ACCEPTS_PREVIOUS_OWNER',
  TO07_TRANSFER_OWNERSHIP_ACCEPTS_ASSIGNED_ACCESSORS = 'TO07_TRANSFER_OWNERSHIP_ACCEPTS_ASSIGNED_ACCESSORS',
  TO08_TRANSFER_OWNERSHIP_DECLINES_PREVIOUS_OWNER = 'TO08_TRANSFER_OWNERSHIP_DECLINES_PREVIOUS_OWNER',
  TO09_TRANSFER_OWNERSHIP_CANCELED_NEW_OWNER = 'TO09_TRANSFER_OWNERSHIP_CANCELED_NEW_OWNER',
  MC01_COLLABORATOR_INVITE_EXISTING_USER = 'MC01_COLLABORATOR_INVITE_EXISTING_USER',
  // New - ADMIN
  AP02_INNOVATOR_LOCKED_TO_ASSIGNED_USERS = 'AP02_INNOVATOR_LOCKED_TO_ASSIGNED_USERS',
  AP07_UNIT_INACTIVATED_TO_ENGAGING_INNOVATIONS = 'AP07_UNIT_INACTIVATED_TO_ENGAGING_INNOVATIONS'


}
