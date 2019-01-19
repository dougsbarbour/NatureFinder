import {MammalListComponent} from './mammal-list.component';
import {
  executeCommonSearchTests,
  setupBeforeAndAfter,
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockOrganisms.json';

let mockDomainObjects = (<any>jsonDomainObjects);

describe('MammalListComponent', () => {

  setupBeforeAndAfter('mammals', MammalListComponent,  () => {
    let mockDomainObjects = (<any>jsonDomainObjects);
    return (mockDomainObjects);
  });

  executeCommonSearchTests();
});
