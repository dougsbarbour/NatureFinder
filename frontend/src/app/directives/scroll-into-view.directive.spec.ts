import {ScrollIntoViewDirective} from './scroll-into-view.directive';
import {ElementRef} from "@angular/core";
import {async, fakeAsync, tick} from "@angular/core/testing";
import {ActivatedRouteStub} from "../../test/helpers/activated-route-stub";

describe('ScrollIntoViewDirective', () => {
  let directive;
  let elementRef: ElementRef;
  let acRouteStub = new ActivatedRouteStub;
  acRouteStub.params = {id: '1'};

  class MockElementRef {
    nativeElement = {scrollIntoView() {}};
  }

  beforeEach(async(() => {
    elementRef = new MockElementRef();
    spyOn(elementRef.nativeElement, 'scrollIntoView');
    directive = new ScrollIntoViewDirective(elementRef,<any>acRouteStub);
    directive.itemId = 1;
  }));
  it(`should send scrollIntoView() to the nativeElement`, fakeAsync(() => {
    directive.ngAfterViewInit();
    expect(elementRef.nativeElement.scrollIntoView).toHaveBeenCalled();
  }));
});
