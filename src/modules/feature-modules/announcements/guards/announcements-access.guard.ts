import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationStore } from '@modules/stores/authentication/authentication.store';


@Injectable()
export class AnnouncementsAccessGuard implements CanActivate {

  constructor(
    private router: Router,
    private authentication: AuthenticationStore
  ) { }

  canActivate(): boolean {

    if (!this.authentication.isTermsOfUseAccepted()) {
      const path = this.authentication.userUrlBasePath() + '/terms-of-use';
      this.router.navigateByUrl(path);
      return false;
    }

    if (!this.authentication.hasAnnouncements()) {
      this.router.navigateByUrl(this.authentication.userUrlBasePath());
      return false;
    }

    return true;

  }

}
