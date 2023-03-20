import { NgModule } from '@angular/core';

import { SharedModule } from '@modules/shared/shared.module';
import { ThemeModule } from '@modules/theme/theme.module';

import { InnovatorRoutingModule } from './innovator-routing.module';

// Base.
import { ContextInnovationOutletComponent } from './base/context-innovation-outlet.component';
import { SidebarAccountMenuOutletComponent } from './base/sidebar-account-menu-outlet.component';
import { SidebarInnovationMenuOutletComponent } from './base/sidebar-innovation-menu-outlet.component';

// Pages.
// // Account.
import { PageAccountDeleteComponent } from './pages/account/account-delete.component';
import { PageAccountInfoComponent } from './pages/account/account-info.component';
// // Collaboration Invites.
import { PageCollaborationInviteComponent } from './pages/collaboration-invite/collaboration-invite.component';
// // Dashboard.
import { PageDashboardComponent } from './pages/dashboard/dashboard.component';
// // First time signin.
import { FirstTimeSigninComponent } from './pages/first-time-signin/first-time-signin.component';
// // Innovation.
import { InnovationNewComponent } from './pages/innovation-new/innovation-new.component';
import { InnovationActionCompleteConfirmationComponent } from './pages/innovation/action-complete-confirmation/action-complete-confirmation.component';
import { InnovationActionTrackerDeclineComponent } from './pages/innovation/action-tracker/action-tracker-decline.component';
import { InnovationDataSharingChangeComponent } from './pages/innovation/data-sharing/data-sharing-change.component';
import { InnovationExportRequestRejectComponent } from './pages/innovation/export/export-request-reject.component';
import { PageInnovationHowToProceedComponent } from './pages/innovation/how-to-proceed/how-to-proceed.component';
import { PageInnovationManageCollaboratorsInfoComponent } from './pages/innovation/manage/manage-collaborators-info.component';
import { PageInnovationManageCollaboratorsOverviewComponent } from './pages/innovation/manage/manage-collaborators-overview.component';
import { PageInnovationManageCollaboratorsWizardComponent } from './pages/innovation/manage/manage-collaborators-wizard.component';
import { PageInnovationManageOverviewComponent } from './pages/innovation/manage/manage-overview.component';
import { PageInnovationManageStopSharingOverviewComponent } from './pages/innovation/manage/manage-stop-sharing-overview.component';
import { PageInnovationManageStopSharingComponent } from './pages/innovation/manage/manage-stop-sharing.component';
import { PageInnovationManageTransferComponent } from './pages/innovation/manage/manage-transfer.component';
import { PageInnovationManageWithdrawComponent } from './pages/innovation/manage/manage-withdraw.component';
import { PageInnovationNeedsReassessmentSendComponent } from './pages/innovation/needs-reassessment/needs-reassessment-send.component';
import { InnovationOverviewComponent } from './pages/innovation/overview/overview.component';
import { InnovationSectionEvidenceEditComponent } from './pages/innovation/record/evidence-edit.component';
import { InnovationSectionEditComponent } from './pages/innovation/record/section-edit.component';

// Components.
import { OrganisationSuggestionsCardComponent } from './components/organisation-suggestion-card.component';

// Guards.
import { FirstTimeSigninGuard } from './guards/first-time-signin.guard';

// Services.
import { ManageInnovationGuard } from './guards/manage-innovation.guard';
import { InnovatorService } from './services/innovator.service';


@NgModule({
  imports: [
    ThemeModule,
    SharedModule,

    InnovatorRoutingModule
  ],
  declarations: [
    // Base.
    ContextInnovationOutletComponent,
    SidebarAccountMenuOutletComponent,
    SidebarInnovationMenuOutletComponent,

    // Pages.
    // // Account.
    PageAccountDeleteComponent,
    PageAccountInfoComponent,
    // // Collaboration invites.
    PageCollaborationInviteComponent,
    // // Dashboard.
    PageDashboardComponent,
    // // First time signin.
    FirstTimeSigninComponent,
    // // Innovation.
    InnovationActionCompleteConfirmationComponent,
    InnovationActionTrackerDeclineComponent,
    InnovationDataSharingChangeComponent,
    InnovationExportRequestRejectComponent,
    PageInnovationHowToProceedComponent,
    PageInnovationManageCollaboratorsInfoComponent,
    PageInnovationManageCollaboratorsOverviewComponent,
    PageInnovationManageCollaboratorsWizardComponent,
    PageInnovationManageOverviewComponent,
    PageInnovationManageStopSharingOverviewComponent,
    PageInnovationManageStopSharingComponent,
    PageInnovationManageTransferComponent,
    PageInnovationManageWithdrawComponent,
    PageInnovationNeedsReassessmentSendComponent,
    InnovationOverviewComponent,
    InnovationSectionEvidenceEditComponent,
    InnovationSectionEditComponent,
    InnovationNewComponent,

    // Components.
    OrganisationSuggestionsCardComponent
  ],
  providers: [
    // Guards.
    FirstTimeSigninGuard,
    ManageInnovationGuard,

    // Services.
    InnovatorService
  ]
})
export class InnovatorModule { }
