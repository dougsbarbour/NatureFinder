import {async, TestBed} from '@angular/core/testing';
import {FishListComponent} from './fish-list.component';
import {HttpTestingController} from '@angular/common/http/testing';
import {
  fixture, imports,
  initializeComponent,
  setFixture,
  shouldHaveAllFieldValues, shouldHaveAllHeadingValues,
  standardDeclarations
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockFish.json';

let mockDomainObjects = (<any>jsonDomainObjects);

describe('FishListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: imports('fish', FishListComponent),
      declarations: [FishListComponent].concat(standardDeclarations)
    })
      .compileComponents();
    setFixture(TestBed.createComponent(FishListComponent));
    initializeComponent('fish', fixture.componentInstance, mockDomainObjects);
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
