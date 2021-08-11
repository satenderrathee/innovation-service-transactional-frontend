import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { EnvironmentStore } from '../stores/environment.store';

import { UrlModel } from '../models/url.model';


@Injectable()
export class InnovationService {

  private API_URL: string;

  constructor(
    private http: HttpClient,
    private environmentStore: EnvironmentStore
  ) {
    this.API_URL = this.environmentStore.API_URL;
  }


  getInnovationTransfer(id: string): Observable<{ userExists: boolean }> {

    const url = new UrlModel(this.API_URL).addPath('innovators/innovation-transfers/:id/check').setPathParams({ id });
    return this.http.get<{ userExists: boolean }>(url.buildUrl()).pipe(
      take(1),
      map(response => response)
    );

  }

}
