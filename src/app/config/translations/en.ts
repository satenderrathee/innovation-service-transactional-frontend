export const locale = {
  lang: 'en',
  data: {

    // Global app/configuration translations.
    app: {
      title: 'NHS Innovation Service',

      date_formats: {
        full_date_time: 'EEEE, MMMM d, y \'at\' h:mm:ss a',
        long_date_time: 'd MMMM y \'at\' h:mm a',
        medium_date_time: 'd MMM y \'at\' h:mm a',
        short_date_time: 'd/M/yy \'at\' h:mm a',
        long_date: 'd MMMM y',
        medium_date: 'd MMM y',
        short_date: 'd mm y',
        medium_time: 'h:mm:ss a',
        short_seconds: 'd/M/yy, h:mm:ss a'
      }

    },

    // Single words, ALWAYS lowercased.
    dictionary: {
      organisation: {
        none: 'organisation',
        singular: 'organisation',
        plural: 'organisations'
      },
      section: {
        none: 'section',
        singular: 'section',
        plural: 'sections'
      },
      task: {
        none: 'task',
        singular: 'task',
        plural: 'tasks'
      },
      day: {
        none: 'day',
        singular: 'day',
        plural: 'days'
      },
      request: {
        none: 'request',
        singular: 'request',
        plural: 'requests'
      },
      unit: {
        none: 'units',
        singular: 'unit',
        plural: 'units'
      },
      user: {
        none: 'users',
        singular: 'user',
        plural: 'users'
      },
      yes: 'yes'
    },

    // Labels.
    labels: {

    },

    // Forms (fields) related translations.
    forms: {
      address: { label: 'Address' }
    },

    messages: {
      errors: {},
      informations: {
        fetching_information: 'Please wait while we fetch information from server.'
      },
      notifications: {},
      warnings: {}
    },

    // Specific translations to specific features (modules).
    features: {

      shared_pages: {
        page_error: {
          forbidden_innovation: {
            title: 'It appears that something went wrong!',
            message: 'You don\'t have access to the requested innovation. Changes in the innovation status may have caused this situation.',
            button_label: 'Go back to home'
          },
          forbidden_collaborator: {
            title: 'Something went wrong',
            message: 'Your invitation to collaborate on this innovation is no longer valid.',
            button_label: 'Go back to home'
          },
          generic: {
            title: 'It appears that something went wrong!',
            message: 'The operation you are trying to do is no longer available.',
            button_label: 'Go back to home'
          },
          unauthenticated: {
            title: 'It appears that something went wrong!',
            message: 'It seems that you don\'t have access to the service. Please contact us for further help.',
            button_label: 'Go back to home'
          },
          forbidden_manage_innovation_resources: {
            title: 'It appears that something went wrong!',
            message: 'Only the innovation owner can access the requested resource.',
            button_label: 'Go back to home'
          },
          forbidden_manage_access: {
            title: 'It appears that something went wrong!',
            message: 'Only the collaborator can access the requested resource.',
            button_label: 'Go back to home'
          }
        },
        page_not_found: {
          title: 'It appears that something went wrong!',
          message: 'Give us time while we investigate what happened that took you to here.',
          button_label: 'Go back to home'
        }
      },

      admin: {
        organisation_unit: {
          innovations: {
            none: `0 innovations associated to this organisation unit`,
            plural: `{{ count }} innovations associated to this organisation unit`,
            singular: '1 innovation associated to this organisation unit'
          },
          users: {
            none: `0 users associated to this organisation unit`,
            plural: `{{ count }} users associated to this organisation unit`,
            singular: '1 user associated to this organisation unit'
          }
        }
      }

    },

    // Shared translations to serve external / catalog modules.
    shared: {

      catalog: {
        announcements: {
          status: {
            SCHEDULED: { name: 'Scheduled', cssColorClass: 'nhsuk-tag--yellow' },
            ACTIVE: { name: 'Active', cssColorClass: 'nhsuk-tag--green' },
            DONE: { name: 'Done', cssColorClass: 'nhsuk-tag--grey' },
          }
        },
        assessment_exemptions: {
          reasons: {
            NO_RESPONSE: 'No response or inadequate response from innovator',
            TECHNICAL_DIFFICULTIES: 'Technical difficulties contacting the innovator',
            INCORRECT_DETAILS: 'Incorrect contact details',
            SERVICE_UNAVAILABLE: 'NHS Innovation Service system failure with no available workaround',
            CAPACITY: 'Capacity'
          },
          status: {
            ALMOST_DUE: { label: 'Almost due', cssColorClass: 'nhsuk-tag--yellow' },
            OVERDUE: { label: 'Overdue', cssColorClass: 'nhsuk-tag--red' },
            EXEMPT: { label: 'Exempt', cssColorClass: 'nhsuk-tag--grey' }
          }
        },
        documents: {
          contextType: {
            INNOVATION: 'Documents',
            INNOVATION_SECTION: 'Innovation section',
            INNOVATION_EVIDENCE: 'Innovation evidence',
            INNOVATION_PROGRESS_UPDATE: 'Support summary'
          }
        },
        innovation: {
          task_status: {
            OPEN: {
              name: 'Task to do',
              description: 'A task has been assigned to the innovator.',
              cssColorClass: 'nhsuk-tag--blue',
            },
            DONE: {
              name: 'Done',
              description: 'The innovator has submitted the requested information and has marked the task as done.',
              cssColorClass: 'nhsuk-tag--green',
            },
            DECLINED: {
              name: 'Declined',
              description: 'The innovator has declined the assigned task.',
              cssColorClass: 'nhsuk-tag--yellow'
            },
            CANCELLED: {
              name: 'Cancelled',
              description: 'The assigned task has been cancelled as it is no longer relevant.',
              cssColorClass: 'nhsuk-tag--grey'
            },
          },
          activity_log_groups: {
            INNOVATION_MANAGEMENT: {
              title: 'Innovation management',
              description: 'Innovator activities regarding ownership and sharing preferences'
            },
            INNOVATION_RECORD: {
              title: 'Innovation record',
              description: 'Activities regarding the innovation information update'
            },
            NEEDS_ASSESSMENT: {
              title: 'Needs assessment',
              description: 'Needs assessment activities'
            },
            SUPPORT: {
              title: 'Support',
              description: 'Organisations related activities'
            },
            TASKS: {
              title: 'Tasks',
              description: ''
            },
            COMMENTS: {
              title: 'Comments',
              description: ''
            },
            THREADS: {
              title: 'Messages',
              description: ''
            }
          },
          activity_log_items: {
            INNOVATION_CREATION: {
              title: 'Innovation creation',
              message: `{{ innovationName }} created`,
            },
            OWNERSHIP_TRANSFER: {
              title: 'Ownership transfer',
              message: `Ownership was transferred from {{ interveningUserName }} to {{ actionUserName }}`
            },
            SHARING_PREFERENCES_UPDATE: {
              title: 'Sharing preferences update',
              message: `Sharing preferences changed`
            },
            SECTION_DRAFT_UPDATE: {
              title: 'Section draft update',
              message: `{{ sectionTitle }} section saved as a draft`
            },
            SECTION_DRAFT_UPDATE_DEPRECATED: {
              title: 'Section draft update',
              message: `A section from a previous innovation record version was saved as draft`
            },
            SECTION_SUBMISSION: {
              title: 'Section submission',
              message: `{{ sectionTitle }} section submitted`
            },
            SECTION_SUBMISSION_DEPRECATED: {
              title: 'Section submission',
              message: `A section from a previous innovation record version was submitted`
            },
            INNOVATION_SUBMISSION: {
              title: 'Innovation submission',
              message: `Submitted for needs assessment`,
            },
            NEEDS_ASSESSMENT_START: {
              title: 'Needs assessment start',
              message: `{{ actionUserName }} started needs assessment`
            },
            NEEDS_ASSESSMENT_COMPLETED: {
              title: 'Needs assessment completed',
              message: `{{ actionUserName }} completed needs assessment`
            },
            NEEDS_ASSESSMENT_EDITED: {
              title: 'Needs assessment edited',
              message: `{{ actionUserName }} edited needs assessment`
            },
            NEEDS_ASSESSMENT_REASSESSMENT_REQUESTED: {
              title: "Reassessment requested",
              message: `{{ actionUserName }} requested a needs reassessment`
            },
            ORGANISATION_SUGGESTION: {
              title: 'Organisation suggestion',
              message: `{{ actionUserName }} suggested one or more organisation units to support`
            },
            SUPPORT_STATUS_UPDATE: {
              title: 'Support status update',
              message: `{{ actionUserName }} changed the support status of {{ organisationUnit }}`
            },
            THREAD_CREATION: {
              title: 'New conversation',
              message: `{{ actionUserName }} created a new message with subject {{ thread.subject }}`
            },
            THREAD_MESSAGE_CREATION: {
              title: 'New messages',
              message: `{{ actionUserName }} created a new message under the conversation with subject {{ thread.subject }}`
            },
            COMMENT_CREATION: {
              title: 'Comment creation',
              message: `{{ actionUserName }} left a comment`
            },
            TASK_CREATION: {
              title: 'Task creation',
              message: `{{ actionUserName }} {{ actionUserRole }} created a task for {{ sectionTitle }} section`
            },
            TASK_CREATION_DEPRECATED: {
              title: 'Task creation',
              message: `{{ actionUserName }} {{ actionUserRole }} created a task for a section that is no longer available`
            },
            TASK_STATUS_DONE_UPDATE: {
              title: 'Task done',
              message: `{{ actionUserName }} {{ actionUserRole }} marked a task as done`
            },
            TASK_STATUS_DECLINED_UPDATE: {
              title: 'Task declined',
              message: `{{ actionUserName }} {{ actionUserRole }} declined a task from {{ interveningUserName }}`
            },
            TASK_STATUS_OPEN_UPDATE: {
              title: 'Task reopened',
              message: `{{ actionUserName }} {{ actionUserRole }} marked a task as to do`
            },
            TASK_STATUS_CANCELLED_UPDATE: {
              title: 'Task cancelled',
              message: `{{ actionUserName }} {{ actionUserRole }} marked a task as cancelled`
            },
            INNOVATION_PAUSE: {
              title: 'Innovation stop share',
              message: `{{ actionUserName }} has stopped sharing this innovation`
            }
          },

          email_notification_preferences: {
            NEVER: {
              me: 'Never send me notifications',
              you: 'You do not get updates',
            },
            INSTANTLY: {
              me: 'Send me instant updates',
              you: 'You get instant updates',
            },
            DAILY: {
              me: 'Send me daily summary updates',
              you: 'You get daily summary updates'
            }
          },

          innovation_sections: {
            INNOVATION_DESCRIPTION: 'Description of innovation',
            VALUE_PROPOSITION: 'Value proposition',
            UNDERSTANDING_OF_NEEDS: 'Detailed understanding of needs',
            UNDERSTANDING_OF_BENEFITS: 'Detailed understanding of benefits',
            EVIDENCE_OF_EFFECTIVENESS: 'Evidence of effectiveness',
            MARKET_RESEARCH: 'Market research',
            INTELLECTUAL_PROPERTY: 'Intellectual property',
            REGULATIONS_AND_STANDARDS: 'Standards and certifications',
            CURRENT_CARE_PATHWAY: 'Current care pathway',
            TESTING_WITH_USERS: 'Testing with users',
            COST_OF_INNOVATION: 'Cost of your innovation',
            COMPARATIVE_COST_BENEFIT: 'Comparative cost benefit',
            REVENUE_MODEL: 'Revenue model',
            IMPLEMENTATION_PLAN: 'Implementation plan and deployment',
            DEPLOYMENT: 'Deployment'
          },

          notification_context_types: {
            NEEDS_ASSESSMENT: { title: { singular: 'Needs Assessment', plural: 'Needs Assessment' } },
            INNOVATION: { title: { singular: 'Innovation', plural: 'Innovations' } },
            SUPPORT: { title: { singular: 'Support status change', plural: 'Support status changes' } },
            TASK: { title: { singular: 'Task', plural: 'Tasks' } },
            THREAD: { title: { singular: 'Message', plural: 'Messages' } },
            COMMENT: { title: { singular: 'Message', plural: 'Messages' } },
            MESSAGE: { title: { singular: 'Message', plural: 'Messages' } },
            DATA_SHARING: { title: { singular: 'Data sharing', plural: 'Data sharing' } }
          },
          notification_context_details: {
            LOCK_USER: { title: `Innovation "{{ innovationName }}" owner has been locked.` },
            // COMMENT_CREATION: { title: `New comment for innovation "{{ innovationName }}"` },
            // COMMENT_REPLY: { title: `New comment reply for innovation "{{ innovationName }}"` },
            THREAD_CREATION: { title: `New conversation for innovation "{{ innovationName }}".` },
            THREAD_MESSAGE_CREATION: { title: `New message for a conversation on innovation "{{ innovationName }}".` },
            TASK_CREATION: { title: `New task for section {{ sectionNumber }} on innovation "{{ innovationName }}".` },
            TASK_UPDATE: { title: `Task {{ taskCode }} status updated to "{{ taskStatusName }}" on innovation "{{ innovationName }}".` },
            NEEDS_ASSESSMENT_STARTED: { title: `The needs assessment for innovation "{{ innovationName }}" has started.` },
            NEEDS_ASSESSMENT_COMPLETED: { title: `Innovation "{{ innovationName }}" was suggested by needs assessment.` },
            NEEDS_ASSESSMENT_COMPLETED_TO_INNOVATOR: { title: `The needs assessment for innovation "{{ innovationName }}" has been completed.` },
            NEEDS_ASSESSMENT_ORGANISATION_SUGGESTION: { title: `Assessment team suggested one or more organisations for you to share your innovation.` },
            INNOVATION_SUBMISSION: { title: `Innovation "{{ innovationName }}" is available for review.` },
            INNOVATION_SUBMISSION_TO_INNOVATORS: { title: `Innovation "{{ innovationName }}" has been submitted for a needs assessment.` },
            INNOVATION_SUBMISSION_REASSESSMENT: { title: `Innovation "{{ innovationName }}" has been submitted for a needs reassessment.` },
            SUPPORT_STATUS_UPDATE: { title: `{{ organisationUnitName }} changed the support status of innovation "{{ innovationName }}" to "{{ supportStatusName }}".` },
            SUPPORT_SUMMARY_UPDATE: { title: `{{ organisationUnitName }} has added a progress update to your support summary.` },
            INNOVATION_REASSESSMENT_REQUEST: { title: `Innovation "{{ innovationName }}" is available for reassessment review.` },
            INNOVATION_STOP_SHARING: { title: `Sharing of innovation "{{ innovationName }}" has been stopped for all supporting organisations.` },
            INNOVATION_WITHDRAWN: { title: `The innovation "{{ innovationName }}" has been withdrawn by the owner. You can no longer access this innovation.` },
            COLLABORATOR_INVITE: { title: `You have been invited to collaborate on "{{ innovationName }}" innovation by its owner {{ innovationOwnerName }}. You have 30 days to respond before the invitation expires. See invitation.` },
            COLLABORATOR_UPDATE: { title: `Your invitation to collaborate on {{ innovationName }} innovation has been cancelled.` },
            TRANSFER_PENDING: { title: `The owner of innovation {{ innovationName }} has deleted their account. Innovation awaiting new owner.` },
            TRANSFER_EXPIRED: { title: `The invitation to transfer your innovation ownership has expired. Manage your innovation.` },
            TRANSFER_REMINDER: { title: `The invitation to accept ownership of {{ innovationName }} is about to expire. Accept or decline now.` },
            INNOVATION_ORGANISATION_SUGGESTION_NOT_SHARED: { title: 'An organisation has been suggested to support your innovation but will not able to view it until you update your data sharing preferences.' }
          },
          section_status: {
            NOT_STARTED: { name: 'Not started', cssColorClass: 'nhsuk-tag--blue' },
            DRAFT: { name: 'Draft', cssColorClass: 'nhsuk-tag--yellow' },
            SUBMITTED: { name: 'Submitted', cssColorClass: 'nhsuk-tag--green' }

          },
          support_status: {
            ENGAGING: {
              name: 'Engaging',
              cssColorClass: 'nhsuk-tag--green',
              description: 'Ready to support, assess or provide guidance.',
              accessorTypeDescription: 'Your organisation is ready to actively engage with this innovation through providing support, guidance, or assessment. You have to assign at least one person from your organisation to this innovation.',
            },
            FURTHER_INFO_REQUIRED: {
              name: 'Further info',
              cssColorClass: 'nhsuk-tag--white',
              description: 'The organisation needs further information from the innovator to make a decision.',
              accessorTypeDescription: 'Further info is needed from the innovator to make a decision. You must provide a message on what information is needed.',
            },
            WAITING: {
              name: 'Waiting',
              cssColorClass: 'nhsuk-tag--yellow',
              description: 'The organisation is waiting for an internal decision to progress.',
              accessorTypeDescription: 'Waiting for an internal decision to progress.',
            },
            NOT_YET: {
              name: 'Not yet',
              cssColorClass: 'nhsuk-tag--blue',
              description: 'The innovation is not yet ready for the organisation\'s support offer.',
              accessorTypeDescription: 'The innovation is not yet ready for your support offer. You must provide a message outlining your decision.',
            },
            UNASSIGNED: {
              name: 'Unassigned',
              cssColorClass: 'nhsuk-tag--red',
              description: 'No status has been assigned yet.',
              accessorTypeDescription: 'No status assigned yet.',
            },
            UNSUITABLE: {
              name: 'Unsuitable',
              cssColorClass: 'nhsuk-tag--red',
              description: 'The organisation has no suitable support offer for the innovation.',
              accessorTypeDescription: 'You have no suitable support offer for the innovation. You must provide a message outlining your decision.',
            },
            WITHDRAWN: {
              name: 'Withdrawn',
              cssColorClass: 'nhsuk-tag--red',
              description: '',
              accessorTypeDescription: '',
            },
            COMPLETE: {
              name: 'Completed',
              cssColorClass: 'nhsuk-tag--dark-grey',
              description: 'The organisation has completed their engagement with the innovation.',
              accessorTypeDescription: 'Your organisation has completed this engagement. You must provide a message outlining your decision.',
            }
          },
          grouped_status: {
            RECORD_NOT_SHARED: {
              name: 'Record not shared',
              cssColorClass: 'nhsuk-tag--orange',
              description: 'The innovator has not yet shared the innovation record for a needs assessment review.'
            },
            AWAITING_NEEDS_ASSESSMENT: {
              name: 'Awaiting needs assessment',
              cssColorClass: 'nhsuk-tag--yellow',
              description: 'The innovation has been submitted for needs assessment. The needs assessment team must start the assessment process within 2 working days.'
            },
            NEEDS_ASSESSMENT: {
              name: 'Needs assessment in progress',
              cssColorClass: 'nhsuk-tag--blue',
              description: 'A needs assessor has started the needs assessment process.'
            },
            AWAITING_SUPPORT: {
              name: 'Awaiting support',
              cssColorClass: 'nhsuk-tag--grey',
              description: 'Needs assessment is completed. Waiting for an organisation unit to start supporting this innovation.'
            },
            RECEIVING_SUPPORT: {
              name: 'Receiving support',
              cssColorClass: 'nhsuk-tag--green',
              description: 'At least one organisation unit is supporting  this innovation with an "engaging" or "further info" support status.'
            },
            NO_ACTIVE_SUPPORT: {
              name: 'No active support',
              cssColorClass: 'nhsuk-tag--white',
              description: 'There are no organisations units providing support for this innovation anymore. The organisations support status are "unassigned", "waiting", "not yet", "unsuitable" or "completed".'
            },
            AWAITING_NEEDS_REASSESSMENT: {
              name: 'Awaiting needs reassessment',
              cssColorClass: 'nhsuk-tag--purple',
              description: 'The innovation has been resent for needs assessment review.'
            },
            WITHDRAWN: {
              name: 'Withdrawn',
              cssColorClass: 'nhsuk-tag--red',
              description: 'This innovation has been withdrawn by the innovator.'
            },
          },
          export_request_status: {
            PENDING: { name: 'Pending' },
            APPROVED: { name: 'Approved' },
            REJECTED: { name: 'Rejected' },
            CANCELLED: { name: 'Cancelled' }
          }
        },
        user: {
          AssessmentUserIsNotTheOnlyOne: {
            label: 'User is not the only assessment user on the service'
          },
          LastQualifyingAccessorUserOnOrganisationUnit: {
            label: 'User is not the only qualifying accessor within a organisation unit'
          },
          LastUserOnOrganisationUnit: {
            label: 'User is not the only one within their unit(s)'
          },
          NoInnovationsSupportedOnlyByThisUser: {
            label: 'User is not the only one supporting a given innovation',
            description: {
              none: 'No innovation is being supported',
              singular: '{{ supports.innovations.length }} innovation being supported',
              plural: '{{ supports.innovations.length }} innovations being supported',
            }
          },
          contact_user_preferences: {
            MORNING: {
              label: 'Morning, 9am to 12pm',
              confirmation: '9am to 12pm'
            },
            AFTERNOON: {
              label: 'Afternoon, 1pm to 5pm',
              confirmation: '1pm to 5pm'
            },
            DAILY: {
              label: 'Either',
              confirmation: '9am to 12pm or 1pm to 5pm'
            },
          }
        }
      },

      forms_module: {
        validations: {
          equal_to: 'Value does not match',
          invalid_email: 'Invalid email',
          invalid_format: 'Invalid format',
          invalid_hexadecimal_format: 'Invalid hexadecimal format',
          invalid_json_format: 'Invalid JSON format',
          invalid_url_format: 'The format of this URL is invalid. Add the full URL, including http:// or https://',
          invalid_value: 'Invalid value',
          min: 'Value below the minimum allowed',
          min_hexadecimal: 'Value below the minimum allowed',
          max: 'Value above the maximum allowed',
          max_hexadecimal: 'Value above the maximum allowed',
          min_length: 'Text must have at least {{ minLength }} characters',
          max_length: 'Text cannot exceed {{ maxLength }} characters',
          equal_to_length: 'Text must have {{ equalToLength }} characters',
          password_mismatch: 'Passwords don\'t appear to match',
          password_regex: 'The password must contain at least minimum 8 characters: one uppercase, one lowercase, one number and one special character',
          required: 'Required',
          existsIn: 'Value already exists',
          validEmail: 'Enter a valid email',
          invalid_postcode_format: 'Postcode format is invalid',
          invalid_parse_date: 'Please enter a valid date format',
          max_file_size: 'The file size is above the limit of 20MB',
          empty_file: 'Uploaded files cannot be empty',
          wrong_file_format: 'The file format is invalid. Files must be CSV, XLSX, DOCX or PDF',
          upload_error: 'This file has failed to upload. Try again and if there is still a problem, contact us'
        }
      }

    }
  }
};
