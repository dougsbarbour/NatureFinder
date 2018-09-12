import {TestBed, inject} from '@angular/core/testing';
import {SharingService} from './sharing.service';
import {Router} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SharingService', () => {
  beforeEach(() => {
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [SharingService,
        {provide: Router, useValue: routerSpy}
      ]
    });
  });

  it('should be created', inject([SharingService], (service: SharingService) => {
    expect(service).toBeTruthy();
  }));
});
