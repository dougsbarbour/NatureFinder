import {} from 'jasmine';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {advance, click, newEvent} from "./testHelpers";
import {RouterLinkDirectiveStub} from "./router-link-directive-stub";
import {QueryParamsDirectiveStub} from "./query-params-directive-stub";
import {ApiService} from "../../app/services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import * as jsonConfig from '../mocks/mockConfig.json';
let mockConfig = (<any>jsonConfig);

export let fixture: ComponentFixture<any>;
export let linkDes: DebugElement[];
export let routerLinks;
export let paramsDes: DebugElement[];
export let queryParams;

export function setFixture(arg) {
  fixture = arg
}

export function setLinkDes(arg) {
  linkDes = arg
}

export function setRouterLinks(arg) {
  routerLinks = arg
}

export function setParamsDes(arg) {
  paramsDes = arg
}

export function setQueryParams(arg) {
  queryParams = arg
}

export function initializeComponent(component) {
  let service = TestBed.get(ApiService);
  let httpTestingController = TestBed.get(HttpTestingController);
  fixture.detectChanges();
  const req = httpTestingController.expectOne(service.url() + 'config');
  expect(req.request.method).toEqual('GET');
  req.flush(mockConfig);
  expect(component).toBeTruthy();
  fixture.detectChanges();
  linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = linkDes.map(de => ({
    stub: de.injector.get(RouterLinkDirectiveStub),
    text: de.nativeElement.textContent.trim().toLowerCase()
  }));
  paramsDes = fixture.debugElement.queryAll(By.directive(QueryParamsDirectiveStub));
  queryParams = paramsDes.map(de => ({
    stub: de.injector.get(QueryParamsDirectiveStub),
    text: de.nativeElement.textContent.trim().toLowerCase()
  }));
}

export function testButtonPresence(buttonLabels) {
  fixture.whenStable().then(() => {
    let btns = fixture.debugElement.queryAll(By.css('.btn'))
      .map(each => each.nativeElement.textContent.trim().toLowerCase());
    buttonLabels.map(each => each.toLowerCase()).forEach(each => {
      expect(btns).toContain(each);
    })
  })
}

export function testButtonPress(modelNamePlural, labelText, expectedQueryParams) {
  const link = routerLinks.find(each => each.text == labelText.toLowerCase());
  expect(link).toBeDefined();
  const linkDe = linkDes[routerLinks.indexOf(link)];
  const params = queryParams.find(each => each.text == labelText.toLowerCase());
  expect(params).toBeDefined();
  const paramsDe = paramsDes[queryParams.indexOf(params)];

  expect(link.stub.navigatedTo).toBeNull('should not have navigated yet');
  expect(params.stub.navigatedTo).toBeNull('should not have navigated yet');

  linkDe.triggerEventHandler('click', null);
  paramsDe.triggerEventHandler('click', null);
  fixture.detectChanges();

  expect(link.stub.navigatedTo).toEqual([`/${modelNamePlural}`]);
  expect(params.stub.navigatedTo).toEqual(expectedQueryParams);
}

export function testFormSubmission(modelNamePlural, inputString, fieldId, submitButtonId, expectedQueryParams) {
  let router = fixture.debugElement.injector.get(Router);
  let field = fixture.debugElement.query(By.css(fieldId));
  expect(field).not.toEqual(null);
  let submitButton = fixture.debugElement.query(By.css(submitButtonId));
  expect(submitButton).not.toEqual(null);

  advance(fixture);
  field.nativeElement.value = inputString;
  field.nativeElement.dispatchEvent(newEvent('input'));
  advance(fixture);
  click(submitButton.nativeElement);
  advance(fixture);
  const spy = router.navigate as jasmine.Spy;
  const navArgs = spy.calls.first().args;

  expect(navArgs[0]).toEqual([`/${modelNamePlural}`]);
  expect(navArgs[1]).toEqual({queryParams: expectedQueryParams});
}
