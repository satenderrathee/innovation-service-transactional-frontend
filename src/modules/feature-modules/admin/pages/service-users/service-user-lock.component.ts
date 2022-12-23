import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CoreComponent } from '@app/base';
import { FormGroup } from '@app/base/forms';

import { RoutingHelper } from '@app/base/helpers';
import { forkJoin } from 'rxjs';

import { getLockUserRulesOutDTO, ServiceUsersService } from '../../services/service-users.service';


@Component({
  selector: 'app-admin-pages-service-users-service-user-lock',
  templateUrl: './service-user-lock.component.html'
})
export class PageServiceUserLockComponent extends CoreComponent implements OnInit {

  user: { id: string, name: string };

  pageStep: 'RULES_LIST' | 'CODE_REQUEST' | 'SUCCESS' = 'RULES_LIST';

  rulesList: getLockUserRulesOutDTO[] = [];

  securityConfirmation = { id: '', code: '' };

  form = new FormGroup({
    code: new UntypedFormControl('')
  }, { updateOn: 'blur' });

  pageType: 'RULES' | 'LOCK_USER' = 'RULES';

  userType = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceUsersService: ServiceUsersService
  ) {

    super();
    
    this.user = { id: this.activatedRoute.snapshot.params.userId, name: RoutingHelper.getRouteData<any>(this.activatedRoute).user.displayName };

    this.setPageTitle('Lock user', { hint: this.user.name });

  }


  ngOnInit(): void {
    forkJoin([
      this.serviceUsersService.getUserFullInfo(this.user.id),
      this.serviceUsersService.getLockUserRules(this.user.id)
    ]).subscribe({
      next: ([userInfo, response]) => {
        this.setPageStatus('READY');
        if (userInfo.type === 'INNOVATOR') {
          this.userType = this.stores.authentication.getRoleDescription(userInfo.type);
          this.pageType = 'LOCK_USER';
        }
        else {
          this.pageType = 'RULES';
          this.rulesList = response;
          if (userInfo.type === 'ACCESSOR' && userInfo.userOrganisations.length > 0) {
            this.userType = this.stores.authentication.getRoleDescription(userInfo.userOrganisations[0].role);
          }
          else {
            this.userType = this.stores.authentication.getRoleDescription(userInfo.type);
          }
        }
      },
      error: () => {
        this.setPageStatus('ERROR');
        this.setAlertError('Unable to fetch the necessary information', { message: 'Please try again or contact us for further help'})
      }
    });

  }

  nextStep(): void {
    this.pageType = 'LOCK_USER';
  }

  onSubmit(): void {

    this.form.markAllAsTouched(); // Form is always valid.

    this.securityConfirmation.code = this.form.get('code')!.value;

    this.serviceUsersService.lockUser(this.user.id, this.securityConfirmation).subscribe({
      next: () => {

        this.redirectTo(`admin/service-users/${this.user.id}`, { alert: 'lockSuccess' });

      },
      error: (error: { id: string }) => {

        if (!this.securityConfirmation.id && error.id) {

          this.securityConfirmation.id = error.id;
          this.pageStep = 'CODE_REQUEST';

        } else {

          this.form.get('code')!.setErrors({ customError: true, message: 'The code is invalid. Please, verify if you are entering the code received on your e-mail' });

        }

      }
    });

  }

}
