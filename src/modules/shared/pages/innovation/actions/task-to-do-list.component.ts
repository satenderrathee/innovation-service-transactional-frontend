import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreComponent } from '@app/base';
import { TableModel } from '@app/base/models';

import { InnovationsTasksListFilterType, InnovationsService } from '@modules/shared/services/innovations.service';
import { ContextInnovationType } from '@modules/stores/context/context.types';

import { UserRoleEnum } from '@app/base/enums';
import { InnovationActionsListDTO,InnovationActionInfoDTO, InnovationTaskData, } from '@modules/shared/services/innovations.dtos';
import { InnovationActionStatusEnum } from '@modules/stores/innovation';


@Component({
  selector: 'shared-pages-innovation-task-to-do-list',
  templateUrl: './task-to-do-list.component.html'
})
export class PageInnovationTaskToDoListComponent extends CoreComponent implements OnInit {

  innovationId: string;
  innovation: ContextInnovationType;
  userType: UserRoleEnum | undefined;
  tablesTitles: { topTableTitle: string; bottomTableTitle: string };

  allTasksList: TableModel<InnovationActionsListDTO['data'][0],InnovationsTasksListFilterType>;

  topList: InnovationActionsListDTO; 
  bottomList: InnovationActionsListDTO; 

  // Flags
  isClosedActionsLoading = false;
  isInnovatorType: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private innovationsService: InnovationsService
  ) {

    super();
    // Flags
    this.isInnovatorType = this.stores.authentication.isInnovatorType();

    this.setPageTitle(this.isInnovatorType ? 'Tasks to do' : 'Tasks');

    this.tablesTitles = {topTableTitle: '', bottomTableTitle: ''};

    this.innovationId = this.activatedRoute.snapshot.params.innovationId;

    this.innovation = this.stores.context.getInnovation();

    this.allTasksList = new TableModel({
      visibleColumns: {
        id: { label: 'ID' },
        name: { label: 'Task' },
        status: { label: 'Status', align: 'right' },
      },
      pageSize: 100,
    });

    this.topList = {count: 0, data: [] };
    this.bottomList = {count: 0, data: [] };
    
  }

  ngOnInit(): void {

    this.userType = this.getUserType();

    

    this.allTasksList.setFilters({
      innovationId: this.innovationId,
      fields: ['notifications'],
      status: [
        InnovationActionStatusEnum.OPEN,
        InnovationActionStatusEnum.DONE,
        InnovationActionStatusEnum.DECLINED,
        InnovationActionStatusEnum.CANCELLED,
      ],
      allTasks: true,
    });
    
    this.innovationsService.getTasksList(this.allTasksList.getAPIQueryParams()).subscribe((allTasksResponse) => {
      this.processTaskList(allTasksResponse);
      this.tablesTitles = this.getTablesTitles();
      this.setPageStatus('READY');
    });

  }

  processTaskList(taskList: InnovationActionsListDTO ) {
    for (let task of taskList.data) {
      if (this.shouldBeOnTopTable(task)) {
        this.topList.data.push(task);
      } else{
        this.bottomList.data.push(task);
      }
    }
    this.topList.count = this.topList.data.length;
    this.bottomList.count = this.bottomList.data.length;
  }

  shouldBeOnTopTable(item: InnovationTaskData ): boolean {
    switch (this.getUserType()) {

      case 'INNOVATOR':
        return (
          item.status == InnovationActionStatusEnum.OPEN
        )

      case 'ASSESSMENT':
      case 'ACCESSOR':
      case 'QUALIFYING_ACCESSOR':
        return item.sameOrganisation

      case 'ADMIN':
        return true;

      default:
        return false;
    }
  }

  getUserType() {
    return this.stores.authentication.isAccessorType() ? UserRoleEnum.ACCESSOR : this.stores.authentication.getUserType();
  }

  getTablesTitles(): { topTableTitle: string; bottomTableTitle: string } {
    switch (this.userType) {
      case 'INNOVATOR':
        return {
          topTableTitle: `You have ${this.topList.count} tasks to do`,
          bottomTableTitle: 'Previous tasks',
        };
      case 'ACCESSOR':
        return {
          topTableTitle: 'Tasks assigned by my organisation unit',
          bottomTableTitle: 'Tasks assigned by others',
        };
      case 'QUALIFYING_ACCESSOR':
        return {
          topTableTitle: 'Tasks assigned by my organisation unit',
          bottomTableTitle: 'Tasks assigned by others',
        };
      case 'ASSESSMENT':
        return {
          topTableTitle: 'Tasks assigned by Needs Assessment team',
          bottomTableTitle: 'Tasks assigned by others',
        };
      case 'ADMIN':
        return {
          topTableTitle: '',
          bottomTableTitle: '',
        };
      default:
        return {
          topTableTitle: 'Top table title',
          bottomTableTitle: 'Bottom table title',
        };
    }
  }

}
