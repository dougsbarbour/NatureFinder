import {async, fakeAsync, TestBed} from '@angular/core/testing';
import {ApiService} from "../services/api.service";
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterLinkDirectiveStub} from "../../test/helpers/router-link-directive-stub";
import {QueryParamsDirectiveStub} from "../../test/helpers/query-params-directive-stub";
import {Router} from "@angular/router";
import {
  fixture, routerLinks, setFixture, initializeComponent,
  testButtonPresence, testButtonPress, testFormSubmission
}
  from "../../test/helpers/searchTestHelpers";
import {MammalSearchComponent} from "./mammal-search.component";
import {OrganismSearchComponent} from "../organism-search/organism-search.component";
import * as jsonConfig from '../../test/mocks/mockConfig.json';
let mockConfig = (<any>jsonConfig);

describe('MammalSearchComponent', () => {
  let component;
  let modelName = 'mammal';
  let modelNamePlural = 'mammals';

  beforeEach(async(() => {
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        ApiService,
        {provide: Router, useValue: routerSpy}
      ],
      declarations: [MammalSearchComponent, OrganismSearchComponent,
        RouterLinkDirectiveStub, QueryParamsDirectiveStub],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    setFixture(TestBed.createComponent(MammalSearchComponent));
    component = fixture.componentInstance;
    initializeComponent(component);
  }));
  afterEach(() => {
    TestBed.get(HttpTestingController).verify();
  });

  it('can get RouterLinks from template', () => {
    let numRouterLinks = 1 + 26 + mockConfig.allHabitats[modelName].length +
      mockConfig.allColors[modelName].length;
    expect(routerLinks.length)
      .toBe(numRouterLinks, `should have ${numRouterLinks} routerLinks`);
    expect(routerLinks[0].stub.linkParams).toEqual([`/${modelName}s`]);
  });

  it('should have top level buttons', async(() => {
    let topButtonLabels = ['Show All', 'Search By Prominent Color', 'Search By Habitat',
      'Search By Letter of Alphabet', 'Search By Common Name', 'Search By Species', 'Search By Genus',
      'Search By Family'];
    testButtonPresence(topButtonLabels);
  }));

  it('should have all color buttons', async(() => {
    let colorButtonLabels = mockConfig.allColors[modelName];
    testButtonPresence(colorButtonLabels);
  }));

  it('should have all habitat buttons', async(() => {
    let habitatButtonLabels = mockConfig.allHabitats[modelName]
      .map(each => `find ${modelName}s in a ${each} habitat`);
    testButtonPresence(habitatButtonLabels);
  }));

  it('can navigate to Show All', () => {
    testButtonPress(modelNamePlural, 'show all', {sortBy: 'commonName'});
  });
  it('can navigate to search by habitat', () => {
    let habitat = mockConfig.allHabitats[modelName][0];
    let label = `find ${modelName}s in a ${habitat} habitat`;
    testButtonPress(modelNamePlural, label, {sortBy: 'commonName', habitat: habitat});
  });
  it('can navigate to search by color', () => {
    let color = mockConfig.allColors[modelName][0];
    testButtonPress(modelNamePlural, color, {sortBy: 'commonName', color: color});
  });
  it('can navigate to search by letter', () => {
    testButtonPress(modelNamePlural, 'a', {sortBy: 'commonName', commonNameWordStarting: 'a'});
  });

  it('can navigate to search by common name', fakeAsync(() => {
    let inputString = 'A String';
    testFormSubmission(modelNamePlural, inputString, '#commonNameField', '#commonNameSubmit',
      {sortBy: 'commonName', commonName: inputString});
  }));

  it('can navigate to search by species', fakeAsync(() => {
    let inputString = 'A String';
    testFormSubmission(modelNamePlural, inputString, '#speciesField', '#speciesSubmit',
      {sortBy: 'commonName', species: inputString});
  }));

  it('can navigate to search by genus', fakeAsync(() => {
    let inputString = 'A String';
    testFormSubmission(modelNamePlural, inputString, '#genusField', '#genusSubmit',
      {sortBy: 'commonName', genus: inputString});
  }));

  it('can navigate to search by family', fakeAsync(() => {
    let inputString = 'A String';
    testFormSubmission(modelNamePlural, inputString, '#familyField', '#familySubmit',
      {sortBy: 'commonName', family: inputString});
  }));

});
