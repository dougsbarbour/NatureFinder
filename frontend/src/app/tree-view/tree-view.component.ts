import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs/internal/Observable";
import {Tree} from "../models/tree";
import {baseImagePrefix, baseAudioPrefix, baseVideoPrefix, titlecase, splitCamelCase} from "../dsb-utils"

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['../organism-view.shared.css', './tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  public model$: Observable<any>;
  public fields = ['commonName', 'genusSpecies', 'family', '@treeTypes@', 'notes'];
  public fieldHeadings = this.fields.map(each => titlecase(splitCamelCase(each)));
  public zooms = [['Tree', 'Leaf', 'Flower'], ['Bark', 'Fruit', 'Other']];

  constructor(private acRoute: ActivatedRoute, private router: Router, private shared: SharingService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.model$ = this.shared.getModelObservable(this.acRoute, each => new Tree(each));
  }

  imageFilenameMatching(...args: any[]) {
    return (this.shared.imageFilenameMatching.apply(this.shared, args))
  };

  imagePrefix() {
    return (this.shared.imagePrefix())
  }

  zoomType() {
    return (this.shared.routeParams.zoomType)
  }

  zoomImage(type) {
    let result = this.imageFilenameMatching().split('.');
    let indexToChange = result.length == 1 ? 0 : result.length - 2;
    result[indexToChange] = result[indexToChange] + '_' + type + 'Zoom';
    return (result.join('.'))
  }

  zoomTo(type) {
    let baseUrl = this.router.url.split('?')[0].split('/zoom')[0];
    let queryParams = this.router.url.includes('?') ? '?' + this.router.url.split('?')[1] : "";
    this.router.navigateByUrl(baseUrl + '/zoom/' + type + queryParams);
  }
}
