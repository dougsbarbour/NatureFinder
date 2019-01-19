import {AmphibianListComponent} from './amphibian-list.component';
import {
  executeCommonSearchTests,
  setupBeforeAndAfter,
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockOrganisms.json';

let mockDomainObjects = (<any>jsonDomainObjects);

describe('AmphibianListComponent', () => {

  setupBeforeAndAfter('amphibians', AmphibianListComponent, () => {
    let mockDomainObjects = (<any>jsonDomainObjects);
    return (mockDomainObjects);
  });

  executeCommonSearchTests();
});
