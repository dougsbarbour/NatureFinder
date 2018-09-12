import {} from 'jasmine';
import {ComponentFixture, TestBed} from "@angular/core/testing";
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
import {RouterTestingModule} from "@angular/router/testing";

export let standardDeclarations: any[] = [OrganismRowComponent, OrganismHeadingComponent, ScrollIntoViewDirective];
export let fixture: ComponentFixture<any>;
export let component: OrganismListComponent;

export function imports(path, componentClass) {
  return ([HttpClientModule, HttpClientTestingModule,
    RouterTestingModule.withRoutes(
      [{path: path, component: componentClass}
      ]
    )
  ]);
}

export function setFixture(arg) {
  fixture = arg
}

export function initializeComponent(path, argComponent, mocksArray) {
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

export function shouldHaveAllFieldValues(mocksArray) {
  let columns = flatten(component.columns)
    .filter(each => each != '@break@');
  columns.forEach(each => {
    let fieldValue = fixture.debugElement.query(By.css(`#${each}${mocksArray[0].id}`))
      .nativeElement.textContent.trim();
    expect(fieldValue).toEqual(mocksArray[0][each]);
  })
}
