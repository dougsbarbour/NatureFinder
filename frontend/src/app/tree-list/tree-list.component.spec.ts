import {async, TestBed} from '@angular/core/testing';
import {TreeListComponent} from './tree-list.component';
import {HttpTestingController} from '@angular/common/http/testing';
import {
  component,
  fixture, imports,
  initializeComponent,
  setFixture,
  shouldHaveAllFieldValues, shouldHaveAllHeadingValues,
  standardDeclarations
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockTrees.json';
import {flatten} from "../dsb-utils";
import {By} from "@angular/platform-browser";
import {Tree} from "../models/tree";

let mockDomainObjects = (<any>jsonDomainObjects);

describe('TreeListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: imports('trees', TreeListComponent),
      declarations: [TreeListComponent].concat(standardDeclarations)
    })
      .compileComponents();
    setFixture(TestBed.createComponent(TreeListComponent));
    initializeComponent('trees', fixture.componentInstance, mockDomainObjects);
  }));
  afterEach(() => {
    TestBed.get(HttpTestingController).verify();
  });
  it('should have all heading values', () => {
    shouldHaveAllHeadingValues();
  });
  it('should have all field values', () => {
    let columns = ['commonName', 'genus'];
    columns.forEach(each => {
      let fieldValue = fixture.debugElement.query(By.css(`#${each}${mockDomainObjects[0].id}`))
        .nativeElement.textContent.trim();
      expect(fieldValue).toEqual(mockDomainObjects[0][each]);
    });
    let icons = [['treeType', 'iconForTreeType'], ['leafPosition', 'iconForLeafPosition'],
      ['leafStructure', 'iconForLeafStructure'], ['leafType', 'iconForLeafType']];
    icons.forEach(each => {
      let srcValue = fixture.debugElement.query(By.css(`#${each[0]}${mockDomainObjects[0].id}`))
        .nativeElement.src;
      expect(srcValue).toContain(mockDomainObjects.map(each => new Tree(each))[0][each[1]]());
    });
  });
});
