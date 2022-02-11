import { Component, OnInit } from '@angular/core';

import { CoreComponent, FormControl, FormGroup } from '@app/base';
import { LinkType } from '@app/base/models';

import { searchUserEndpointDTO, ServiceUsersService } from '../../services/service-users.service';


@Component({
  selector: 'app-admin-pages-service-users-find',
  templateUrl: './service-users-find.component.html'
})
export class PageServiceUsersFindComponent extends CoreComponent implements OnInit {

  titleActions: LinkType[] = [
    { type: 'button', label: 'New user', url: '/admin/service-users/new' }
  ];

  formSubmitted = false;
  form = new FormGroup({
    email: new FormControl('')
  }, { updateOn: 'blur' });

  usersList: searchUserEndpointDTO[] = [];


  constructor(
    private serviceUsersService: ServiceUsersService
  ) {

    super();
    this.setPageTitle('Find a service user');

  }

  ngOnInit(): void {

    this.setPageStatus('READY');

  }

  onSubmit(): void {

    this.setPageStatus('LOADING');
    this.formSubmitted = true;

    this.serviceUsersService.searchUser(this.form.get('email')!.value).subscribe(
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
