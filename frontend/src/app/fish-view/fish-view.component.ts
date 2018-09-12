import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs/internal/Observable";
import {Fish} from "../models/fish";
import {baseImagePrefix} from "../dsb-utils";

@Component({
  selector: 'app-fish-view',
  templateUrl: './fish-view.component.html',
  styleUrls: ['../organism-view.shared.css', './fish-view.component.css']
})
export class FishViewComponent implements OnInit {
  public model$: Observable<any>;

  constructor(private acRoute: ActivatedRoute, private shared: SharingService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.model$ = this.shared.getModelObservable(this.acRoute, each => new Fish(each));
  }

  fishSizeImage(size) {
    return(this.shared.imagePrefix() + 'fishSize_' + size + '.jpg')
  }

  fishHabitatImage(habitat) {
    return(baseImagePrefix + 'habitat_' + habitat + '.jpg')
  }

  imageFilenameMatching(...args: any[]) {
    return (this.shared.imageFilenameMatching.apply(this.shared, args))
  };

  audioFilenameMatching(...args: any[]) {
    return (this.shared.audioFilenameMatching.apply(this.shared, args))
  };

}
