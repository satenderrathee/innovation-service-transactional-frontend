import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreComponent } from '@app/base';
import { TableModel } from '@app/base/models';
import { InnovationsListDTO, StatisticsCard } from '@modules/shared/services/innovations.dtos';
import { InnovationsListFiltersType, InnovationsService } from '@modules/shared/services/innovations.service';
import { UserStatisticsTypeEnum } from '@modules/shared/services/statistics.enum';
import { StatisticsService } from '@modules/shared/services/statistics.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-assessment-pages-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends CoreComponent implements OnInit {
  user: {
    displayName: string;
    organisation: string;
    passwordResetAt: string;
  };

  cardsList: StatisticsCard[] = [];

  latestInnovations: TableModel<InnovationsListDTO['data'][0], InnovationsListFiltersType>;

  constructor(
    private activatedRoute: ActivatedRoute,    
    private statisticsService: StatisticsService,    
    private innovationsService: InnovationsService
  ) {

    super();
    this.setPageTitle('Home', {hint: `Hello ${this.stores.authentication.getUserInfo().displayName}`});


    this.user = {
      displayName: this.stores.authentication.getUserInfo().displayName,
      organisation: 'Needs assessment team',
      passwordResetAt: this.stores.authentication.getUserInfo().passwordResetAt || ''
    };


    this.latestInnovations = new TableModel({ pageSize: 5 });
  }

  ngOnInit(): void {

    const startTime = new Date();
    const endTime = new Date(this.user.passwordResetAt);
    const timediffer = startTime.getTime() - endTime.getTime();
    const resultInMinutes = Math.round(timediffer / 60000);

    if (resultInMinutes <= 2 && this.activatedRoute.snapshot.queryParams.alert !== 'alertDisabled') {
      this.setAlertSuccess('You have successfully changed your password.');
    }

    const qp: { statistics: UserStatisticsTypeEnum[] } = { statistics: [UserStatisticsTypeEnum.WAITING_ASSESSMENT_COUNTER, UserStatisticsTypeEnum.ASSIGNED_INNOVATIONS_COUNTER] };

    this.latestInnovations.setFilters({
      latestWorkedByMe: true
    })

    forkJoin([
      this.statisticsService.getUserStatisticsInfo(qp), 
      this.innovationsService.getInnovationsList(this.latestInnovations.getAPIQueryParams())
    ]).subscribe(([statistics, innovationsList]) => {

      this.latestInnovations.setData(innovationsList.data, innovationsList.count);

      this.cardsList = [{
        title: 'Innovations awaiting assessment',
        label: `Innovations awaiting needs assessment`,
        link: `/assessment/innovations`,
        queryParams: { status: 'WAITING_NEEDS_ASSESSMENT' },
        count: statistics[UserStatisticsTypeEnum.WAITING_ASSESSMENT_COUNTER].count,
        overdue: this.getFooter(statistics[UserStatisticsTypeEnum.WAITING_ASSESSMENT_COUNTER].overdue)
      }, {
        title: 'Your innovations',
        label: `Innovations in needs assessment being assessed by you`,
        link: `/assessment/innovations`,
        queryParams: { status: 'NEEDS_ASSESSMENT' },
        count: statistics[UserStatisticsTypeEnum.ASSIGNED_INNOVATIONS_COUNTER].count,
        total: statistics[UserStatisticsTypeEnum.ASSIGNED_INNOVATIONS_COUNTER].total,
        overdue: this.getFooter(statistics[UserStatisticsTypeEnum.ASSIGNED_INNOVATIONS_COUNTER].overdue)
      }]

      this.setPageStatus('READY');
    })
  }


  getFooter(counter: number): string {
    return counter === 1 ? `${counter} is overdue` : `${counter} are overdue`
  }


}
