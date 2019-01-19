import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganismViewMapComponent} from './organism-view-map.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRouteStub} from "../../test/helpers/activated-route-stub";
import {AuthService} from "../services/auth.service";

describe('OrganismViewMapComponent', () => {
  let component: OrganismViewMapComponent;
  let fixture: ComponentFixture<OrganismViewMapComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [OrganismViewMapComponent],
      providers: [SharingService, AuthService,
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismViewMapComponent);
    component = fixture.componentInstance;
    activatedRoute = <any>fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.params = { id: '1'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
