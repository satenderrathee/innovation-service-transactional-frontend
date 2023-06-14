import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { UserRoleEnum } from '@app/base/enums';

import { CoreModule, AppInjector } from '@modules/core';
import { StoresModule } from '@modules/stores';
import { AdminModule } from '@modules/feature-modules/admin/admin.module';


import { ServiceUsersService } from '../../services/service-users.service';
import { PageUserFindComponent } from './user-find.component';
import { searchUserEndpointOutDTO, UsersService } from '@modules/shared/services/users.service';


describe('FeatureModules/Admin/Pages/Users/PageUserFindComponent', () => {

  let activatedRoute: ActivatedRoute;

  let usersService: UsersService;

  let component: PageUserFindComponent;
  let fixture: ComponentFixture<PageUserFindComponent>;

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

    activatedRoute = TestBed.inject(ActivatedRoute);

    usersService = TestBed.inject(UsersService);

  });


  it('should create the component', () => {
    fixture = TestBed.createComponent(PageUserFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show "adminDeletedSuccess" alert', () => {

    activatedRoute.snapshot.queryParams = { alert: 'adminDeletedSuccess' };

    fixture = TestBed.createComponent(PageUserFindComponent);
    component = fixture.componentInstance;
    expect(component.alert.type).toBe('SUCCESS');

  });

  it('should call onSubmit() and return success', () => {

    const responseMock: searchUserEndpointOutDTO[] = [{
      id: ':id',
      displayName: ':displayName',
      email: 'test@example.com',
      type: UserRoleEnum.ACCESSOR,
      typeLabel: 'Accessor',
      userOrganisations: [
        {
          id: ':organisation_id',
          name: 'org name',
          acronym: 'acronym',
          role: 'ACCESSOR',
          units: [{
            id: ':unit',
            name: 'unit name',
            acronym: 'unit acronym',
          }]
        }
      ]
    }];

    usersService.searchUser = () => of(responseMock);

    fixture = TestBed.createComponent(PageUserFindComponent);
    component = fixture.componentInstance;

    component.form.setValue({ email: 'test@example.com' });
    component.onSubmit();
    fixture.detectChanges();

    expect(component.usersList.length).toEqual(1);

  });

  it('should call onSubmit() and return error', () => {

    usersService.searchUser = () => throwError('error');

    fixture = TestBed.createComponent(PageUserFindComponent);
    component = fixture.componentInstance;

    component.form.setValue({ email: 'test@example.com' });
    component.onSubmit();
    fixture.detectChanges();

    expect(component.pageStatus).toBe('READY');

  });



});