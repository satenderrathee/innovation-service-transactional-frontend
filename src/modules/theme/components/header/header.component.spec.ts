import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoreModule } from '@modules/core';
import { StoresModule } from '@modules/stores';

import { HeaderComponent } from './header.component';

describe('Theme/Components/Header/HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, CoreModule, StoresModule],
      declarations: [HeaderComponent]
    });
  });

  it('should create the component', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
