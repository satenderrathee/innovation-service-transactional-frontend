export enum NotificationContextTypeEnum {
  NEEDS_ASSESSMENT = 'NEEDS_ASSESSMENT',
  INNOVATION = 'INNOVATION',
  SUPPORT = 'SUPPORT',
  ACTION = 'ACTION',
  THREAD = 'THREAD',
  // COMMENT = 'COMMENT'
  // DATA_SHARING = 'DATA_SHARING'
}

export enum NotificationContextDetailEnum {
  LOCK_USER = 'LOCK_USER',
  // COMMENT_CREATION = 'COMMENT_CREATION',
  // COMMENT_REPLY = 'COMMENT_REPLY',
  THREAD_CREATION = 'THREAD_CREATION',
  THREAD_MESSAGE_CREATION = 'THREAD_MESSAGE_CREATION',
  ACTION_CREATION = 'ACTION_CREATION',
  ACTION_UPDATE = 'ACTION_UPDATE',
  NEEDS_ASSESSMENT_STARTED = 'NEEDS_ASSESSMENT_STARTED',
  NEEDS_ASSESSMENT_COMPLETED = 'NEEDS_ASSESSMENT_COMPLETED',
  NEEDS_ASSESSMENT_COMPLETED_TO_INNOVATOR = 'NEEDS_ASSESSMENT_COMPLETED_TO_INNOVATOR',
  NEEDS_ASSESSMENT_ORGANISATION_SUGGESTION = 'NEEDS_ASSESSMENT_ORGANISATION_SUGGESTION',
  INNOVATION_SUBMISSION = 'INNOVATION_SUBMISSION',
  SUPPORT_STATUS_UPDATE = 'SUPPORT_STATUS_UPDATE',
  COLLABORATOR_INVITE = 'COLLABORATOR_INVITE',
  COLLABORATOR_UPDATE = 'COLLABORATOR_UPDATE',
  TRANSFER_PENDING = 'TRANSFER_PENDING',
  TRANSFER_REMINDER = 'TRANSFER_REMINDER',
  TRANSFER_EXPIRED = 'TRANSFER_EXPIRED',
  INNOVATION_WITHDRAWN = 'INNOVATION_WITHDRAWN',
}
