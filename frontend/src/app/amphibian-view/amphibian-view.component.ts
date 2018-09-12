import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs/internal/Observable";
import {Amphibian} from "../models/amphibian";

@Component({
  selector: 'app-amphibian-view',
  templateUrl: './amphibian-view.component.html',
  styleUrls: ['../organism-view.shared.css', './amphibian-view.component.css']
})
export class AmphibianViewComponent implements OnInit {
  public model$: Observable<any>;

  constructor(private acRoute: ActivatedRoute, private shared: SharingService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.model$ = this.shared.getModelObservable(this.acRoute, each => new Amphibian(each));
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

}
