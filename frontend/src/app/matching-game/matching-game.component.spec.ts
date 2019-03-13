import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchingGameComponent} from './matching-game.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivatedRouteStub} from "../../test/helpers/activated-route-stub";
import {OrganismSearchComponent} from "../organism-search/organism-search.component";
import {RouterLinkDirectiveStub} from "../../test/helpers/router-link-directive-stub";
import {QueryParamsDirectiveStub} from "../../test/helpers/query-params-directive-stub";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import * as jsonDomainObjects from '../../test/mocks/mockOrganisms.json';

describe('MatchingGameComponent', () => {
  let component: MatchingGameComponent;
  let fixture: ComponentFixture<MatchingGameComponent>;

  beforeEach(() => {
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        ApiService,
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: Router, useValue: routerSpy}
      ],
      declarations: [MatchingGameComponent, OrganismSearchComponent,
        RouterLinkDirectiveStub, QueryParamsDirectiveStub],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(MatchingGameComponent);
    component = fixture.componentInstance;
    let snapshot = TestBed.get(ActivatedRoute).snapshot;
    snapshot['params'] = {
      modelNamePlural: 'birds',
      leftProperty: 'photoFilename',
      leftType: 'image',
      rightProperty: 'commonName',
      rightType: 'text'
    };
    let mockDomainObjects = (<any>jsonDomainObjects);
    let service = TestBed.get(ApiService);
    let httpTestingController = TestBed.get(HttpTestingController);
    fixture.detectChanges();
    const req = httpTestingController.expectOne(req => req.method === 'GET'
      && req.url === service.url() + 'birds'
      && req.params.get('random') === 5);
    expect(req.request.method).toEqual('GET');
    req.flush(mockDomainObjects);
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.get(HttpTestingController).verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
