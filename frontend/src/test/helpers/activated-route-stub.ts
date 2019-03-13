import { convertToParamMap, ParamMap, Params } from '@angular/router';
import {of, ReplaySubject} from 'rxjs';
import {Injectable} from "@angular/core";

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
@Injectable()
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private _paramMap = new ReplaySubject<ParamMap>();
  private _queryParamMap = new ReplaySubject<ParamMap>();
  private _snapshot = {data: {}, queryParams: {sortBy: 'common_name'}};

  /** The mock paramMap observable */
  get paramMap() {return(this._paramMap.asObservable())};
  get queryParamMap() {return(this._queryParamMap.asObservable())};
  readonly url = of('');

  /** Set the paramMap observables's next value */
  set params(params: Params) {
    this._paramMap.next(convertToParamMap(params));
  };
  set queryParams(params: Params) {
    this._queryParamMap.next(convertToParamMap(params));
  };
  get snapshot() {
    return(this._snapshot);
  }
}
