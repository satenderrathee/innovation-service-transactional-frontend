import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Store } from '../store.class';
import { ContextModel } from './context.models';
import { ContextService } from './context.service';
import { ContextPageLayoutType, ContextPageStatusType } from './context.types';

import { NotificationCategoryTypeEnum, NotificationContextDetailEnum } from './context.enums';

@Injectable()
export class ContextStore extends Store<ContextModel> {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private logger: NGXLogger,
    private contextService: ContextService
  ) {
    super('STORE::Context', new ContextModel());
  }

  // Individual Behaviour Subjects and Observables.
  get pageLayoutState(): ContextPageLayoutType {
    return this.state.pageLayoutBS.getValue();
  }
  setPageLayoutState(): void {
    this.state.pageLayoutBS.next(this.pageLayoutState);
  }

  pageLayout$(): Observable<ContextPageLayoutType> {
    return this.state.pageLayout$;
  }
  pageLayoutStatus$(): Observable<ContextPageStatusType> {
    return this.state.pageLayout$.pipe(
      map(item => item.status),
      distinctUntilChanged()
    );
  }
  notifications$(): Observable<ContextModel['notifications']> {
    return this.state$.pipe(map(item => item.notifications));
  }

  // Notifications methods.
  updateUserUnreadNotifications(): void {
    this.contextService.getUserUnreadNotifications().subscribe({
      next: response => {
        this.state.notifications.UNREAD = response.total;
        this.setState();
      },
      error: error => this.logger.error('Error obtaining user unread notifications', error)
    });
  }

  dismissNotification(
    innovationId: string,
    conditions: {
      notificationIds?: string[];
      contextTypes?: NotificationCategoryTypeEnum[];
      contextDetails?: NotificationContextDetailEnum[];
      contextIds?: string[];
    }
  ): void {
    this.contextService.dismissNotification(innovationId, conditions).subscribe({
      next: () => this.updateUserUnreadNotifications(),
      error: error => this.logger.error('Error dismissing all user notifications', error)
    });
  }

  dismissUserNotification(conditions: {
    notificationIds?: string[];
    contextTypes?: NotificationCategoryTypeEnum[];
    contextDetails?: NotificationContextDetailEnum[];
    contextIds?: string[];
  }): void {
    this.contextService.dismissUserNotification(conditions).subscribe({
      next: () => this.updateUserUnreadNotifications(),
      error: error => this.logger.error('Error dismissing user notification', error)
    });
  }

  // Page layout methods.
  resetPageAlert(): void {
    this.pageLayoutState.alert = { type: null, persistOneRedirect: false };
    this.setPageLayoutState();
  }
  setPageAlert(data: ContextPageLayoutType['alert']): void {
    this.pageLayoutState.alert = data;

    if (!data.persistOneRedirect) {
      this.setPageLayoutState();
    }
  }

  setPageStatus(status: ContextPageLayoutType['status']): void {
    if (isPlatformBrowser(this.platformId)) {
      // When running server side, the status always remains LOADING. The visual effects only are meant to be applied on the browser.
      this.pageLayoutState.status = status;
      this.setPageLayoutState();
    }
  }

  setPageTitle(data: ContextPageLayoutType['title']): void {
    this.pageLayoutState.title = data;
    this.setPageLayoutState();
  }

  setPageBackLink(data: ContextPageLayoutType['backLink']): void {
    this.pageLayoutState.backLink = data;
    this.setPageLayoutState();
  }

  resetPage() {
    if (this.pageLayoutState.alert.persistOneRedirect) {
      this.pageLayoutState.alert.persistOneRedirect = false;
    } else {
      this.pageLayoutState.alert = { type: null };
    }

    this.pageLayoutState.backLink = { label: null };
    this.pageLayoutState.status = 'LOADING';
    this.pageLayoutState.title = { main: null };
    this.setPageLayoutState();
  }

  /**
   * sets the current url and the previous url if it is different from the current url
   * @param url The url to set as the current url.
   */
  setCurrentUrl(url: string): void {
    // failsafe to avoid setting the same url twice
    if (this.state.currentUrl !== url) {
      this.state.previousUrl = this.state.currentUrl;
      this.state.currentUrl = url;
      this.setState();
    }
  }

  /**
   * gets the previous url
   * @returns The previous url.
   */
  getPreviousUrl(): string | null {
    return this.state.previousUrl;
  }
}
