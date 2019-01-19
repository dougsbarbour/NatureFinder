import {BirdListComponent} from './bird-list.component';
import {
  executeCommonSearchTests,
  setupBeforeAndAfter,
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockOrganisms.json';

describe('BirdListComponent', () => {

  setupBeforeAndAfter('birds', BirdListComponent, () => {
    let mockDomainObjects = (<any>jsonDomainObjects);
    mockDomainObjects.data[0].attributes.size = 'Large';
    return(mockDomainObjects);
  });

  executeCommonSearchTests();
});
