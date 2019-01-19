import {
  testButtonPress,
  setupBeforeAndAfter,
  executeCommonSearchTests,
  testButtonPresence
} from "../../test/helpers/searchTestHelpers";
import {BirdSearchComponent} from "./bird-search.component";
import * as jsonConfig from '../../test/mocks/mockConfig.json';
import {async} from "@angular/core/testing";

let mockConfig = (<any>jsonConfig);

describe('BirdSearchComponent', () => {
  let modelName = 'bird';
  let modelNamePlural = 'birds';

  setupBeforeAndAfter(BirdSearchComponent);

  executeCommonSearchTests(modelName, modelNamePlural, 3);

  it('should have search by size button', async(() => {
    let topButtonLabels = ['Search By Size'];
    testButtonPresence(topButtonLabels);
  }));
  it('can navigate to search by size', () => {
    let size = mockConfig.data.attributes.allSizes[modelName][0];
    testButtonPress(modelNamePlural, size.displayValue,
      {sortBy: 'common_name', size: size.queryValue});
  });
});
