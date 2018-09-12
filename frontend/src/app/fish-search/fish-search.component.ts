import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {SharingService} from "../services/sharing.service";

@Component({
  selector: 'app-fish-search',
  templateUrl: './fish-search.component.html',
  styleUrls: ['./fish-search.component.css']
})
export class FishSearchComponent implements OnInit {

  public allSizes$: Observable<any>;

  constructor(public apiService: ApiService, private shared: SharingService) {
  }

  ngOnInit() {
    this.allSizes$ = this.apiService.config.pipe(map(config => config.allSizes['fish']));
  }

  public get sortBy() {
    return (this.shared.sortBy)
  }

  public set sortBy(arg) {
    this.shared.sortBy = arg
  }

}
