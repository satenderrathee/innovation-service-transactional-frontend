export enum NotificationCategoryTypeEnum {
  //TO DO: check the order for side menu
  NEEDS_ASSESSMENT = 'NEEDS_ASSESSMENT', // QA, A, NA, Innovator
  INNOVATION_MANAGEMENT = 'INNOVATION_MANAGEMENT', // QA, A, NA, Innovator
  SUPPORT = 'SUPPORT', // QA, A, Innovator
  TASK = 'TASK', // QA, A, NA, Innovator
  MESSAGES = 'MESSAGES', // QA, A, NA, Innovator
  DOCUMENTS = 'DOCUMENTS', // Innovator
  ORGANISATION_SUGGESTIONS = 'ORGANISATION_SUGGESTIONS', // QA, Innovator
  ADMIN = 'ADMIN', // QA, A, Innovator
  ACCOUNT = 'ACCOUNT', // Innovator
  AUTOMATIC = 'AUTOMATIC', // QA , A, Innovator
  NOTIFY_ME = 'NOTIFY_ME' // QA, A
}

export const QANotificationCategories = [
  NotificationCategoryTypeEnum.ORGANISATION_SUGGESTIONS,
  NotificationCategoryTypeEnum.SUPPORT,
  NotificationCategoryTypeEnum.MESSAGES,
  NotificationCategoryTypeEnum.TASK,
  NotificationCategoryTypeEnum.INNOVATION_MANAGEMENT,
  NotificationCategoryTypeEnum.ADMIN,
  NotificationCategoryTypeEnum.AUTOMATIC,
  NotificationCategoryTypeEnum.NOTIFY_ME
];

export const ANotificationCategories = [
  NotificationCategoryTypeEnum.SUPPORT,
  NotificationCategoryTypeEnum.MESSAGES,
  NotificationCategoryTypeEnum.TASK,
  NotificationCategoryTypeEnum.INNOVATION_MANAGEMENT,
  NotificationCategoryTypeEnum.ADMIN,
  NotificationCategoryTypeEnum.AUTOMATIC,
  NotificationCategoryTypeEnum.NOTIFY_ME
];

export const NANotificationCategories = [
  NotificationCategoryTypeEnum.NEEDS_ASSESSMENT,
  NotificationCategoryTypeEnum.MESSAGES,
  NotificationCategoryTypeEnum.TASK,
  NotificationCategoryTypeEnum.INNOVATION_MANAGEMENT
];

export const InnovatorNotificationCategories = [
  NotificationCategoryTypeEnum.INNOVATION_MANAGEMENT,
  NotificationCategoryTypeEnum.NEEDS_ASSESSMENT,
  NotificationCategoryTypeEnum.SUPPORT,
  NotificationCategoryTypeEnum.ORGANISATION_SUGGESTIONS,
  NotificationCategoryTypeEnum.MESSAGES,
  NotificationCategoryTypeEnum.TASK,
  NotificationCategoryTypeEnum.DOCUMENTS,
  NotificationCategoryTypeEnum.AUTOMATIC,
  NotificationCategoryTypeEnum.ADMIN
];

export enum NotificationContextDetailEnum {
  // TASK
  TA01_TASK_CREATION_TO_INNOVATOR = 'TA01_TASK_CREATION_TO_INNOVATOR',
  TA02_TASK_RESPONDED_TO_OTHER_INNOVATORS = 'TA02_TASK_RESPONDED_TO_OTHER_INNOVATORS',
  TA03_TASK_DONE_TO_ACCESSOR_OR_ASSESSMENT = 'TA03_TASK_DONE_TO_ACCESSOR_OR_ASSESSMENT',
  TA04_TASK_DECLINED_TO_ACCESSOR_OR_ASSESSMENT = 'TA04_TASK_DECLINED_TO_ACCESSOR_OR_ASSESSMENT',
  TA05_TASK_CANCELLED_TO_INNOVATOR = 'TA05_TASK_CANCELLED_TO_INNOVATOR',
  TA06_TASK_REOPEN_TO_INNOVATOR = 'TA06_TASK_REOPEN_TO_INNOVATOR',
  // DOCUMENTS
  DC01_UPLOADED_DOCUMENT_TO_INNOVATOR = 'DC01_UPLOADED_DOCUMENT_TO_INNOVATOR',
  // MESSAGES
  ME01_THREAD_CREATION = 'ME01_THREAD_CREATION',
  ME02_THREAD_ADD_FOLLOWERS = 'ME02_THREAD_ADD_FOLLOWERS',
  ME03_THREAD_MESSAGE_CREATION = 'ME03_THREAD_MESSAGE_CREATION',
  // SUPPORT
  ST01_SUPPORT_STATUS_TO_ENGAGING = 'ST01_SUPPORT_STATUS_TO_ENGAGING',
  ST02_SUPPORT_STATUS_TO_OTHER = 'ST02_SUPPORT_STATUS_TO_OTHER',
  ST03_SUPPORT_STATUS_TO_WAITING = 'ST03_SUPPORT_STATUS_TO_WAITING',
  ST04_SUPPORT_NEW_ASSIGNED_ACCESSORS_TO_INNOVATOR = 'ST04_SUPPORT_NEW_ASSIGNED_ACCESSORS_TO_INNOVATOR',
  ST05_SUPPORT_NEW_ASSIGNED_ACCESSOR_TO_NEW_QA = 'ST05_SUPPORT_NEW_ASSIGNED_ACCESSOR_TO_NEW_QA',
  ST06_SUPPORT_NEW_ASSIGNED_ACCESSOR_TO_OLD_QA = 'ST06_SUPPORT_NEW_ASSIGNED_ACCESSOR_TO_OLD_QA',
  ST07_SUPPORT_STATUS_CHANGE_REQUEST = 'ST07_SUPPORT_STATUS_CHANGE_REQUEST',
  SS01_SUPPORT_SUMMARY_UPDATE_TO_INNOVATORS = 'SS01_SUPPORT_SUMMARY_UPDATE_TO_INNOVATORS',
  SS02_SUPPORT_SUMMARY_UPDATE_TO_OTHER_ENGAGING_ACCESSORS = 'SS02_SUPPORT_SUMMARY_UPDATE_TO_OTHER_ENGAGING_ACCESSORS',
  // NEEDS ASSESSMENT
  NA01_INNOVATOR_SUBMITS_FOR_NEEDS_ASSESSMENT_TO_INNOVATOR = 'NA01_INNOVATOR_SUBMITS_FOR_NEEDS_ASSESSMENT_TO_INNOVATOR',
  NA02_INNOVATOR_SUBMITS_FOR_NEEDS_ASSESSMENT_TO_ASSESSMENT = 'NA02_INNOVATOR_SUBMITS_FOR_NEEDS_ASSESSMENT_TO_ASSESSMENT',
  NA03_NEEDS_ASSESSMENT_STARTED_TO_INNOVATOR = 'NA03_NEEDS_ASSESSMENT_STARTED_TO_INNOVATOR',
  NA04_NEEDS_ASSESSMENT_COMPLETE_TO_INNOVATOR = 'NA04_NEEDS_ASSESSMENT_COMPLETE_TO_INNOVATOR',
  NA06_NEEDS_ASSESSOR_REMOVED = 'NA06_NEEDS_ASSESSOR_REMOVED',
  NA07_NEEDS_ASSESSOR_ASSIGNED = 'NA07_NEEDS_ASSESSOR_ASSIGNED',
  // ORGANISATIONS SUGGESTIONS
  OS01_UNITS_SUGGESTION_TO_SUGGESTED_UNITS_QA = 'OS01_UNITS_SUGGESTION_TO_SUGGESTED_UNITS_QA',
  OS02_UNITS_SUGGESTION_NOT_SHARED_TO_INNOVATOR = 'OS02_UNITS_SUGGESTION_NOT_SHARED_TO_INNOVATOR',
  OS03_INNOVATION_DELAYED_SHARED_SUGGESTION = 'OS03_INNOVATION_DELAYED_SHARED_SUGGESTION',
  // INNOVATION MANAGEMENT
  RE01_EXPORT_REQUEST_SUBMITTED = 'RE01_EXPORT_REQUEST_SUBMITTED',
  RE02_EXPORT_REQUEST_APPROVED = 'RE02_EXPORT_REQUEST_APPROVED',
  RE03_EXPORT_REQUEST_REJECTED = 'RE03_EXPORT_REQUEST_REJECTED',
  AI01_INNOVATION_ARCHIVED_TO_SELF = 'AI01_INNOVATION_ARCHIVED_TO_SELF',
  AI02_INNOVATION_ARCHIVED_TO_COLLABORATORS = 'AI02_INNOVATION_ARCHIVED_TO_COLLABORATORS',
  AI03_INNOVATION_ARCHIVED_TO_ENGAGING_QA_A = 'AI03_INNOVATION_ARCHIVED_TO_ENGAGING_QA_A',
  AI04_INNOVATION_ARCHIVED_TO_NA_DURING_NEEDS_ASSESSMENT = 'AI04_INNOVATION_ARCHIVED_TO_NA_DURING_NEEDS_ASSESSMENT',
  SH04_INNOVATION_STOPPED_SHARING_WITH_INDIVIDUAL_ORG_TO_OWNER = 'SH04_INNOVATION_STOPPED_SHARING_WITH_INDIVIDUAL_ORG_TO_OWNER',
  SH05_INNOVATION_STOPPED_SHARING_WITH_INDIVIDUAL_ORG_TO_QA_A = 'SH05_INNOVATION_STOPPED_SHARING_WITH_INDIVIDUAL_ORG_TO_QA_A',
  DA01_OWNER_DELETED_ACCOUNT_WITH_PENDING_TRANSFER_TO_COLLABORATOR = 'DA01_OWNER_DELETED_ACCOUNT_WITH_PENDING_TRANSFER_TO_COLLABORATOR',
  DA02_OWNER_DELETED_ACCOUNT_WITHOUT_PENDING_TRANSFER_TO_COLLABORATOR = 'DA02_OWNER_DELETED_ACCOUNT_WITHOUT_PENDING_TRANSFER_TO_COLLABORATOR',
  MC01_COLLABORATOR_INVITE_EXISTING_USER = 'MC01_COLLABORATOR_INVITE_EXISTING_USER',
  MC03_COLLABORATOR_UPDATE_CANCEL_INVITE = 'MC03_COLLABORATOR_UPDATE_CANCEL_INVITE',
  MC04_COLLABORATOR_UPDATE_ACCEPTS_INVITE = 'MC04_COLLABORATOR_UPDATE_ACCEPTS_INVITE',
  MC05_COLLABORATOR_UPDATE_DECLINES_INVITE = 'MC05_COLLABORATOR_UPDATE_DECLINES_INVITE',
  MC06_COLLABORATOR_UPDATE_REMOVED_COLLABORATOR = 'MC06_COLLABORATOR_UPDATE_REMOVED_COLLABORATOR',
  MC07_COLLABORATOR_UPDATE_COLLABORATOR_LEFT_TO_INNOVATORS = 'MC07_COLLABORATOR_UPDATE_COLLABORATOR_LEFT_TO_INNOVATORS',
  MC08_COLLABORATOR_UPDATE_COLLABORATOR_LEFT_TO_SELF = 'MC08_COLLABORATOR_UPDATE_COLLABORATOR_LEFT_TO_SELF',
  TO02_TRANSFER_OWNERSHIP_EXISTING_USER = 'TO02_TRANSFER_OWNERSHIP_EXISTING_USER',
  TO06_TRANSFER_OWNERSHIP_ACCEPTS_PREVIOUS_OWNER = 'TO06_TRANSFER_OWNERSHIP_ACCEPTS_PREVIOUS_OWNER',
  TO07_TRANSFER_OWNERSHIP_ACCEPTS_ASSIGNED_ACCESSORS = 'TO07_TRANSFER_OWNERSHIP_ACCEPTS_ASSIGNED_ACCESSORS',
  TO08_TRANSFER_OWNERSHIP_DECLINES_PREVIOUS_OWNER = 'TO08_TRANSFER_OWNERSHIP_DECLINES_PREVIOUS_OWNER',
  TO09_TRANSFER_OWNERSHIP_CANCELED_NEW_OWNER = 'TO09_TRANSFER_OWNERSHIP_CANCELED_NEW_OWNER',
  // ADMIN
  AP02_INNOVATOR_LOCKED_TO_ASSIGNED_USERS = 'AP02_INNOVATOR_LOCKED_TO_ASSIGNED_USERS',
  AP07_UNIT_INACTIVATED_TO_ENGAGING_INNOVATIONS = 'AP07_UNIT_INACTIVATED_TO_ENGAGING_INNOVATIONS',
  // AUTOMATIC
  AU01_INNOVATOR_INCOMPLETE_RECORD = 'AU01_INNOVATOR_INCOMPLETE_RECORD',
  AU02_ACCESSOR_IDLE_ENGAGING_SUPPORT = 'AU02_ACCESSOR_IDLE_ENGAGING_SUPPORT',
  AU03_INNOVATOR_IDLE_SUPPORT = 'AU03_INNOVATOR_IDLE_SUPPORT',
  AU04_SUPPORT_KPI_REMINDER = 'AU04_SUPPORT_KPI_REMINDER',
  AU05_SUPPORT_KPI_OVERDUE = 'AU05_SUPPORT_KPI_OVERDUE',
  AU06_ACCESSOR_IDLE_WAITING = 'AU06_ACCESSOR_IDLE_WAITING',
  AU08_TRANSFER_ONE_WEEK_REMINDER_EXISTING_USER = 'AU08_TRANSFER_ONE_WEEK_REMINDER_EXISTING_USER',
  AU09_TRANSFER_EXPIRED = 'AU09_TRANSFER_EXPIRED',
  AU10_ACCESSOR_IDLE_ENGAGING_SUPPORT_FOR_SIX_WEEKS = 'AU10_ACCESSOR_IDLE_ENGAGING_SUPPORT_FOR_SIX_WEEKS',
  // NOTIFY ME
  SUPPORT_UPDATED = 'SUPPORT_UPDATED'
}
