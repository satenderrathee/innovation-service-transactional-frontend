import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layouts.
import { BaseLayoutComponent } from './base/base-layout.component';
// import { AccessorLayoutComponent } from './base/accessor-layout.component';

// Accessor module pages.
// // Account.
import { PageAccessorAccountManageAccountInfoComponent } from './pages/account/manage-account-info.component';
// // Actions.
import { ActionAdvancedFilterComponent } from './pages/actions/actions-advanced-filter.component';
import { ActionsListComponent } from './pages/actions/actions-list.component';
// // Dashboard.
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// // Innovation.
import { InnovationActionTrackerEditComponent } from './pages/innovation/action-tracker/action-tracker-edit.component';
import { InnovationActionTrackerInfoComponent } from './pages/innovation/action-tracker/action-tracker-info.component';
import { InnovationActionTrackerListComponent } from './pages/innovation/action-tracker/action-tracker-list.component';
import { InnovationActionTrackerNewComponent } from './pages/innovation/action-tracker/action-tracker-new.component';
import { InnovationsAdvancedReviewComponent } from './pages/innovations/innovations-advanced-review.component';
import { InnovationNeedsAssessmentOverviewComponent } from './pages/innovation/needs-assessment-overview/needs-assessment-overview.component';
import { InnovationOverviewComponent } from './pages/innovation/overview/overview.component';
import { InnovationSupportOrganisationsSupportStatusInfoComponent } from './pages/innovation/support/organisations-support-status-info.component';
import { InnovationSupportOrganisationsSupportStatusSuggestComponent } from './pages/innovation/support/organisations-support-status-suggest.component';
import { InnovationSupportInfoComponent } from './pages/innovation/support/support-info.component';
import { InnovationSupportUpdateComponent } from './pages/innovation/support/support-update.component';
import { InnovationsReviewComponent } from './pages/innovations/innovations-review.component';

// Shared module pages.
// // Account.
import { PageAccountEmailNotificationsEditComponent } from '@modules/shared/pages/account/email-notifications/email-notifications-edit.component';
import { PageAccountEmailNotificationsListComponent } from '@modules/shared/pages/account/email-notifications/email-notifications-list.component';
import { PageAccountManageDetailsInfoComponent } from '@modules/shared/pages/account/manage-details/manage-details-info.component';
import { PageAccountManageDetailsEditComponent } from '@modules/shared/pages/account/manage-details/manage-details-edit.component';
// // Innovation.
import { PageActionStatusListComponent } from '@modules/shared/pages/innovation/actions/action-status-list.component';
import { PageInnovationActivityLogComponent } from '@modules/shared/pages/innovation/activity-log/innovation-activity-log.component';
import { PageInnovationThreadMessageEditComponent } from '@modules/shared/pages/innovation/messages/thread-message-edit.component';
import { PageInnovationThreadMessagesListComponent } from '@modules/shared/pages/innovation/messages/thread-messages-list.component';
import { PageInnovationThreadNewComponent } from '@modules/shared/pages/innovation/messages/thread-new.component';
import { PageInnovationThreadsListComponent } from '@modules/shared/pages/innovation/messages/threads-list.component';
import { PageInnovationRecordComponent } from '@modules/shared/pages/innovation/record/innovation-record.component';
import { PageInnovationSectionInfoComponent } from '@modules/shared/pages/innovation/sections/section-info.component';
import { PageInnovationSectionEvidenceInfoComponent } from '@modules/shared/pages/innovation/sections/section-evidence-info.component';
import { PageInnovationSupportStatusListComponent } from '@modules/shared/pages/innovation/support/innovation-support-status-list.component';
// // Notifications.
import { PageNotificationsListComponent } from '@modules/shared/pages/notifications/notifications-list.component';
// // Terms of use.
import { PageTermsOfUseAcceptanceComponent } from '@modules/shared/pages/terms-of-use/terms-of-use-acceptance.component';

// Resolvers.
import { InnovationDataResolver } from './resolvers/innovation-data.resolver';
// import { InnovationSectionEvidenceDataResolver } from '@modules/shared/resolvers/innovation-section-evidence-data.resolver';
import { InnovationDataResolverType } from '@modules/stores/innovation';
import { InnovationActionDataResolver } from './resolvers/innovation-action-data.resolver';
import { InnovationThreadDataResolver } from '@modules/shared/resolvers/innovation-thread-data.resolver';


export type RoutesDataType = {
  module?: string, // TODO: To remove.
  breadcrumb?: string,
  layout?: {
    type?: 'full' | '1.third-2.thirds',
    chosenMenu?: null | 'home' | 'innovations' | 'actions' | 'notifications' | 'yourAccount',
    backgroundColor?: null | string
  },
  innovationActionData: { id: null | string, name: string },
  innovationData?: InnovationDataResolverType,
  innovationSectionEvidenceData: { id: null | string, name: string }
  innovationThreadData: { id: null | string, name: string }
};


const routes: Routes = [


  {
    path: '',
    component: BaseLayoutComponent,
    data: {
      module: 'accessor',
      breadcrumb: 'Home'
    },
    children: [

      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },

      {
        path: 'terms-of-use', pathMatch: 'full', component: PageTermsOfUseAcceptanceComponent,
        data: { layout: { type: 'full', chosenMenu: null } }
      },

      {
        path: 'innovations',
        data: {
          breadcrumb: 'Innovations'
        },
        children: [

          {
            path: '', pathMatch: 'full', component: InnovationsReviewComponent,
            data: {
              breadcrumb: null,
              layout: { type: 'full', chosenMenu: null, backgroundColor: 'bg-color-white' }
            }
          },

          {
            path: 'advanced-search', pathMatch: 'full', component: InnovationsAdvancedReviewComponent,
            data: {
              breadcrumb: null,
              layout: { type: 'full', chosenMenu: null, backgroundColor: 'bg-color-white' }
            }
          },
          {
            path: ':innovationId',
            data: {
              module: 'accessor',
              layout: { type: '1.third-2.thirds', chosenMenu: 'innovations' },
              breadcrumb: (data: RoutesDataType) => data.innovationData?.name
            },
            runGuardsAndResolvers: 'pathParamsOrQueryParamsChange',
            resolve: { innovationData: InnovationDataResolver },
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'overview' },
              {
                path: 'overview', pathMatch: 'full', component: InnovationOverviewComponent,
                data: { breadcrumb: null }
                // data: { layoutOptions: { type: 'innovationLeftAsideMenu', backLink: { url: '/accessor/innovations', label: 'Innovations' } } }
              },

              {
                path: 'assessments/:assessmentId', pathMatch: 'full', component: InnovationNeedsAssessmentOverviewComponent,
                data: {
                  breadcrumb: 'Needs assessment',
                  layout: { type: 'full', chosenMenu: 'innovations' }
                }
              },

              {
                path: 'record',
                data: { breadcrumb: 'Innovation Record' },
                children: [
                  {
                    path: '', pathMatch: 'full', component: PageInnovationRecordComponent,
                    data: { breadcrumb: null }
                  },

                  {
                    path: 'sections',
                    data: { breadcrumb: null },
                    children: [

                      { path: '', pathMatch: 'full', redirectTo: '../record' },

                      {
                        path: ':sectionId',
                        // resolve: { innovationSectionData: InnovationSectionDataResolver },
                        data: {
                          // breadcrumb: (data: RoutesDataType) => data.innovationSectionData.name
                        },
                        children: [
                          {
                            path: '', pathMatch: 'full', component: PageInnovationSectionInfoComponent,
                            data: { breadcrumb: null }
                          },

                          {
                            path: 'evidences',
                            data: { breadcrumb: null },
                            children: [

                              { path: '', pathMatch: 'full', redirectTo: '../:sectionId' },

                              {
                                path: ':evidenceId',
                                // resolve: { innovationSectionEvidenceData: InnovationSectionEvidenceDataResolver },
                                data: { breadcrumb: 'Evidence Info' },
                                pathMatch: 'full',
                                component: PageInnovationSectionEvidenceInfoComponent
                              }
                            ]

                          }


                        ]
                      }

                    ]
                  }
                ]
              },

              {
                path: 'action-tracker',
                data: { breadcrumb: 'Action Tracker' },
                children: [

                  {
                    path: '', pathMatch: 'full', component: InnovationActionTrackerListComponent,
                    data: { breadcrumb: null }
                  },

                  {
                    path: 'statuses', pathMatch: 'full', component: PageActionStatusListComponent,
                    data: { breadcrumb: 'Statuses' }
                  },

                  {
                    path: 'new', pathMatch: 'full', component: InnovationActionTrackerNewComponent,
                    data: { breadcrumb: 'New' }
                  },

                  {
                    path: ':actionId',
                    resolve: { innovationActionData: InnovationActionDataResolver },
                    data: {
                      breadcrumb: (data: RoutesDataType) => {
                        const name = data.innovationActionData.name;
                        return name.length > 30 ? `${name.substring(0, 30)}...` : name;
                      }
                    },
                    children: [
                      {
                        path: '', pathMatch: 'full', component: InnovationActionTrackerInfoComponent,
                        data: { breadcrumb: null }
                      },
                      {
                        path: 'edit', pathMatch: 'full', component: InnovationActionTrackerEditComponent,
                        data: { breadcrumb: 'Edit' }
                      }
                    ]
                  }

                ]
              },

              {
                path: 'threads',
                resolve: { innovationData: InnovationDataResolver },
                data: { breadcrumb: 'Messages' },
                children: [
                  {
                    path: '', pathMatch: 'full', component: PageInnovationThreadsListComponent,
                    data: { breadcrumb: null }
                  },
                  {
                    path: 'new', pathMatch: 'full', component: PageInnovationThreadNewComponent,
                    data: {
                      data: { breadcrumb: 'New' }
                    }
                  },
                  {
                    path: ':threadId',
                    resolve: { innovationThreadData: InnovationThreadDataResolver },
                    data: {
                      breadcrumb: (data: RoutesDataType) => {
                        const name = data.innovationThreadData.name;
                        return name.length > 30 ? `${name.substring(0, 30)}...` : name;
                      }
                    },
                    children: [
                      {
                        path: '', pathMatch: 'full', component: PageInnovationThreadMessagesListComponent,
                        data: { breadcrumb: null }
                      },
                      {
                        path: 'messages/:messageId', pathMatch: 'full', component: PageInnovationThreadMessageEditComponent,
                        data: { breadcrumb: 'Edit' }
                      }
                    ]
                  }
                ]
              },

              {
                path: 'support',
                data: { breadcrumb: 'Data Sharing and Support' },
                resolve: { innovationData: InnovationDataResolver }, // Needed to repeat this resolver as support can be updated from this routes.
                children: [
                  {
                    path: '', pathMatch: 'full', component: InnovationSupportInfoComponent,
                    data: { breadcrumb: null }
                  },

                  {
                    path: 'statuses', pathMatch: 'full', component: PageInnovationSupportStatusListComponent,
                    // data: { layoutOptions: { type: 'emptyLeftAside', backLink: { url: '/accessor/innovations/:innovationId/support', label: 'Go back' } } }
                  },
                  {
                    path: 'new', pathMatch: 'full', component: InnovationSupportUpdateComponent,
                    // data: { layoutOptions: { type: 'emptyLeftAside', backLink: { url: '/accessor/innovations/:innovationId/support', label: 'Go back' } } }
                  },
                  {
                    path: 'organisations', pathMatch: 'full', component: InnovationSupportOrganisationsSupportStatusInfoComponent,
                    // data: { layoutOptions: { type: 'emptyLeftAside', backLink: { url: '/accessor/innovations/:innovationId/support', label: 'Go back' } } }
                  },
                  {
                    path: 'organisations/suggest', pathMatch: 'full', component: InnovationSupportOrganisationsSupportStatusSuggestComponent,
                    // data: { layoutOptions: { type: 'emptyLeftAside', backLink: { url: '/accessor/innovations/:innovationId/support', label: 'Back to innovation' } } }
                  },
                  {
                    path: ':supportId', pathMatch: 'full', component: InnovationSupportUpdateComponent,
                    // data: { layoutOptions: { type: 'emptyLeftAside', backLink: { url: '/accessor/innovations/:innovationId/support', label: 'Go back' } } }
                  }
                ]
              },

              {
                path: 'activity-log', pathMatch: 'full', component: PageInnovationActivityLogComponent,
                data: {
                  breadcrumb: 'Activity Log',
                  layout: { type: 'full', chosenMenu: 'innovations', backgroundColor: 'bg-color-white' }
                }
              }
            ]
          }
        ]
      },

      {
        path: 'actions',
        data: {
          breadcrumb: 'Actions',
          layout: { type: 'full', chosenMenu: 'actions', backgroundColor: 'bg-color-white' }
        },
        children: [
          {
            path: '', pathMatch: 'full', component: ActionsListComponent,
            data: { breadcrumb: null }
          },
          {
            path: 'statuses', pathMatch: 'full', component: PageActionStatusListComponent,
            // data: { layoutOptions: { type: 'emptyLeftAside', backLink: { url: '/accessor/actions', label: 'Go back' } } }
          },
          { path: 'advanced-filter', pathMatch: 'full', component: ActionAdvancedFilterComponent }
        ]
      },

      {
        path: 'notifications', pathMatch: 'full', component: PageNotificationsListComponent,
        // data: {
        //   layout: { backgroundColor: 'bg-color-white' }
        // }
      },

      {
        path: 'account',
        data: {
          breadcrumb: 'Your account',
          layout: { type: '1.third-2.thirds', chosenMenu: 'yourAccount' }
        },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'manage-details' },
          {
            path: 'manage-details',
            data: { breadcrumb: null },
            children: [
              {
                path: '', pathMatch: 'full', component: PageAccountManageDetailsInfoComponent,
                data: { breadcrumb: null }
              },
              { path: 'edit', pathMatch: 'full', redirectTo: 'edit/1' },
              {
                path: 'edit/:stepId', pathMatch: 'full', component: PageAccountManageDetailsEditComponent,
                data: {
                  breadcrumb: 'Edit',
                  layout: { type: 'full', chosenMenu: 'yourAccount' }
                }
              }
            ]
          },
          {
            path: 'email-notifications',
            data: { breadcrumb: 'Email notifications' },
            children: [
              {
                path: '', pathMatch: 'full', component: PageAccountEmailNotificationsListComponent,
                data: { breadcrumb: null }
              },
              {
                path: 'edit/:notificationType', pathMatch: 'full', component: PageAccountEmailNotificationsEditComponent,
                data: {
                  breadcrumb: 'Edit',
                  layout: { type: 'full', chosenMenu: 'yourAccount' }
                }
              }
            ]
          },
          {
            path: 'manage-account',
            data: { breadcrumb: 'Manage account' },
            children: [
              {
                path: '', pathMatch: 'full', component: PageAccessorAccountManageAccountInfoComponent,
                data: { breadcrumb: null }
              }
            ]
          }
        ]
      }


    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessorRoutingModule { }
