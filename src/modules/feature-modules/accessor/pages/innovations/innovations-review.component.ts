import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CoreComponent } from '@app/base';
import { FormControl, FormGroup } from '@app/base/forms';
import { TableModel } from '@app/base/models';
import { DateISOType, NotificationValueType } from '@app/base/types';

import { InnovationsListDTO, InnovationsListFiltersType } from '@modules/shared/services/innovations.dtos';
import { InnovationsService } from '@modules/shared/services/innovations.service';

import { InnovationSupportStatusEnum } from '@modules/stores/innovation';
import { categoriesItems } from '@modules/stores/innovation/innovation-record/202304/forms.config';
import { forkJoin } from 'rxjs';

type TabType = {
  key: InnovationSupportStatusEnum | 'ALL';
  title: string;
  mainDescription: string;
  secondaryDescription?: string;
  showAssignedToMeFilter: boolean;
  showSuggestedOnlyFilter: boolean;
  link: string;
  queryParams: { status: InnovationSupportStatusEnum | 'ALL'; assignedToMe?: boolean; suggestedOnly?: boolean };
  notifications: NotificationValueType;
};

@Component({
  selector: 'app-accessor-pages-innovations-review',
  templateUrl: './innovations-review.component.html'
})
export class InnovationsReviewComponent extends CoreComponent implements OnInit {
  defaultStatus: '' | 'UNASSIGNED' | 'ENGAGING' = '';

  tabs: TabType[] = [];
  currentTab: TabType;

  form = new FormGroup(
    {
      assignedToMe: new FormControl(false),
      suggestedOnly: new FormControl(true)
    },
    { updateOn: 'change' }
  );

  innovationsList: TableModel<
    {
      id: string;
      name: string;
      updatedAt: DateISOType | null;
      submittedAt: DateISOType | null;
      mainCategory: string | null;
      countryName: string | null;
      postCode: string | null;
      supportStatus: InnovationSupportStatusEnum;
      accessors: string[];
      assessment: {
        id: string;
      } | null;
      notifications: number;
      engagingOrganisations: string[];
    },
    InnovationsListFiltersType
  >;

  innovationStatus = this.stores.innovation.INNOVATION_SUPPORT_STATUS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private innovationsService: InnovationsService
  ) {
    super();
    this.setPageTitle('Innovations');

    if (this.stores.authentication.isAccessorRole()) {
      this.defaultStatus = 'ENGAGING';
      this.tabs = [
        {
          key: InnovationSupportStatusEnum.ENGAGING,
          title: 'Engaging',
          mainDescription: 'Innovations being supported, assessed or guided by your organisation.',
          showAssignedToMeFilter: false,
          showSuggestedOnlyFilter: false,
          link: '/accessor/innovations',
          queryParams: { status: InnovationSupportStatusEnum.ENGAGING },
          notifications: null
        },
        {
          key: InnovationSupportStatusEnum.CLOSED,
          title: 'Closed',
          mainDescription: 'Your organisation has closed its engagement with these innovations.',
          showAssignedToMeFilter: false,
          showSuggestedOnlyFilter: false,
          link: '/accessor/innovations',
          queryParams: { status: InnovationSupportStatusEnum.CLOSED },
          notifications: null
        }
      ];
    } else if (this.stores.authentication.isQualifyingAccessorRole()) {
      this.defaultStatus = 'UNASSIGNED';
      this.tabs = [
        {
          key: 'ALL',
          title: 'All',
          mainDescription: 'All innovations shared with your organisation.',
          showAssignedToMeFilter: true,
          showSuggestedOnlyFilter: true,
          link: '/accessor/innovations',
          queryParams: { status: 'ALL', suggestedOnly: false, assignedToMe: false },
          notifications: null
        },
        {
          key: InnovationSupportStatusEnum.UNASSIGNED,
          title: 'Unassigned',
          mainDescription: 'Innovations awaiting status assignment from your organisation.',
          secondaryDescription:
            'If your organisation has been suggested to support an innovation, you must assign a status within 30 days of submission.',
          showAssignedToMeFilter: false,
          showSuggestedOnlyFilter: true,
          link: '/accessor/innovations',
          queryParams: { status: InnovationSupportStatusEnum.UNASSIGNED },
          notifications: null
        },
        {
          key: InnovationSupportStatusEnum.ENGAGING,
          title: 'Engaging',
          mainDescription: 'Innovations being supported, assessed or guided by your organisation.',
          showAssignedToMeFilter: true,
          showSuggestedOnlyFilter: false,
          link: '/accessor/innovations',
          queryParams: { status: InnovationSupportStatusEnum.ENGAGING },
          notifications: null
        },
        {
          key: InnovationSupportStatusEnum.WAITING,
          title: 'Waiting',
          mainDescription: 'Waiting for an internal decision to progress.',
          showAssignedToMeFilter: false,
          showSuggestedOnlyFilter: false,
          link: '/accessor/innovations',
          queryParams: { status: InnovationSupportStatusEnum.WAITING },
          notifications: null
        },
        {
          key: InnovationSupportStatusEnum.UNSUITABLE,
          title: 'Unsuitable',
          mainDescription: 'Your organisation has no suitable offer for these innovations.',
          showAssignedToMeFilter: false,
          showSuggestedOnlyFilter: false,
          link: '/accessor/innovations',
          queryParams: { status: InnovationSupportStatusEnum.UNSUITABLE },
          notifications: null
        },
        {
          key: InnovationSupportStatusEnum.CLOSED,
          title: 'Closed',
          mainDescription: 'Your organisation has closed its engagement with these innovations.',
          showAssignedToMeFilter: false,
          showSuggestedOnlyFilter: false,
          link: '/accessor/innovations',
          queryParams: { status: InnovationSupportStatusEnum.CLOSED },
          notifications: null
        }
      ];
    }

    this.currentTab = {
      key: InnovationSupportStatusEnum.UNASSIGNED,
      title: '',
      mainDescription: '',
      showAssignedToMeFilter: false,
      showSuggestedOnlyFilter: false,
      link: '',
      queryParams: { status: InnovationSupportStatusEnum.UNASSIGNED },
      notifications: null
    };

    this.innovationsList = new TableModel({});
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe(queryParams => this.onRouteChange(queryParams)),
      this.form.valueChanges.subscribe(() => this.onFormChange())
    );
  }

  getInnovationsList(column?: string): void {
    this.setPageStatus('LOADING');

    let queryFields: Parameters<InnovationsService['getInnovationsList2']>[0] = [
      'id',
      'name',
      'updatedAt',
      'submittedAt',
      'countryName',
      'mainCategory',
      'postcode',
      'support.status',
      'assessment.id',
      'statistics.notifications',
      'engagingOrganisations',
      'engagingUnits'
    ];

    const { take, skip, order, filters } = this.innovationsList.getAPIQueryParams();

    this.innovationsService.getInnovationsList2(queryFields, filters, { take, skip, order }).subscribe({
      next: response => {
        this.innovationsList.setData(
          response.data.map((item, index) => {
            return {
              id: item.id,
              name: item.name,
              updatedAt: item.updatedAt,
              submittedAt: item.submittedAt,
              mainCategory: item.mainCategory
                ? item.mainCategory === 'OTHER'
                  ? 'Other'
                  : categoriesItems.find(entry => entry.value === item.mainCategory)?.label ?? item.mainCategory
                : '',
              countryName: item.countryName,
              postCode: item.postcode,
              supportStatus: item.support.status,
              assessment: item.assessment,
              notifications: item.statistics.notifications,
              accessors: (response.data[index].engagingUnits ?? []).flatMap(s =>
                (s.assignedAccessors ?? []).map(u => u.name)
              ),

              engagingOrganisations: item.engagingOrganisations?.map(org => org.acronym) ?? []
            };
          }),
          response.count
        );
        if (this.isRunningOnBrowser() && column) this.innovationsList.setFocusOnSortedColumnHeader(column);
        this.setPageStatus('READY');
      }
    });
  }

  prepareInnovationsList(status: InnovationSupportStatusEnum | 'ALL'): void {
    // Filter out 'ALL' from array, so only status InnovationSupportStatusEnum remain
    const filteredArr: InnovationSupportStatusEnum[] | undefined =
      this.currentTab.queryParams.status !== 'ALL' ? [this.currentTab.queryParams.status] : undefined;

    switch (status) {
      case InnovationSupportStatusEnum.UNASSIGNED:
        this.innovationsList
          .clearData()
          .setFilters({
            supportStatuses: filteredArr,
            assignedToMe: false,
            suggestedOnly: this.form.get('suggestedOnly')?.value ?? false
          })
          .setVisibleColumns({
            name: { label: 'Innovation', orderable: true },
            submittedAt: { label: 'Submitted', orderable: true },
            mainCategory: { label: 'Main category', orderable: true },
            countryName: { label: 'Location', orderable: true },
            engagingOrganisations: { label: 'Engaging organisations', align: 'right', orderable: false }
          })
          .setOrderBy('submittedAt', 'descending');
        break;

      case InnovationSupportStatusEnum.ENGAGING:
        this.innovationsList
          .clearData()
          .setFilters({
            supportStatuses: filteredArr,
            assignedToMe: this.form.get('assignedToMe')?.value ?? false,
            suggestedOnly: false
          })
          .setVisibleColumns({
            name: { label: 'Innovation', orderable: true },
            updatedAt: { label: 'Updated', orderable: true },
            mainCategory: { label: 'Main category', orderable: true },
            accessors: { label: 'Accessor', orderable: false },
            engagingOrganisations: { label: 'Engaging organisations', align: 'right', orderable: false }
          })
          .setOrderBy('updatedAt', 'descending');
        break;

      case InnovationSupportStatusEnum.WAITING:
      case InnovationSupportStatusEnum.UNSUITABLE:
      case InnovationSupportStatusEnum.CLOSED:
        this.innovationsList
          .clearData()
          .setFilters({
            supportStatuses: filteredArr,
            assignedToMe: false,
            suggestedOnly: false
          })
          .setVisibleColumns({
            name: { label: 'Innovation', orderable: true },
            updatedAt: { label: 'Updated', orderable: true },
            mainCategory: { label: 'Main category', orderable: true },
            countryName: { label: 'Location', orderable: true },
            engagingOrganisations: { label: 'Engaging organisations', align: 'right', orderable: false }
          })
          .setOrderBy('updatedAt', 'descending');
        break;

      case 'ALL':
        this.innovationsList
          .clearData()
          .setFilters({
            supportStatuses: undefined,
            assignedToMe: this.form.get('assignedToMe')?.value ?? false,
            suggestedOnly: this.form.get('suggestedOnly')?.value ?? false
          })
          .setVisibleColumns({
            name: { label: 'Innovation', orderable: true },
            submittedAt: { label: 'Submitted', orderable: true },
            mainCategory: { label: 'Main category', orderable: true },
            countryName: { label: 'Location', orderable: true },
            supportStatus: { label: 'Support status', align: 'right', orderable: false }
          })
          .setOrderBy('submittedAt', 'descending');
        break;
    }
  }

  onRouteChange(queryParams: Params): void {
    this.setPageTitle('Innovations');

    const currentStatus = queryParams.status;
    const currentTabIndex = this.tabs.findIndex(tab => tab.key === currentStatus);

    if (!currentStatus || currentTabIndex === -1) {
      this.router.navigate(['/accessor/innovations'], { queryParams: { status: this.defaultStatus } });
      return;
    }

    this.currentTab = this.tabs[currentTabIndex];

    if (queryParams.assignedToMe === 'false' && queryParams.suggestedOnly === 'false') {
      this.form.reset();
    } else if (queryParams.assignedToMe) {
      this.form.get('assignedToMe')?.setValue(true);
    }

    this.prepareInnovationsList(this.currentTab.key);
    this.getInnovationsList();
  }

  onFormChange(): void {
    this.prepareInnovationsList(this.currentTab.key);
    this.getInnovationsList();
  }

  onTableOrder(column: string): void {
    this.innovationsList.setOrderBy(column);
    this.getInnovationsList(column);
  }

  onPageChange(event: { pageNumber: number }): void {
    this.innovationsList.setPage(event.pageNumber);
    this.getInnovationsList();
  }
}
