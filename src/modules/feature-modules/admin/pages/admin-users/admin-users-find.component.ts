import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CoreComponent } from '@app/base';
import { FormGroup } from '@app/base/forms';
import { LinkType } from '@app/base/types';

import { searchUserEndpointOutDTO, ServiceUsersService } from '../../services/service-users.service';


@Component({
  selector: 'app-admin-pages-admin-users-users-find',
  templateUrl: './admin-users-find.component.html'
})
export class PageAdminUsersFindComponent extends CoreComponent implements OnInit {

  titleActions: LinkType[] = [
    { type: 'button', label: 'New admin user', url: '/admin/administration-users/new' }
  ];

  formSubmitted = false;
  form = new FormGroup({
    email: new UntypedFormControl('')
  }, { updateOn: 'change' }); // Needs to be 'change' to allow submtitting using the enter key.

  usersList: searchUserEndpointOutDTO[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceUsersService: ServiceUsersService
  ) {

    super();
    this.setPageTitle('Find an admin user', { actions: this.titleActions });

    switch (this.activatedRoute.snapshot.queryParams.alert) {
      case 'adminDeletedSuccess':
        this.setAlertSuccess('Admin deleted successfully');
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {

    this.setPageStatus('READY');

  }

  onSubmit(): void {

    this.resetAlert();
    this.setPageStatus('LOADING');

    this.formSubmitted = true;

    this.serviceUsersService.searchUser(this.form.get('email')!.value, true).subscribe(
      response => {
        this.usersList = response;
        this.setPageStatus('READY');
      },
      error => {
        this.usersList = [];
        this.setPageStatus('READY');
      });

  }

}
