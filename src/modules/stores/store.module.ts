import { NgModule, Optional, SkipSelf } from '@angular/core';

import { EnvironmentStore } from './environment/environment.store';

import { EnvironmentService } from './environment/environment.service';


@NgModule({
  providers: [
    EnvironmentStore,
    EnvironmentService
  ]
})
export class StoreModule {
  // Makes sure that this module is imported only by one NgModule (AppModule)!
  constructor(@Optional() @SkipSelf() parentModule: StoreModule) {
    if (parentModule) {
      throw new Error('Store Module is already loaded. Import it only in AppModule, please!');
    }
  }
}
