import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganismHeadingComponent} from './organism-heading.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ActivatedRouteStub} from "../../test/helpers/activated-route-stub";
import {ApiService} from "../services/api.service";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('OrganismHeadingComponent', () => {
  let component: OrganismHeadingComponent;
  let fixture: ComponentFixture<OrganismHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [OrganismHeadingComponent],
      providers: [
        ApiService,
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(OrganismHeadingComponent);
    component = fixture.componentInstance;
    component.input = {specRow: {columnHeadings: [], columnWidths: []}, dataRow: {}};
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
