import { NgModule } from '@angular/core';

import { ThemeModule } from '@modules/theme/theme.module';
import { SharedModule } from '@modules/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminLayoutComponent } from './base/admin-layout.component';

// Pages.
// // Account.
import { PageAccountManageAccountInfoComponent } from './pages/account/manage-account-info.component';
// // Admin Users.
import { PageAdminUsersFindComponent } from './pages/admin-users/admin-users-find.component';
import { PageAdminUserInfoComponent } from './pages/admin-users/admin-user-info.component';
import { PageAdminUserNewComponent } from './pages/admin-users/admin-user-new.component';
import { PageAdminUserDeleteComponent } from './pages/admin-users/admin-user-delete.component';
// // Dashboard.
import { PageDashboardComponent } from './pages/dashboard/dashboard.component';
// // Organisations.
import { PageOrganisationEditComponent } from './pages/organisations/organisation-edit.component';
import { PageOrganisationInfoComponent } from './pages/organisations/organisation-info.component';
import { PageOrganisationsListComponent } from './pages/organisations/organisations-list.component';
// // Service Users.
import { PageServiceUserChangeOrganisationUnitComponent } from './pages/service-users/service-user-change-organisation-unit.component';
import { PageServiceUserChangeRoleComponent } from './pages/service-users/service-user-change-role.component';
import { PageServiceUserFindComponent } from './pages/service-users/service-user-find.component';
import { PageServiceUserInfoComponent } from './pages/service-users/service-user-info.component';
import { PageServiceUserLockComponent } from './pages/service-users/service-user-lock.component';
import { PageServiceUserNewComponent } from './pages/service-users/service-user-new.component';
import { PageServiceUserUnlockComponent } from './pages/service-users/service-user-unlock.component';
// // Terms of use.
import { PageTermsOfUseInfoComponent } from './pages/terms-of-use/terms-of-use-info.component';
import { PageTermsOfUseListComponent } from './pages/terms-of-use/terms-of-use-list.component';
import { PageTermsOfUseNewComponent } from './pages/terms-of-use/terms-of-use-new.component';

// Wizards.
import { WizardOrganisationUnitActivateComponent } from './wizards/organisation-unit-activate/organisation-unit-activate.component';
import { WizardOrganisationUnitActivateUsersStepComponent } from './wizards/organisation-unit-activate/steps/users-step.component';
import { WizardOrganisationUnitInactivateComponent } from './wizards/organisation-unit-inactivate/organisation-unit-inactivate.component';
import { WizardOrganisationUnitInactivateUsersStepComponent } from './wizards/organisation-unit-inactivate/steps/users-step.component';
import { WizardOrganisationUnitInactivateInnovationsStepComponent } from './wizards/organisation-unit-inactivate/steps/innovations-step.component';

// Services.
import { OrganisationsService } from './services/organisations.service';
import { ServiceUsersService } from './services/service-users.service';

// Resolvers.
import { OrganisationDataResolver } from './resolvers/organisation-data.resolver';
import { ServiceUserDataResolver } from './resolvers/service-user-data.resolver';

@NgModule({
  imports: [
    ThemeModule,
    SharedModule,

    AdminRoutingModule
  ],
  declarations: [
    AdminLayoutComponent,

    // Pages.
    PageAccountManageAccountInfoComponent,
    // // Admin Users.
    PageAdminUsersFindComponent,
    PageAdminUserInfoComponent,
    PageAdminUserNewComponent,
    PageAdminUserDeleteComponent,
    // // Dashboard.
    PageDashboardComponent,
    // // Organisations.
    PageOrganisationEditComponent,
    PageOrganisationInfoComponent,
    PageOrganisationsListComponent,
    // // Service Users.
    PageServiceUserChangeOrganisationUnitComponent,
    PageServiceUserChangeRoleComponent,
    PageServiceUserFindComponent,
    PageServiceUserInfoComponent,
    PageServiceUserLockComponent,
    PageServiceUserNewComponent,
    PageServiceUserUnlockComponent,
    // // Terms of use.
    PageTermsOfUseInfoComponent,
    PageTermsOfUseListComponent,
    PageTermsOfUseNewComponent,

    // Wizards.
    WizardOrganisationUnitActivateComponent,
    WizardOrganisationUnitActivateUsersStepComponent,
    WizardOrganisationUnitInactivateComponent,
    WizardOrganisationUnitInactivateUsersStepComponent,
    WizardOrganisationUnitInactivateInnovationsStepComponent
  ],
  providers: [
    // Services.
    OrganisationsService,
    ServiceUsersService,

    // Resolvers.
    OrganisationDataResolver,
    ServiceUserDataResolver
  ]
})
export class AdminModule { }
