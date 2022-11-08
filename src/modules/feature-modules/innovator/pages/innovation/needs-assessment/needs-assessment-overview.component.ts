import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { CoreComponent } from '@app/base';
import { NotificationContextTypeEnum } from '@app/base/enums';

import { NEEDS_ASSESSMENT_QUESTIONS } from '@modules/stores/innovation/config/needs-assessment-constants.config';
import { maturityLevelItems, yesPartiallyNoItems } from '@modules/stores/innovation/sections/catalogs.config';
import { ContextInnovationType } from '@modules/stores/context/context.types';
import { InnovationNeedsAssessmentInfoDTO } from '@modules/shared/services/innovations.dtos';

import { GetSupportLogListOutDTO } from '@modules/feature-modules/innovator/services/innovator.service';

import { InnovatorService } from '../../../services/innovator.service';

import { InnovationsService } from '@modules/shared/services/innovations.service';


@Component({
  selector: 'app-innovator-pages-innovation-needs-assessment-overview',
  templateUrl: './needs-assessment-overview.component.html'
})
export class InnovatorNeedsAssessmentOverviewComponent extends CoreComponent implements OnInit {

  innovationId: string;
  assessmentId: string;
  innovation: ContextInnovationType;

  assessment: InnovationNeedsAssessmentInfoDTO | undefined;

  supportLogList: GetSupportLogListOutDTO[] = [];

  innovationMaturityLevel = { label: '', value: '', levelIndex: 0, description: '', comment: '' };
  innovationSummary: { label?: string; value: null | string; comment: string }[] = [];
  innovatorSummary: { label?: string; value: null | string; comment: string }[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private innovatorService: InnovatorService,
    private innovationsService: InnovationsService
  ) {

    super();
    this.setPageTitle('Needs assessment overview');

    this.innovationId = this.activatedRoute.snapshot.params.innovationId;
    this.assessmentId = this.activatedRoute.snapshot.params.assessmentId;
    this.innovation = this.stores.context.getInnovation();

  }


  ngOnInit(): void {

    // Throw notification read dismiss.
    this.stores.context.dismissNotification(NotificationContextTypeEnum.NEEDS_ASSESSMENT, this.assessmentId);

    forkJoin([
      this.innovationsService.getInnovationNeedsAssessment(this.innovationId, this.assessmentId),
      this.innovatorService.getSupportLogList(this.innovationId)
    ]).subscribe(([needsAssessment, supportLogList]) => {

      this.supportLogList = supportLogList;

      this.assessment = needsAssessment;

      const maturityLevelIndex = (maturityLevelItems.findIndex(item => item.value === needsAssessment.maturityLevel) || 0) + 1;
      this.innovationMaturityLevel = {
        label: NEEDS_ASSESSMENT_QUESTIONS.innovation[1].label || '',
        value: `${maturityLevelIndex} / ${maturityLevelItems.length}`,
        levelIndex: maturityLevelIndex,
        description: maturityLevelItems.find(item => item.value === needsAssessment.maturityLevel)?.label || '',
        comment: needsAssessment.maturityLevelComment || ''
      };

      this.innovationSummary = [
        {
          label: NEEDS_ASSESSMENT_QUESTIONS.innovation[2].label,
          value: yesPartiallyNoItems.find(item => item.value === needsAssessment.hasRegulatoryApprovals)?.label || '',
          comment: needsAssessment.hasRegulatoryApprovalsComment || ''
        },
        {
          label: NEEDS_ASSESSMENT_QUESTIONS.innovation[3].label,
          value: yesPartiallyNoItems.find(item => item.value === needsAssessment.hasEvidence)?.label || '',
          comment: needsAssessment.hasEvidenceComment || ''
        },
        {
          label: NEEDS_ASSESSMENT_QUESTIONS.innovation[4].label,
          value: yesPartiallyNoItems.find(item => item.value === needsAssessment.hasValidation)?.label || '',
          comment: needsAssessment.hasValidationComment || ''
        }
      ];

      this.innovatorSummary = [
        {
          label: NEEDS_ASSESSMENT_QUESTIONS.innovator[0].label,
          value: yesPartiallyNoItems.find(item => item.value === needsAssessment.hasProposition)?.label || '',
          comment: needsAssessment.hasPropositionComment || ''
        },
        {
          label: NEEDS_ASSESSMENT_QUESTIONS.innovator[1].label,
          value: yesPartiallyNoItems.find(item => item.value === needsAssessment.hasCompetitionKnowledge)?.label || '',
          comment: needsAssessment.hasCompetitionKnowledgeComment || ''
        },
        {
          label: NEEDS_ASSESSMENT_QUESTIONS.innovator[2].label,
          value: yesPartiallyNoItems.find(item => item.value === needsAssessment.hasImplementationPlan)?.label || '',
          comment: needsAssessment.hasImplementationPlanComment || ''
        },
        {
          label: NEEDS_ASSESSMENT_QUESTIONS.innovator[3].label,
          value: yesPartiallyNoItems.find(item => item.value === needsAssessment.hasScaleResource)?.label || '',
          comment: needsAssessment.hasScaleResourceComment || ''
        }
      ];

      // this.setBackLink('Go back', `/innovator/innovations/${this.innovationId}`);
      this.setPageStatus('READY');

    });

  }

}
