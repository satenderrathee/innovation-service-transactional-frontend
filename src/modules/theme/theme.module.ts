import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components.
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { ActionLinkComponent } from './components/navigation/action-link.component';
import { BackLinkComponent } from './components/navigation/back-link.component';
import { PrintLinkComponent } from './components/navigation/print-link.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,

    ActionLinkComponent,
    BackLinkComponent,
    PrintLinkComponent

  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,

    ActionLinkComponent,
    BackLinkComponent,
    PrintLinkComponent

  ]
})
export class ThemeModule { }
