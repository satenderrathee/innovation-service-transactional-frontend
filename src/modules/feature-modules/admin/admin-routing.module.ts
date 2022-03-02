import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Base layout.
import { AdminLayoutComponent } from './base/admin-layout.component';
import { PageAdminUsersFindComponent } from './pages/admin-users/admin-users-find/admin-users-find.component';

// Pages.
import { PageDashboardComponent } from './pages/dashboard/dashboard.component';
import { PageServiceUsersDeleteComponent } from './pages/service-users/service-users-delete.component';
import { PageServiceUsersEditComponent } from './pages/service-users/service-users-edit.component';
import { PageServiceUsersFindComponent } from './pages/service-users/service-users-find.component';
import { PageServiceUsersInfoComponent } from './pages/service-users/service-users-info.component';
import { PageServiceUsersLockComponent } from './pages/service-users/service-users-lock.component';
import { PageServiceUsersNewComponent } from './pages/service-users/service-users-new/service-users-new.component';
import { PageServiceUsersUnlockComponent } from './pages/service-users/service-users-unlock.component';

// Resolvers.
import { ServiceUserDataResolver } from './resolvers/service-user-data.resolver';


const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  {
    path: '',
    component: AdminLayoutComponent,
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: 'dashboard',
        pathMatch: 'full',
        component: PageDashboardComponent
      },

      // NOTE: When creating the future admin-users routes, a guard should be created to protect those routes!
      {
        path: 'administration-users',
        data: { breadcrumb: 'administartion users' },
        children: [
          {
            path: '',
            pathMatch: 'full',
            data: { breadcrumb: null },
            component: PageAdminUsersFindComponent
          }
        ]
      },
      {
        path: 'service-users',
        data: { breadcrumb: 'Service users' },
        children: [
          {
            path: '',
            pathMatch: 'full',
            data: { breadcrumb: null },
            component: PageServiceUsersFindComponent
          },
          {
            path: 'new',
            pathMatch: 'full',
            component: PageServiceUsersNewComponent
          },
          {
            path: ':userId',
            resolve: { user: ServiceUserDataResolver },
            data: {
              breadcrumb: (data: { user: { id: string, displayName: string } }) => `${data.user.displayName}`
            },
            children: [
              {
                path: '',
                pathMatch: 'full',
                data: { breadcrumb: null },
                component: PageServiceUsersInfoComponent
              },
              {
                path: 'edit',
                pathMatch: 'full',
                component: PageServiceUsersEditComponent
              },
              {
                path: 'lock',
                pathMatch: 'full',
                component: PageServiceUsersLockComponent
              },
              {
                path: 'unlock',
                pathMatch: 'full',
                component: PageServiceUsersUnlockComponent
              },
              {
                path: 'delete',
                pathMatch: 'full',
                component: PageServiceUsersDeleteComponent
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
