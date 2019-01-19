import {async} from '@angular/core/testing';
import {
  testButtonPresence, testButtonPress, setupBeforeAndAfter, executeCommonSearchTests
}
  from "../../test/helpers/searchTestHelpers";
import {TreeSearchComponent} from "./tree-search.component";

describe('TreeSearchComponent', () => {
  let modelName = 'tree';
  let modelNamePlural = 'trees';

  setupBeforeAndAfter(TreeSearchComponent);

  executeCommonSearchTests(modelName, modelNamePlural, 8);

  it('should have search by tree attributes button', async(() => {
    let topButtonLabels = ['Search By Tree Attributes'];
    testButtonPresence(topButtonLabels);
  }));
  it('can navigate to search by tree attribute', () => {
    testButtonPress(modelNamePlural, 'deciduous', {sortBy: 'common_name', treeType: 'd'});
    testButtonPress(modelNamePlural, 'evergreen', {sortBy: 'common_name', treeType: 'e'});
    testButtonPress(modelNamePlural, 'opposite', {sortBy: 'common_name', leafPosition: 'o'});
    testButtonPress(modelNamePlural, 'alternate', {sortBy: 'common_name', leafPosition: 'a'});
    testButtonPress(modelNamePlural, 'simple', {sortBy: 'common_name', leafStructure: 's'});
    testButtonPress(modelNamePlural, 'compound', {sortBy: 'common_name', leafStructure: 'c'});
    testButtonPress(modelNamePlural, 'broad leaf', {sortBy: 'common_name', leafType: 'b'});
    testButtonPress(modelNamePlural, 'needle', {sortBy: 'common_name', leafType: 'n'});
  });
});
