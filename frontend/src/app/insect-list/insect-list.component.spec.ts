import { InsectListComponent } from './insect-list.component';
import {
  executeCommonSearchTests,
  setupBeforeAndAfter,
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockOrganisms.json';

let mockDomainObjects = (<any>jsonDomainObjects);

describe('InsectListComponent', () => {

  setupBeforeAndAfter('insects', InsectListComponent,  () => {
    let mockDomainObjects = (<any>jsonDomainObjects);
    return (mockDomainObjects);
  });

  executeCommonSearchTests();
});
