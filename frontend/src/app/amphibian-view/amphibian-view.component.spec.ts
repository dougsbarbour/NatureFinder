import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AmphibianViewComponent} from './amphibian-view.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRouteStub} from "../../test/helpers/activated-route-stub";

describe('AmphibianViewComponent', () => {
  let component: AmphibianViewComponent;
  let fixture: ComponentFixture<AmphibianViewComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [AmphibianViewComponent],
      providers: [SharingService,
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmphibianViewComponent);
    component = fixture.componentInstance;
    activatedRoute = <any>fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.params = { id: '1'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
