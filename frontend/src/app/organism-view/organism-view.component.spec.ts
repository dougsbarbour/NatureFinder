import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OrganismViewComponent} from './organism-view.component';
import {OrganismDetailComponent} from "../organism-detail/organism-detail.component";
import {OrganismNavigationComponent} from "../organism-navigation/organism-navigation.component";
import {ActivatedRouteStub} from "../../test/helpers/activated-route-stub";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SharingService} from "../services/sharing.service";
import {ApiService} from "../services/api.service";
import {Organism} from "../models/organism";

describe('OrganismViewComponent', () => {
  let component: OrganismViewComponent;
  let fixture: ComponentFixture<OrganismViewComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [
        OrganismViewComponent, OrganismDetailComponent, OrganismNavigationComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        SharingService, ApiService,
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismViewComponent);
    component = fixture.componentInstance;
    component.domainClass = Organism;
    activatedRoute = <any>fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.params = {id: '1'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
