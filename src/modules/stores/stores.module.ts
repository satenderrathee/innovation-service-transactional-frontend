import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthenticationStore } from './authentication/authentication.store';
import { AuthenticationService } from './authentication/authentication.service';


@NgModule({
  providers: [
    AuthenticationStore,
    AuthenticationService
  ]
})
export class StoresModule {
  // Makes sure that this module is imported only by one NgModule (AppModule)!
  constructor(@Optional() @SkipSelf() parentModule: StoresModule) {
    if (parentModule) {
      throw new Error('Store Module is already loaded. Import it only in AppModule, please!');
    }
  }
}
