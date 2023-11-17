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
      role: {
        none: 'role',
        singular: 'role',
        plural: 'roles'
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
            INNOVATION_PROGRESS_UPDATE: 'Support summary',
            INNOVATION_MESSAGE: "Messages"
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
              message: `{{ actionUserName }} suggested one or more organisations to support`
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

            DOCUMENTS: {
              INNOVATOR: {
                title: 'Documents',
                description: 'Get notified when a support organisation uploads a document for you.'
              },
            },

            INNOVATION_MANAGEMENT: {
              QUALIFYING_ACCESSOR: {
                title: 'Withdrawals and export requests',
                description: 'Get notified when an innovator withdraws or stops sharing an innovation you are supporting. Find out when your innovation record export requests are approved or rejected.',
              },
              ACCESSOR: {
                title: 'Withdrawals and export requests',
                description: 'Get notified when an innovator withdraws or stops sharing an innovation you are supporting. Find out when your innovation record export requests are approved or rejected.',
              },
              ASSESSMENT: {
                title: 'Innovation withdrawals',
                description: 'Get notified when an innovator withdraws an innovation during the needs assessment process.'
              }
            },

            MESSAGES: {
              SHARED:{
                title: 'Messages',
                description: 'Get notified about new messages and replies.',
              }
            },

            NEEDS_ASSESSMENT: {
              ASSESSMENT: {
                title: 'Needs assessment ',
                description: 'Get notified when an innovation is submitted for a needs assessment.'
              }
            },

            ORGANISATION_SUGGESTIONS: {
              QUALIFYING_ACCESSOR: {
                title: 'Suggestions to support',
                description: 'Get notified when your organisation is suggested to support an innovation.'
              },
            },

            ADMIN: {
              QUALIFYING_ACCESSOR: {
                title: 'Your account',
                description: 'Get notified when a user is removed or added to your organisation unit.'
              },
              ACCESSOR: {
                title: 'Your account',
                description: 'Get notified when a user is removed or added to your organisation unit.'
              },
            },

            AUTOMATIC: {
              INNOVATOR: {
                title: 'Reminders',
                description: 'Receive reminders when your innovation record is incomplete or when your innovation is not receiving support.'
              },
              QUALIFYING_ACCESSOR: {
                title: 'Reminders',
                description: 'Receive reminders for you to interact with innovations you are supporting.'
              },
              ACCESSOR: {
                title: 'Reminders',
                description: 'Receive reminders for you to interact with innovations you are supporting.'
              },
            },

            SUPPORT: {
              INNOVATOR: {
                title: 'Support status and summary updates',
                description: 'Get notified about updates to your support status and support summary.'
              },
              QUALIFYING_ACCESSOR: {
                title: 'Support status and summary updates',
                description: 'Get notified about support status or support summary updates for innovations you are supporting.'
              },
              ACCESSOR: {
                title: 'Support status and summary updates',
                description: 'Get notified about support status or support summary updates for innovations you are supporting.'
              },
            },

            TASK: {
              INNOVATOR: {
                title: 'Tasks to do',
                description: 'Get notified when a task is assigned to you, reopened or cancelled.'
              },
              QUALIFYING_ACCESSOR: {
                title: 'Tasks',
                description: 'Get notified when an innovator completes or declines a task you have assigned to them.'
              },
              ACCESSOR: {
                title: 'Tasks',
                description: 'Get notified when an innovator completes or declines a task you have assigned to them.',
              },
              ASSESSMENT: {
                title: 'Tasks',
                description: 'Get notified when an innovator completes or declines a task you have assigned to them.',
              }
            },

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
            INNOVATION_MANAGEMENT: { title: { singular: 'Innovation management', plural: 'Innovation management' } }, // TO DO: check copy
            SUPPORT: { title: { singular: 'Support status and summary updates', plural: 'Support status and summary updates' } }, // TO DO: check copy
            TASK: { title: { singular: 'Task', plural: 'Tasks' } },
            MESSAGES: { title: { singular: 'Message', plural: 'Messages' } },
            DOCUMENTS: { title: { singular: 'Document', plural: 'Documents' } },
            ORGANISATION_SUGGESTIONS: { title: { singular: 'Data sharing', plural: 'Data sharing' } }, // TO DO: check copy
            ADMIN: { title: { singular: 'Admin portal', plural: 'Admin portal' } }, // TO DO: check copy
            ACCOUNT: { title: { singular: 'Account creation', plural: 'Account creation' } }, // TO DO: check copy
            AUTOMATIC: { title: { singular: 'System notification', plural: 'System notifications' } } // TO DO: check copy
          },
          notification_context_details: {
            // TASKS
            TA01_TASK_CREATION_TO_INNOVATOR: { title: `You have been assigned a task for innovation {{innovationName}} by {{unitName}}. `, link: `View task.` },
            TA02_TASK_RESPONDED_TO_OTHER_INNOVATORS: { title: `A task has been {{status}} by {{requestUserName}}. `, link: `View message about this task.` },
            TA03_TASK_DONE_TO_ACCESSOR_OR_ASSESSMENT: { title: `A task you assigned on innovation {{innovationName}} has been done by {{requestUserName}}. `, link: `View message about this task.` },
            TA04_TASK_DECLINED_TO_ACCESSOR_OR_ASSESSMENT: { title: `A task you assigned on innovation {{innovationName}} has been declined by {{requestUserName}}. `, link: `View message about this task.` },
            TA05_TASK_CANCELLED_TO_INNOVATOR: { title: `A task for innovation {{innovationName}} has been cancelled by {{requestUserName}} at {{unitName}}. `, link: `View message about this task.` },
            TA06_TASK_REOPEN_TO_INNOVATOR: { title: `A task for innovation {{innovationName}} has been reopened by {{requestUserName}} at {{unitName}}. `, link: `View message about this task.` },
            // DOCUMENTS
            DC01_UPLOADED_DOCUMENT_TO_INNOVATOR: { title: `{{unitName}} has uploaded a document for you to review. `, link: `View document.` },
            // MESSAGES
            ME01_THREAD_CREATION : { title: `You have been added to a message thread about innovation {{innovationName}} by {{senderDisplayInformation}}. `, link: `View message thread.` },
            ME02_THREAD_ADD_FOLLOWERS : { title: `You have been added to a message thread about innovation {{innovationName}} by {{senderDisplayInformation}}. `, link: `View message thread.` },
            ME03_THREAD_MESSAGE_CREATION : { title: `You have a new message from {{senderDisplayInformation}} about innovation {{innovationName}}. `, link: `View message thread.` },
            // SUPPORT
            ST01_SUPPORT_STATUS_TO_ENGAGING : { title: `{{unitName}} has updated their support status to engaging for {{innovationName}}. `, link: `View message.` },
            ST02_SUPPORT_STATUS_TO_OTHER : { title: `{{unitName}} has updated their support status to {{status}} for {{innovationName}}. `, link: `View support summary.` },
            ST03_SUPPORT_STATUS_TO_WAITING : { title: `{{unitName}} has updated their support status to {{status}} for {{innovationName}}. `, link: `View support summary.` },
            ST04_SUPPORT_NEW_ASSIGNED_ACCESSORS_TO_INNOVATOR : { title: `{{unitName}} has changed the accessors supporting {{innovationName}}. `, link: `View message.` },
            ST05_SUPPORT_NEW_ASSIGNED_ACCESSOR_TO_NEW_QA : { title: `You have been assigned as an accessor for {{innovationName}}. `, link: `Review the innovation and contact the innovator within 5 working days.` },
            ST06_SUPPORT_NEW_ASSIGNED_ACCESSOR_TO_OLD_QA : { title: `You are no longer the assigned accessor for {{innovationName}}.` },
            ST07_SUPPORT_STATUS_CHANGE_REQUEST : { title: `{{accessorName}} has requested that the support status for innovation {{innovationName}} is updated to {{proposedStatus}}. `, link: `Update support status.` },
            SS01_SUPPORT_SUMMARY_UPDATE_TO_INNOVATORS : { title: `{{unitName}} added a progress update for innovation {{innovationName}}. `, link: `View this update in support summary.` },
            SS02_SUPPORT_SUMMARY_UPDATE_TO_OTHER_ENGAGING_ACCESSORS : { title: `{{unitName}} added a progress update for innovation {{innovationName}}. `, link: `View this update in support summary.` },
            // // NEEDS ASSESSMENT
            NA01_INNOVATOR_SUBMITS_FOR_NEEDS_ASSESSMENT_TO_INNOVATOR : { title: `Innovation {{innovationName}} has been submitted for a {{needsAssessment}}.` },
            NA02_INNOVATOR_SUBMITS_FOR_NEEDS_ASSESSMENT_TO_ASSESSMENT : { title: `Innovation {{innovationName}} has been submitted for a {{needsAssessment}}. `, link: `Review the innovation record and make contact with the innovator within 2 working days.` },
            NA03_NEEDS_ASSESSMENT_STARTED_TO_INNOVATOR : { title: `The needs assessment for innovation {{innovationName}} has started. `, link: `View message from the needs assessment team.` },
            NA04_NEEDS_ASSESSMENT_COMPLETE_TO_INNOVATOR : { title: `The needs assessment for innovation {{innovationName}} is complete. `, link: `View needs assessment.` },
            NA06_NEEDS_ASSESSOR_REMOVED : { title: `You are no longer the assigned needs assessor for {{innovationName}}. You can find the new needs assessor in `, link: `innovation overview.` },
            NA07_NEEDS_ASSESSOR_ASSIGNED : { title: `You have been assigned as the needs assessor for {{innovationName}}. `, link: `Review the innovation record and make contact with the innovator within 2 working days.` },
            // ORGANISATIONS SUGGESTIONS
            OS01_UNITS_SUGGESTION_TO_SUGGESTED_UNITS_QA : { title: `Your organisation has been suggested to support {{innovationName}} by {{senderDisplayInformation}}. `, link: `Review the innovation and assign a support status within 5 working days.` },
            OS02_UNITS_SUGGESTION_NOT_SHARED_TO_INNOVATOR : { title: `One or more organisations have been suggested to support your innovation. They will not be able to support you until you `, link: `update your data sharing preferences.` },
            OS03_INNOVATION_DELAYED_SHARED_SUGGESTION : { title: `Your organisation has been suggested to support innovation {{innovationName}}. `, link: `Review the innovation and assign a support status within 5 working days.` },
            // INNOVATION MANAGEMENT
            RE01_EXPORT_REQUEST_SUBMITTED: { title: `{{unitName}} has requested permission to use your innovation record data for {{innovationName}} for something outside of our terms of use. `, link: `View request.` },
            RE02_EXPORT_REQUEST_APPROVED: { title: `Innovation {{innovationName}} has approved your request to use their innovation record data. `, link: `View and export the innovation record.` },
            RE03_EXPORT_REQUEST_REJECTED: { title: `Innovation {{innovationName}} has rejected your request to use their innovation record data. `, link: `View reason.` },
            WI01_INNOVATION_WITHDRAWN : { title: `Innovation {{innovationName}} has been withdrawn by its owner. You can no longer access this innovation.` },
            SH01_INNOVATION_STOPPED_SHARED_TO_ASSIGNED_USERS: { title: `You no longer have access to innovation {{innovationName}}. The innovator has stopped sharing their innovation with all support organisations.` },
            SH03_INNOVATION_STOPPED_SHARED_TO_SELF: { title : `You have stopped sharing innovation {{innovationName}} with all support organisations.` },
            DA01_OWNER_DELETED_ACCOUNT_WITH_PENDING_TRANSFER_TO_COLLABORATOR: { title: `The owner of innovation {{innovationName}} has deleted their account. The innovation is awaiting a new owner.` },
            MC01_COLLABORATOR_INVITE_EXISTING_USER: { title: `{{requestUserName}} has invited you to collaborate on innovation {{innovationName}}. You have 30 days to respond. `, link: `View invitation.` },
            MC03_COLLABORATOR_UPDATE_CANCEL_INVITE : { title: `{{innovatorName}} has cancelled their invitation for you to collaborate on innovation {{innovationName}}.` },
            MC04_COLLABORATOR_UPDATE_ACCEPTS_INVITE : { title: `{{requestUserName}} has accepted your invitation to collaborate on innovation {{innovationName}}.`, link: `Manage collaborators.`},
            MC05_COLLABORATOR_UPDATE_DECLINES_INVITE : { title: `{{requestUserName}} has declined your invitation to collaborate on innovation {{innovationName}}.`, link: `Invite new collaborators.` },
            MC06_COLLABORATOR_UPDATE_REMOVED_COLLABORATOR : { title: `{{requestUserName}} has removed you as a collaborator on innovation {{innovationName}}.` },
            MC07_COLLABORATOR_UPDATE_COLLABORATOR_LEFT_TO_INNOVATORS : { title: `{{requestUserName}} has left innovation {{innovationName}}.`, link: `Manage collaborators.` },
            MC08_COLLABORATOR_UPDATE_COLLABORATOR_LEFT_TO_SELF : { title: `You have successfully removed yourself as a collaborator on innovation {{innovationName}}.` },
            TO02_TRANSFER_OWNERSHIP_EXISTING_USER:  { title: `You have a request to take ownership of innovation {{innovationName}}. `, link: `View request.` },
            TO06_TRANSFER_OWNERSHIP_ACCEPTS_PREVIOUS_OWNER:  { title: `You have successfully transferred ownership of innovation {{innovationName}} to {{newInnovationOwner}}.` },
            TO07_TRANSFER_OWNERSHIP_ACCEPTS_ASSIGNED_ACCESSORS: { title: `{{oldInnovationOwnerName}} has transferred ownership of innovation {{innovationName}} to {{newInnovationOwnerName}} `, link: `Send message to the new owner.` },
            TO08_TRANSFER_OWNERSHIP_DECLINES_PREVIOUS_OWNER:  { title: `Your request to transfer ownership of innovation {{innovationName}} has been declined. You can create a new transfer request in `, link: `manage innovation.` },
            TO09_TRANSFER_OWNERSHIP_CANCELED_NEW_OWNER:  { title: `The request for you to take ownership of innovation {{innovationName}} has been cancelled by {{innovationOwner}}.` },
            // ADMIN PORTAL
            AP02_INNOVATOR_LOCKED_TO_ASSIGNED_USERS: { title: `The owner's account for innovation {{innovationName}} has been locked.` },
            AP07_UNIT_INACTIVATED_TO_ENGAGING_INNOVATIONS: { title: `{{unitName}} are no longer supporting innovations through the NHS Innovation Service. This means they will no longer be supporting innovation {{innovationName}}. `, link: `View your current support organisations.` },
            // AUTOMATIC
            AU01_INNOVATOR_INCOMPLETE_RECORD : { title: `Your innovation record remains in draft. `, link: `Review and update your innovation record.` },
            AU02_ACCESSOR_IDLE_ENGAGING_SUPPORT : { title: `You last interacted with innovation {{innovationName}} at least 3 months ago. If you are continuing to support this innovation `, link: `add a progress update to their support summary.` },
            AU03_INNOVATOR_IDLE_SUPPORT : { title: `Your innovation {{innovationName}} is not receiving any active support on the service.`, link: `Find out more about your options and decide how you want to progress.` },
            AU04_SUPPORT_KPI_REMINDER : { title: `Innovation {{innovationName}} is waiting to be reviewed. Review the innovation and `, link: `assign a support status by the end of the next working day.` },
            AU05_SUPPORT_KPI_OVERDUE : { title: `Your organisation was suggested to support innovation {{innovationName}} over 5 working days ago. Review the innovation and `, link: `assign a support status as soon as possible.` },
            AU06_ACCESSOR_IDLE_WAITING: { title: `{{innovationName}} has been waiting for 3 months.`, link: `View innovation and review support status.` },
            AU08_TRANSFER_ONE_WEEK_REMINDER_EXISTING_USER: { title: `You have 1 week left to accept the request to take ownership of innovation {{innovationName}}. `, link: `View request.` },
            AU09_TRANSFER_EXPIRED: { title: `Your request to transfer ownership of innovation {{innovationName}} has expired. You can create a new transfer request in `, link: `manage innovation.` }
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
              accessorTypeDescription: 'Ready to support, assess or provide guidance.',
            },
            WAITING: {
              name: 'Waiting',
              cssColorClass: 'nhsuk-tag--yellow',
              description: 'The organisation is waiting for information from the innovator, or for an internal decision to progress, or for another organisation to close their support offer.',
              accessorTypeDescription: 'The organisation is waiting for information from the innovator, or for an internal decision to progress, or for another organisation to close their support offer.',
            },
            UNASSIGNED: {
              name: 'Unassigned',
              cssColorClass: 'nhsuk-tag--red',
              description: 'A support status has not been assigned yet.',
              accessorTypeDescription: 'A support status has not been assigned yet.',
            },
            UNSUITABLE: {
              name: 'Unsuitable',
              cssColorClass: 'nhsuk-tag--grey',
              description: 'The organisation has no suitable support offer for the innovation.',
              accessorTypeDescription: 'The organisation has no suitable support offer for the innovation.',
            },
            WITHDRAWN: {
              name: 'Withdrawn',
              cssColorClass: 'nhsuk-tag--red',
              description: '',
              accessorTypeDescription: '',
            },
            CLOSED: {
              name: 'Closed',
              cssColorClass: 'nhsuk-tag--dark-grey',
              description: 'The organisation has finished supporting the innovation or has decided not to support it because it did not receive the information it needed.',
              accessorTypeDescription: 'The organisation has finished supporting the innovation or has decided not to support it because it did not receive the information it needed.',
            }
          },
          grouped_status: {
            RECORD_NOT_SHARED: {
              name: 'Record not shared',
              cssColorClass: 'nhsuk-tag--orange',
              description: 'The innovator has not yet shared the innovation record for a needs assessment review yet.'
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
              description: 'The needs assessment is complete. The innovation is waiting for a support organisation to be assigned to it.'
            },
            RECEIVING_SUPPORT: {
              name: 'Receiving support',
              cssColorClass: 'nhsuk-tag--green',
              description: 'At least one organisation unit is engaging with this organisation.'
            },
            NO_ACTIVE_SUPPORT: {
              name: 'No active support',
              cssColorClass: 'nhsuk-tag--white',
              description: 'There are no organisation units engaging with this innovation right now. Their support statuses are either waiting, unsuitable or closed.'
            },
            AWAITING_NEEDS_REASSESSMENT: {
              name: 'Awaiting needs reassessment',
              cssColorClass: 'nhsuk-tag--purple',
              description: 'The innovation has been sent for needs reassessment.'
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

    },

  }
};
