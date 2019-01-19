import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {SharingService} from "../services/sharing.service";

@Component({
  selector: 'app-bird-search',
  templateUrl: './bird-search.component.html',
  styleUrls: ['./bird-search.component.css']
})
export class BirdSearchComponent implements OnInit {

  public allSizes: Observable<any>;

  constructor(public apiService: ApiService, private shared: SharingService) {
  }

  ngOnInit() {
    this.allSizes = this.apiService.config.pipe(map(config => config.data.attributes.allSizes['bird']));
  }

  public get sortBy() {
    return (this.shared.sortBy)
  }

  public set sortBy(arg) {
    this.shared.sortBy = arg
  }

}
