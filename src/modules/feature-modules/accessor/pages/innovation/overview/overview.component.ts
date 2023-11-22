import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { CoreComponent } from '@app/base';
import { ContextInnovationType, StatisticsCardType } from '@app/base/types';

import { NotificationContextDetailEnum } from '@modules/stores/context/context.enums';
import { irVersionsMainCategoryItems } from '@modules/stores/innovation/innovation-record/ir-versions.config';
import { InnovationSupportStatusEnum } from '@modules/stores/innovation/innovation.enums';

import { InnovationCollaboratorsListDTO } from '@modules/shared/services/innovations.dtos';
import { InnovationsService } from '@modules/shared/services/innovations.service';
import { InnovationStatisticsEnum, UserStatisticsTypeEnum } from '@modules/shared/services/statistics.enum';
import { StatisticsService } from '@modules/shared/services/statistics.service';


@Component({
  selector: 'app-accessor-pages-innovation-overview',
  templateUrl: './overview.component.html'
})
export class InnovationOverviewComponent extends CoreComponent implements OnInit {

  innovationId: string;
  innovation: ContextInnovationType;
  innovationSupportStatus = this.stores.innovation.INNOVATION_SUPPORT_STATUS;

  isQualifyingAccessorRole = false;
  isAccessorRole = false;

  innovationSummary: { label: string; value: null | string; }[] = [];
  innovatorSummary: { label: string; value: string; }[] = [];
  cardsList: StatisticsCardType[] = [];
  innovationSupport: {
    organisationUnit: string,
    status: InnovationSupportStatusEnum,
    engagingAccessors: {name: string}[]
  } = { organisationUnit: '', status: InnovationSupportStatusEnum.UNASSIGNED, engagingAccessors: [] };

  showCards: boolean = false;

  innovationCollaborators: InnovationCollaboratorsListDTO['data'] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private innovationsService: InnovationsService,
    private statisticsService: StatisticsService
  ) {

    super();

    this.innovationId = this.activatedRoute.snapshot.params.innovationId;
    this.innovation = this.stores.context.getInnovation();
    this.isQualifyingAccessorRole = this.stores.authentication.isQualifyingAccessorRole();
    this.isAccessorRole = this.stores.authentication.isAccessorRole();

    this.setPageTitle('Overview', { hint: `Innovation ${this.innovation.name}` });

  }

  ngOnInit(): void {

    const qp: { statistics: InnovationStatisticsEnum[] } = { statistics: [InnovationStatisticsEnum.SECTIONS_SUBMITTED_SINCE_SUPPORT_START_COUNTER, InnovationStatisticsEnum.TASKS_RESPONDED_COUNTER] };

    forkJoin({
      statistics: this.statisticsService.getInnovationStatisticsInfo(this.innovationId, qp),
      collaborators: this.innovationsService.getInnovationCollaboratorsList(this.innovationId, ['active']),
      ...this.innovation.support?.id && {support: this.innovationsService.getInnovationSupportInfo(this.innovationId, this.innovation.support.id)},
    }).subscribe(({support, statistics, collaborators}) => {
      const innovationInfo = this.innovation;

      this.innovationSupport = {
        organisationUnit: this.stores.authentication.getAccessorOrganisationUnitName(),
        status: support?.status ?? InnovationSupportStatusEnum.UNASSIGNED,
        engagingAccessors: support?.engagingAccessors ?? []
      }

      this.innovationSummary = [
        { label: 'Company', value: innovationInfo.owner?.organisation?.name ??  'No company' },
        { label: 'Location', value: `${innovationInfo.countryName}${innovationInfo.postCode ? ', ' + innovationInfo.postCode : ''}` },
        { label: 'Description', value: innovationInfo.description },
        { label: 'Categories', value: innovationInfo.categories.map(v => v === 'OTHER' ? innovationInfo.otherCategoryDescription : irVersionsMainCategoryItems.find(item => item.value === v)?.label).join('\n') }
      ];

      this.innovatorSummary = [
        { label: 'Owner', value: this.innovation.owner?.name ?? '[deleted account]' },
      ];

      this.showCards = [InnovationSupportStatusEnum.ENGAGING, InnovationSupportStatusEnum.WAITING].includes(this.innovationSupport.status);

      this.innovationCollaborators = collaborators.data;

      this.cardsList = [
        {
          title: 'Innovation record',
          label: `sections submitted since your organisation unit started support`,
          link: `/accessor/innovations/${this.innovationId}/record`,
          count: statistics[InnovationStatisticsEnum.SECTIONS_SUBMITTED_SINCE_SUPPORT_START_COUNTER].count,
          total: statistics[InnovationStatisticsEnum.SECTIONS_SUBMITTED_SINCE_SUPPORT_START_COUNTER].total,
          lastMessage: `Last submitted section: "${this.translate('shared.catalog.innovation.innovation_sections.' + statistics[InnovationStatisticsEnum.SECTIONS_SUBMITTED_SINCE_SUPPORT_START_COUNTER].lastSubmittedSection)}"`,
          date: statistics[InnovationStatisticsEnum.SECTIONS_SUBMITTED_SINCE_SUPPORT_START_COUNTER].lastSubmittedAt,
          emptyMessage: `No sections have been submitted since support started`
        },
        {
          title: 'Tasks',
          label: `tasks assigned by your organisation have been done or declined by the innovator`,
          link: `/accessor/innovations/${this.innovationId}/tasks`,
          count: statistics[UserStatisticsTypeEnum.TASKS_RESPONDED_COUNTER].count,
          total: statistics[UserStatisticsTypeEnum.TASKS_RESPONDED_COUNTER].total,
          lastMessage: `Last updated task: "${this.translate('shared.catalog.innovation.innovation_sections.' + statistics[InnovationStatisticsEnum.TASKS_RESPONDED_COUNTER].lastUpdatedSection)}"`,
          date: statistics[InnovationStatisticsEnum.TASKS_RESPONDED_COUNTER]?.lastUpdatedAt,
          emptyMessage: 'No tasks assigned by your organisation yet'
        }
      ];

      // Throw notification read dismiss.
      this.stores.context.dismissNotification(this.innovationId, { contextDetails: [NotificationContextDetailEnum.AU04_SUPPORT_KPI_REMINDER, NotificationContextDetailEnum.AU05_SUPPORT_KPI_OVERDUE, NotificationContextDetailEnum.AU06_ACCESSOR_IDLE_WAITING] });

      if (this.isQualifyingAccessorRole) {
        this.stores.context.dismissNotification(this.innovationId, { contextDetails: [NotificationContextDetailEnum.OS01_UNITS_SUGGESTION_TO_SUGGESTED_UNITS_QA, NotificationContextDetailEnum.OS03_INNOVATION_DELAYED_SHARED_SUGGESTION] });
      }

      if (this.innovation.support?.id) {
        this.stores.context.dismissNotification(this.innovationId, { contextDetails: [NotificationContextDetailEnum.ST05_SUPPORT_NEW_ASSIGNED_ACCESSOR_TO_NEW_QA], contextIds: [this.innovation.support.id] });
        if (this.isQualifyingAccessorRole) {
          this.stores.context.dismissNotification(this.innovationId, { contextDetails: [ NotificationContextDetailEnum.ST07_SUPPORT_STATUS_CHANGE_REQUEST], contextIds: [this.innovation.support.id] });
        }
      }

      this.setPageStatus('READY');

    });

  }

}
