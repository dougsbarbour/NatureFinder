import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {ApiService} from "../services/api.service";
import {of} from "rxjs/internal/observable/of";
import {Observable} from "rxjs/internal/Observable";
import {Reptile} from "../models/reptile";
import {titlecase, splitCamelCase} from "../dsb-utils"
import {map, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-reptile-view',
  templateUrl: './reptile-view.component.html',
  styleUrls: ['../organism-view.shared.css', './reptile-view.component.css']
})
export class ReptileViewComponent implements OnInit {
  public model$: Observable<any>;

  constructor(private acRoute: ActivatedRoute, private shared: SharingService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.model$ = this.shared.getModelObservable(this.acRoute, each => new Reptile(each));
  }

  imageFilenameMatching(...args: any[]) {
    return (this.shared.imageFilenameMatching.apply(this.shared, args))
  };

  audioFilenameMatching(...args: any[]) {
    return (this.shared.audioFilenameMatching.apply(this.shared, args))
  };

}
