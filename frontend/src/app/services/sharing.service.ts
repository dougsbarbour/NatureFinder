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
  public model;
  public afterModelInit = () => {};
  public sortBy = 'commonName';
  public routeParams;
  public availableSortByKeys = {
    amphibian: ['commonName', 'habitat'],
    bird: ['commonName', 'color', 'habitat', 'size'],
    fish: ['commonName', 'habitat', 'size'],
    flower: ['commonName', 'color'],
    mammal: ['commonName', 'habitat'],
    reptile: ['commonName', 'habitat'],
    tree: ['commonName']
  };
  public mapLocationButtonHidden = false;

  constructor(private apiService: ApiService) {
  }

  public imageFilenameMatching(photoFilename = this.model.photoFilename, commonName = this.model.commonName) {
    if (photoFilename)
      return (this.imagePrefix() + photoFilename);
    else
      return (this.imagePrefix() + commonName + '.jpg');
  }

  public secondaryImageFilename() {
    let result;
    if (this.model.femalePhotoType) {
      result = this.imageFilenameMatching().split('.');
      if (this.model.femalePhotoType == 'Juvenile')
        result[result.length - 2] = result[result.length - 2].replace(/.$/, "j");
      else
        result[result.length - 2] = result[result.length - 2].replace(/.$/, "f");
      return (result.join('.'));
    }
    else
      return ('');
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

}
