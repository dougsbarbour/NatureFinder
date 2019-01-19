import {ReptileListComponent} from './reptile-list.component';
import {
  executeCommonSearchTests,
  setupBeforeAndAfter,
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockOrganisms.json';

let mockDomainObjects = (<any>jsonDomainObjects);

describe('ReptileListComponent', () => {

  setupBeforeAndAfter('reptiles', ReptileListComponent,  () => {
    let mockDomainObjects = (<any>jsonDomainObjects);
    return (mockDomainObjects);
  });

  executeCommonSearchTests();
});
