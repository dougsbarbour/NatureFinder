import {} from 'jasmine';
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ApiService} from "../../app/services/api.service";
import {HttpClient} from "@angular/common/http";
import {HttpTestingController} from "@angular/common/http/testing";
import {OrganismListComponent} from "../../app/organism-list/organism-list.component";
import {flatten} from "../../app/dsb-utils";
import {By} from "@angular/platform-browser";
import {OrganismRowComponent} from "../../app/organism-row/organism-row.component";
import {OrganismHeadingComponent} from "../../app/organism-heading/organism-heading.component";
import {ScrollIntoViewDirective} from "../../app/directives/scroll-into-view.directive";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {SharingService} from "../../app/services/sharing.service";

export let fixture: ComponentFixture<any>;
let component: OrganismListComponent;
let routerNavigateSpy;
let shared: SharingService = new SharingService(undefined);

let initializeComponent = function (path, argComponent, mocksArray) {
  component = argComponent;
  let httpClient = TestBed.get(HttpClient);
  let httpTestingController = TestBed.get(HttpTestingController);
  let service = TestBed.get(ApiService);
  fixture.detectChanges();
  const req = httpTestingController.expectOne(service.url() + path);
  expect(req.request.method).toEqual('GET');
  req.flush(mocksArray);
  expect(component).toBeTruthy();
  fixture.detectChanges();
};

export function setupBeforeAndAfter(modelNamePlural, componentClass, mocksFunction) {
  beforeEach(function () {
    this.mocksArray = mocksFunction();
  });
  beforeEach(async(function () {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [
            {path: modelNamePlural, component: componentClass}
          ])
      ],
      declarations: [componentClass, OrganismRowComponent, OrganismHeadingComponent, ScrollIntoViewDirective],
    })
      .compileComponents();
    fixture = TestBed.createComponent(componentClass);
    initializeComponent(modelNamePlural, fixture.componentInstance, this.mocksArray);
    fixture.detectChanges();

    routerNavigateSpy = spyOn(TestBed.get(Router), 'navigate').and.callThrough();
  }));
  afterEach(() => {
    TestBed.get(HttpTestingController).verify();
  });
}

export function executeCommonSearchTests() {
  it('should have all heading values', () => {
    shouldHaveAllHeadingValues();
  });
  it('should have all field values', function() {
    shouldHaveAllFieldValues(this.mocksArray);
  });
  it('should sort on column headings', () => {
    shouldSortOnAllHeadings();
  });
}

export function shouldHaveAllHeadingValues() {
  let columns = flatten(component.columnHeadings)
    .filter(each => each != '@break@' && each != '');
  columns.forEach(each => {
    let fieldValue = fixture.debugElement
      .query(By.css(`#${each.toLowerCase().split(' ').join('')}`))
      .nativeElement.textContent.trim();
    expect(fieldValue).toEqual(each);
  })
}

export function shouldSortOnAllHeadings() {
  let columns = flatten(component.columnHeadings)
    .filter(each => each != '@break@' && each != '');
  columns.forEach(each => {
    fixture.debugElement
      .query(By.css(`#${each.toLowerCase().split(' ').join('')}`))
      .nativeElement.click();
    let headingId = each.toLowerCase().split(' ').join('_');
    if (shared.availableSortByKeys[component.modelName].includes(headingId)) {
      expect(routerNavigateSpy.calls.mostRecent().args[1].queryParams)
        .toEqual({sortBy: headingId});
    }
  })
}

export function shouldHaveAllFieldValues(mocksArray) {
  let columns = flatten(component.columns)
    .filter(each => each != '@break@');
  columns.forEach(each => {
    let fieldValue = fixture.debugElement.query(By.css(`#${each}${mocksArray.data[0].id}`))
      .nativeElement.textContent.trim();
    expect(fieldValue).toEqual(mocksArray.data[0].attributes[each]);
  })
}
