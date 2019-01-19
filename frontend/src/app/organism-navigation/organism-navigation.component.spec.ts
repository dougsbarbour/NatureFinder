import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OrganismNavigationComponent} from './organism-navigation.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivatedRouteStub} from "../../test/helpers/activated-route-stub";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SharingService} from "../services/sharing.service";
import {AuthService} from "../services/auth.service";
import {Organism} from "../models/organism";
import * as jsonDomainObjects from '../../test/mocks/mockOrganisms.json';
let refMap = (new SharingService(undefined)).getIncludedMap((<any>jsonDomainObjects).included);
let mockDomainObjects = (<any>jsonDomainObjects).data.map(each => new Organism(each, refMap));

describe('OrganismNavigationComponent', () => {
  let component: OrganismNavigationComponent;
  let fixture: ComponentFixture<OrganismNavigationComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routerSpy['url'] = '';

    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [OrganismNavigationComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [SharingService, AuthService,
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(OrganismNavigationComponent);
    component = fixture.componentInstance;
    component.model = mockDomainObjects[0];
    activatedRoute = <any>fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.params = {id: '1'};
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
