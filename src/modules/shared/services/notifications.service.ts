import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { CoreService } from '@app/base';
import { UrlModel } from '@app/base/models';
import { APIQueryParamsType, DateISOType } from '@app/base/types';

import { NotificationContextDetailEnum, NotificationContextTypeEnum } from '@modules/stores/context/context.enums';
import { InnovationActionStatusEnum, InnovationSectionEnum, InnovationStatusEnum, InnovationSupportStatusEnum } from '@modules/stores/innovation';
import { getSectionNumber } from '@modules/stores/innovation/innovation.config';


export enum EmailNotificationsTypeEnum { // Subset of NotificationContextTypeEnum.
  ACTION = 'ACTION',
  MESSAGE = 'MESSAGE',
  SUPPORT = 'SUPPORT'
}
export enum EmailNotificationsPreferencesEnum {
  NEVER = 'NEVER',
  INSTANTLY = 'INSTANTLY',
  DAILY = 'DAILY'
}


export type NotificationsListInDTO = {
  count: number;
  data: {
    id: string;
    innovation: { id: string, name: string, status: InnovationStatusEnum, ownerName: string };
    contextType: NotificationContextTypeEnum;
    contextDetail: NotificationContextDetailEnum;
    contextId: string;
    createdAt: DateISOType;
    createdBy: string;
    readAt: null | DateISOType;
    params: null | {
      section?: InnovationSectionEnum;
      actionCode?: string;
      actionStatus?: InnovationActionStatusEnum;
      supportStatus?: InnovationSupportStatusEnum;
      organisationUnitName?: string;
      // Messages.
      subject?: string;
      messageId?: string;
    }
  }[];
};
export type NotificationsListOutDTO = {
  count: number;
  data: (
    Omit<NotificationsListInDTO['data'][0], 'innovation' | 'params'>
    & {
      link: null | { label: string; url: string; },
      params: null | {
        innovationId: string;
        innovationName: string;
        innovationOwnerName: string;
        innovationStatus: string;
        sectionNumber?: string;
        actionStatusName?: string;
        supportStatusName?: string;
      } & NotificationsListInDTO['data'][0]['params'];
    }
  )[]
};

type EmailNotificationPreferencesDTO = {
  notificationType: EmailNotificationsTypeEnum,
  preference: EmailNotificationsPreferencesEnum
};


@Injectable()
export class NotificationsService extends CoreService {

  constructor() { super(); }


  getNotificationsList(queryParams: APIQueryParamsType<{ contextTypes: NotificationContextTypeEnum[], unreadOnly: boolean }>): Observable<NotificationsListOutDTO> {

    const { filters, ...qParams } = queryParams;

    const qp = {
      ...qParams,
      contextTypes: filters.contextTypes || undefined,
      unreadOnly: filters.unreadOnly ?? false
    };

    const url = new UrlModel(this.API_USERS_URL).addPath('v1/notifications').setQueryParams(qp);
    return this.http.get<NotificationsListInDTO>(url.buildUrl()).pipe(
      take(1),
      map(response => ({
        count: response.count,
        data: response.data.map(item => {

          let link: null | { label: string; url: string; } = null;

          switch (item.contextType) {
            case NotificationContextTypeEnum.NEEDS_ASSESSMENT:
              link = { label: 'Click to go to innovation assessment', url: `/${this.userUrlBasePath()}/innovations/${item.innovation.id}/assessments/${item.contextId}` };
              break;
            case NotificationContextTypeEnum.INNOVATION:
              switch (item.contextDetail) {
                case NotificationContextDetailEnum.COLLABORATOR_INVITE:
                  link = { label: 'Click to go to innovation', url: `/${this.userUrlBasePath()}/innovations/${item.innovation.id}/collaborations/${item.contextId}` };
                  break;
                default:
                  link = { label: 'Click to go to innovation', url: `/${this.userUrlBasePath()}/innovations/${item.innovation.id}/overview` };
                  break;
              };
              break;
            case NotificationContextTypeEnum.SUPPORT:
              link = { label: 'Click to go to innovation', url: `/${this.userUrlBasePath()}/innovations/${item.innovation.id}/overview` };
              break;
            case NotificationContextTypeEnum.ACTION:
              link = { label: 'Click to go to action', url: `/${this.userUrlBasePath()}/innovations/${item.innovation.id}/action-tracker/${item.contextId}` };
              break;
            case NotificationContextTypeEnum.THREAD:
              link = { label: 'Click to go to message', url: `/${this.userUrlBasePath()}/innovations/${item.innovation.id}/threads/${item.contextId}` };
              break;
            // case NotificationContextTypeEnum.COMMENT:
            //   link = { label: 'Click to go to comment', url: `/${this.userUrlBasePath()}/innovations/${item.innovation.id}/comments` };
            //   break;
          }

          return {
            id: item.id,
            contextType: item.contextType,
            contextDetail: item.contextDetail,
            contextId: item.contextId,
            createdAt: item.createdAt,
            createdBy: item.createdBy,
            readAt: item.readAt,
            params: {
              ...item.params,
              innovationId: item.innovation.id,
              innovationName: item.innovation.name,
              innovationStatus: item.innovation.status,
              innovationOwnerName: item.innovation.ownerName,
              sectionNumber: item.params?.section ? getSectionNumber(item.params.section) : undefined,
              actionStatusName: item.params?.actionStatus ? this.translate(`shared.catalog.innovation.action_status.${item.params?.actionStatus}.name`) : undefined,
              supportStatusName: item.params?.supportStatus ? this.translate(`shared.catalog.innovation.support_status.${item.params?.supportStatus}.name`) : undefined,
            },
            link
          };

        })
      }))
    );

  }

  dismissAllUserNotifications(): Observable<{ affected: number }> {

    const url = new UrlModel(this.API_USERS_URL).addPath('v1/notifications/dismiss');
    return this.http.patch<{ affected: number }>(url.buildUrl(), { dismissAll: true }).pipe(take(1), map(response => response));

  }

  deleteNotification(notificationId: string): Observable<{ id: string }> {

    const url = new UrlModel(this.API_USERS_URL).addPath('v1/notifications/:notificationId').setPathParams({ notificationId });
    return this.http.delete<{ id: string }>(url.buildUrl()).pipe(take(1), map(response => response));

  }


  getEmailNotificationsPreferences(): Observable<EmailNotificationPreferencesDTO[]> {

    const url = new UrlModel(this.API_USERS_URL).addPath('v1/email-preferences');
    return this.http.get<EmailNotificationPreferencesDTO[]>(url.buildUrl()).pipe(
      take(1),
      map(response => response)
    );

  }

  updateEmailNotificationsPreferences(body: EmailNotificationPreferencesDTO[]): Observable<boolean> {

    const url = new UrlModel(this.API_USERS_URL).addPath('v1/email-preferences');
    return this.http.put(url.buildUrl(), body).pipe(take(1), map(() => true));

  }

}
