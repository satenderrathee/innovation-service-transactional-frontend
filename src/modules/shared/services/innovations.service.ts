import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { CoreService } from '@app/base';

import { UrlModel } from '@app/base/models';
import { APIQueryParamsType, DateISOType } from '@app/base/types';

import { AccessorOrganisationRoleEnum, InnovatorOrganisationRoleEnum, UserTypeEnum } from '@modules/stores/authentication/authentication.enums';
import { InnovationSectionEnum, InnovationStatusEnum, InnovationSupportStatusEnum } from '@modules/stores/innovation/innovation.enums';
import { INNOVATION_SECTION_ACTION_STATUS } from '@modules/stores/innovation/innovation.models';
import { mainCategoryItems } from '@modules/stores/innovation/sections/catalogs.config';


export enum AssessmentSupportFilterEnum {
  UNASSIGNED = 'UNASSIGNED',
  ENGAGING = 'ENGAGING',
  NOT_ENGAGING = 'NOT_ENGAGING'
}

export type InnovationsListFiltersType = {
  name?: null | string,
  mainCategories?: string[],
  locations?: string[],
  status?: InnovationStatusEnum[],
  assessmentSupportStatus?: AssessmentSupportFilterEnum,
  supportStatuses?: InnovationSupportStatusEnum[],
  engagingOrganisations?: string[],
  assignedToMe?: boolean,
  suggestedOnly?: boolean,
  fields?: ('isAssessmentOverdue' | 'assessment' | 'supports' | 'notifications')[]
}

export type InnovationsListDTO = {
  count: number,
  data: {
    id: string,
    name: string,
    description: null | string,
    status: InnovationStatusEnum,
    submittedAt: null | DateISOType,
    countryName: null | string,
    postCode: null | string,
    mainCategory: null | string,
    otherMainCategoryDescription: null | string,
    isAssessmentOverdue?: boolean,
    assessment?: null | { id: string, createdAt: DateISOType, finishedAt: null | DateISOType, assignedTo: { name: string } },
    supports?: {
      id: string,
      status: InnovationSupportStatusEnum,
      updatedAt: DateISOType,
      organisation: {
        id: string, name: string, acronym: null | string,
        unit: {
          id: string, name: string, acronym: string,
          // Users only exists while a support is ENGAGING.
          users?: { name: string, role: AccessorOrganisationRoleEnum | InnovatorOrganisationRoleEnum }[]
        }
      }
    }[],
    notifications?: number
  }[]
};


export type getInnovationInfoEndpointDTO = {
  id: string;
  name: string;
  status: InnovationStatusEnum;
  description: string;
  countryName: string;
  postcode: string;
  submittedAt?: string;
  assessment?: {
    id: string;
  };
  actions: {
    requestedCount: number;
    inReviewCount: number;
  },
  notifications: { [key: string]: number }
};

export type GetInnovationNeedsAssessmentEndpointInDTO = {
  id: string;
  description: null | string;
  maturityLevel: null | string;
  maturityLevelComment: null | string;
  hasRegulatoryApprovals: null | string;
  hasRegulatoryApprovalsComment: null | string;
  hasEvidence: null | string;
  hasEvidenceComment: null | string;
  hasValidation: null | string;
  hasValidationComment: null | string;
  hasProposition: null | string;
  hasPropositionComment: null | string;
  hasCompetitionKnowledge: null | string;
  hasCompetitionKnowledgeComment: null | string;
  hasImplementationPlan: null | string;
  hasImplementationPlanComment: null | string;
  hasScaleResource: null | string;
  hasScaleResourceComment: null | string;
  summary: null | string;
  suggestedOrganisations: { id: string; name: string; acronym: null | string, units: { id: string; name: string; acronym: string; }[] }[];
  assignTo: { id: string, name: string };
  finishedAt: null | string;
  updatedAt: null | string;
  updatedBy: { id: string, name: string };
};

export type GetInnovationNeedsAssessmentEndpointOutDTO = {
  assessment: Omit<GetInnovationNeedsAssessmentEndpointInDTO, 'id'> & { hasBeenSubmitted: boolean };
};


export type getInnovationActionInfoInDTO = {
  id: string;
  displayId: string;
  status: keyof typeof INNOVATION_SECTION_ACTION_STATUS;
  description: string;
  section: InnovationSectionEnum;
  createdAt: string; // '2021-04-16T09:23:49.396Z',
  createdBy: { id: string; name: string; };
};
export type getInnovationActionInfoOutDTO = Omit<getInnovationActionInfoInDTO, 'createdBy'> & { name: string, createdBy: string };

export type GetThreadsListDTO = {
  count: number;
  threads: {
    id: string;
    subject: string;
    messageCount: number;
    createdAt: DateISOType;
    isNew: boolean;
    lastMessage: {
      id: string;
      createdAt: DateISOType;
      createdBy: {
        id: string;
        name: string;
        type: UserTypeEnum;
        organisationUnit?: { id: string, name: string, acronym: string };
      }
    }
  }[];
};

export type GetThreadInfoDTO = {
  id: string;
  subject: string;
  createdAt: DateISOType;
  createdBy: { id: string, name: string, type: UserTypeEnum }
};

export type GetThreadMessageInfoDTO = {
  id: string;
  message: string;
  createdAt: DateISOType;
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
      type: UserTypeEnum;
      organisation?: { id: string, name: string, acronym: string };
      organisationUnit?: { id: string, name: string, acronym: string };
    };
    updatedAt: null | DateISOType;
    isNew: boolean;
    isEditable: boolean;
  }[];
};
export type GetThreadMessagesListOutDTO = {
  count: number;
  messages: (
    Omit<GetThreadMessagesListInDTO['messages'][0], 'createdBy'> & {
      createdBy: GetThreadMessagesListInDTO['messages'][0]['createdBy'] & { typeDescription: string }
    })[];
};


@Injectable()
export class InnovationsService extends CoreService {

  constructor() { super(); }


  getInnovationsList(queryParams?: APIQueryParamsType<InnovationsListFiltersType>): Observable<InnovationsListDTO> {

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
      ...(filters.engagingOrganisations ? { engagingOrganisations: filters.engagingOrganisations } : {}),
      ...(filters.assignedToMe !== undefined ? { assignedToMe: filters.assignedToMe } : {}),
      ...(filters.suggestedOnly != undefined ? { suggestedOnly: filters.suggestedOnly } : {}),
      fields: [] as InnovationsListFiltersType['fields']
    };

    switch (requestUserType) {
      case UserTypeEnum.ASSESSMENT:
        qp.fields = ['isAssessmentOverdue', 'assessment', 'supports'];
        break;
      case UserTypeEnum.ACCESSOR:
        qp.status = [InnovationStatusEnum.IN_PROGRESS];
        qp.fields = ['assessment', 'supports', 'notifications'];
        break;

      default:
        break;
    }

    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1').setQueryParams(qp);
    return this.http.get<InnovationsListDTO>(url.buildUrl()).pipe(
      take(1),
      map(response => ({
        count: response.count,
        data: response.data.map(item => ({
          ...item,
          mainCategory: item.otherMainCategoryDescription || mainCategoryItems.find(i => i.value === item.mainCategory)?.label || '',
        }))
      }))

    );

  }

  getInnovatorInnovationInfo(innovationId: string): Observable<getInnovationInfoEndpointDTO> {

    const url = new UrlModel(this.API_URL).addPath('innovators/:userId/innovations/:innovationId').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId });
    return this.http.get<getInnovationInfoEndpointDTO>(url.buildUrl()).pipe(
      take(1),
      map(response => response)
    );

  }

  getInnovatorInnovationActionInfo(innovationId: string, actionId: string): Observable<getInnovationActionInfoOutDTO> {

    const url = new UrlModel(this.API_URL).addPath('innovators/:userId/innovations/:innovationId/actions/:actionId').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId, actionId });
    return this.http.get<getInnovationActionInfoInDTO>(url.buildUrl()).pipe(
      take(1),
      map(response => ({
        id: response.id,
        displayId: response.displayId,
        status: response.status,
        name: `Submit '${this.stores.innovation.getSectionTitle(response.section).toLowerCase()}'`,
        description: response.description,
        section: response.section,
        createdAt: response.createdAt,
        createdBy: response.createdBy.name
      }))
    );

  }

  // Needs Assessment
  getInnovationNeedsAssessment(innovationId: string, assessmentId: string): Observable<GetInnovationNeedsAssessmentEndpointOutDTO> {
    
    const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/assessments/:assessmentId').setPathParams({ innovationId, assessmentId });
    return this.http.get<GetInnovationNeedsAssessmentEndpointInDTO>(url.buildUrl()).pipe(
      take(1),
      map(response => ({
        assessment: {
          description: response.description,
          maturityLevel: response.maturityLevel,
          maturityLevelComment: response.maturityLevelComment,
          hasRegulatoryApprovals: response.hasRegulatoryApprovals,
          hasRegulatoryApprovalsComment: response.hasRegulatoryApprovalsComment,
          hasEvidence: response.hasEvidence,
          hasEvidenceComment: response.hasEvidenceComment,
          hasValidation: response.hasValidation,
          hasValidationComment: response.hasValidationComment,
          hasProposition: response.hasProposition,
          hasPropositionComment: response.hasPropositionComment,
          hasCompetitionKnowledge: response.hasCompetitionKnowledge,
          hasCompetitionKnowledgeComment: response.hasCompetitionKnowledgeComment,
          hasImplementationPlan: response.hasImplementationPlan,
          hasImplementationPlanComment: response.hasImplementationPlanComment,
          hasScaleResource: response.hasScaleResource,
          hasScaleResourceComment: response.hasScaleResourceComment,
          summary: response.summary,
          suggestedOrganisations: response.suggestedOrganisations,
          assignTo: response.assignTo,
          finishedAt: response.finishedAt,
          updatedAt: response.updatedAt,
          updatedBy: response.updatedBy,
          hasBeenSubmitted: !!response.finishedAt
        }
      }))
    );

  }


  // Threads and messages methods.
  getThreadsList(innovationId: string, queryParams: APIQueryParamsType<{}>): Observable<GetThreadsListDTO> {

    const { filters, ...qp } = queryParams;

    const url = new UrlModel(this.API_URL).addPath('innovations/:innovationId/threads').setPathParams({ innovationId }).setQueryParams(qp);
    return this.http.get<GetThreadsListDTO>(url.buildUrl()).pipe(take(1),
      map(response => ({
        count: response.count,
        threads: response.threads
      }))
    );

  }

  getThreadInfo(innovationId: string, threadId: string): Observable<GetThreadInfoDTO> {

    const url = new UrlModel(this.API_URL).addPath('innovations/:innovationId/threads/:threadId').setPathParams({ innovationId, threadId });
    return this.http.get<GetThreadInfoDTO>(url.buildUrl()).pipe(take(1),
      map(response => response)
    );

  }

  getThreadMessageInfo(innovationId: string, threadId: string, messageId: string): Observable<GetThreadMessageInfoDTO> {

    const url = new UrlModel(this.API_URL).addPath('innovations/:innovationId/threads/:threadId/messages/:messageId').setPathParams({ innovationId, threadId, messageId });

    return this.http.get<GetThreadMessageInfoDTO>(url.buildUrl()).pipe(take(1),
      map(response => response)
    );

  }

  getThreadMessagesList(innovationId: string, threadId: string, queryParams: APIQueryParamsType<{}>): Observable<GetThreadMessagesListOutDTO> {

    const { filters, ...qp } = queryParams;

    const url = new UrlModel(this.API_URL).addPath('innovations/:innovationId/threads/:threadId/messages').setPathParams({ innovationId, threadId }).setQueryParams(qp);
    return this.http.get<GetThreadMessagesListInDTO>(url.buildUrl()).pipe(take(1),
      map(response => ({
        count: response.count,
        messages: response.messages.map(message => ({
          ...message,
          createdBy: { ...message.createdBy, typeDescription: this.stores.authentication.getUserTypeDescription(message.createdBy.type) }
        }))
      }))
    );

  }

  createThread(innovationId: string, body: { subject: string, message: string }): Observable<{ id: string }> {

    const url = new UrlModel(this.API_URL).addPath('innovations/:innovationId/threads').setPathParams({ innovationId });
    return this.http.post<{ id: string }>(url.buildUrl(), body).pipe(take(1), map(response => response));

  }

  createThreadMessage(innovationId: string, threadId: string, body: { message: string }): Observable<{ id: string }> {

    const url = new UrlModel(this.API_URL).addPath('innovations/:innovationId/threads/:threadId/messages').setPathParams({ innovationId, threadId });
    return this.http.post<{ id: string }>(url.buildUrl(), body).pipe(take(1), map(response => response));

  }

  editThreadMessage(innovationId: string, threadId: string, messageId: string, body: { message: string }): Observable<{ id: string }> {

    const url = new UrlModel(this.API_URL).addPath('innovations/:innovationId/threads/:threadId/messages/:messageId').setPathParams({ innovationId, threadId, messageId });
    return this.http.put<{ id: string }>(url.buildUrl(), body).pipe(take(1), map(response => response));

  }

}
