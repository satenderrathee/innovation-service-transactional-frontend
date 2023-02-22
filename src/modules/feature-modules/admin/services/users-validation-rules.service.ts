import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { CoreService } from '@app/base';

import { UrlModel } from '@app/base/models';


type AdminOperationType = 'LOCK_USER' | 'UPDATE_USER_ROLE' | 'CHANGE_UNIT';
type AdminOperationRuleType = 'AssessmentUserIsNotTheOnlyOne' | 'LastAccessorUserOnOrganisationUnit' | 'LastAccessorFromUnitProvidingSupport';

export type AdminValidationResponseDTO = {
  validations: {
    rule: AdminOperationRuleType,
    valid: boolean,
    data?: {
      // organisationUnit?: { id: string, name: string, acronym: string },
      // supports?: { count: number, innovations: { id: string, name: string }[] }
    }
  }[]
};


export type getLockUserRulesInDTO = {
  validations: {
    operation: string,
    valid: boolean,
    meta?: {
      supports: {
        count: number;
        innovations: { innovationId: string, innovationName: string; unitId: string; unitName: string }[]
      }
    } | { organisation: { id: string, name: string } } | {}
  }[]
};
export type getLockUserRulesOutDTO = {
  key: string;
  valid: boolean;
  meta: { [key: string]: any }
};

export type getOrganisationRoleRulesOutDTO = {
  key: keyof getOrgnisationRoleRulesInDTO;
  valid: boolean;
  meta: { [key: string]: any }
};

export type getOrgnisationRoleRulesInDTO = {
  lastAccessorUserOnOrganisationUnit: {
    valid: boolean,
    meta?: {
      supports: {
        count: number;
        innovations: { innovationId: string, innovationName: string; unitId: string; unitName: string }[]
      }
    }
  }
};

export type getOrganisationUnitRulesInDTO = {
  validations: {
    operation: string;
    valid: boolean;
    meta?: { organisation: { id: string, name: string } } |
    {
      supports: {
        count: number;
        innovations: { innovationId: string, innovationName: string; unitId: string; unitName: string }[]
      }
    } | { unit: { id: string, name: string } }
  }[]
};

export type getOrganisationUnitRulesOutDTO = {

  key: string;
  valid: boolean;
  meta?: { [key: string]: any }
};

export type changeUserTypeDTO = {
  id: string;
  status: string;
};


@Injectable()
export class UsersValidationRulesService extends CoreService {

  constructor() { super(); }


  getLockUserRules(userId: string): Observable<AdminValidationResponseDTO> {

    const url = new UrlModel(this.API_ADMIN_URL).addPath('v1/users/:userId/validate').setPathParams({ userId }).setQueryParams({ operation: 'LOCK_USER' });
    return this.http.get<AdminValidationResponseDTO>(url.buildUrl()).pipe(take(1), map(response => response));

  }

  getUserRoleRules(userId: string): Observable<getOrganisationRoleRulesOutDTO[]> {

    const url = new UrlModel(this.API_ADMIN_URL).addPath('v1/users/:userId/validate').setPathParams({ userId }).setQueryParams({ operation: 'UPDATE_USER_ROLE' });
    return this.http.get<getOrgnisationRoleRulesInDTO>(url.buildUrl()).pipe(
      take(1),
      map(response => Object.entries(response).map(([key, item]) => ({
        key: key as keyof getOrgnisationRoleRulesInDTO,
        valid: item.valid,
        meta: item.meta || {}
      }))
      )
    );

  }


  getOrganisationUnitRules(userId: string): Observable<getOrganisationUnitRulesOutDTO[]> {
    
    const url = new UrlModel(this.API_ADMIN_URL).addPath('v1/users/:userId/validate').setPathParams({ userId }).setQueryParams({ operation: 'CHANGE_UNIT' });
    return this.http.get<getOrganisationUnitRulesInDTO>(url.buildUrl()).pipe(
      take(1),
      map(response => response.validations.map(v => ({
        key: v.operation as keyof getOrganisationUnitRulesInDTO,
        valid: v.valid,
        meta: v.meta
      }))
      )
    );

  }

}