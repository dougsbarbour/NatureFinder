import {Injectable} from '@angular/core';
import {map, share, switchMap, tap} from "rxjs/operators";
import {ApiService} from "./api.service";
import {combineLatest} from "rxjs";
import {baseAudioPrefix, baseImagePrefix, baseVideoPrefix} from "../dsb-utils";

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

  public imageFilenameMatching(photoFilename = this.model.photoFilename, commonName = this.model.commonName) {
    if (photoFilename)
      return (this.imagePrefix() + photoFilename);
    else
      return (this.imagePrefix() + commonName + '.jpg');
  }

  public audioFilenameMatching(audioFilename, commonName) {
    if (audioFilename)
      return (this.audioPrefix() + audioFilename);
    else
      return ('');
  }

  public videoFilenameMatching(videoFilename, commonName) {
    if (videoFilename)
      return (this.videoPrefix() + videoFilename);
    else
      return (baseVideoPrefix + 'none.mp4');
  }

  getModelObservable(route, instanceFunction: Function) {
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

  imagePrefix() {
    if (!this.model) return ("");
    return (baseImagePrefix + this.model.pluralClassName().toLowerCase() + '/')
  }

  audioPrefix() {
    if (!this.model) return ("");
    return (baseAudioPrefix + this.model.pluralClassName().toLowerCase() + '/')
  }

  videoPrefix() {
    if (!this.model) return ("");
    return (baseVideoPrefix + this.model.pluralClassName().toLowerCase() + '/')
  }

  public getIncludedMap(includedArray) {
    let map = new Map;
    includedArray.forEach(each => {
      if (!map.has(each.type)) map.set(each.type, new Map);
      map.get(each.type).set(each.id, each);
    })
    return(map);
  }

}
