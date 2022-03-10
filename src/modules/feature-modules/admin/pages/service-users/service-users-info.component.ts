import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreComponent } from '@app/base';
import { AlertType, LinkType } from '@app/base/models';

import { RoutingHelper } from '@modules/core';

import { ServiceUsersService, orgnisationRole } from '../../services/service-users.service';


@Component({
  selector: 'app-admin-pages-service-users-info',
  templateUrl: './service-users-info.component.html'
})
export class PageServiceUsersInfoComponent extends CoreComponent implements OnInit {

  alert: AlertType = { type: null };

  user: { id: string, name: string };

  userInfoType = '';

  titleActions: LinkType[] = [];

  sections: {
    userInfo: { label: string; value: null | string; }[];
    innovations?: string[];
    // organisation: { label: string; value: null | string; }[];
    organisation?: {
      id: string; name: string; role: null | string;
      units: { id: string; name: string; supportCount: null | string; }[];
    }[];
  } = { userInfo: [], innovations: [], organisation: [] };

  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceUsersService: ServiceUsersService
  ) {

    super();
    this.setPageTitle('User information');

    this.user = { id: this.activatedRoute.snapshot.params.userId, name: RoutingHelper.getRouteData(this.activatedRoute).user.displayName };

    switch (this.activatedRoute.snapshot.queryParams.alert) {
      case 'lockSuccess':
        this.alert = {
          type: 'SUCCESS',
          title: 'User locked successfully',
          // message: 'You\'ve updated your support status and posted a comment to the innovator.'
        };
        break;
      case 'unlockSuccess':
        this.alert = {
          type: 'SUCCESS',
          title: 'User unlocked successfully',
          // message: 'Your suggestions were saved and notifications sent.'
        };
        break;
      case 'userCreationSuccess':
        this.alert = {
          type: 'SUCCESS',
          title: 'User created successfully',
          // message: 'Your suggestions were saved and notifications sent.'
        };
        break;
      case 'roleChangeSuccess':
        this.alert = {
          type: 'SUCCESS',
          title: 'User role changed successfully',
          // message: 'Your suggestions were saved and notifications sent.'
        };
        break;
      default:
        break;
    }

  }

  ngOnInit(): void {

    this.serviceUsersService.getUserFullInfo(this.user.id).subscribe(
      response => {
        this.userInfoType = response.type;

        this.titleActions = [
          {
            type: 'link',
            label: !response.lockedAt ? 'Lock user' : 'Unlock user',
            url: `/admin/service-users/${this.user.id}/${!response.lockedAt ? 'lock' : 'unlock'}`
          },
        ];

        if (
          (response.userOrganisations[0]?.role === orgnisationRole.ACCESSOR ||
          response.userOrganisations[0]?.role === orgnisationRole.QUALIFYING_ACCESSOR) && !response.lockedAt
        ) {
          this.titleActions.push({
            type: 'link',
            label: 'Change role',
            url: `/admin/service-users/${this.user.id}/change-role`
          });
        }

        this.sections.userInfo = [
          { label: 'Name', value: response.displayName },
          { label: 'Type', value: this.stores.authentication.getRoleDescription(response.type) },
          { label: 'Email address', value: response.email },
          { label: 'Phone number', value: response.phone ? response.phone : ' NA' },
          { label: 'Account status', value: !response.lockedAt ? 'Active' : 'Locked' }
        ];

        if (response.type === 'INNOVATOR'){
          this.sections.innovations = response.innovations?.map(x => x.name);
          this.sections.userInfo = [...this.sections.userInfo,
            { label: 'Company name', value: response.userOrganisations.length > 0 ? response.userOrganisations[0].name : 'NA' },
            { label: 'Company size', value: response.userOrganisations.length > 0 ? response.userOrganisations[0].size : 'NA' }
          ];
        }

        if (response.type === 'ACCESSOR') {
          this.sections.organisation = response.userOrganisations;
        }

        this.setPageStatus('READY');

      },
      error => {
        this.setPageStatus('ERROR');
        this.alert = {
          type: 'ERROR',
          title: 'Unable to fetch the necessary information',
          message: 'Please try again or contact us for further help'
        };
      }
    );

  }

}
