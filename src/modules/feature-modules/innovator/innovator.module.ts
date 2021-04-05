import { NgModule } from '@angular/core';

import { ThemeModule } from '@modules/theme/theme.module';
import { SharedModule } from '@modules/shared/shared.module';

import { InnovatorRoutingModule } from './innovator-routing.module';

// Pages.
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FirstTimeSigninComponent } from './pages/first-time-signin/first-time-signin.component';

// Services.
import { InnovatorService } from './services/innovator.service';

// Guards.
import { FirstTimeSigninGuard } from './guards/first-time-signin.guard';


@NgModule({
  imports: [
    ThemeModule,
    SharedModule,

    InnovatorRoutingModule
  ],
  declarations: [
    // Pages.
    DashboardComponent,
    FirstTimeSigninComponent
  ],
  providers: [
    InnovatorService,

    // Guards.
    FirstTimeSigninGuard
  ]
})
export class InnovatorModule { }
