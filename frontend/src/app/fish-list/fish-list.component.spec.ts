import {FishListComponent} from './fish-list.component';
import {
  executeCommonSearchTests,
  setupBeforeAndAfter,
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockOrganisms.json';

describe('FishListComponent', () => {

  setupBeforeAndAfter('fish', FishListComponent,  () => {
    let mockDomainObjects = (<any>jsonDomainObjects);
    mockDomainObjects.data[0].attributes.size = '5 inches';
    return(mockDomainObjects);
  });

  executeCommonSearchTests();
});
