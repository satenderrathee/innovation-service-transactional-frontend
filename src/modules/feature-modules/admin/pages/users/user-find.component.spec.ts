import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { UserRoleEnum } from '@app/base/enums';

import { AppInjector, CoreModule } from '@modules/core';
import { AdminModule } from '@modules/feature-modules/admin/admin.module';
import { UserInfo } from '@modules/shared/dtos/users.dto';
import { StoresModule } from '@modules/stores';

import { UsersService } from '../../services/users.service';
import { PageUserFindComponent } from './user-find.component';


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

    const responseMock: UserInfo = {
      id: ':id',
      name: ':displayName',
      email: 'test@example.com',
      isActive: true,
      roles: [{
        id: ':id',
        role: UserRoleEnum.INNOVATOR,
        isActive: true
      }]
    };

    usersService.getUserInfo = () => of(responseMock);

    fixture = TestBed.createComponent(PageUserFindComponent);
    component = fixture.componentInstance;

    component.form.setValue({ email: 'test@example.com' });
    component.onSubmit();
    fixture.detectChanges();

    expect(component.searchUser).toBeDefined();

  });

  it('should call onSubmit() and return error', () => {

    usersService.getUserInfo = () => throwError('error');

    fixture = TestBed.createComponent(PageUserFindComponent);
    component = fixture.componentInstance;

    component.form.setValue({ email: 'test@example.com' });
    component.onSubmit();
    fixture.detectChanges();

    expect(component.pageStatus).toBe('READY');

  });



});
