import {executeCommonSearchTests, initializeComponent, setupBeforeAndAfter} from "../../test/helpers/searchTestHelpers";
import {OrganismSearchComponent} from "./organism-search.component";
import {async, TestBed} from "@angular/core/testing";
import {Component, NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterLinkDirectiveStub} from "../../test/helpers/router-link-directive-stub";
import {QueryParamsDirectiveStub} from "../../test/helpers/query-params-directive-stub";
import {fixture, setFixture} from "../../test/helpers/searchTestHelpers";
import {ActivatedRouteStub} from "../../test/helpers/activated-route-stub";

describe('OrganismSearchComponent', () => {
  let testHost;
  let modelName = 'organism';
  let modelNamePlural = 'organisms';

  beforeEach(async(() => {
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    @Component({
      template: `
        <app-organism-search
          [modelName]="'organism'">
        </app-organism-search>`
    })
    class TestHostComponent {
    }

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
      declarations: [OrganismSearchComponent, TestHostComponent,
        RouterLinkDirectiveStub, QueryParamsDirectiveStub],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    setFixture(TestBed.createComponent(TestHostComponent));
    testHost = fixture.componentInstance;
    initializeComponent(testHost);
  }));
  afterEach(() => {
    TestBed.get(HttpTestingController).verify();
  });

  executeCommonSearchTests(modelName, modelNamePlural);

});
