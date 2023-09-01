import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { CoreService } from '@app/base';
import { DatesHelper } from '@app/base/helpers';
import { UrlModel } from '@app/base/models';
import { APIQueryParamsType, DateISOType } from '@app/base/types';

import { UserRoleEnum } from '@modules/stores/authentication/authentication.enums';
import { ACTIVITY_LOG_ITEMS } from '@modules/stores/innovation';

import { irVersionsMainCategoryItems } from '@modules/stores/innovation/innovation-record/ir-versions.config';
import { ActivityLogItemsEnum, ActivityLogTypesEnum, InnovationActionStatusEnum, InnovationCollaboratorStatusEnum, InnovationExportRequestStatusEnum, InnovationSectionEnum, InnovationStatusEnum } from '@modules/stores/innovation/innovation.enums';
import { InnovationSectionInfoDTO } from '@modules/stores/innovation/innovation.models';
import { CreateSupportSummaryProgressUpdateType, InnovationActionInfoDTO, InnovationActionsListDTO, InnovationActionsListInDTO, InnovationActivityLogListDTO, InnovationActivityLogListInDTO, InnovationCollaboratorsListDTO, InnovationExportRequestInfoDTO, InnovationExportRequestsListDTO, InnovationInfoDTO, InnovationNeedsAssessmentInfoDTO, InnovationSharesListDTO, InnovationSupportInfoDTO, InnovationSupportsListDTO, InnovationsListDTO, InnovationsListFiltersType, InnovationsListInDTO, SupportSummaryOrganisationHistoryDTO, SupportSummaryOrganisationsListDTO, getInnovationCollaboratorInfoDTO } from './innovations.dtos';


export type InnovationsActionsListFilterType = {
  innovationId?: string,
  innovationName?: string,
  sections?: InnovationSectionEnum[],
  status?: InnovationActionStatusEnum[],
  innovationStatus?: InnovationStatusEnum[],
  createdByMe?: boolean,
  allActions?: boolean,
  fields?: ('notifications')[]
};

export type GetThreadsListDTO = {
  count: number;
  data: {
    id: string;
    subject: string;
    createdBy: { id: string; displayTeam?: string };
    lastMessage: {
      id: string;
      createdAt: Date;
      createdBy: { id: string; displayTeam?: string };
    };
    messageCount: number;
    hasUnreadNotifications: boolean;
  }[];
};

export type GetThreadInfoDTO = {
  id: string;
  subject: string;
  createdAt: DateISOType;
  createdBy: { id: string, name: string, type: UserRoleEnum; };
};

export type GetThreadMessageInfoDTO = {
  id: string;
  message: string;
  createdAt: DateISOType;
};

export type GetThreadFollowersDTO = {
  followers: {
    id: string;
    identityId: string;
    name: string;
    type: UserRoleEnum;
    isOwner?: boolean;
    organisationUnit?: { id: string, acronym: string }
  }[]
};

export type GetThreadMessagesListInDTO = {
  count: number;
  messages: {
    id: string;
    message: string;
    createdAt: DateISOType;
    createdBy: {
      id: string;
      name: string;
      role: UserRoleEnum;
      isOwner?: boolean;
      organisation?: { id: string, name: string, acronym: string; };
      organisationUnit?: { id: string, name: string, acronym: string; };
    };
    updatedAt: null | DateISOType;
    isNew: boolean;
    isEditable: boolean;
  }[];
};
export type GetThreadMessagesListOutDTO = {
  count: number,
  messages: (
    Omit<GetThreadMessagesListInDTO['messages'][0], 'createdBy'> & {
      createdBy: GetThreadMessagesListInDTO['messages'][0]['createdBy'] & { typeDescription: string; };
    })[]
};

export type CreateThreadDTO = {
  thread: {
    id: string;
    subject: string;
    createdBy: {
      id: string;
    };
    createdAt: DateISOType;
  }
};

export type CreateThreadMessageDTO = {
  threadMessage: {
    createdBy: {
      id: string;
      identityId: string;
    };
    id: string;
    message: string;
    isEditable: boolean;
    createdAt: DateISOType;
  };
};


@Injectable()
export class InnovationsService extends CoreService {

  constructor() { super(); }

  // Innovations.
  getInnovationsList({ queryParams, fields = [] }: { queryParams?: APIQueryParamsType<InnovationsListFiltersType>, fields?: InnovationsListFiltersType['fields'] } = {}): Observable<InnovationsListDTO> {

    if (!queryParams) {
      queryParams = { take: 100, skip: 0, order: { name: 'ASC' }, filters: {} };
    }

    const requestUserType = this.stores.authentication.getUserType();
    const { filters, ...qParams } = queryParams;

    const qp = {
      ...qParams,
      ...(filters.name ? { name: filters.name } : {}),
      ...(filters.mainCategories ? { mainCategories: filters.mainCategories } : {}),
      ...(filters.locations ? { locations: filters.locations } : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.assessmentSupportStatus ? { assessmentSupportStatus: filters.assessmentSupportStatus } : {}),
      ...(filters.supportStatuses ? { supportStatuses: filters.supportStatuses } : {}),
      ...(filters.groupedStatuses ? { groupedStatuses: filters.groupedStatuses } : {}),
      ...(filters.engagingOrganisations ? { engagingOrganisations: filters.engagingOrganisations } : {}),
      ...(filters.engagingOrganisationUnits ? { engagingOrganisationUnits: filters.engagingOrganisationUnits } : {}),
      ...(filters.assignedToMe !== undefined ? { assignedToMe: filters.assignedToMe } : {}),
      ...(filters.suggestedOnly != undefined ? { suggestedOnly: filters.suggestedOnly } : {}),
      ...(filters.latestWorkedByMe != undefined ? { latestWorkedByMe: filters.latestWorkedByMe } : {}),
      ...(filters.hasAccessThrough != undefined ? { hasAccessThrough: filters.hasAccessThrough } : {}),
      ...(filters.dateFilter ? { dateFilter: filters.dateFilter } : {}),
      fields
    };

    if (!filters.latestWorkedByMe) {
      switch (requestUserType) {
        case UserRoleEnum.INNOVATOR:
          qp.fields.push('statistics', 'assessment', 'supports');
          break;
        case UserRoleEnum.ASSESSMENT:
          qp.fields.push('assessment', 'supports')
          break;
        case UserRoleEnum.ACCESSOR:
        case UserRoleEnum.QUALIFYING_ACCESSOR:
          qp.status = [InnovationStatusEnum.IN_PROGRESS];
          qp.fields.push('assessment', 'supports', 'notifications');
          break;
        case UserRoleEnum.ADMIN:
          qp.fields.push('assessment', 'supports');
          break;
        default:
          break;
      }
    }

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1').setQueryParams(qp);
    return this.http.get<InnovationsListInDTO>(url.buildUrl()).pipe(take(1), map(response => ({
      count: response.count,
      data: response.data.map(item => {

        let daysFromSubmittedAtToToday: null | number = null;
        let overdueStatus: null | 'ALMOST_DUE' | 'OVERDUE' | 'EXEMPT' = null;

        // These 2 keys, are only relevant for assessments.
        if (this.stores.authentication.isAssessmentType() && item.submittedAt) {

          // Only show overdues if assessment / reassessment is pending!
          if ([InnovationStatusEnum.WAITING_NEEDS_ASSESSMENT, InnovationStatusEnum.AWAITING_NEEDS_REASSESSMENT, InnovationStatusEnum.NEEDS_ASSESSMENT].includes(item.status)) {

            daysFromSubmittedAtToToday = DatesHelper.dateDiff(item.submittedAt, new Date().toISOString());

            if (item.assessment?.isExempted) { overdueStatus = 'EXEMPT'; }
            else {
              if (daysFromSubmittedAtToToday >= 10 && daysFromSubmittedAtToToday < 15) { overdueStatus = 'ALMOST_DUE'; }
              else if (daysFromSubmittedAtToToday >= 15) { overdueStatus = 'OVERDUE'; }
            }

          }

        }

        return {
          ...item,
          mainCategory: item.otherMainCategoryDescription ?? irVersionsMainCategoryItems.find(i => i.value === item.mainCategory)?.label ?? '',
          daysFromSubmittedAtToToday,
          overdueStatus
        };

      })
    })));

  }

  getInnovationInfo(innovationId: string): Observable<InnovationInfoDTO> {

    const requestUserType = this.stores.authentication.getUserType();
    const qp: { fields: ('assessment' | 'supports')[] } = { fields: [] };

    switch (requestUserType) {
      case UserRoleEnum.INNOVATOR:
        qp.fields = ['assessment', 'supports'];
        break;
      case UserRoleEnum.ASSESSMENT:
        qp.fields = ['assessment'];
        break;
      case UserRoleEnum.ACCESSOR:
      case UserRoleEnum.QUALIFYING_ACCESSOR:
        qp.fields = ['assessment', 'supports'];
        break;
      case UserRoleEnum.ADMIN:
        qp.fields = ['assessment', 'supports'];
        break;
      default:
        break;
    }

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId').setPathParams({ innovationId }).setQueryParams(qp);
    return this.http.get<InnovationInfoDTO>(url.buildUrl()).pipe(take(1), map(response => response));

  }

  getInnovationSubmission(innovationId: string): Observable<{ submittedAllSections: boolean, submittedForNeedsAssessment: boolean }> {
    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/submissions').setPathParams({ innovationId });
    return this.http.get<{ submittedAllSections: boolean, submittedForNeedsAssessment: boolean }>(url.buildUrl()).pipe(take(1), map(response => response));
  }

  getInnovationSharesList(innovationId: string): Observable<InnovationSharesListDTO> {
    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/shares').setPathParams({ innovationId });
    return this.http.get<InnovationSharesListDTO>(url.buildUrl()).pipe(take(1), map(response => response));
  }


  // Innovation collaborators.
  getInnovationCollaboratorsList(innovationId: string, type: ('pending' | 'active' | 'history')[]): Observable<InnovationCollaboratorsListDTO> {

    const qp: { take: number, skip: number, status: InnovationCollaboratorStatusEnum[] } = { take: 100, skip: 0, status: [] };

    if (type.includes('pending')) {
      qp.status.push(InnovationCollaboratorStatusEnum.PENDING);
    }
    if (type.includes('active')) {
      qp.status.push(InnovationCollaboratorStatusEnum.ACTIVE);
    }
    if (type.includes('history')) {
      qp.status.push(InnovationCollaboratorStatusEnum.CANCELLED, InnovationCollaboratorStatusEnum.DECLINED, InnovationCollaboratorStatusEnum.EXPIRED, InnovationCollaboratorStatusEnum.LEFT, InnovationCollaboratorStatusEnum.REMOVED);
    }

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/collaborators').setPathParams({ innovationId }).setQueryParams(qp);
    return this.http.get<InnovationCollaboratorsListDTO>(url.buildUrl()).pipe(take(1), map(response => response));

  }

  getInnovationCollaboratorInfo(innovationId: string, collaboratorId: string): Observable<getInnovationCollaboratorInfoDTO> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/collaborators/:collaboratorId').setPathParams({ innovationId, collaboratorId });
    return this.http.get<getInnovationCollaboratorInfoDTO>(url.buildUrl()).pipe(take(1), map(response => response));

  }

  createInnovationCollaborator(innovationId: string, body: { email: string, role: null | string }): Observable<{ id: string }> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/collaborators').setPathParams({ innovationId });
    return this.http.post<{ id: string }>(url.buildUrl(), body).pipe(take(1), map(response => response));

  }

  updateInnovationCollaborator(innovationId: string, collaborationId: string, body: { status?: InnovationCollaboratorStatusEnum, role?: string }): Observable<{ id: string }> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/collaborators/:collaborationId').setPathParams({ innovationId, collaborationId });
    return this.http.patch<{ id: string }>(url.buildUrl(), body).pipe(take(1), map(response => response));

  }


  // Innovation support.
  getInnovationSupportsList(innovationId: string, accessorsInfo: boolean): Observable<InnovationSupportsListDTO> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/supports').setPathParams({ innovationId });

    if (accessorsInfo) {
      url.setQueryParams({ fields: ['engagingAccessors'] });
    }

    return this.http.get<InnovationSupportsListDTO>(url.buildUrl()).pipe(take(1),
      map(response => response.map(item => ({
        id: item.id,
        status: item.status,
        organisation: {
          id: item.organisation.id, name: item.organisation.name, acronym: item.organisation.acronym,
          unit: item.organisation.unit
        },
        engagingAccessors: accessorsInfo ? item.engagingAccessors : []
      })))
    );

  }

  getInnovationSupportInfo(innovationId: string, supportId: string): Observable<InnovationSupportInfoDTO> {
    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/supports/:supportId').setPathParams({ innovationId, supportId });
    return this.http.get<InnovationSupportInfoDTO>(url.buildUrl()).pipe(take(1), map(response => response));
  }


  // Support summary.
  getSupportSummaryOrganisationsList(innovationId: string): Observable<SupportSummaryOrganisationsListDTO> {
    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/support-summary').setPathParams({ innovationId });
    return this.http.get<SupportSummaryOrganisationsListDTO>(url.buildUrl()).pipe(take(1), map(response => response));
  }

  getSupportSummaryOrganisationHistory(innovationId: string, organisationUnitId: string): Observable<SupportSummaryOrganisationHistoryDTO> {
    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/support-summary/units/:organisationUnitId').setPathParams({ innovationId, organisationUnitId });
    return this.http.get<SupportSummaryOrganisationHistoryDTO>(url.buildUrl()).pipe(take(1), map(response => response));
  }

  createSupportSummaryProgressUpdate(innovationId: string, data: CreateSupportSummaryProgressUpdateType): Observable<{ id: string }> {
    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/support-summary/progress-update').setPathParams({ innovationId });
    return this.http.post<{ id: string }>(url.buildUrl(), data).pipe(take(1), map(response => response));
  }
  deleteSupportSummaryProgressUpdate(innovationId: string, id: string): Observable<void> {
    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/support-summary/progress-update/:id').setPathParams({ innovationId, id });
    return this.http.delete<void>(url.buildUrl()).pipe(take(1), map(response => response));
  }


  // Needs Assessment.
  getInnovationNeedsAssessment(innovationId: string, assessmentId: string): Observable<InnovationNeedsAssessmentInfoDTO> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/assessments/:assessmentId').setPathParams({ innovationId, assessmentId });
    return this.http.get<InnovationNeedsAssessmentInfoDTO>(url.buildUrl()).pipe(take(1), map(response => response));

  }


  // Actions methods.
  getActionsList(queryParams: APIQueryParamsType<InnovationsActionsListFilterType>): Observable<InnovationActionsListDTO> {

    const { filters, ...qParams } = queryParams;

    const qp = {
      ...qParams,
      ...(filters.innovationId ? { innovationId: filters.innovationId } : {}),
      ...(filters.innovationName ? { innovationName: filters.innovationName } : {}),
      ...(filters.sections ? { sections: filters.sections } : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.innovationStatus ? { innovationStatus: filters.innovationStatus } : {}),
      ...(filters.createdByMe ? { createdByMe: filters.createdByMe } : {}),
      ...(filters.allActions ? { allActions: filters.allActions } : {}),
      ...(filters.fields ? { fields: filters.fields } : {})
    };

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/actions').setQueryParams(qp);
    return this.http.get<InnovationActionsListInDTO>(url.buildUrl()).pipe(take(1),
      map(response => ({
        count: response.count,
        data: response.data.map(item => {
          const sectionIdentification = this.stores.innovation.getInnovationRecordSectionIdentification(item.section);

          return {
            ...item,
            ...{ name: sectionIdentification ? `Update '${sectionIdentification.section.title}'` : 'Section no longer available' }
          }
        })
      }))
    );

  }

  getActionInfo(innovationId: string, actionId: string): Observable<InnovationActionInfoDTO> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/actions/:actionId').setPathParams({ innovationId, actionId });
    return this.http.get<Omit<InnovationActionInfoDTO, 'name'>>(url.buildUrl()).pipe(take(1),
      map(response => {
        const sectionIdentification = this.stores.innovation.getInnovationRecordSectionIdentification(response.section);

        return ({
          id: response.id,
          displayId: response.displayId,
          status: response.status,
          name: sectionIdentification ? `Update '${sectionIdentification.section.title}'` : 'Section no longer available',
          description: response.description,
          section: response.section,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
          updatedBy: response.updatedBy,
          createdBy: response.createdBy,
          declineReason: response.declineReason
        })
      })
    );

  }

  createAction(innovationId: string, body: { section: InnovationSectionEnum, description: string }): Observable<{ id: string }> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/actions').setPathParams({ innovationId });
    return this.http.post<{ id: string }>(url.buildUrl(), body).pipe(
      take(1),
      map(response => response)
    );

  }

  updateAction(innovationId: string, actionId: string, body: { status: InnovationActionStatusEnum, message?: string }): Observable<{ id: string }> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/actions/:actionId').setPathParams({ innovationId, actionId });
    return this.http.put<{ id: string }>(url.buildUrl(), body).pipe(
      take(1),
      map(response => response)
    );

  }


  // Threads and messages methods.
  getThreadsList(innovationId: string, queryParams: APIQueryParamsType<{ subject?: string }>): Observable<GetThreadsListDTO> {

    const { filters, ...qParams } = queryParams;
    const qp = {
      ...qParams,
      ...(filters.subject && { subject: filters.subject }),
    };

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/threads').setPathParams({ innovationId }).setQueryParams(qp);
    return this.http.get<GetThreadsListDTO>(url.buildUrl()).pipe(take(1));

  }

  getThreadInfo(innovationId: string, threadId: string): Observable<GetThreadInfoDTO> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/threads/:threadId').setPathParams({ innovationId, threadId });
    return this.http.get<GetThreadInfoDTO>(url.buildUrl()).pipe(take(1),
      map(response => response)
    );

  }

  getThreadMessageInfo(innovationId: string, threadId: string, messageId: string): Observable<GetThreadMessageInfoDTO> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/threads/:threadId/messages/:messageId').setPathParams({ innovationId, threadId, messageId });

    return this.http.get<GetThreadMessageInfoDTO>(url.buildUrl()).pipe(take(1),
      map(response => response)
    );

  }

  getThreadFollowers(innovationId: string, threadId: string): Observable<GetThreadFollowersDTO> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/threads/:threadId/followers').setPathParams({ innovationId, threadId });

    return this.http.get<GetThreadFollowersDTO>(url.buildUrl()).pipe(take(1),
      map(response => response)
    );
  }

  getThreadMessagesList(innovationId: string, threadId: string, queryParams: APIQueryParamsType<{}>): Observable<GetThreadMessagesListOutDTO> {

    const { filters, ...qp } = queryParams;

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/threads/:threadId/messages').setPathParams({ innovationId, threadId }).setQueryParams(qp);
    return this.http.get<GetThreadMessagesListInDTO>(url.buildUrl()).pipe(take(1),
      map(response => ({
        count: response.count,
        messages: response.messages.map(message => ({
          ...message,
          createdBy: {
            ...message.createdBy, typeDescription: message.createdBy.role === 'INNOVATOR' ?
              (message.createdBy.isOwner ? 'Owner' : 'Collaborator') :
              this.stores.authentication.getRoleDescription(message.createdBy.role)
          }
        }))
      }))
    );

  }

  createThread(innovationId: string, body: { subject: string, message: string; }): Observable<CreateThreadDTO> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/threads').setPathParams({ innovationId });
    return this.http.post<CreateThreadDTO>(url.buildUrl(), body).pipe(take(1), map(response => response));

  }

  createThreadMessage(innovationId: string, threadId: string, body: { message: string; }): Observable<CreateThreadMessageDTO> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/threads/:threadId/messages').setPathParams({ innovationId, threadId });
    return this.http.post<CreateThreadMessageDTO>(url.buildUrl(), body).pipe(take(1), map(response => response));

  }

  editThreadMessage(innovationId: string, threadId: string, messageId: string, body: { message: string; }): Observable<{ id: string; }> {

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/threads/:threadId/messages/:messageId').setPathParams({ innovationId, threadId, messageId });
    return this.http.put<{ id: string; }>(url.buildUrl(), body).pipe(take(1), map(response => response));

  }

  getInnovationActivityLog(
    innovationId: string,
    queryParams: APIQueryParamsType<{ activityTypes: ActivityLogTypesEnum[], startDate: string, endDate: string }>
  ): Observable<InnovationActivityLogListDTO> {

    const { filters, ...qParams } = queryParams;
    const qp = {
      ...qParams,
      ...(filters.activityTypes ? { activityTypes: filters.activityTypes } : {}),
      ...(filters.startDate ? { startDate: filters.startDate } : {}),
      ...(filters.endDate ? { endDate: filters.endDate } : {}),
    };

    const userUrlBasePath = this.stores.authentication.userUrlBasePath();
    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/activities').setPathParams({ innovationId }).setQueryParams(qp);

    return this.http.get<InnovationActivityLogListInDTO>(url.buildUrl()).pipe(
      take(1),
      map(response => ({
        count: response.count,
        data: response.data.map(i => {

          let link: null | { label: string; url: string; } = null;
          const sectionIdentification = i.params.sectionId ? this.stores.innovation.getInnovationRecordSectionIdentification(i.params.sectionId) : '';

          // Handle sections from previous innovation record versions
          if (!sectionIdentification) {

            switch (i.activity) {
              case ActivityLogItemsEnum.SECTION_DRAFT_UPDATE:
                i.activity = ActivityLogItemsEnum.SECTION_DRAFT_UPDATE_DEPRECATED;
                break;
              case ActivityLogItemsEnum.SECTION_SUBMISSION:
                i.activity = ActivityLogItemsEnum.SECTION_SUBMISSION_DEPRECATED;
                break;
              case ActivityLogItemsEnum.ACTION_CREATION:
                i.activity = ActivityLogItemsEnum.ACTION_CREATION_DEPRECATED;
                break;
              case ActivityLogItemsEnum.ACTION_STATUS_SUBMITTED_UPDATE:
                i.activity = ActivityLogItemsEnum.ACTION_STATUS_SUBMITTED_UPDATE_DEPRECATED;
                break;
            }

          }

          switch (ACTIVITY_LOG_ITEMS[i.activity].link) {
            case 'NEEDS_ASSESSMENT':
              link = i.params.assessmentId ? { label: 'Go to Needs assessment', url: `/${userUrlBasePath}/innovations/${response.innovation.id}/assessments/${i.params.assessmentId}` } : null;
              break;
            case 'NEEDS_REASSESSMENT':
              link = i.params.assessment?.id ? { label: 'Go to Needs reassessment', url: `/${userUrlBasePath}/innovations/${response.innovation.id}/assessments/${i.params.assessment.id}` } : null;
              break;
            case 'SUPPORT_STATUS':
              link = { label: 'Go to Support status', url: `/${userUrlBasePath}/innovations/${response.innovation.id}/support` };
              break;
            case 'SECTION':
              link = i.params.sectionId && sectionIdentification ? { label: 'View section', url: `/${userUrlBasePath}/innovations/${response.innovation.id}/record/sections/${i.params.sectionId}` } : null;
              break;
            case 'THREAD':
              link = { label: 'View messages', url: `/${userUrlBasePath}/innovations/${response.innovation.id}/threads/${i.params.thread?.id}` };
              break;
            case 'ACTION':
              if (['innovator', 'accessor'].includes(userUrlBasePath) && sectionIdentification && i.params.actionId) { // Don't make sense for assessment users.
                link = { label: 'View action', url: `/${userUrlBasePath}/innovations/${response.innovation.id}/action-tracker/${i.params.actionId}` };
              }
              break;
          }

          return {
            date: i.date,
            type: i.type,
            activity: i.activity,
            innovation: response.innovation,
            params: {
              ...i.params,
              innovationName: response.innovation.name,
              sectionTitle: sectionIdentification ? `${sectionIdentification.section.title}` : '',
              actionUserRole: i.params.actionUserRole ? `(${this.stores.authentication.getRoleDescription(i.params.actionUserRole)})` : ''
            },
            link
          };

        })
      }))
    );
  }


  // Export requests.
  getExportRequestsList(innovationId: string, queryParams: APIQueryParamsType<{ statuses?: InnovationExportRequestStatusEnum[] }>): Observable<InnovationExportRequestsListDTO> {

    const { filters, ...qParams } = queryParams;

    const qp = {
      ...qParams,
      ...({ statuses: filters?.statuses }),
    }

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/export-requests').setPathParams({ innovationId }).setQueryParams(qp);
    return this.http.get<InnovationExportRequestsListDTO>(url.buildUrl()).pipe(take(1));

  }

  getExportRequestInfo(innovationId: string, requestId: string): Observable<InnovationExportRequestInfoDTO> {
    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/export-requests/:requestId').setPathParams({ innovationId, requestId });
    return this.http.get<InnovationExportRequestInfoDTO>(url.buildUrl()).pipe(take(1));
  }

  createExportRequest(innovationId: string, body: { requestReason: string }) {
    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/export-requests').setPathParams({ innovationId });
    return this.http.post<{ id: string }>(url.buildUrl(), body).pipe(take(1));
  }

  updateExportRequestStatus(innovationId: string, requestId: string, body: { status: keyof typeof InnovationExportRequestStatusEnum, rejectReason?: string }): Observable<void> {
    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/export-requests/:requestId').setPathParams({ innovationId, requestId });
    return this.http.patch<void>(url.buildUrl(), body).pipe(take(1));
  }


  // Sections
  getSectionInfo(innovationId: string, sectionId: string, filters: { fields?: ('actions')[] }): Observable<InnovationSectionInfoDTO> {

    const qp = {
      ...(filters.fields ? { fields: filters.fields } : {})
    };

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/sections/:sectionId').setPathParams({ innovationId, sectionId }).setQueryParams(qp);
    return this.http.get<InnovationSectionInfoDTO>(url.buildUrl()).pipe(take(1), map(response => response));

  }

}
