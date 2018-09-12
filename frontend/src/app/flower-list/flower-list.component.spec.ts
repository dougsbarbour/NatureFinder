import {async, TestBed} from '@angular/core/testing';
import {FlowerListComponent} from './flower-list.component';
import {HttpTestingController} from '@angular/common/http/testing';
import {
  fixture, imports,
  initializeComponent,
  setFixture,
  shouldHaveAllFieldValues, shouldHaveAllHeadingValues,
  standardDeclarations
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockFlowers.json';

let mockDomainObjects = (<any>jsonDomainObjects);

describe('FlowerListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: imports('flowers', FlowerListComponent),
      declarations: [FlowerListComponent].concat(standardDeclarations)
    })
      .compileComponents();
    setFixture(TestBed.createComponent(FlowerListComponent));
    initializeComponent('flowers', fixture.componentInstance, mockDomainObjects);
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
