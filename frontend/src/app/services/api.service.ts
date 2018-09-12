import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from "../models/config";
import {Observable} from "rxjs/internal/Observable";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL: string = "api/";
  public config: Observable<Config>;

  constructor(public http: HttpClient) {
    this.config = <Observable<Config>> this.get('config').pipe(shareReplay());
  }

  // read method
  public get(path, params: any = {}) {
    let endpoint = this.API_URL + path;
    const apiParams = params ? {params: params} : {};
    return this.http.get(endpoint, apiParams);
  }

  public url() {
    return this.API_URL;
  }

  // create method
  public post(path: string, body: any) {
    let endpoint = this.API_URL + path;
    return this.http.post(endpoint, body);
  }

  // delete method
  public delete(path: string) {
    let endpoint = this.API_URL + path;
    return this.http.delete(endpoint);
  }

  // update method
  public update(path: string, body: any) {
    let endpoint = this.API_URL + path;
    return this.http.put(endpoint, body);
  }

}



