import {TreeListComponent} from './tree-list.component';
import {
  fixture,
  setupBeforeAndAfter,
  shouldHaveAllHeadingValues,
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockOrganisms.json';
import {By} from "@angular/platform-browser";
import {Tree} from "../models/tree";
import {SharingService} from "../services/sharing.service";

describe('TreeListComponent', () => {

  setupBeforeAndAfter('trees', TreeListComponent,  () => {
    let mockDomainObjects = (<any>jsonDomainObjects);
    mockDomainObjects.data[0].attributes.treeType = 'd';
    mockDomainObjects.data[0].attributes.leafPosition = 'o';
    mockDomainObjects.data[0].attributes.leafStructure = 's';
    mockDomainObjects.data[0].attributes.leafType = 'b';
    return (mockDomainObjects);
  });

  it('should have all heading values', () => {
    shouldHaveAllHeadingValues();
  });
  it('should have all field values', function() {
    let columns = ['commonName', 'scientificName'];
    let refMap = (new SharingService(undefined)).getIncludedMap(this.mocksArray.included);
    columns.forEach(each => {
      let fieldValue = fixture.debugElement.query(By.css(`#${each}${this.mocksArray.data[0].id}`))
        .nativeElement.textContent.trim();
      expect(fieldValue).toEqual(this.mocksArray.data[0].attributes[each]);
    });
    let icons = [['treeType', 'iconForTreeType'], ['leafPosition', 'iconForLeafPosition'],
      ['leafStructure', 'iconForLeafStructure'], ['leafType', 'iconForLeafType']];
    icons.forEach(each => {
      let srcValue = fixture.debugElement.query(By.css(`#${each[0]}${this.mocksArray.data[0].id}`))
        .nativeElement.src;
      expect(srcValue).toContain(this.mocksArray.data.map(each => new Tree(each,refMap))[0][each[1]]());
    });
  });
});
