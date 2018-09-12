import {async, TestBed} from '@angular/core/testing';
import {BirdListComponent} from './bird-list.component';
import {HttpTestingController} from '@angular/common/http/testing';
import {
  fixture, imports,
  initializeComponent,
  setFixture,
  shouldHaveAllFieldValues, shouldHaveAllHeadingValues,
  standardDeclarations
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockBirds.json';

let mockDomainObjects = (<any>jsonDomainObjects);

describe('BirdListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: imports('birds', BirdListComponent),
      declarations: [BirdListComponent].concat(standardDeclarations)
    })
      .compileComponents();
    setFixture(TestBed.createComponent(BirdListComponent));
    initializeComponent('birds', fixture.componentInstance, mockDomainObjects);
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
