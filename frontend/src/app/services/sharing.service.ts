import {Injectable} from '@angular/core';
import {map, share, switchMap, tap} from "rxjs/operators";
import {ApiService} from "./api.service";
import {combineLatest} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  public latestListQueryIds: string[];
  public _model;
  public afterModelInit = () => {};
  public sortBy = 'common_name';
  public routeParams;
  public availableSortByKeys = {
    amphibian: ['common_name', 'habitat', 'scientific_name', 'color', 'season'],
    bird: ['common_name', 'habitat', 'scientific_name', 'color', 'season'],
    fish: ['common_name', 'habitat', 'scientific_name', 'color', 'season'],
    flower: ['common_name', 'habitat', 'scientific_name', 'color', 'season'],
    insect: ['common_name', 'habitat', 'scientific_name', 'color', 'season'],
    mammal: ['common_name', 'habitat', 'scientific_name', 'color', 'season'],
    organism: ['common_name', 'habitat', 'scientific_name', 'color', 'season'],
    reptile: ['common_name', 'habitat', 'scientific_name', 'color', 'season'],
    tree: ['common_name', 'habitat', 'scientific_name', 'color', 'season']
  };
  public mapLocationButtonHidden = false;

  get model() {
    return(this._model);
  }

  set model(m) {
    this._model = m;
  }

  constructor(private apiService: ApiService) {
  }

  public getModelObservable(route, instanceFunction: Function) {
    return (combineLatest(route.url, route.paramMap, route.queryParamMap)
      .pipe(
        switchMap((array: any[]) => {
          let [url, paramMap, queryParamMap] = array;
          this.routeParams = paramMap['params'];
          if (url.length == 3) url.pop();
          return (this.apiService.get(url.join('/'), queryParamMap['params']))
        }),
        map(each => instanceFunction(each)),
        tap(each => {
          this.model = each;
          this.afterModelInit();
        }),
        share()
      ));
  }

  public getIncludedMap(includedArray) {
    let map = new Map;
    includedArray.forEach(each => {
      if (!map.has(each.type)) map.set(each.type, new Map);
      map.get(each.type).set(each.id, each);
    });
    return(map);
  }

}
