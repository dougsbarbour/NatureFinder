import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {SearchModel} from "../models/search-model";
import {map} from "rxjs/operators";
import {SharingService} from "../services/sharing.service";

@Component({
  selector: 'app-flower-search',
  templateUrl: './flower-search.component.html',
  styleUrls: ['./flower-search.component.css']
})
export class FlowerSearchComponent implements OnInit {

  public model: SearchModel = new SearchModel();
  public allBloomingPeriodMonths;

  constructor(public apiService: ApiService, private shared: SharingService) {
  }

  ngOnInit() {
    this.allBloomingPeriodMonths = this.apiService.config.pipe(map(config => config.allBloomingPeriodMonths['flower']));
  }

  public get sortBy() {
    return (this.shared.sortBy)
  }

  public set sortBy(arg) {
    this.shared.sortBy = arg
  }

}
