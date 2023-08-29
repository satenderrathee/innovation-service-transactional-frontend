import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AppInjector, CoreModule } from '@modules/core';
import { AdminModule } from '@modules/feature-modules/admin/admin.module';
import { AuthenticationStore, StoresModule } from '@modules/stores';


import { UsersService } from '@modules/feature-modules/admin/services/users.service';
import { OrganisationsService } from '@modules/shared/services/organisations.service';
import { PageUserNewComponent } from './user-new.component';


describe('FeatureModules/Admin/Pages/AdminUsers/PageAdminUserNewComponent', () => {

  let component: PageUserNewComponent;
  let fixture: ComponentFixture<PageUserNewComponent>;
  let router: Router;
  let routerSpy: jest.SpyInstance;

  let authenticationStore: AuthenticationStore;
  let serviceUserService: UsersService;
  let organisationsService: OrganisationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        StoresModule,
        AdminModule
      ]
    });

    AppInjector.setInjector(TestBed.inject(Injector));

    router = TestBed.inject(Router);
    routerSpy = jest.spyOn(router, 'navigate');

    authenticationStore = TestBed.inject(AuthenticationStore);
    serviceUserService = TestBed.inject(UsersService);
    organisationsService = TestBed.inject(OrganisationsService);

    organisationsService.getOrganisationsList = () => of([
      { id: 'orgId', acronym: 'orgId01', name: 'Org name 01', isActive: true, organisationUnits: [{ id: 'orgId', acronym: 'orgId01', name: 'Org name 01', isActive: true }] },
      { id: 'orgId', acronym: 'orgId02', name: 'Org name 02', isActive: true, organisationUnits: [{ id: 'orgId', acronym: 'orgId01', name: 'Org name 01', isActive: true }] }
    ]);

  });

  it('should create the component', () => {
    fixture = TestBed.createComponent(PageUserNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
