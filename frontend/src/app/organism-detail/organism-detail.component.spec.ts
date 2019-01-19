import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganismDetailComponent } from './organism-detail.component';
import * as jsonDomainObjects from '../../test/mocks/mockOrganisms.json';
import {By} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Organism} from "../models/organism";
import {SharingService} from "../services/sharing.service";

let refMap = (new SharingService(undefined)).getIncludedMap((<any>jsonDomainObjects).included);
let mockDomainObjects = (<any>jsonDomainObjects).data.map(each => new Organism(each, refMap));

describe('OrganismDetailComponent', () => {
  let component: OrganismDetailComponent;
  let fixture: ComponentFixture<OrganismDetailComponent>;
  let domainObject;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [ OrganismDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismDetailComponent);
    component = fixture.componentInstance;
    domainObject = mockDomainObjects[0];
    component.model = domainObject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.fieldKeys().forEach (key => {
      let field = fixture.debugElement.query(By.css(`#${key}`));
      expect(field).not.toEqual(null);
      expect(field.nativeElement.innerText).toEqual(domainObject[key].toString());
    });

  });
});
