import {FlowerListComponent} from './flower-list.component';
import {
  executeCommonSearchTests,
  setupBeforeAndAfter,
} from "../../test/helpers/listTestHelpers";
import * as jsonDomainObjects from '../../test/mocks/mockOrganisms.json';

let mockDomainObjects = (<any>jsonDomainObjects);

describe('FlowerListComponent', () => {

  setupBeforeAndAfter('flowers', FlowerListComponent,  () => {
    let mockDomainObjects = (<any>jsonDomainObjects);
    return (mockDomainObjects);
  });

  executeCommonSearchTests();
});
