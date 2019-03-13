import {} from 'jasmine';
import {async, ComponentFixture, fakeAsync, TestBed} from "@angular/core/testing";
import {DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {advance, click, newEvent} from "./testHelpers";
import {RouterLinkDirectiveStub} from "./router-link-directive-stub";
import {QueryParamsDirectiveStub} from "./query-params-directive-stub";
import {ApiService} from "../../app/services/api.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {OrganismSearchComponent} from "../../app/organism-search/organism-search.component";
import * as jsonConfig from '../mocks/mockConfig.json';
import {ActivatedRouteStub} from "./activated-route-stub";

let mockConfig = (<any>jsonConfig);

export let fixture: ComponentFixture<any>;
let linkDes: DebugElement[];
let routerLinks;
let paramsDes: DebugElement[];
let queryParams;

export function setFixture(arg) {
  fixture = arg
}

export function initializeComponent(component) {
  let service = TestBed.get(ApiService);
  let httpTestingController = TestBed.get(HttpTestingController);
  fixture.detectChanges();
  const req = httpTestingController.expectOne(service.url() + 'config');
  expect(req.request.method).toEqual('GET');
  req.flush(mockConfig);
  expect(component).toBeTruthy();
  fixture.detectChanges();
  linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = linkDes.map(de => ({
    stub: de.injector.get(RouterLinkDirectiveStub),
    text: de.nativeElement.textContent.trim().toLowerCase()
  }));
  paramsDes = fixture.debugElement.queryAll(By.directive(QueryParamsDirectiveStub));
  queryParams = paramsDes.map(de => ({
    stub: de.injector.get(QueryParamsDirectiveStub),
    text: de.nativeElement.textContent.trim().toLowerCase()
  }));
}

export function setupBeforeAndAfter(componentClass) {
  beforeEach(async(() => {
    let component;
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
      declarations: [componentClass, OrganismSearchComponent,
        RouterLinkDirectiveStub, QueryParamsDirectiveStub],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(componentClass);
    component = fixture.componentInstance;
    initializeComponent(component);
  }));
  afterEach(() => {
    TestBed.get(HttpTestingController).verify();
  });
}
export function testButtonPresence(buttonLabels) {
  fixture.whenStable().then(() => {
    let btns = fixture.debugElement.queryAll(By.css('.btn'))
      .map(each => each.nativeElement.textContent.trim().toLowerCase());
    buttonLabels.map(each => each.toLowerCase()).forEach(each => {
      expect(btns).toContain(each);
    })
  })
}

export function testButtonPress(modelNamePlural, labelText, expectedQueryParams) {
  const link = routerLinks.find(each => each.text == labelText.toLowerCase());
  expect(link).toBeDefined();
  const linkDe = linkDes[routerLinks.indexOf(link)];
  const params = queryParams.find(each => each.text == labelText.toLowerCase());
  expect(params).toBeDefined();
  const paramsDe = paramsDes[queryParams.indexOf(params)];

  expect(link.stub.navigatedTo).toBeNull('should not have navigated yet');
  expect(params.stub.navigatedTo).toBeNull('should not have navigated yet');

  linkDe.triggerEventHandler('click', null);
  paramsDe.triggerEventHandler('click', null);
  fixture.detectChanges();

  expect(link.stub.navigatedTo).toEqual([`/${modelNamePlural}`]);
  expect(params.stub.navigatedTo).toEqual(expectedQueryParams);
}

export function testFormSubmission(modelNamePlural, inputString, fieldId, submitButtonId, expectedQueryParams) {
  let router = fixture.debugElement.injector.get(Router);
  let field = fixture.debugElement.query(By.css(fieldId));
  expect(field).not.toEqual(null);
  let submitButton = fixture.debugElement.query(By.css(submitButtonId));
  expect(submitButton).not.toEqual(null);

  advance(fixture);
  field.nativeElement.value = inputString;
  field.nativeElement.dispatchEvent(newEvent('input'));
  advance(fixture);
  click(submitButton.nativeElement);
  advance(fixture);
  const spy = router.navigate as jasmine.Spy;
  const navArgs = spy.calls.first().args;

  expect(navArgs[0]).toEqual([`/${modelNamePlural}`]);
  expect(navArgs[1]).toEqual({queryParams: expectedQueryParams});
}

export function executeCommonSearchTests(modelName, modelNamePlural, extraRouterLinks = 0) {
  it('can get RouterLinks from template', () => {
    let numRouterLinks = extraRouterLinks + 1 + mockConfig.data.attributes.allHabitats[modelName].length +
      mockConfig.data.attributes.allColors[modelName].length + (mockConfig.data.attributes.allSeasons[modelName].length);
    expect(routerLinks.length)
      .toBe(numRouterLinks, `should have ${numRouterLinks} routerLinks`);
    expect(routerLinks[0].stub.linkParams).toEqual([`/${modelNamePlural}`]);
  });
  it('should have top level buttons', async(() => {
    let topButtonLabels = ['Show All', 'Search By Prominent Color', 'Search By Habitat',
      'Search By Common Name', 'Search By Season'];
    testButtonPresence(topButtonLabels);
  }));
  it('should have all color buttons', async(() => {
    let colorButtonLabels = mockConfig.data.attributes.allColors[modelName];
    testButtonPresence(colorButtonLabels);
  }));
  it('should have all habitat buttons', async(() => {
    let habitatButtonLabels = mockConfig.data.attributes.allHabitats[modelName]
      .map(each => `find ${modelNamePlural} in a ${each} habitat`);
    testButtonPresence(habitatButtonLabels);
  }));
  it('can navigate to Show All', () => {
    testButtonPress(modelNamePlural, 'show all', {sortBy: 'common_name'});
  });
  it('can navigate to search by habitat', () => {
    let habitat = mockConfig.data.attributes.allHabitats[modelName][0];
    let label = `find ${modelNamePlural} in a ${habitat} habitat`;
    testButtonPress(modelNamePlural, label, {sortBy: 'common_name', habitat: habitat});
  });
  it('can navigate to search by color', () => {
    let color = mockConfig.data.attributes.allColors[modelName][0];
    testButtonPress(modelNamePlural, color, {sortBy: 'common_name', color: color});
  });
  it('can navigate to search by season', () => {
    let season = mockConfig.data.attributes.allSeasons[modelName][0];
    testButtonPress(modelNamePlural, season,
      {sortBy: 'common_name', season: season});
  });
  it('can navigate to search by common name', fakeAsync(() => {
    let inputString = 'A String';
    testFormSubmission(modelNamePlural, inputString, '#commonNameField', '#commonNameSubmit',
      {sortBy: 'common_name', commonName: inputString});
  }));
}
