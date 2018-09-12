import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs/internal/Observable";
import {Mammal} from "../models/mammal";

@Component({
  selector: 'app-mammal-view',
  templateUrl: './mammal-view.component.html',
  styleUrls: ['../organism-view.shared.css', './mammal-view.component.css']
})
export class MammalViewComponent implements OnInit {
  public model$: Observable<any>;

  constructor(private acRoute: ActivatedRoute, private shared: SharingService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.model$ = this.shared.getModelObservable(this.acRoute, each => new Mammal(each));
  }

  imageFilenameMatching(...args: any[]) {
    return (this.shared.imageFilenameMatching.apply(this.shared, args))
  };

  videoFilenameMatching(...args: any[]) {
    return (this.shared.videoFilenameMatching.apply(this.shared, args))
  };

}
