import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreComponent, FormControl, FormGroup } from '@app/base';
import { AlertType } from '@modules/core';
import { changeUserRoleDTO, getOrganisationRoleRulesOutDTO, orgnisationRole, ServiceUsersService } from '../../services/service-users.service';
import { RoutingHelper } from '@modules/core';
import { forkJoin } from 'rxjs';
import { response } from 'express';
import { AuthenticationStore } from '@modules/stores';


@Component({
  selector: 'app-admin-pages-change-user-role',
  templateUrl: './change-user-role.component.html'
})
export class PageServiceChangeUserRole extends CoreComponent implements OnInit {
  alert: AlertType = { type: null };

  user: { id: string, name: string };

  role: orgnisationRole | null;

  roleName: string | null;

  pageStep: 'RULES_LIST' | 'CODE_REQUEST' | 'SUCCESS' = 'RULES_LIST';

  rulesList: getOrganisationRoleRulesOutDTO[] = [];

  securityConfirmation = { id: '', code: '' };

  form = new FormGroup({
    code: new FormControl('')
  }, { updateOn: 'blur' });

  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceUsersService: ServiceUsersService,
  ) {

    super();
    this.user = { 
      id: this.activatedRoute.snapshot.params.userId, 
      name: RoutingHelper.getRouteData(this.activatedRoute).user.displayName,
    };
    this.roleName = null;
    this.role = null;
  }
  
  ngOnInit(): void { 
  
    forkJoin([
      this.serviceUsersService.getUserRoleRules(this.user.id),
      this.serviceUsersService.getUserFullInfo(this.user.id)
    ]).subscribe(
      ([rules, userInfo]) => {

        this.rulesList = rules;

        this.role = (userInfo.userOrganisations.map(org => org.role)[0] === orgnisationRole.QUALIFYING_ACCESSOR) ? orgnisationRole.ACCESSOR : orgnisationRole.QUALIFYING_ACCESSOR;
       
        this.roleName = this.stores.authentication.getRoleDescription(this.role)
       
        this.setPageTitle(`Change role to ${this.roleName}`);
       
        this.setPageStatus('READY');
      },
      () => {
        this.setPageStatus('ERROR');
        this.alert = {
          type: 'ERROR',
          title: 'Unable to fetch the necessary information',
          message: 'Please try again or contact us for further help'
        };
      }
    );

   
  }

  onSubmit(): void {

    this.form.markAllAsTouched(); // Form is always valid.

    this.securityConfirmation.code = this.form.get('code')!.value;

    const body: changeUserRoleDTO = {
      userId: this.user.id,
      role: this.role,
      securityConfirmation: this.securityConfirmation
    }

    if(this.role) {

      this.serviceUsersService.changeUserRole(body).subscribe(
        () => {

          this.redirectTo(`admin/service-users/${this.user.id}`, { alert: 'roleChangeSuccess' });

        },
        (error: { id: string }) => {
          console.log(error);
          console.log(this.securityConfirmation);
          if (!this.securityConfirmation.id && error.id) {

            this.securityConfirmation.id = error.id;
            this.pageStep = 'CODE_REQUEST';

          } else {

            this.form.get('code')!.setErrors({ customError: true, message: 'The code is invalid. Please, verify if you are entering the code received on your e-mail' });

          }

        }
      );
    }

  }

}
