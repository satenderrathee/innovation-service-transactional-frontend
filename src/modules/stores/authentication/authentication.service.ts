import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { EnvironmentStore } from '@modules/core/stores/environment.store';

import { UrlModel } from '@modules/core/models/url.model';
import { LoggerService, Severity } from '@modules/core/services/logger.service';


type getUserInfoDto = {
  id: string;
  email: string;
  displayName: string;
  type: 'ASSESSMENT' | 'ACCESSOR' | 'INNOVATOR';
  organisations: {
    id: string;
    name: string;
    role: 'OWNER' | 'QUALIFYING_ACCESSOR' | 'ACCESSOR';
    isShadow: boolean;
    organisationUnits: {
      id: string;
      name: string;
    }[];
  }[];
};

type getUserInnovationsDto = {
  id: string;
  name: string;
};


@Injectable()
export class AuthenticationService {

  private APP_URL = this.environmentStore.APP_URL;
  private API_URL = this.environmentStore.API_URL;

  constructor(
    private http: HttpClient,
    private environmentStore: EnvironmentStore,
    private loggerService: LoggerService,
  ) { }


  verifyUserSession(): Observable<boolean> {
    this.loggerService.trackTrace('[Authentication Service] verifyUserSession called', Severity.INFORMATION);
    const url = new UrlModel(this.APP_URL).addPath('session')
      .buildUrl();
    this.loggerService.trackTrace('[Authentication Service] built url', Severity.INFORMATION, { url });
    return this.http.head(url).pipe(
      take(1),
      map(() => true),
      catchError((e) => throwError(e))
    );
  }

  getUserInfo(): Observable<getUserInfoDto> {

    const url = new UrlModel(this.API_URL).addPath('me');
    return this.http.get<getUserInfoDto>(url.buildUrl()).pipe(
      take(1),
      map(response => ({
        id: response.id,
        email: response.email,
        displayName: ['unknown'].includes(response.displayName) ? '' : response.displayName,
        type: response.type,
        organisations: response.organisations
      }))
    );

  }

  verifyInnovator(userId: string): Observable<boolean> {
    const url = new UrlModel(this.API_URL).addPath('innovators/:userId').setPathParams({ userId });
    return this.http.head(url.buildUrl()).pipe(
      take(1),
      map(() => true),
      catchError(() => of(false))
    );
  }

  getInnovations(userId: string): Observable<getUserInnovationsDto[]> {

    const url = new UrlModel(this.API_URL).addPath('innovators/:userId/innovations').setPathParams({ userId });
    return this.http.get<getUserInnovationsDto[]>(url.buildUrl()).pipe(
      take(1),
      map(response => response),
      catchError(() => of([])) // On error, just return no innovation at all.
    );

  }

}
