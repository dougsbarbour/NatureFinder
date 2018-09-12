import {Directive, Input} from "@angular/core";

@Directive({
  selector: '[queryParams]',
  host: { '(click)': 'onClick()' }
})
export class QueryParamsDirectiveStub {
  @Input('queryParams') queryParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.queryParams;
  }
}
