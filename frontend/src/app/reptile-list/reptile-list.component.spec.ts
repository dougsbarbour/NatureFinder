import {async, TestBed} from '@angular/core/testing';
import {ReptileListComponent} from './reptile-list.component';
import {HttpTestingController} from '@angular/common/http/testing';
import {
  fixture, imports,
  initializeComponent,
  setFixture,
  shouldHaveAllFieldValues, shouldHaveAllHeadingValues,
  standardDeclarations
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockReptiles.json';

let mockDomainObjects = (<any>jsonDomainObjects);

describe('ReptileListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: imports('reptiles', ReptileListComponent),
      declarations: [ReptileListComponent].concat(standardDeclarations)
    })
      .compileComponents();
    setFixture(TestBed.createComponent(ReptileListComponent));
    initializeComponent('reptiles', fixture.componentInstance, mockDomainObjects);
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
