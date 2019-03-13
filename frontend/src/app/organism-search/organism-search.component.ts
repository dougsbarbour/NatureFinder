import {Component, Input, OnInit} from '@angular/core';
import {SearchModel} from "../models/search-model";
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {baseImagePrefix, splitCamelCase} from "../dsb-utils";
import {Tree} from "../models/tree";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-organism-search',
  templateUrl: './organism-search.component.html',
  styleUrls: ['./organism-search.component.css']
})
export class OrganismSearchComponent implements OnInit {

  public allColors$: Observable<any>;
  public allHabitats$: Observable<any>;
  public allSeasons$: Observable<any>;
  public allSizes$: Observable<any>;
  public model: SearchModel = new SearchModel();
  public tree = Tree; /*pseudo class */
  private defaultButtonBackgroundColor = 'tan';
  @Input() modelName = "";
  public modelNameSingular;
  public modelNamePlural;

  constructor(public acRoute: ActivatedRoute, public apiService: ApiService, public router: Router,
              private shared: SharingService, private sanitizer: DomSanitizer) {
    this.modelName = this.acRoute.snapshot.data['modelName']
  }

  ngOnInit() {
    if (typeof (this.modelName) == 'string') {
      this.modelNameSingular = this.modelName;
      this.modelNamePlural = this.modelName + 's';
    } else {
      this.modelNameSingular = this.modelName['singular'];
      this.modelNamePlural = this.modelName['plural'];
    }
    this.allColors$ = this.apiService.config.pipe(map(config => config.data.attributes.allColors[this.modelNameSingular]));
    this.allHabitats$ = this.apiService.config.pipe(map(config => config.data.attributes.allHabitats[this.modelNameSingular]));
    this.allSeasons$ = this.apiService.config.pipe(map(config => config.data.attributes.allSeasons[this.modelNameSingular]));
    this.allSizes$ = this.apiService.config.pipe(map(config => config.data.attributes.allSizes[this.modelNameSingular]));
  }

  splitCamelCase(arg) {
    return (splitCamelCase(arg));
  }

  get imagePrefix() {
    return(baseImagePrefix);
  }

  get modelImagePrefix() {
    return(`${this.imagePrefix}${this.modelNamePlural}/`);
  }

  get sortBy() {
    return(splitCamelCase(this.shared.availableSortByKeys[this.modelNameSingular][0]));
  }

  showAll() {
    this.router.navigate(['/' + this.modelNamePlural],
      {queryParams: {sortBy: this.sortBy}})
  }

  onSubmit(arg) {
    this.router.navigate(['/' + this.modelNamePlural],
      {queryParams: Object.assign({sortBy: this.sortBy}, arg)})
  }

  colorButtonBackground(color) {
    if (this.splitColor(color).length > 1)
      return (this.defaultButtonBackgroundColor);
    else
      return (color);
  }

  colorButtonBorder(color) {
    if (this.splitColor(color).length > 1)
      return (this.defaultButtonBackgroundColor);
    else {
      switch (color) {
        case 'yellow':
        case 'white':
          return ('black');
        default:
          return (color);
      }
    }
  }

  colorButtonText(color) {
    let result = "";
    let colors = this.splitColor(color);
    for (let part of colors) {
      let textColor = part;
      if (colors.length == 1) {
        if (part == 'yellow' || part == 'white')
          textColor = 'black';
        else
          textColor = 'white';
      }
      result = result + "<span style=\"color: " + textColor + "\">"
        + part + (part == colors[colors.length - 1] ? "" : "/") + "</span>";
    }
    return (this.sanitizer.bypassSecurityTrustHtml(result));
  }

  private splitColor(color) {
    return (color.split(/\/|-/));
  }

  beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'show-all') {
      $event.preventDefault();
      this.showAll();
    }
  }
}
