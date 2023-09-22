import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layout.
import { RoutesDataType, TransactionalLayoutComponent } from '@modules/theme/base/transactional-layout.component';
import { ContextInnovationOutletComponent } from './base/context-innovation-outlet.component';
import { SidebarInnovationMenuOutletComponent } from './base/sidebar-innovation-menu-outlet.component';

// Admin module pages.
// // Account.
import { PageAccountManageAccountInfoComponent } from './pages/account/manage-account-info.component';
// // Users
import { PageUsersRoleActivateComponent } from './pages/users/roles/role-activate.component';
import { PageUsersRoleChangeComponent } from './pages/users/roles/role-change.component';
import { PageUsersRoleInactivateComponent } from './pages/users/roles/role-inactivate.component';
import { PageRoleNewComponent } from './pages/users/roles/role-new.component';
import { PageUserFindComponent } from './pages/users/user-find.component';
import { PageUserInfoComponent } from './pages/users/user-info.component';
import { PageUserLockComponent } from './pages/users/user-lock.component';
import { PageUserNewComponent } from './pages/users/user-new.component';
import { PageUserUnlockComponent } from './pages/users/user-unlock.component';
// // Announcements.
import { PageAnnouncementInfoComponent } from './pages/announcements/announcement-info.component';
import { PageAnnouncementNewditComponent } from './pages/announcements/announcement-newdit.component';
import { PageAnnouncementsListComponent } from './pages/announcements/announcements-list.component';
// // Dashboard.
import { PageDashboardComponent } from './pages/dashboard/dashboard.component';
// // Innovation
import { InnovationOverviewComponent } from './pages/innovation/overview/overview.component';
// // Organisations.
import { PageOrganisationEditComponent } from './pages/organisations/organisation-edit.component';
import { PageOrganisationInfoComponent } from './pages/organisations/organisation-info.component';
import { PageOrganisationNewComponent } from './pages/organisations/organisation-new.component';
import { PageOrganisationUnitNewComponent } from './pages/organisations/organisation-unit-new/organisation-unit-new.component';
import { PageOrganisationsListComponent } from './pages/organisations/organisations-list.component';
import { PageTeamsInfoComponent } from './pages/organisations/teams-info.component';
// // Terms of use.
import { PageTermsOfUseInfoComponent } from './pages/terms-of-use/terms-of-use-info.component';
import { PageTermsOfUseListComponent } from './pages/terms-of-use/terms-of-use-list.component';
import { PageTermsOfUseNewComponent } from './pages/terms-of-use/terms-of-use-new.component';

// Shared module pages.
// // Account.
import { PageAccountManageDetailsEditComponent } from '@modules/shared/pages/account/manage-details/manage-details-edit.component';
import { PageAccountManageDetailsInfoComponent } from '@modules/shared/pages/account/manage-details/manage-details-info.component';
// // Innovation.
import { PageInnovationTaskDetailsComponent } from '@modules/shared/pages/innovation/actions/task-details.component';
import { PageTaskStatusListComponent } from '@modules/shared/pages/innovation/actions/task-status-list.component';
import { PageInnovationTaskToDoListComponent } from '@modules/shared/pages/innovation/actions/task-to-do-list.component';
import { PageInnovationActivityLogComponent } from '@modules/shared/pages/innovation/activity-log/innovation-activity-log.component';
import { PageInnovationAssessmentOverviewComponent } from '@modules/shared/pages/innovation/assessment/assessment-overview.component';
import { PageInnovationDataSharingAndSupportComponent } from '@modules/shared/pages/innovation/data-sharing-and-support/data-sharing-and-support.component';
import { PageInnovationDocumentInfoComponent } from '@modules/shared/pages/innovation/documents/document-info.component';
import { PageInnovationDocumentsListComponent } from '@modules/shared/pages/innovation/documents/documents-list.component';
import { PageEveryoneWorkingOnInnovationComponent } from '@modules/shared/pages/innovation/everyone-working-on-innovation/everyone-working-on-innovation.component';
import { PageInnovationThreadMessagesListComponent } from '@modules/shared/pages/innovation/messages/thread-messages-list.component';
import { PageInnovationThreadsListComponent } from '@modules/shared/pages/innovation/messages/threads-list.component';
import { PageInnovationRecordComponent } from '@modules/shared/pages/innovation/record/innovation-record.component';
import { PageInnovationSectionEvidenceInfoComponent } from '@modules/shared/pages/innovation/sections/section-evidence-info.component';
import { PageInnovationSectionInfoComponent } from '@modules/shared/pages/innovation/sections/section-info.component';
import { PageInnovationStatusListComponent } from '@modules/shared/pages/innovation/status/innovation-status-list.component';
import { PageInnovationSupportStatusListComponent } from '@modules/shared/pages/innovation/support/support-status-list.component';
import { PageInnovationSupportSummaryListComponent } from '@modules/shared/pages/innovation/support/support-summary-list.component';
// // Innovations.
import { PageInnovationsAdvancedReviewComponent } from '@modules/shared/pages/innovations/innovations-advanced-review.component';

// Wizards.
import { WizardOrganisationUnitActivateComponent } from './wizards/organisation-unit-activate/organisation-unit-activate.component';
import { WizardOrganisationUnitInactivateComponent } from './wizards/organisation-unit-inactivate/organisation-unit-inactivate.component';

// Resolvers.
import { InnovationActionDataResolver } from '@modules/shared/resolvers/innovation-action-data.resolver';
import { InnovationDataResolver } from '@modules/shared/resolvers/innovation-data.resolver';
import { InnovationThreadDataResolver } from '@modules/shared/resolvers/innovation-thread-data.resolver';
import { AnnouncementDataResolver } from './resolvers/announcement-data.resolver';
import { OrganisationDataResolver } from './resolvers/organisation-data.resolver';
import { OrganisationUnitDataResolver } from './resolvers/organisation-unit-data.resolver';
import { ServiceUserDataResolver } from './resolvers/service-user-data.resolver';


const header: RoutesDataType['header'] = {
  menuBarItems: {
    left: [
      { id: 'adminUsers', label: 'Users', url: '/admin/users' },
      {
        id: 'management',
        label: 'Management',
        children: [
          { label: 'Announcements', url: '/admin/announcements', description: 'Manage and create announcements' },
          { label: 'Organisations', url: '/admin/organisations', description: 'Manage organisations and associated units' },
          { label: 'Terms of use', url: '/admin/terms-conditions', description: 'Create a new version and trigger acceptance by the users' }
        ]
      },
      { id: 'innovations', label: 'Innovations', url: '/admin/innovations' },
    ],
    right: [
      { id: 'account', label: 'My account', url: '/admin/account' },
    ]
  },
  notifications: {}
};

const routes: Routes = [
  {
    path: '',
    component: TransactionalLayoutComponent,
    data: { header, breadcrumb: 'Home', module: 'admin' },
    children: [

      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', pathMatch: 'full', component: PageDashboardComponent },

      {
        path: 'organisations',
        data: { breadcrumb: 'Organisations' },
        children: [

          { path: '', pathMatch: 'full', component: PageOrganisationsListComponent, data: { breadcrumb: null } },

          { path: 'new', pathMatch: 'full', component: PageOrganisationNewComponent },

          { path: 'ASSESSMENT', pathMatch: 'full', component: PageTeamsInfoComponent },
          { path: 'ADMIN', pathMatch: 'full', component: PageTeamsInfoComponent },

          {
            path: ':organisationId',
            runGuardsAndResolvers: 'pathParamsOrQueryParamsChange',
            resolve: { organisation: OrganisationDataResolver },
            data: { breadcrumb: (data: { organisation: { id: string, name: string, acronym: string } }) => `${data.organisation.name}` },
            children: [
              {
                path: '', pathMatch: 'full', component: PageOrganisationInfoComponent,
                data: { breadcrumb: null }
              },
              {
                path: 'edit', pathMatch: 'full', component: PageOrganisationEditComponent,
                data: { module: 'Organisation' }
              },
              {
                path: 'unit',
                data: { breadcrumb: null },
                children: [
                  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
                  {
                    path: 'new',
                    pathMatch: 'full',
                    component: PageOrganisationUnitNewComponent
                  },
                  {
                    path: ':organisationUnitId',
                    resolve: { organisationUnit: OrganisationUnitDataResolver },
                    data: { breadcrumb: (data: { organisationUnit: { id: string, name: string, acronym: string } }) => `${data.organisationUnit.name}` },
                    children: [
                      {
                        path: '',
                        pathMatch: 'full',
                        data: { breadcrumb: null },
                        component: PageTeamsInfoComponent,
                      },
                      {
                        path: 'edit',
                        pathMatch: 'full',
                        component: PageOrganisationEditComponent,
                        data: { module: 'Unit' }
                      },
                      {
                        path: 'activate',
                        pathMatch: 'full',
                        component: WizardOrganisationUnitActivateComponent
                      },
                      {
                        path: 'inactivate',
                        pathMatch: 'full',
                        component: WizardOrganisationUnitInactivateComponent
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
        path: 'users',
        data: { breadcrumb: 'Users' },
        children: [
          { path: '', pathMatch: 'full', component: PageUserFindComponent, data: { breadcrumb: null } },
          { path: 'new', pathMatch: 'full', component: PageUserNewComponent },
          {
            path: ':userId',
            resolve: { user: ServiceUserDataResolver },
            data: { breadcrumb: (data: { user: { id: string, name: string } }) => `${data.user.name}` },
            children: [
              { path: '', pathMatch: 'full', component: PageUserInfoComponent, data: { breadcrumb: null } },
              { path: 'lock', pathMatch: 'full', component: PageUserLockComponent, data: { breadcrumb: null } },
              { path: 'unlock', pathMatch: 'full', component: PageUserUnlockComponent, data: { breadcrumb: null } },
              { path: 'change-role', pathMatch: 'full', component: PageUsersRoleChangeComponent, data: { breadcrumb: null } },
              {
                path: 'role',
                data: { breadcrumb: null },
                children: [
                  { path: 'new', pathMatch: 'full', component: PageRoleNewComponent, data: { breadcrumb: null } },
                  {
                    path: ':roleId',
                    data: { breadcrumb: null },
                    children: [
                      { path: 'inactivate', pathMatch: 'full', component: PageUsersRoleInactivateComponent, data: { breadcrumb: null } },
                      { path: 'activate', pathMatch: 'full', component: PageUsersRoleActivateComponent, data: { breadcrumb: null } }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      {
        path: 'announcements',
        data: { breadcrumb: 'Announcements' },
        children: [
          {
            path: '', pathMatch: 'full', component: PageAnnouncementsListComponent,
            data: { breadcrumb: null }
          },
          { path: 'new', pathMatch: 'full', component: PageAnnouncementNewditComponent },
          {
            path: ':announcementId',
            resolve: { announcement: AnnouncementDataResolver },
            data: { breadcrumb: (data: { announcement: { id: string, title: string } }) => `${data.announcement.title}` },
            children: [
              {
                path: '', pathMatch: 'full', component: PageAnnouncementInfoComponent,
                data: { breadcrumb: null }
              },
              { path: 'edit', pathMatch: 'full', redirectTo: 'edit/1' },
              { path: 'edit/:stepId', pathMatch: 'full', component: PageAnnouncementNewditComponent }
            ]
          }
        ]
      },

      {
        path: 'account',
        data: { breadcrumb: 'Account' },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'manage-details', data: { breadcrumb: null } },
          {
            path: 'manage-account', pathMatch: 'full', component: PageAccountManageAccountInfoComponent,
            data: { layoutOptions: { type: 'userAccountMenu' } }
          },
          {
            path: 'manage-details',
            data: { breadcrumb: null },
            children: [
              {
                path: '', pathMatch: 'full', component: PageAccountManageDetailsInfoComponent,
                data: { layoutOptions: { type: 'userAccountMenu' } }
              },
              { path: 'edit', pathMatch: 'full', redirectTo: 'edit/1' },
              { path: 'edit/:stepId', pathMatch: 'full', component: PageAccountManageDetailsEditComponent }
            ]
          },
        ]
      },

      {
        path: 'terms-conditions',
        data: { breadcrumb: 'Terms of use' },
        children: [
          {
            path: '', pathMatch: 'full', component: PageTermsOfUseListComponent,
            data: { breadcrumb: null }
          },
          {
            path: 'new-version', pathMatch: 'full', component: PageTermsOfUseNewComponent,
            data: { module: 'New' }
          },
          {
            path: 'edit-version/:id', pathMatch: 'full', component: PageTermsOfUseNewComponent,
            data: { module: 'Edit' }
          },
          { path: 'show-version/:id', pathMatch: 'full', component: PageTermsOfUseInfoComponent }
        ]
      },

      {
        path: 'innovations',
        data: { breadcrumb: 'Innovations' },
        children: [
          {
            path: '', pathMatch: 'full', component: PageInnovationsAdvancedReviewComponent,
            data: {
              layout: { type: 'full', backgroundColor: 'bg-color-white' }
            }
          },

          {
            path: ':innovationId',
            data: {
              module: 'accessor',
              layout: { type: '1.third-2.thirds' },
              breadcrumb: (data: RoutesDataType) => data.innovationData?.name
            },
            runGuardsAndResolvers: 'always',
            resolve: { innovationData: InnovationDataResolver },
            children: [

              { path: '', outlet: 'page-context-outlet', component: ContextInnovationOutletComponent },

              { path: '', outlet: 'page-sidebar-outlet', component: SidebarInnovationMenuOutletComponent },
              { path: '', outlet: 'page-sidebar-mobile-outlet', component: SidebarInnovationMenuOutletComponent },

              { path: '', pathMatch: 'full', redirectTo: 'overview' },
              {
                path: 'overview', pathMatch: 'full', component: InnovationOverviewComponent,
                data: { breadcrumb: null }
              },
              {
                path: 'assessments',
                data: { breadcrumb: null },
                children: [
                  {
                    path: ':assessmentId',
                    data: { breadcrumb: null },
                    children: [
                      {
                        path: '', pathMatch: 'full', component: PageInnovationAssessmentOverviewComponent,
                        data: { breadcrumb: null }
                      }
                    ]
                  }
                ]
              },
              {
                path: 'record',
                data: { breadcrumb: 'Innovation record' },
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
                        children: [
                          {
                            path: '', pathMatch: 'full', component: PageInnovationSectionInfoComponent,
                            data: { module: 'admin', breadcrumb: null }
                          },
                          {
                            path: 'evidences',
                            data: { breadcrumb: null },
                            children: [
                              { path: '', pathMatch: 'full', redirectTo: '../:sectionId' },
                              {
                                path: ':evidenceId', pathMatch: 'full', component: PageInnovationSectionEvidenceInfoComponent,
                                data: { breadcrumb: 'Evidence Info' },
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
                path: 'everyone', pathMatch: 'full', component: PageEveryoneWorkingOnInnovationComponent
              },
              {
                path: 'documents',
                data: { breadcrumb: 'Documents' },
                children: [
                  {
                    path: '', pathMatch: 'full', component: PageInnovationDocumentsListComponent,
                    data: { breadcrumb: null }
                  },
                  { path: ':documentId', pathMatch: 'full', component: PageInnovationDocumentInfoComponent }
                ]
              },
              {
                path: 'tasks',
                data: { breadcrumb: 'Tasks' },
                children: [
                  {
                    path: '', pathMatch: 'full', component: PageInnovationTaskToDoListComponent,
                    data: { breadcrumb: null }
                  },
                  {
                    path: 'statuses', pathMatch: 'full', component: PageTaskStatusListComponent,
                    data: { breadcrumb: 'Statuses' }
                  },
                  {
                    path: ':taskId',
                    resolve: { innovationActionData: InnovationActionDataResolver },
                    data: {
                      breadcrumb: (data: RoutesDataType) => {
                        const name = data.innovationActionData?.name ?? '';
                        return name.length > 30 ? `${name.substring(0, 30)}...` : name;
                      }
                    },
                    children: [
                      {
                        path: '', pathMatch: 'full', component: PageInnovationTaskDetailsComponent,
                        data: { breadcrumb: null }
                      }
                    ]
                  }

                ]
              },
              {
                path: 'threads',
                data: { breadcrumb: 'Messages' },
                children: [
                  {
                    path: '', pathMatch: 'full', component: PageInnovationThreadsListComponent,
                    data: { breadcrumb: null }
                  },
                  {
                    path: ':threadId',
                    resolve: { innovationThreadData: InnovationThreadDataResolver },
                    data: {
                      breadcrumb: (data: RoutesDataType) => {
                        const name = data.innovationThreadData?.name ?? '';
                        return name.length > 30 ? `${name.substring(0, 30)}...` : name;
                      }
                    },
                    children: [
                      {
                        path: '', pathMatch: 'full', component: PageInnovationThreadMessagesListComponent,
                        data: { breadcrumb: null }
                      }
                    ]
                  }
                ]
              },

              {
                path: 'support',
                data: { breadcrumb: 'Data Sharing' },
                children: [
                  {
                    path: '', pathMatch: 'full', component: PageInnovationDataSharingAndSupportComponent,
                    data: { breadcrumb: null }
                  },
                  {
                    path: 'statuses', pathMatch: 'full', component: PageInnovationSupportStatusListComponent
                  }
                ]
              },

              {
                path: 'support-summary',
                data: { breadcrumb: 'Support summary' },
                children: [
                  {
                    path: '', pathMatch: 'full', component: PageInnovationSupportSummaryListComponent,
                    data: { breadcrumb: null }
                  }
                ]
              },

              {
                path: 'activity-log', pathMatch: 'full', component: PageInnovationActivityLogComponent,
                data: {
                  breadcrumb: 'Activity Log',
                  layout: { type: 'full', backgroundColor: 'bg-color-white' }
                }
              },

              {
                path: 'statuses', pathMatch: 'full', component: PageInnovationStatusListComponent,
                data: { breadcrumb: 'Statuses' }
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
export class AdminRoutingModule { }
