import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CoreComponent } from '@app/base';
import { WizardModel, WizardStepModel } from '@app/base/models';
import { WizardInnovationCustomNotificationNewNotificationStepComponent } from './steps/notification-step.component';
import { ContextInnovationType, MappedObjectType, WizardStepEventType } from '@app/base/types';
import {
  NotificationStepInputType,
  NotificationStepOutputType,
  NotificationEnum,
  NOTIFICATION_ITEMS,
  Notification,
  CategoryEnum
} from './steps/notification-step.types';
import { OrganisationsListDTO, OrganisationsService } from '@modules/shared/services/organisations.service';
import {
  Organisation,
  OrganisationsStepInputType,
  OrganisationsStepOutputType
} from './steps/organisations-step.types';
import { WizardInnovationCustomNotificationNewOrganisationsStepComponent } from './steps/organisations-step.component';
import { Unit, UnitsStepInputType, UnitsStepOutputType } from './steps/units-step.types';
import { SupportStatusesStepInputType, SupportStatusesStepOutputType } from './steps/support-statuses-step.types';
import { WizardInnovationCustomNotificationNewUnitsStepComponent } from './steps/units-step.component';
import { SummaryStepInputType } from './steps/summary-step.types';
import { WizardInnovationCustomNotificationNewSummaryStepComponent } from './steps/summary-step.component';
import { InnovationSupportStatusEnum } from '@modules/stores/innovation';
import { WizardInnovationCustomNotificationNewSupportStatusesStepComponent } from './steps/support-statuses-step.component';
import {
  AccessorService,
  GetNotifyMeInnovationSubscription,
  NotifyMeConfig
} from '@modules/feature-modules/accessor/services/accessor.service';
import { ObservableInput, forkJoin } from 'rxjs';

type WizardData = {
  notificationStep: {
    notification: string;
  };
  organisationsStep: {
    organisations: Organisation[];
  };
  unitsStep: {
    units: Unit[];
  };
  supportStatusesStep: {
    supportStatuses: InnovationSupportStatusEnum[];
  };
};

const wizardEmptyState = {
  organisationsStep: {
    organisations: []
  },
  unitsStep: {
    units: []
  },
  supportStatusesStep: {
    supportStatuses: []
  }
};

@Component({
  selector: 'app-accessor-innovation-custom-notification-new',
  templateUrl: './custom-notification-new.component.html'
})
export class WizardInnovationCustomNotificationNewComponent extends CoreComponent implements OnInit {
  subscriptionId: string;
  innovation: ContextInnovationType;

  subscription: GetNotifyMeInnovationSubscription;

  isEditMode: boolean;
  currentEditModeEntryStep: string = '';

  datasets: {
    organisations: Organisation[];
  };

  wizard = new WizardModel<WizardData>({});

  stepsDefinition: {
    [stepId: string]: WizardStepModel;
  };

  constructor(
    private organisationsService: OrganisationsService,
    private accessorService: AccessorService,
    private activatedRoute: ActivatedRoute
  ) {
    super();

    this.subscriptionId = this.activatedRoute.snapshot.params.subscriptionId;
    this.innovation = this.stores.context.getInnovation();

    this.subscription = {
      id: '',
      updatedAt: new Date(),
      eventType: 'SUPPORT_UPDATED',
      subscriptionType: 'INSTANTLY',
      organisations: [],
      status: []
    };

    this.isEditMode = !!this.subscriptionId;

    this.datasets = {
      organisations: []
    };

    this.wizard.data = {
      notificationStep: {
        notification: ''
      },
      ...wizardEmptyState
    };

    this.stepsDefinition = {
      notificationStep: new WizardStepModel<NotificationStepInputType, NotificationStepOutputType>({
        id: 'notificationStep',
        title: 'What would you like to be notified about?',
        component: WizardInnovationCustomNotificationNewNotificationStepComponent,
        data: {
          selectedNotification: ''
        },
        outputs: {
          previousStepEvent: data => this.onPreviousStep(data),
          nextStepEvent: data => this.onNextStep(data, this.onNotificationStepOut, this.onOrganisationsStepIn)
        }
      }),
      organisationsStep: new WizardStepModel<OrganisationsStepInputType, OrganisationsStepOutputType>({
        id: 'organisationsStep',
        title: 'Select organisations',
        component: WizardInnovationCustomNotificationNewOrganisationsStepComponent,
        data: {
          organisations: this.datasets.organisations,
          selectedOrganisations: []
        },
        outputs: {
          previousStepEvent: data => this.onPreviousStep(data, this.onOrganisationsStepOut, this.onNotificationStepIn),
          nextStepEvent: data =>
            this.onNextStep(data, this.onOrganisationsStepOut, this.onUnitsStepIn, this.onSupportStatusesStepIn)
        }
      }),
      unitsStep: new WizardStepModel<UnitsStepInputType, UnitsStepOutputType>({
        id: 'unitsStep',
        title: 'Select organisation units',
        component: WizardInnovationCustomNotificationNewUnitsStepComponent,
        data: {
          selectedOrganisationsWithUnits: [],
          selectedUnits: []
        },
        outputs: {
          previousStepEvent: data => this.onPreviousStep(data, this.onUnitsStepOut, this.onOrganisationsStepIn),
          nextStepEvent: data => this.onNextStep(data, this.onUnitsStepOut, this.onSupportStatusesStepIn)
        }
      }),
      supportStatusesStep: new WizardStepModel<SupportStatusesStepInputType, SupportStatusesStepOutputType>({
        id: 'supportStatusesStep',
        title: 'Select support status',
        component: WizardInnovationCustomNotificationNewSupportStatusesStepComponent,
        data: {
          selectedSupportStatuses: []
        },
        outputs: {
          previousStepEvent: data =>
            this.onPreviousStep(data, this.onSupportStatusesStepOut, this.onOrganisationsStepIn, this.onUnitsStepIn),
          nextStepEvent: data => {
            this.onNextStep(data, this.onSupportStatusesStepOut);
            this.onSummaryStepIn();
          }
        }
      }),
      summaryStep: new WizardStepModel<SummaryStepInputType, null>({
        id: 'summaryStep',
        title: '',
        component: WizardInnovationCustomNotificationNewSummaryStepComponent,
        data: {
          displayEditMode: false,
          selectedNotification: '',
          selectedOrganisations: [],
          selectedSupportStatuses: []
        },
        outputs: {
          previousStepEvent: data => this.onPreviousStep(data, this.onSupportStatusesStepIn),
          submitEvent: data => this.onSubmit(data),
          goToStepEvent: stepId => {
            if (this.isEditMode) {
              this.currentEditModeEntryStep = stepId;
            }
            this.onGoToStep(stepId);
          }
        }
      })
    };
  }

  ngOnInit() {
    const subscriptions: {
      organisationsList: ObservableInput<OrganisationsListDTO[]>;
      subscription?: ObservableInput<GetNotifyMeInnovationSubscription>;
    } = {
      organisationsList: this.organisationsService.getOrganisationsList({ unitsInformation: true })
    };

    if (this.isEditMode) {
      subscriptions.subscription = this.accessorService.getNotifyMeSubscription(this.subscriptionId);
    }

    forkJoin(subscriptions).subscribe({
      next: response => {
        // Get organisations information
        this.datasets.organisations = response.organisationsList.map(o => {
          const org = {
            id: o.id,
            name: o.name,
            units: o.organisationUnits.map(unit => ({ id: unit.id, name: unit.name }))
          };

          let description = undefined;
          if (org.units.length > 1) {
            const totalUnits = org.units.length;
            description = `${totalUnits} ${totalUnits > 1 ? 'units' : 'unit'} in this organisation. You can select specific units on the next page.`;
          }

          return { ...org, description };
        });

        // Get subscription information if editMode is true
        if (response.subscription) {
          this.subscription = response.subscription;

          // Set wizard data with current subscription information
          this.setWizardDataWithCurrentSubscriptionInfo();

          this.manageWizardSteps(this.wizard.data.notificationStep.notification);
          this.onGoToStep('summaryStep');
        } else {
          // Add notification step if editMode is false
          this.wizard.addStep(this.stepsDefinition.notificationStep);
        }

        this.setPageStatus('READY');
      },
      error: () => {
        this.setPageStatus('ERROR');
        this.setAlertUnknownError();
      }
    });
  }

  setWizardDataWithCurrentSubscriptionInfo() {
    this.wizard.data = {
      notificationStep: {
        notification: this.subscription.eventType
      },
      organisationsStep: {
        organisations: this.datasets.organisations.filter(org =>
          this.subscription.organisations.map(org => org.id).includes(org.id)
        )
      },
      unitsStep: {
        units: this.subscription.organisations.flatMap(org => org.units.filter(unit => !unit.isShadow))
      },
      supportStatusesStep: {
        supportStatuses: this.subscription.status
      }
    };
  }

  // Steps mappings
  onNotificationStepIn(): void {
    this.wizard.setStepData<NotificationStepInputType>('notificationStep', {
      selectedNotification: this.wizard.data.notificationStep.notification
    });
  }

  onNotificationStepOut(stepData: WizardStepEventType<NotificationStepOutputType>): void {
    if (this.wizard.data.notificationStep.notification !== stepData.data.notification) {
      // Update wizard steps according to chosen notification
      this.manageWizardSteps(stepData.data.notification);
    }
    this.wizard.data.notificationStep = {
      notification: stepData.data.notification
    };
  }

  onOrganisationsStepIn(): void {
    this.wizard.setStepData<OrganisationsStepInputType>('organisationsStep', {
      organisations: this.datasets.organisations,
      selectedOrganisations: this.wizard.data.organisationsStep.organisations
    });
  }

  onOrganisationsStepOut(stepData: WizardStepEventType<OrganisationsStepOutputType>): void {
    this.wizard.data.organisationsStep = {
      organisations: stepData.data.selectedOrganisations
    };
    this.manageUnitsStep();
  }

  onUnitsStepIn(): void {
    this.wizard.setStepData<UnitsStepInputType>('unitsStep', {
      selectedOrganisationsWithUnits: this.wizard.data.organisationsStep.organisations.filter(
        org => org.units.length > 1
      ),
      selectedUnits: this.wizard.data.unitsStep.units
    });
  }

  onUnitsStepOut(stepData: WizardStepEventType<UnitsStepOutputType>): void {
    this.wizard.data.unitsStep = {
      units: stepData.data.selectedUnits
    };
  }

  onSupportStatusesStepIn(): void {
    this.wizard.setStepData<SupportStatusesStepInputType>('supportStatusesStep', {
      selectedSupportStatuses: this.wizard.data.supportStatusesStep.supportStatuses
    });
  }

  onSupportStatusesStepOut(stepData: WizardStepEventType<SupportStatusesStepOutputType>): void {
    this.wizard.data.supportStatusesStep = {
      supportStatuses: stepData.data.selectedSupportStatuses
    };
  }

  onSummaryStepIn(displayEditMode: boolean = false): void {
    // If user access summary in edit mode, display the current subscription information
    if (displayEditMode) {
      this.setWizardDataWithCurrentSubscriptionInfo();
    }

    // Get chosen notification information
    const notification: Notification = NOTIFICATION_ITEMS.filter(
      notification => notification.type === this.wizard.data.notificationStep.notification
    )?.[0];

    // Get organisation information to display
    const selectedUnitsIds = this.wizard.data.unitsStep.units.map(unit => unit.id);
    const organisationsNames = this.wizard.data.organisationsStep.organisations
      .map(org => {
        if (org.units.length === 1) {
          return org.name;
        } else {
          const unitName = org.units.filter(unit => selectedUnitsIds.includes(unit.id)).flatMap(unit => unit.name);
          return unitName;
        }
      })
      .flat();

    this.wizard.setStepData<SummaryStepInputType>('summaryStep', {
      displayEditMode,
      selectedNotification:
        notification.category === CategoryEnum.NOTIFIY_ME_WHEN
          ? 'When ' + notification.label
          : 'Remind me ' + notification.label,
      selectedOrganisations: organisationsNames.sort((a, b) => a.localeCompare(b)),
      selectedSupportStatuses: this.wizard.data.supportStatusesStep.supportStatuses.map(status =>
        this.translate('shared.catalog.innovation.support_status.' + status + '.name')
      )
    });
  }

  onPreviousStep<T extends WizardStepEventType<MappedObjectType | null>>(
    stepData: T,
    ...args: ((data: T) => void)[]
  ): void {
    this.resetAlert();

    if (this.wizard.isFirstStep()) {
      if (this.isEditMode) {
        this.onGoToStep('summaryStep');
      } else {
        this.redirectInnovationCustomNotifications();
      }
      return;
    }

    if (this.wizard.isLastStep() && this.wizard.currentStep().data.displayEditMode) {
      this.redirectInnovationCustomNotifications();
      return;
    }

    if (this.wizard.currentStep().id === this.currentEditModeEntryStep) {
      this.onGoToStep('summaryStep');
      return;
    }

    args.forEach(element => element.bind(this)(stepData));
    this.wizard.gotoPreviousStep();
  }

  onNextStep<T extends WizardStepEventType<MappedObjectType>>(stepData: T, ...args: ((data: T) => void)[]): void {
    this.resetAlert();

    args.forEach(element => element.bind(this)(stepData));

    this.wizard.gotoNextStep();
  }

  onGoToStep(stepId: string): void {
    switch (stepId) {
      case 'notificationStep':
        this.onNotificationStepIn();
        break;
      case 'organisationsStep':
        this.onOrganisationsStepIn();
        break;
      case 'unitsStep':
        this.onUnitsStepIn();
        break;
      case 'supportStatusesStep':
        this.onSupportStatusesStepIn();
        break;
      case 'summaryStep':
        this.onSummaryStepIn(this.isEditMode);
        break;
      default:
        return;
    }

    const nextStepNumber = this.wizard.steps.findIndex(step => step.id === stepId) + 1;

    if (nextStepNumber === undefined) {
      return;
    }

    this.wizard.gotoStep(nextStepNumber);
  }

  manageWizardSteps(notification: string): void {
    if (!this.isEditMode) {
      this.clearWizardData();
      this.clearWizardSteps();
    }
    switch (notification) {
      case NotificationEnum.SUPPORT_UPDATED:
        this.setWizardSteps([
          this.stepsDefinition.organisationsStep,
          this.stepsDefinition.supportStatusesStep,
          this.stepsDefinition.summaryStep
        ]);
        break;
      default:
        break;
    }
  }

  clearWizardData(): void {
    this.wizard.data = {
      notificationStep: this.wizard.data.notificationStep,
      ...wizardEmptyState
    };
  }

  clearWizardSteps(): void {
    const stepIds = Object.keys(this.stepsDefinition).filter(stepId => stepId !== 'notificationStep');
    stepIds.forEach(stepId => this.wizard.removeStep(stepId));
  }

  setWizardSteps(steps: WizardStepModel[]): void {
    steps.forEach(step => this.wizard.addStep(step));
  }

  manageUnitsStep(): void {
    const selectedOrganisationsHaveUnits = this.wizard.data.organisationsStep.organisations.some(
      org => org.units.length > 1
    );

    // If some selected organisation has more than one unit, add units step.
    // Otherwise, remove
    if (selectedOrganisationsHaveUnits) {
      this.wizard.addStep(this.stepsDefinition.unitsStep, 2 - Number(this.isEditMode));
    } else {
      this.wizard.removeStep('unitsStep');
      this.wizard.data.unitsStep.units = [];
    }
  }

  onSubmit<T extends WizardStepEventType<MappedObjectType | null>>(stepData: T, ...args: ((data: T) => void)[]): void {
    this.resetAlert();

    args.forEach(element => element.bind(this)(stepData));
    this.onSubmitWizard();
  }

  onSubmitWizard(): void {
    this.setPageStatus('LOADING');

    const unitsIds = [
      ...this.wizard.data.organisationsStep.organisations
        .filter(org => org.units.length === 1)
        .map(org => org.units[0].id),
      ...this.wizard.data.unitsStep.units.map(unit => unit.id)
    ];

    let body: NotifyMeConfig = {
      eventType: NotificationEnum.SUPPORT_UPDATED,
      subscriptionType: 'INSTANTLY',
      preConditions: {
        units: unitsIds,
        status: this.wizard.data.supportStatusesStep.supportStatuses
      }
    };

    if (this.isEditMode) {
      this.updateNotifyMeSubscription(body);
    } else {
      this.createNotifyMeSubscription(body);
    }
  }

  createNotifyMeSubscription(body: NotifyMeConfig) {
    this.accessorService.createNotifyMeSubscription(this.innovation.id, body).subscribe({
      next: () => {
        this.setRedirectAlertSuccess(`You have set up a custom notification for ${this.innovation.name}`);
        this.redirectInnovationCustomNotifications();
      },
      error: () => {
        this.setAlertUnknownError();
        this.setPageStatus('READY');
      }
    });
  }

  updateNotifyMeSubscription(body: NotifyMeConfig) {
    this.accessorService.updateNotifyMeSubscription(this.subscriptionId, body).subscribe({
      next: () => {
        this.setRedirectAlertSuccess(`The changes you have made to your custom notification have been saved`);
        this.redirectInnovationCustomNotifications();
      },
      error: () => {
        this.setAlertUnknownError();
        this.setPageStatus('READY');
      }
    });
  }

  private redirectInnovationCustomNotifications(): void {
    this.redirectTo(
      `${this.stores.authentication.userUrlBasePath()}/innovations/${this.innovation.id}/custom-notifications`
    );
  }
}
