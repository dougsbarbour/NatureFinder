import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs/internal/Observable";
import {Bird} from "../models/bird";

@Component({
  selector: 'app-bird-view',
  templateUrl: './bird-view.component.html',
  styleUrls: ['../organism-view.shared.css', './bird-view.component.css']
})
export class BirdViewComponent implements OnInit {
  public model$: Observable<any>;

  constructor(private acRoute: ActivatedRoute, private shared: SharingService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.model$ = this.shared.getModelObservable(this.acRoute, each => new Bird(each));
  }

  soundVisibility(audioFilename) {
    return (audioFilename ? 'visible' : 'hidden')
  }

  imageFilenameMatching(...args: any[]) {
    return (this.shared.imageFilenameMatching.apply(this.shared, args))
  };

  audioFilenameMatching(...args: any[]) {
    return (this.shared.audioFilenameMatching.apply(this.shared, args))
  };

  secondaryImageFilename() {
    return (this.shared.secondaryImageFilename())
  }
}
