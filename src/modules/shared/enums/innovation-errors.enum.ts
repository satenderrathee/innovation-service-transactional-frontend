export enum InnovationErrorsEnum {
  INNOVATION_INFO_EMPTY_INPUT = 'I.0001',
  INNOVATION_NOT_FOUND = 'I.0002',
  INNOVATION_ALREADY_EXISTS = 'I.0003',

  INNOVATION_WITH_INVALID_ASSESSMENTS = 'I.0004',
  INNOVATION_CANNOT_REQUEST_REASSESSMENT = 'I.0005',

  INNOVATION_WIDTHRAW_ERROR = 'I.0010',

  INNOVATION_TRANSFER_ALREADY_EXISTS = 'I.0020',
  INNOVATION_TRANSFER_REQUESTED_FOR_SELF = 'I.0021',
  INNOVATION_TRANSFER_NOT_FOUND = 'I.0022',

  INNOVATION_NO_SECTIONS = 'I.0030',
  INNOVATION_SECTION_NOT_FOUND = 'I.0031',
  INNOVATION_SECTION_WITH_UNPROCESSABLE_STATUS = 'I.0032',
  INNOVATION_SECTIONS_INCOMPLETE = 'I.0033',
  INNOVATION_SECTIONS_CONFIG_UNAVAILABLE = 'I.0034',
  INNOVATION_SECTIONS_CONFIG_LOOKUP_NOT_ARRAY = 'I.0035',

  INNOVATION_SUPPORT_NOT_FOUND = 'I.0040',
  INNOVATION_SUPPORT_WITH_UNPROCESSABLE_ORGANISATION_UNIT = 'I.0041',
  INNOVATION_SUPPORT_ALREADY_EXISTS = 'I.0042',
  INNOVATION_SUPPORT_LOG_ERROR = 'I.0043',

  INNOVATION_FILE_DELETE_ERROR = 'I.0050',

  INNOVATION_EVIDENCE_NOT_FOUND = 'I.0060',

  INNOVATION_ACTIVITY_LOG_ERROR = 'IAL.0070',
  INNOVATION_ACTIVITY_LOG_INVALID_ITEM = 'IAL.0071',

  INNOVATION_ASSESSMENT_NOT_FOUND = 'IA.0080',
  INNOVATION_ASSESSMENT_ALREADY_EXISTS = 'IA.0081',

  INNOVATION_THREAD_NOT_FOUND = 'IT.0001',
  INNOVATION_THREAD_CREATION_FAILED = 'IT.0003',

  INNOVATION_THREAD_MESSAGE_NOT_FOUND = 'ITM.0001',
  INNOVATION_THREAD_MESSAGE_NOT_EDITABLE = 'ITM.0002',
  INNOVATION_THREAD_MESSAGE_EDIT_UNAUTHORIZED = 'ITM.0003',

  INNOVATION_ACTION_NOT_FOUND = 'IA.0090',
  INNOVATION_ACTION_WITH_UNPROCESSABLE_STATUS = 'IA.0091',
  INNOVATION_ACTION_NOT_CREATED_BY_USER = 'IA.0092',

  INNOVATION_SHARING_PREFERENCES_UPDATE = 'ISP.0001',

  INNOVATION_SURVEY_ID_NOT_FOUND = 'ISU.0001',

  INNOVATION_EXPORT_REQUEST_ALREADY_EXISTS = 'IER.0001',
  INNOVATION_EXPORT_REQUEST_NOT_FOUND = 'IER.0002',
  INNOVATION_RECORD_EXPORT_REQUEST_FROM_DIFFERENT_UNIT = 'IER.0003',
  INNOVATION_RECORD_EXPORT_REQUEST_REJECT_REASON_REQUIRED = 'IER.0004',
  INNOVATION_RECORD_EXPORT_REQUEST_EXPIRED = 'IER.0005',

  INNOVATION_FILE_NOT_FOUND = 'IF.0001',
  INNOVATION_FILE_ON_INNOVATION_SECTION_MUST_BE_UPLOADED_BY_INNOVATOR = 'IF.0002',
  INNOVATION_FILE_NO_PERMISSION_TO_DELETE = 'IF.0003',
  INNOVATION_MAX_ALLOWED_FILES_REACHED = 'IF.0004'
}
