import { Component, OnInit } from '@angular/core';

import { CoreComponent } from '@app/base';


@Component({
  selector: 'app-admin-pages-dashboard-dashboard',
  templateUrl: './dashboard.component.html'
})
export class PageDashboardComponent extends CoreComponent implements OnInit {

  constructor() {

    super();
    this.setPageTitle('Dashboard');

  }


  ngOnInit(): void {

    if (this.router.getCurrentNavigation()?.extras.state?.alert === 'CHANGE_PASSWORD') {
      this.setAlertSuccess('You have successfully changed your password');
    }

    this.setPageStatus('READY');

  }

}
