import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Observer, of, Subscription } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { Store } from '../store.class';

import { EnvironmentService } from './environment.service';

import { EnvironmentModel } from './environment.models';

@Injectable()
export class EnvironmentStore extends Store<EnvironmentModel> implements OnDestroy {

  private subscriptions: Subscription[] = [];

  get ENV(): EnvironmentModel['ENV'] { return this.state.ENV; }

  constructor(
    private environmentService: EnvironmentService
  ) {
    super('store::environment', new EnvironmentModel());
  }


  initializeAuthentication$(): Observable<boolean> {

    return new Observable((observer: Observer<boolean>) => {

      this.environmentService.verifyUserSession().pipe(
        concatMap(() => {
          return this.environmentService.getUserInfo();
        }),
        concatMap(response => {

          this.state.authentication = { ...response, ...{ isSignIn: true } };

          return this.environmentService.verifyInnovator(response.user.id).pipe(
            map(() => {
              this.state.authentication.didFirstTimeSignIn = true;
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

  isUserAuthenticated$(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.subscriptions.push(
        this.state$.subscribe(
          state => { observer.next(!!state.authentication.isSignIn); },
          error => { observer.error(error.error); }
        )
      );
    });
  }

  userDidFirstTimeSignIn(): boolean { return this.state.authentication.didFirstTimeSignIn || false; }

  getUserInfo(): EnvironmentModel['authentication']['user'] {
    return this.state.authentication.user || { id: '', displayName: '' };
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
