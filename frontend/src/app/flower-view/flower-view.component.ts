import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs/internal/Observable";
import {Flower} from "../models/flower";
import {titlecase, splitCamelCase} from "../dsb-utils"

@Component({
  selector: 'app-flower-view',
  templateUrl: './flower-view.component.html',
  styleUrls: ['../organism-view.shared.css', './flower-view.component.css']
})
export class FlowerViewComponent implements OnInit {
  public model$: Observable<any>;
  public fields = ['commonName', 'genus', 'species', 'familyLatin', 'color', 'bloomingPeriod'];
  public fieldHeadings = this.fields.map(each => titlecase(splitCamelCase(each)));

  constructor(private acRoute: ActivatedRoute, private shared: SharingService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.model$ = this.shared.getModelObservable(this.acRoute, each => new Flower(each));
  }

  imageFilenameMatching(...args: any[]) {
    return (this.shared.imageFilenameMatching.apply(this.shared, args))
  };

}
