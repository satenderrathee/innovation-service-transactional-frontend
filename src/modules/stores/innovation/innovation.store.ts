import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MappedObjectType } from '@modules/core/interfaces/base.interfaces';

import { WizardEngineModel } from '@modules/shared/forms';
import { Store } from '../store.class';

import { InnovationService } from './innovation.service';

import { getSectionNumber, getSectionParentNumber, getSectionParentTitle, getSectionTitle, INNOVATION_SECTIONS } from './innovation.config';
import { InnovationSectionEnum } from './innovation.enums';
import { GetInnovationEvidenceDTO, InnovationModel, InnovationSectionConfigType, InnovationSectionInfoDTO, INNOVATION_SECTION_ACTION_STATUS, INNOVATION_SECTION_STATUS, INNOVATION_STATUS, INNOVATION_SUPPORT_STATUS, SectionsSummaryModel } from './innovation.models';


@Injectable()
export class InnovationStore extends Store<InnovationModel> {

  constructor(
    private innovationsService: InnovationService
  ) {
    super('store::innovations', new InnovationModel());
  }

  get INNOVATION_STATUS(): typeof INNOVATION_STATUS { return INNOVATION_STATUS; }
  get INNOVATION_SUPPORT_STATUS(): typeof INNOVATION_SUPPORT_STATUS { return INNOVATION_SUPPORT_STATUS; }
  get INNOVATION_SECTION_STATUS(): typeof INNOVATION_SECTION_STATUS { return INNOVATION_SECTION_STATUS; }
  get INNOVATION_SECTION_ACTION_STATUS(): typeof INNOVATION_SECTION_ACTION_STATUS { return INNOVATION_SECTION_ACTION_STATUS; }

  isAssessmentStatus(status: keyof typeof INNOVATION_STATUS | string): boolean {
    return ['WAITING_NEEDS_ASSESSMENT', 'NEEDS_ASSESSMENT'].includes(status);
  }

  submitInnovation$(innovationId: string): Observable<{ id: string, status: keyof typeof INNOVATION_STATUS }> {
    return this.innovationsService.submitInnovation(innovationId);
  }

  getSectionsSummary$(innovationId: string): Observable<SectionsSummaryModel> {

    return this.innovationsService.getInnovationSections(innovationId).pipe(
      map(response => INNOVATION_SECTIONS.map(item => ({
        title: item.title,
        sections: item.sections.map(ss => {
          const sectionState = response.find(a => a.section === ss.id) || { status: 'UNKNOWN', actionStatus: '', openActionsCount: 0 };
          return {
            id: ss.id,
            title: ss.title,
            status: sectionState.status,
            isCompleted: INNOVATION_SECTION_STATUS[sectionState.status]?.isCompleteState || false,
            openActionsCount: sectionState.openActionsCount
          };
        })
      }))
      ),
      catchError(() => {
        // this.logger.error('Unable to fetch sections information');
        return of(
          INNOVATION_SECTIONS.map(item => ({
            title: item.title,
            sections: item.sections.map(ss => ({
              id: ss.id,
              title: ss.title,
              status: 'UNKNOWN' as keyof typeof INNOVATION_SECTION_STATUS,
              actionStatus: '' as keyof typeof INNOVATION_SECTION_ACTION_STATUS,
              isCompleted: false,
              openActionsCount: 0
            }))
          }))
        );
      })
    );

  }

  getSectionInfo$(innovationId: string, section: string): Observable<InnovationSectionInfoDTO> {
    return this.innovationsService.getSectionInfo(innovationId, section, { fields: ['actions'] });
  }

  updateSectionInfo$(innovationId: string, sectionKey: string, data: MappedObjectType): Observable<MappedObjectType> {
    return this.innovationsService.updateSectionInfo(innovationId, sectionKey, data);
  }

  submitSections$(innovationId: string, sectionKey: string): Observable<MappedObjectType> {
    return this.innovationsService.submitSections(innovationId, sectionKey);
  }

  getSectionEvidence$(innovationId: string, evidenceId: string): Observable<GetInnovationEvidenceDTO> {
    return this.innovationsService.getSectionEvidenceInfo(innovationId, evidenceId);
  }

  upsertSectionEvidenceInfo$(innovationId: string, data: MappedObjectType, evidenceId?: string): Observable<MappedObjectType> {
    return this.innovationsService.upsertSectionEvidenceInfo(innovationId, data, evidenceId);
  }

  deleteEvidence$(innovationId: string, evidenceId: string): Observable<boolean> {
    return this.innovationsService.deleteEvidence(innovationId, evidenceId);
  }

  getSectionParentNumber(sectionId: InnovationSectionEnum): string {
    return getSectionParentNumber(sectionId);
  }

  getSectionNumber(sectionId: InnovationSectionEnum): string {
    return getSectionNumber(sectionId);
  }

  getSectionTitle(sectionId: InnovationSectionEnum | null): string {
    return getSectionTitle(sectionId);
  }

  getSectionParentTitle(sectionId: InnovationSectionEnum): string {
    return getSectionParentTitle(sectionId);
  }

  getSection(sectionId: InnovationSectionEnum): InnovationSectionConfigType['sections'][0] | undefined {
    return cloneDeep(INNOVATION_SECTIONS.find(sectionGroup => sectionGroup.sections.some(s => s.id === sectionId))?.sections.find(s => s.id === sectionId));
  }

  getSectionWizard(sectionId: InnovationSectionEnum): WizardEngineModel {
    return cloneDeep(
      INNOVATION_SECTIONS.find(sectionGroup => sectionGroup.sections.some(s => s.id === sectionId))?.sections.find(s => s.id === sectionId)?.wizard || new WizardEngineModel({})
    );
  }

}
