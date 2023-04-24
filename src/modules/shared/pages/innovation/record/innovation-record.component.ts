import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreComponent } from '@app/base';

import { ContextInnovationType } from '@modules/stores/context/context.types';
import { INNOVATION_STATUS, SectionsSummaryModel } from '@modules/stores/innovation/innovation.models';


type ProgressBarType = '1:active' | '2:warning' | '3:inactive';


@Component({
  selector: 'shared-pages-innovation-record',
  templateUrl: './innovation-record.component.html'
})
export class PageInnovationRecordComponent extends CoreComponent implements OnInit {

  innovation: ContextInnovationType;
  baseUrl = '';
  documentUrl = '';
  pdfDocumentUrl = '';


  innovationId: string;
  innovationName: string;
  innovationStatus: keyof typeof INNOVATION_STATUS = '';
  innovationSections: SectionsSummaryModel = [];
  innovationExport: ContextInnovationType['export'];

  sections: {
    progressBar: ProgressBarType[];
    submitted: number;
    draft: number;
    notStarted: number;
  } = { progressBar: [], submitted: 0, draft: 0, notStarted: 0 };

  innovationSectionStatus = this.stores.innovation.INNOVATION_SECTION_STATUS;
  innovationSectionActionStatus = this.stores.innovation.INNOVATION_SECTION_ACTION_STATUS;

  showDownloadOldIR: boolean;

  isInnovationInCreatedStatus(): boolean {
    return this.innovationStatus === 'CREATED';
  }

  isInAssessmentStatus(): boolean {
    return this.stores.innovation.isAssessmentStatus(this.innovationStatus);
  }

  allSectionsSubmitted(): boolean {
    return this.sections.submitted === this.sections.progressBar.length;
  }


  constructor(
    private activatedRoute: ActivatedRoute
  ) {

    super();
    this.setPageTitle('Innovation record');

    this.innovation = this.stores.context.getInnovation();
    this.baseUrl = `/${this.stores.authentication.userUrlBasePath()}/innovations/${this.activatedRoute.snapshot.params.innovationId}/record/sections`;
    this.documentUrl = `${this.CONSTANTS.APP_ASSETS_URL}/NHS-innovation-service-record.docx`;
    this.pdfDocumentUrl = `${this.CONSTANTS.APP_URL}/exports/${this.activatedRoute.snapshot.params.innovationId}/pdf?role=${this.stores.authentication.getUserContextInfo()?.roleId}`;
    this.innovationId = this.activatedRoute.snapshot.params.innovationId;
    this.innovationName = this.innovation.name;
    this.innovationStatus = this.innovation.status;
    this.innovationExport = this.innovation.export;


    // TODO: remove after 31/05/2023
    const deployDateMs = new Date('2023-04-26T17:00:00').getTime();
    const finalDateMs = new Date('2023-05-31T23:59:59').getTime();
    const createdAtMs = new Date(this.innovation.createdAt ?? '').getTime();
    const nowMs = new Date().getTime();
    this.showDownloadOldIR =
      this.stores.authentication.isInnovatorType() && (createdAtMs <= deployDateMs) && (nowMs <= finalDateMs);
  }


  ngOnInit(): void {

    this.stores.innovation.getSectionsSummary$(this.activatedRoute.snapshot.params.innovationId).subscribe({
      next: response => {

        this.innovationSections = response;

        this.sections.progressBar = this.innovationSections.reduce((acc: ProgressBarType[], item) => {
          return [...acc, ...item.sections.map(s => {
            switch (s.status) {
              case 'SUBMITTED': return '1:active';
              case 'DRAFT': return '2:warning';
              case 'NOT_STARTED':
              default:
                return '3:inactive';
            }
          })];
        }, []);

        this.sections.notStarted = this.innovationSections.reduce((acc: number, item) => acc + item.sections.filter(s => s.status === 'NOT_STARTED').length, 0);
        this.sections.draft = this.innovationSections.reduce((acc: number, item) => acc + item.sections.filter(s => s.status === 'DRAFT').length, 0);
        this.sections.submitted = this.innovationSections.reduce((acc: number, item) => acc + item.sections.filter(s => s.status === 'SUBMITTED').length, 0);

        if (!this.innovationName) { // This means that an API error occurred.
          this.setAlertError('There is a problem', { message: 'Unable to fetch full innovation record information' })
        }

        this.setPageStatus('READY');

      },
      error: () => {
        this.setPageStatus('ERROR');
        this.setAlertUnknownError();
      }

    });

  }

}
