import { Injectable } from '@angular/core';
import { forkJoin, Observable, Observer, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { Store } from '../store.class';

import { AuthenticationService } from './authentication.service';

import { AuthenticationModel } from './authentication.models';


@Injectable()
export class AuthenticationStore extends Store<AuthenticationModel> {

  constructor(
    private authenticationService: AuthenticationService
  ) {
    super('store::authentication', new AuthenticationModel());
  }


  initializeAuthentication$(): Observable<boolean> {

    return new Observable((observer: Observer<boolean>) => {

      this.authenticationService.verifyUserSession().pipe(
        concatMap(() => this.authenticationService.getUserInfo()),
        concatMap(user => {

          this.state.user = { ...user, ...{ innovations: [] } };
          this.state.isSignIn = true;

          return forkJoin([
            this.authenticationService.verifyInnovator(user.id),
            this.authenticationService.getInnovations(user.id)
          ]).pipe(
            map(([hasInnovator, innovations]) => {
              this.state.didFirstTimeSignIn = hasInnovator;
              if (this.state.user) { this.state.user.innovations = innovations; }
              return true;
            }),
            catchError(() => of(true)) // Suppress error as this is only additional information.
          );

        })
      ).subscribe(
        () => {
          this.setState(this.state);
          observer.next(true);
          observer.complete();
        },
        () => {
          this.setState(this.state);
          observer.error(false);
          observer.complete();
        }
      );

    });

  }

  isInnovator(): boolean { return this.state.user?.type === 'INNOVATOR'; }
  isAccessor(): boolean { return this.state.user?.type === 'ACCESSOR'; }
  isQualifyingAccessor(): boolean { return this.state.user?.type === 'QUALIFYING_ACCESSOR'; }

  didFirstTimeSignIn(): boolean { return this.state.didFirstTimeSignIn || false; }

  getUserId(): string { return this.state.user?.id || ''; }
  getUserType(): Required<AuthenticationModel>['user']['type'] {
    return this.state.user?.type || '';
  }

  getUserInfo(): Required<AuthenticationModel>['user'] {
    return this.state.user || { id: '', displayName: '', type: '', organisations: [], innovations: [] };
  }

}
