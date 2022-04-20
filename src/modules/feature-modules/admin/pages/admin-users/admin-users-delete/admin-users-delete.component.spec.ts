import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Injector } from '@angular/core';

import { CoreModule, AppInjector } from '@modules/core';
import { StoresModule, AuthenticationStore } from '@modules/stores';
import { InnovatorModule } from '@modules/feature-modules/innovator/innovator.module';

import { PageAdminDeleteComponent } from './admin-users-delete.component';

describe('Shared/Pages/Account/Manageaccount/PageAccountManageUserAccountComponent', () => {

  let authenticationStore: AuthenticationStore;

  let component: PageAdminDeleteComponent;
  let fixture: ComponentFixture<PageAdminDeleteComponent>;

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

    authenticationStore = TestBed.inject(AuthenticationStore);

  });


  it('should create the component', () => {

    fixture = TestBed.createComponent(PageAdminDeleteComponent);
    component = fixture.componentInstance;
    component.form.get('email')?.setValue('some@email.com');
    component.form.get('confirmation')?.setValue('delete my account');
    fixture.detectChanges();
    expect(component).toBeTruthy();

  });
});
