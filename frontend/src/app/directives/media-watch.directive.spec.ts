import {MediaWatchDirective} from './media-watch.directive';
import {ElementRef} from "@angular/core";

describe('MediaWatchDirective', () => {
  it('should create an instance', () => {
    const directive = new MediaWatchDirective(new ElementRef(undefined));
    expect(directive).toBeTruthy();
  });
});
