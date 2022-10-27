import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { CoreService } from '@app/base';
import { UrlModel } from '@app/base/models';
import { APIQueryParamsType, DateISOType, MappedObjectType } from '@app/base/types';

import { InnovationActionStatusEnum, InnovationSectionEnum, InnovationStatusEnum, InnovationSupportStatusEnum, INNOVATION_SECTION_ACTION_STATUS, INNOVATION_SUPPORT_STATUS } from '@modules/stores/innovation';

export enum SupportLogType {
  ACCESSOR_SUGGESTION = 'ACCESSOR_SUGGESTION',
  STATUS_UPDATE = 'STATUS_UPDATE',
}


export type getAdvanceActionsListEndpointInDTO = {
  count: number;
  data: {
    id: string;
    displayId: string;
    status: keyof typeof INNOVATION_SECTION_ACTION_STATUS;
    section: InnovationSectionEnum;
    createdAt: DateISOType;
    updatedAt: DateISOType;
    innovation: {
      id: string;
      name: string;
    };
    notifications?: {
      count: number;
    }
  }[];
};
export type getAdvanceActionsListEndpointOutDTO = {
  count: number, data: (getAdvanceActionsListEndpointInDTO['data'][0] & { name: string })[]
};

export type getInnovationInfoEndpointDTO = {
  summary: {
    id: string;
    name: string;
    status: InnovationStatusEnum;
    description: string;
    company: string;
    countryName: string;
    postCode: string;
    categories: string[];
    otherCategoryDescription: null | string;
    companySize: string;
  };
  contact: {
    name: string;
  };
  assessment?: {
    id: string;
  };
  support?: {
    id: string;
    status: InnovationSupportStatusEnum;
  };
  lockedInnovatorValidation: {
    displayIsInnovatorLocked: boolean;
    innovatorName?: string;
  };
  notifications: { [key: string]: number },
};

type getInnovationActionsListEndpointInDTO = {
  id: string;
  displayId: string;
  status: InnovationActionStatusEnum;
  section: InnovationSectionEnum;
  createdAt: DateISOType;
  notifications: {
    count: number,
    hasNew: boolean;
  },
};
export type getInnovationActionsListEndpointOutDTO = {
  openedActions: (getInnovationActionsListEndpointInDTO & { name: string })[];
  closedActions: (getInnovationActionsListEndpointInDTO & { name: string })[];
};

export type GetInnovationActionInfoInDTO = {
  id: string;
  displayId: string;
  status: InnovationActionStatusEnum;
  description: string;
  section: InnovationSectionEnum;
  createdAt: DateISOType;
  createdBy: { id: string; name: string; };
};
export type GetInnovationActionInfoOutDTO = Omit<GetInnovationActionInfoInDTO, 'createdBy'> & { name: string, createdBy: string };

export type getActionsListEndpointInDTO = {
  count: number;
  data: {
    id: string;
    displayId: string;
    status: InnovationActionStatusEnum;
    section: InnovationSectionEnum;
    createdAt: DateISOType;
    updatedAt: DateISOType;
    innovation: {
      id: string;
      name: string;
    };
    notifications?: {
      count: number;
    }
  }[];
};
export type getActionsListEndpointOutDTO = { count: number, data: (getActionsListEndpointInDTO['data'][0] & { name: string })[] };


export type getSupportLogInDTO = {
  id: string;
  type: SupportLogType;
  description: string;
  createdBy: string;
  createdAt: DateISOType;
  innovationSupportStatus: keyof typeof INNOVATION_SUPPORT_STATUS;
  organisationUnit: {
    id: string; name: string; acronym: string;
    organisation: { id: string; name: string; acronym: string; };
  };
  suggestedOrganisationUnits?: {
    id: string; name: string; acronym: string;
    organisation: { id: string; name: string; acronym: string; };
  }[];
};
export type getSupportLogOutDTO = getSupportLogInDTO & { logTitle: string; suggestedOrganisationUnitsNames: string[]; };


@Injectable()
export class AccessorService extends CoreService {

  constructor() { super(); }


  getInnovationInfo(innovationId: string): Observable<getInnovationInfoEndpointDTO> {

    const url = new UrlModel(this.API_URL).addPath('accessors/:userId/innovations/:innovationId').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId });
    return this.http.get<getInnovationInfoEndpointDTO>(url.buildUrl()).pipe(
      take(1),
      map(response => response)
    );

  }

  getInnovationActionsList(innovationId: string): Observable<getInnovationActionsListEndpointOutDTO> {

    const url = new UrlModel(this.API_URL).addPath('accessors/:userId/innovations/:innovationId/actions').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId });

    return this.http.get<getInnovationActionsListEndpointInDTO[]>(url.buildUrl()).pipe(
      take(1),
      map(response => {
        return {
          openedActions: response.filter(item => [InnovationActionStatusEnum.REQUESTED, InnovationActionStatusEnum.STARTED, InnovationActionStatusEnum.CONTINUE, InnovationActionStatusEnum.IN_REVIEW].includes(item.status)).map(item => ({
            ...item, name: `Submit '${this.stores.innovation.getSectionTitle(item.section)}'`
          })),
          closedActions: response.filter(item => [InnovationActionStatusEnum.DELETED, InnovationActionStatusEnum.DECLINED, InnovationActionStatusEnum.COMPLETED, InnovationActionStatusEnum.CANCELLED].includes(item.status)).map(item => ({
            ...item, name: `Submit '${this.stores.innovation.getSectionTitle(item.section)}'`
          })),
        };
      })
    );

  }

  getInnovationActionInfo(innovationId: string, actionId: string): Observable<GetInnovationActionInfoOutDTO> {

    const url = new UrlModel(this.API_URL).addPath('accessors/:userId/innovations/:innovationId/actions/:actionId').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId, actionId });
    return this.http.get<GetInnovationActionInfoInDTO>(url.buildUrl()).pipe(
      take(1),
      map(response => ({
        id: response.id,
        displayId: response.displayId,
        status: response.status,
        name: `Submit '${this.stores.innovation.getSectionTitle(response.section).toString().toLowerCase()}'`,
        description: response.description,
        section: response.section,
        createdAt: response.createdAt,
        createdBy: response.createdBy.name
      }))
    );

  }


  getActionsList(queryParams: APIQueryParamsType): Observable<getActionsListEndpointOutDTO> {

    const { filters, ...qParams } = queryParams;

    const qp = {
      ...qParams,
      openActions: filters.openActions as string || ''
    };

    const url = new UrlModel(this.API_URL).addPath('/accessors/:userId/actions').setPathParams({ userId: this.stores.authentication.getUserId() }).setQueryParams(qp);
    return this.http.get<getActionsListEndpointInDTO>(url.buildUrl()).pipe(
      take(1),
      map(response => ({
        count: response.count,
        data: response.data.map(item => ({ ...item, ...{ name: `Submit '${this.stores.innovation.getSectionTitle(item.section)}'`, } }))
      }))
    );

  }



  getAdvanceActionsList(
    queryParams: APIQueryParamsType<{ name: string, innovationStatus: string[], innovationSection: string[] }>
  ): Observable<getAdvanceActionsListEndpointOutDTO> {
    const { filters, ...qParams } = queryParams;

    const qp = {
      ...qParams,
      name: filters.name || undefined,
      innovationStatus: filters.innovationStatus || undefined,
      innovationSection: filters.innovationSection || undefined
    };

    const url = new UrlModel(this.API_URL).addPath('/accessors/:userId/actions/advance').setPathParams({ userId: this.stores.authentication.getUserId() }).setQueryParams(qp);
    return this.http.get<getAdvanceActionsListEndpointInDTO>(url.buildUrl()).pipe(
      take(1),
      map(response => ({
        count: response.count,
        data: response.data.map(item => ({ ...item, ...{ name: `Submit '${this.stores.innovation.getSectionTitle(item.section)}'`, } }))
      }))
    );

  }

  createAction(innovationId: string, body: MappedObjectType): Observable<{ id: string }> {

    const url = new UrlModel(this.API_URL).addPath('accessors/:userId/innovations/:innovationId/actions').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId });
    return this.http.post<{ id: string }>(url.buildUrl(), body).pipe(
      take(1),
      map(response => response)
    );

  }

  updateAction(innovationId: string, actionId: string, body: MappedObjectType): Observable<{ id: string }> {

    const url = new UrlModel(this.API_URL).addPath('accessors/:userId/innovations/:innovationId/actions/:actionId').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId, actionId });
    return this.http.put<{ id: string }>(url.buildUrl(), body).pipe(
      take(1),
      map(response => response)
    );

  }


  saveSupportStatus(
    innovationId: string,
    body: { status: InnovationSupportStatusEnum, message: string, accessors?: { id: string, organisationUnitUserId: string }[] },
    supportId?: string
  ): Observable<{ id: string }> {

    // If NOT enganging, the enpoint won't accept an accessors key.
    if (body.status !== InnovationSupportStatusEnum.ENGAGING) {
      delete body.accessors;
    }

    if (!supportId) {

      const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/supports').setPathParams({ innovationId });
      return this.http.post<{ id: string }>(url.buildUrl(), body).pipe(take(1), map(response => response));

    } else {

      const url = new UrlModel(this.API_INNOVATIONS_URL).addPath('v1/:innovationId/supports/:supportId').setPathParams({ innovationId, supportId });
      return this.http.put<{ id: string }>(url.buildUrl(), body).pipe(take(1), map(response => response));

    }

  }

  getSupportLog(innovationId: string): Observable<getSupportLogOutDTO[]> {

    const url = new UrlModel(this.API_URL).addPath('accessors/:userId/innovations/:innovationId/support-logs').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId });
    return this.http.get<getSupportLogInDTO[]>(url.buildUrl()).pipe(
      take(1),
      map(response => response.map(item => {

        let logTitle = '';

        switch (item.type) {
          case SupportLogType.ACCESSOR_SUGGESTION:
            logTitle = 'Suggested organisations';
            break;
          case SupportLogType.STATUS_UPDATE:
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

  suggestNewOrganisations(innovationId: string, body: { organisationUnits: string[], type: SupportLogType, description: string }): Observable<{ id: string }> {

    const url = new UrlModel(this.API_URL).addPath('accessors/:userId/innovations/:innovationId/support-logs').setPathParams({ userId: this.stores.authentication.getUserId(), innovationId });
    return this.http.post<{ id: string }>(url.buildUrl(), body).pipe(
      take(1),
      map(response => response)
    );

  }


}
