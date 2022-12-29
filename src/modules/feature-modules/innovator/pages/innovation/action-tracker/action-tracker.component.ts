import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreComponent } from '@app/base';
import { TableModel } from '@app/base/models';

import { InnovationActionsListDTO } from '@modules/shared/services/innovations.dtos';
import { InnovationsActionsListFilterType, InnovationsService } from '@modules/shared/services/innovations.service';
import { InnovationActionStatusEnum } from '@modules/stores/innovation';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-innovator-pages-innovation-action-tracker',
  templateUrl: './action-tracker.component.html'
})
export class InnovationActionTrackerComponent extends CoreComponent implements OnInit {

  innovationId: string;

  openedActionsList: TableModel<InnovationActionsListDTO['data'][0], InnovationsActionsListFilterType>;
  closedActionsList: TableModel<InnovationActionsListDTO['data'][0], InnovationsActionsListFilterType>;


  innovationSummary: { label: string; value: string; }[] = [];

  innovationSectionActionStatus = this.stores.innovation.INNOVATION_SECTION_ACTION_STATUS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private innovationsService: InnovationsService
  ) {

    super();
    this.setPageTitle('Action tracker');

    this.innovationId = this.activatedRoute.snapshot.params.innovationId;

    this.openedActionsList = new TableModel({
      visibleColumns: {
        id: { label: 'ID' },
        name: { label: 'Action' },
        createdAt: { label: 'Requested date' },
        status: { label: 'Status', align: 'right' }
      },
      pageSize: 100
    });

    this.closedActionsList = new TableModel({
      visibleColumns: {
        id: { label: 'ID' },
        name: { label: 'Action' },
        createdAt: { label: 'Requested date' },
        status: { label: 'Status', align: 'right' }
      },
      pageSize: 5
    });

  }


  ngOnInit(): void {

    this.openedActionsList.setFilters({
      innovationId: this.innovationId,
      fields: ['notifications'],
      status: [InnovationActionStatusEnum.REQUESTED, InnovationActionStatusEnum.IN_REVIEW]
    });

    this.closedActionsList.setFilters({
      innovationId: this.innovationId,
      fields: ['notifications'],
      status: [InnovationActionStatusEnum.DECLINED, InnovationActionStatusEnum.COMPLETED, InnovationActionStatusEnum.DELETED]
    });

    forkJoin(
      [
        this.innovationsService.getActionsList(this.openedActionsList.getAPIQueryParams()),
        this.innovationsService.getActionsList(this.closedActionsList.getAPIQueryParams()),
      ]
    ).subscribe(([openedActions, closedActions]) => {

      this.openedActionsList.setData(openedActions.data);

      this.closedActionsList.setData(closedActions.data, closedActions.count);

      this.setPageStatus('READY');

    });

  }

  onPageChange(event: { pageNumber: number }): void {
    this.closedActionsList.setPage(event.pageNumber);
    this.getClosedActionsList();
  }

  private getClosedActionsList() {

    this.innovationsService.getActionsList(this.closedActionsList.getAPIQueryParams()).subscribe(closedActions => {

      this.closedActionsList.setData(closedActions.data, closedActions.count);

      this.setPageStatus('READY');

    });
  }

}
