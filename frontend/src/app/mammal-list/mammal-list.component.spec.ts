import {async, TestBed} from '@angular/core/testing';
import {MammalListComponent} from './mammal-list.component';
import {HttpTestingController} from '@angular/common/http/testing';
import {
  fixture, imports,
  initializeComponent,
  setFixture,
  shouldHaveAllFieldValues, shouldHaveAllHeadingValues,
  standardDeclarations
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockMammals.json';

let mockDomainObjects = (<any>jsonDomainObjects);

describe('MammalListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: imports('mammals', MammalListComponent),
      declarations: [MammalListComponent].concat(standardDeclarations)
    })
      .compileComponents();
    setFixture(TestBed.createComponent(MammalListComponent));
    initializeComponent('mammals', fixture.componentInstance, mockDomainObjects);
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
