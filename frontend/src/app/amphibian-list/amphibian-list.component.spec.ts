import {async, TestBed} from '@angular/core/testing';
import {AmphibianListComponent} from './amphibian-list.component';
import {HttpTestingController} from '@angular/common/http/testing';
import {
  fixture, imports,
  initializeComponent,
  setFixture,
  shouldHaveAllFieldValues, shouldHaveAllHeadingValues,
  standardDeclarations
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockAmphibians.json';

let mockDomainObjects = (<any>jsonDomainObjects);

describe('AmphibianListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: imports('amphibians', AmphibianListComponent),
      declarations: [AmphibianListComponent].concat(standardDeclarations)
    })
      .compileComponents();
    setFixture(TestBed.createComponent(AmphibianListComponent));
    initializeComponent('amphibians', fixture.componentInstance, mockDomainObjects);
  }));
  afterEach(() => {
    TestBed.get(HttpTestingController).verify();
  });
  it('should have all heading values', () => {
    shouldHaveAllHeadingValues();
  });
  it('should have all field values', () => {
    shouldHaveAllFieldValues(mockDomainObjects);
  });
});
