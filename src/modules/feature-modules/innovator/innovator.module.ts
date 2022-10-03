import { NgModule } from '@angular/core';

import { ThemeModule } from '@modules/theme/theme.module';
import { SharedModule } from '@modules/shared/shared.module';

import { InnovatorRoutingModule } from './innovator-routing.module';

// Layouts.
import { BaseLayoutComponent } from './base/base-layout.component';

// Pages.
// // Account.
import { PageAccountDeleteComponent } from './pages/account/account-delete.component';
import { PageAccountInfoComponent } from './pages/account/account-info.component';
import { PageAccountInnovationsArchivalComponent } from './pages/account/innovations-archival.component';
import { PageAccountInnovationsInfoComponent } from './pages/account/innovations-info.component';
import { PageAccountInnovationsTransferComponent } from './pages/account/innovations-transfer.component';
// // Dashboard.
import { PageDashboardComponent } from './pages/dashboard/dashboard.component';
// // First time signin.
import { FirstTimeSigninComponent } from './pages/first-time-signin/first-time-signin.component';
// // Innovation.
import { InnovationActionTrackerDeclineComponent } from './pages/innovation/action-tracker/action-tracker-decline.component';
import { InnovationActionTrackerInfoComponent } from './pages/innovation/action-tracker/action-tracker-info.component';
import { InnovationActionTrackerComponent } from './pages/innovation/action-tracker/action-tracker.component';
import { InnovationDataSharingChangeComponent } from './pages/innovation/data-sharing/data-sharing-change.component';
import { InnovationDataSharingComponent } from './pages/innovation/data-sharing/data-sharing.component';
import { InnovatorNeedsAssessmentOverviewComponent } from './pages/innovation/needs-assessment-overview/needs-assessment-overview.component';
import { InnovationOverviewComponent } from './pages/innovation/overview/overview.component';
import { InnovationSectionEvidenceEditComponent } from './pages/innovation/record/evidence-edit.component';
import { InnovationSectionEditComponent } from './pages/innovation/record/section-edit.component';
import { InnovationNewComponent } from './pages/innovation-new/innovation-new.component';
import { InnovationTransferAcceptanceComponent } from './pages/innovation-transfer-acceptance/innovation-transfer-acceptance.component';

// Components.
import { OrganisationSuggestionsCardComponent } from './components/organisation-suggestion-card.component';

// Guards.
import { FirstTimeSigninGuard } from './guards/first-time-signin.guard';

// Services.
import { InnovatorService } from './services/innovator.service';


@NgModule({
  imports: [
    ThemeModule,
    SharedModule,

    InnovatorRoutingModule
  ],
  declarations: [
    BaseLayoutComponent,

    // Pages.
    // // Account.
    PageAccountDeleteComponent,
    PageAccountInfoComponent,
    PageAccountInnovationsArchivalComponent,
    PageAccountInnovationsInfoComponent,
    PageAccountInnovationsTransferComponent,
    // // Dashboard.
    PageDashboardComponent,
    // // First time signin.
    FirstTimeSigninComponent,
    // // Innovation.
    InnovationActionTrackerDeclineComponent,
    InnovationActionTrackerInfoComponent,
    InnovationActionTrackerComponent,
    InnovationDataSharingChangeComponent,
    InnovationDataSharingComponent,
    InnovatorNeedsAssessmentOverviewComponent,
    InnovationOverviewComponent,
    InnovationSectionEvidenceEditComponent,
    InnovationSectionEditComponent,
    InnovationNewComponent,
    InnovationTransferAcceptanceComponent,

    // Components.
    OrganisationSuggestionsCardComponent
  ],
  providers: [
    // Guards.
    FirstTimeSigninGuard,

    // Services.
    InnovatorService
  ]
})
export class InnovatorModule { }
