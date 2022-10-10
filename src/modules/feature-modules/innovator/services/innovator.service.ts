import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { CoreService } from '@app/base';

import { UrlModel } from '@app/base/models';
import { MappedObjectType } from '@app/base/types';

import { InnovationActionStatusEnum, InnovationSectionEnum, InnovationStatusEnum, InnovationSupportStatusEnum, INNOVATION_SECTION_ACTION_STATUS, INNOVATION_SUPPORT_STATUS } from '@modules/stores/innovation';


type getInnovationActionsListEndpointInDTO = {
  id: string;
  displayId: string;
  status: InnovationActionStatusEnum;
  section: InnovationSectionEnum;
  createdAt: string; // '2021-04-16T09:23:49.396Z',
  notifications: {
    count: number
  },
};

export type getInnovationSupportsInDTO = {
  id: string;
  status: keyof typeof INNOVATION_SUPPORT_STATUS;
  organisationUnit: {
    id: string;
    name: string;
    organisation: {
      id: string;
      name: string;
      acronym: string;
    };
  };
  accessors?: { id: string, name: string }[];
  notifications?: { [key: string]: number };
};

export type getInnovationActionsListEndpointOutDTO = {
  openedActions: (getInnovationActionsListEndpointInDTO & { name: string })[];
  closedActions: (getInnovationActionsListEndpointInDTO & { name: string })[];
};

export type getInnovationNeedsAssessmentEndpointInDTO = {
  id: string;
  innovation: { id: string; name: string; };
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
  organisations: { id: string; name: string; acronym: null | string; organisationUnits: { id: string; name: string; acronym: string; }[]; }[];
  assignToName: string;
  finishedAt: null | string;
  updatedBy: null | string;
  updatedAt: null | string;
  createdAt: null | string;
  createdBy: null | string;
};
export type getInnovationNeedsAssessmentEndpointOutDTO = {
  innovation: { id: string; name: string; };
  assessment: Omit<getInnovationNeedsAssessmentEndpointInDTO, 'id' | 'innovation' | 'organisations'> & {
    organisations: {
      id: string;
      name: string;
      acronym: null | string;
      organisationUnits: { id: string; name: string; acronym: string; }[];
    }[];
  }
};

export type GetSupportLogListInDTO = {
  id: string;
  type: 'ACCESSOR_SUGGESTION' | 'STATUS_UPDATE',
  description: string;
  createdBy: string;
  createdAt: string;
  innovationSupportStatus: InnovationSupportStatusEnum;
  organisationUnit: {
    id: string; name: string; acronym: string;
    organisation: { id: string; name: string; acronym: string; };
  };
  suggestedOrganisationUnits?: {
    id: string; name: string; acronym: string;
    organisation: { id: string; name: string; acronym: string; };
  }[];
};
export type GetSupportLogListOutDTO = GetSupportLogListInDTO & { logTitle: string; suggestedOrganisationUnitsNames: string[]; };

export type getInnovationTransfersDTO = {
  id: string;
  email: string;
  name?: string;
  innovation: { id: string, name: string, owner?: string };
};

@Injectable()
export class InnovatorService extends CoreService {

  constructor() { super(); }

  submitFirstTimeSigninInfo(type: 'FIRST_TIME_SIGNIN' | 'TRANSFER', data: { [key: string]: any }): Observable<{ id: string }> {

    const body: {
      actionType: '' | 'first_time_signin' | 'transfer',
      user: { displayName: string, mobilePhone?: string },
      transferId?: string,
      innovation?: { name: string, description: string, countryName: string, postcode: string, organisationShares: string[] },
      organisation?: { name: string, size: string }
    } = {
      actionType: '',
      user: { displayName: data.innovatorName },
      organisation: data.isCompanyOrOrganisation.toUpperCase() === 'YES' ? { name: data.organisationName, size: data.organisationSize } : undefined
    };

    switch (type) {
      case 'FIRST_TIME_SIGNIN':
        body.actionType = 'first_time_signin';
        body.user.mobilePhone = data.mobilePhone;
        body.innovation = {
          name: data.innovationName,
          description: data.innovationDescription,
          countryName: data.locationCountryName || data.location,
          postcode: data.englandPostCode || '',
          organisationShares: data.organisationShares || []
        };
        break;

      case 'TRANSFER':
        body.actionType = 'transfer';
        body.transferId = data.transferId;
        break;

      default:
        break;
    }

    const url = new UrlModel(this.API_URL).addPath('innovators');
    return this.http.post<{ id: string }>(url.buildUrl(), body).pipe(take(1), map(response => response));

  }

  createInnovation(body: { name: string, description: string, countryName: string, postcode: string, organisationShares: string[] }): Observable<{ id: string }> {

    const url = new UrlModel(this.API_URL).addPath('innovators/:userId/innovations').setPathParams({ userId: this.stores.authentication.getUserId() });
    return this.http.post<{ id: string }>(url.buildUrl(), body).pipe(
      take(1),
      map(response => response)
    );

  }

  getInnovationSupports(innovationId: string, returnAccessorsInfo: boolean): Observable<getInnovationSupportsInDTO[]> {

    const url = new UrlModel(this.API_URL).addPath('innovators/:userId/innovations/:innovationId/supports').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId }).setQueryParams({ full: returnAccessorsInfo });
    return this.http.get<getInnovationSupportsInDTO[]>(url.buildUrl()).pipe(
      take(1),
      map(response => response)
    );
  }

  getInnovationActionsList(innovationId: string): Observable<getInnovationActionsListEndpointOutDTO> {

    const url = new UrlModel(this.API_URL).addPath('innovators/:userId/innovations/:innovationId/actions').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId });
    return this.http.get<getInnovationActionsListEndpointInDTO[]>(url.buildUrl()).pipe(
      take(1),
      map(response => {
        return {
          openedActions: response.filter(item => [InnovationActionStatusEnum.REQUESTED, InnovationActionStatusEnum.STARTED, InnovationActionStatusEnum.CONTINUE, InnovationActionStatusEnum.IN_REVIEW].includes(item.status)).map(item => ({
            ...item, ...{ name: `Submit '${this.stores.innovation.getSectionTitle(item.section)}'` }
          })),
          closedActions: response.filter(item => [InnovationActionStatusEnum.DELETED, InnovationActionStatusEnum.DECLINED, InnovationActionStatusEnum.COMPLETED, InnovationActionStatusEnum.CANCELLED].includes(item.status)).map(item => ({
            ...item, ...{ name: `Submit '${this.stores.innovation.getSectionTitle(item.section)}'` }
          })),
        };
      })
    );

  }

  declineAction(innovationId: string, actionId: string, body: MappedObjectType): Observable<{ id: string }> {

    const url = new UrlModel(this.API_URL).addPath('innovators/:userId/innovations/:innovationId/actions/:actionId').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId, actionId });
    return this.http.put<{ id: string }>(url.buildUrl(), body).pipe(
      take(1),
      map(response => response)
    );

  }

  getInnovationShares(innovationId: string): Observable<{ id: string, status: keyof typeof INNOVATION_SUPPORT_STATUS }[]> {

    const url = new UrlModel(this.API_URL).addPath('innovators/:userId/innovations/:innovationId/shares').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId });
    return this.http.get<{ id: string, status: keyof typeof INNOVATION_SUPPORT_STATUS }[]>(url.buildUrl()).pipe(
      take(1),
      map(response => response)
    );

  }

  submitOrganisationSharing(innovationId: string, body: MappedObjectType): Observable<{ id: string }> {

    const url = new UrlModel(this.API_URL).addPath('innovators/:userId/innovations/:innovationId/shares').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId });
    return this.http.put<{ id: string }>(url.buildUrl(), body).pipe(
      take(1),
      map(response => response)
    );
  }

  getInnovationNeedsAssessment(innovationId: string, assessmentId: string): Observable<getInnovationNeedsAssessmentEndpointOutDTO> {

    const url = new UrlModel(this.API_URL).addPath('innovators/:userId/innovations/:innovationId/assessments/:assessmentId').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId, assessmentId });
    return this.http.get<getInnovationNeedsAssessmentEndpointInDTO>(url.buildUrl()).pipe(
      take(1),
      map(response => ({
        innovation: response.innovation,
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
          finishedAt: response.finishedAt,
          assignToName: response.assignToName,
          updatedAt: response.updatedAt,
          updatedBy: response.updatedBy,
          createdAt: response.createdAt,
          createdBy: response.createdBy,
          organisations: response.organisations,
        }
      }))
    );

  }

  getSupportLogList(innovationId: string): Observable<GetSupportLogListOutDTO[]> {

    const url = new UrlModel(this.API_URL).addPath('innovators/:userId/innovations/:innovationId/support-logs').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId });
    return this.http.get<GetSupportLogListInDTO[]>(url.buildUrl()).pipe(
      take(1),
      map(response => response.map(item => {

        let logTitle = '';

        switch (item.type) {
          case 'ACCESSOR_SUGGESTION':
            logTitle = 'Suggested organisations';
            break;
          case 'STATUS_UPDATE':
            logTitle = 'Updated support status';
            break;
          default:
            break;
        }

        return {
          ...item,
          logTitle,
          suggestedOrganisationUnitsNames: (item.suggestedOrganisationUnits || []).map(o => o.name)
        };

      }))
    );
  }


  getInnovationTransfers(assignToMe = false): Observable<getInnovationTransfersDTO[]> {

    const qp: { assignedToMe?: boolean } = assignToMe ? { assignedToMe: true } : {};

    const url = new UrlModel(this.API_URL).addPath('innovators/innovation-transfers').setQueryParams(qp);
    return this.http.get<getInnovationTransfersDTO[]>(url.buildUrl()).pipe(take(1), map(response => response));

  }

  transferInnovation(body: { innovationId: string, email: string }): Observable<{ id: string }> {

    const url = new UrlModel(this.API_URL).addPath('innovators/innovation-transfers');
    return this.http.post<{ id: string }>(url.buildUrl(), body).pipe(take(1), map(response => response));

  }

  updateTransferInnovation(transferId: string, status: 'CANCELED' | 'DECLINED' | 'COMPLETED'): Observable<{ id: string }> {

    const url = new UrlModel(this.API_URL).addPath('innovators/innovation-transfers/:transferId').setPathParams({ transferId });
    return this.http.patch<{ id: string }>(url.buildUrl(), { status }).pipe(take(1), map(response => response));

  }

  archiveInnovation(innovationId: string, reason: string): Observable<{ id: string }> {

    const url = new UrlModel(this.API_URL).addPath('innovators/:userId/innovations/:innovationId/archive').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId });
    return this.http.patch<{ id: string }>(url.buildUrl(), { reason }).pipe(take(1), map(response => response));

  }

  deleteUserAccount(body: { reason: string }): Observable<{ id: string }> {

    const url = new UrlModel(this.API_URL).addPath('innovators/:userId/delete').setPathParams({ userId: this.stores.authentication.getUserId() });
    return this.http.patch<{ id: string }>(url.buildUrl(), body).pipe(take(1), map(response => response));

  }

}
