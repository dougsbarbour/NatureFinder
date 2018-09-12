import { TestBed, inject } from '@angular/core/testing';

import { CSVService } from './csv.service';

describe('CSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CSVService]
    });
  });

  it('should be created', inject([CSVService], (service: CSVService) => {
    expect(service).toBeTruthy();
  }));
});
