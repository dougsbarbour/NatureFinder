import {Component, Input, OnInit} from '@angular/core';
import {SearchModel} from "../models/search-model";
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {splitCamelCase} from "../dsb-utils";

@Component({
  selector: 'app-organism-search',
  templateUrl: './organism-search.component.html',
  styleUrls: ['./organism-search.component.css']
})
export class OrganismSearchComponent implements OnInit {

  public allColors$: Observable<any>;
  public allHabitats$: Observable<any>;
  public model: SearchModel = new SearchModel();
  public allLetters = Array.from('abcdefghijklmnopqrstuvwxyz');
  private defaultButtonBackgroundColor = 'tan';
  @Input() modelName = "";
  public modelNameSingular;
  public modelNamePlural;

  constructor(public apiService: ApiService, public router: Router, private shared: SharingService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (typeof(this.modelName) == 'string') {
      this.modelNameSingular = this.modelName;
      this.modelNamePlural = this.modelName + 's';
    }
    else {
      this.modelNameSingular = this.modelName['singular'];
      this.modelNamePlural = this.modelName['plural'];
    }
    this.allColors$ = this.apiService.config.pipe(map(config => config.allColors[this.modelNameSingular]));
    this.allHabitats$ = this.apiService.config.pipe(map(config => config.allHabitats[this.modelNameSingular]));
    this.sortBy = 'commonName';
  }

  splitCamelCase(arg) {
    return (splitCamelCase(arg));
  }

  public get sortBy() {
    return (this.shared.sortBy)
  }

  public get availableSortByKeys() {
    return (this.shared.availableSortByKeys)
  }

  public set sortBy(arg) {
    this.shared.sortBy = arg
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
}

