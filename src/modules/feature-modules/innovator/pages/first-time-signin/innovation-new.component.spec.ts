import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AppInjector, CoreModule } from '@modules/core';
import { InnovatorModule } from '@modules/feature-modules/innovator/innovator.module';
import { AuthenticationStore, StoresModule } from '@modules/stores';

import { FirstTimeSigninInnovationNewComponent } from './innovation-new.component';

import { InnovatorService } from '../../services/innovator.service';

import { OrganisationsService } from '@modules/shared/services/organisations.service';
import { UserRoleEnum } from '@app/base/enums';
import { UsersService } from '@modules/shared/services/users.service';


describe('FeatureModules/Innovator/Pages/FirstTimeSignin/FirstTimeSigninInnovationNewComponent', () => {

  let router: Router;
  let routerSpy: jest.SpyInstance;

  let authenticationStore: AuthenticationStore;
  let innovatorService: InnovatorService;
  let organisationsService: OrganisationsService;
  let usersService: UsersService;

  let component: FirstTimeSigninInnovationNewComponent;
  let fixture: ComponentFixture<FirstTimeSigninInnovationNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        StoresModule,
        InnovatorModule
      ]
    });

    AppInjector.setInjector(TestBed.inject(Injector));

    router = TestBed.inject(Router);
    routerSpy = jest.spyOn(router, 'navigate');

    authenticationStore = TestBed.inject(AuthenticationStore);
    innovatorService = TestBed.inject(InnovatorService);
    organisationsService = TestBed.inject(OrganisationsService);
    usersService = TestBed.inject(UsersService);

    usersService.getUsersList = () => of({
      count: 2,
      data: [
        {
          id: 'orgId01',
          isActive: true,
          name: 'Org name 01',  
          role: UserRoleEnum.QUALIFYING_ACCESSOR,
          roleDescription: 'Qualifying accessor',
          lockedAt: null,  
          organisationUnitUserId: 'OrgUnitId01',
          email: '',
        },
        {
          id: 'orgId02',
          isActive: true,
          name: 'Org name 02',  
          role: UserRoleEnum.ACCESSOR,
          roleDescription: 'Accessor',
          lockedAt: null,  
          organisationUnitUserId: 'OrgUnitId02',
          email: '',
        }
      ]
    });

  });

  it('should create the component', () => {
    fixture = TestBed.createComponent(FirstTimeSigninInnovationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // it('should NOT have default information loaded', () => {

  //   organisationsService.getAccessorsOrganisations = () => throwError('error');

  //   fixture = TestBed.createComponent(FirstTimeSigninComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   expect(component.pageStatus).toBe('READY');

  // });

  // it('should run onSubmitStep() with UNDEFINED formEngineComponent field', () => {

  //   fixture = TestBed.createComponent(FirstTimeSigninComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   component.formEngineComponent = undefined;

  //   component.onSubmitStep('next');
  //   expect(component.wizard.currentAnswers).toEqual({
  //     innovatorName: '',
  //     innovationName: '',
  //     innovationDescription: '',
  //     isCompanyOrOrganisation: 'NO',
  //     organisationName: '',
  //     organisationSize: null,
  //     location: '',
  //     englandPostCode: null,
  //     locationCountryName: '',
  //     mobilePhone: null,
  //     organisationShares: ['orgId01', 'orgId02']
  //   });

  // });

  // it('should run onSubmitStep() and DO NOTHING with form NOT valid', () => {

  //   fixture = TestBed.createComponent(FirstTimeSigninComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   component.formEngineComponent = TestBed.createComponent(FormEngineComponent).componentInstance;
  //   component.formEngineComponent.getFormValues = () => ({ valid: false, data: { value: 'some value' } });

  //   component.onSubmitStep('next');
  //   expect(component.wizard.currentAnswers).toEqual({
  //     innovatorName: '',
  //     innovationName: '',
  //     innovationDescription: '',
  //     isCompanyOrOrganisation: 'NO',
  //     organisationName: '',
  //     organisationSize: null,
  //     location: '',
  //     englandPostCode: null,
  //     locationCountryName: '',
  //     mobilePhone: null,
  //     organisationShares: ['orgId01', 'orgId02']
  //   });

  // });

  // it('should run onSubmitStep() and redirect because is the first step', () => {

  //   fixture = TestBed.createComponent(FirstTimeSigninComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   component.formEngineComponent = TestBed.createComponent(FormEngineComponent).componentInstance;
  //   component.formEngineComponent.getFormValues = () => ({ valid: true, data: { value: 'some value' } });

  //   component.onSubmitStep('previous');
  //   expect(routerSpy).toHaveBeenCalledWith(['innovator'], {});

  // });

  // it('should run onSubmitStep() and go to previous step', () => {

  //   fixture = TestBed.createComponent(FirstTimeSigninComponent);
  //   component = fixture.componentInstance;
  //   component.formEngineComponent = TestBed.createComponent(FormEngineComponent).componentInstance;
  //   component.formEngineComponent.getFormValues = () => ({ valid: true, data: { value: 'some value' } });
  //   fixture.detectChanges();

  //   component.wizard.gotoStep(3);

  //   component.onSubmitStep('previous');
  //   expect(component.wizard.currentStepId).toBe(2);

  // });

  // it('should run onSubmitStep() and go to next step', () => {

  //   fixture = TestBed.createComponent(FirstTimeSigninComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   component.formEngineComponent = TestBed.createComponent(FormEngineComponent).componentInstance;
  //   component.formEngineComponent.getFormValues = () => ({ valid: true, data: { value: 'some value' } });
  //   component.wizard.gotoStep(1);

  //   component.onSubmitStep('next');
  //   expect(component.wizard.currentStepId).toBe(2);

  // });

  // it('should run onSubmitStep() and do NOTHING with invalid action', () => {

  //   fixture = TestBed.createComponent(FirstTimeSigninComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   component.formEngineComponent = TestBed.createComponent(FormEngineComponent).componentInstance;
  //   component.formEngineComponent.getFormValues = () => ({ valid: true, data: { value: 'some value' } });
  //   component.wizard.gotoStep(1);

  //   component.onSubmitStep('invalid' as any);
  //   expect(component.wizard.currentStepId).toBe(1);

  // });

  // it('should run onSubmitWizard() with API success', () => {

  //   authenticationStore.initializeAuthentication$ = () => of(true);
  //   innovatorService.submitFirstTimeSigninInfo = () => of({ id: 'id' });

  //   fixture = TestBed.createComponent(FirstTimeSigninComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   component.onSubmitWizard();
  //   expect(routerSpy).toHaveBeenCalledWith(['innovator/dashboard'], { queryParams: { alert: 'alertDisabled' } });
  // });

  // it('should run onSubmitWizard() with API error', () => {

  //   innovatorService.submitFirstTimeSigninInfo = () => throwError('error');

  //   fixture = TestBed.createComponent(FirstTimeSigninComponent);
  //   component = fixture.componentInstance;

  //   component.onSubmitWizard();
  //   fixture.detectChanges();
  //   expect(component.alert).toEqual({
  //     type: 'ERROR',
  //     title: 'An unknown error occurred',
  //     message: 'You may try to go back and try again.',
  //     setFocus: true
  //   });

  // });

});
