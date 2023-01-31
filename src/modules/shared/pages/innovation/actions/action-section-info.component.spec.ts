import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppInjector, CoreModule } from '@modules/core';
import { StoresModule } from '@modules/stores';

import { InnovationsService } from '@modules/shared/services/innovations.service';
import { SharedModule } from '@modules/shared/shared.module';
import { PageInnovationActionSectionInfoComponent } from './action-section-info.component';


describe('Shared/Pages/Innovation/PageInnovationActionSectionInfoComponent', () => {

  let activatedRoute: ActivatedRoute;

  let innovationsService: InnovationsService;

  let component: PageInnovationActionSectionInfoComponent;
  let fixture: ComponentFixture<PageInnovationActionSectionInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        StoresModule,
        SharedModule
      ]
    });

    AppInjector.setInjector(TestBed.inject(Injector));

    activatedRoute = TestBed.inject(ActivatedRoute);

    innovationsService = TestBed.inject(InnovationsService);

  });


  it('should create the component', () => {
    fixture = TestBed.createComponent(PageInnovationActionSectionInfoComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
