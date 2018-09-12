import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Tree} from "../models/tree";
import {SharingService} from "../services/sharing.service";

@Component({
  selector: 'app-tree-search',
  templateUrl: './tree-search.component.html',
  styleUrls: ['./tree-search.component.css']
})
export class TreeSearchComponent implements OnInit {
  public tree = Tree; /*pseudo class */
  constructor(public apiService: ApiService, private shared: SharingService) {
  }

  ngOnInit() {
  }

  public get sortBy() {
    return (this.shared.sortBy)
  }

  public set sortBy(arg) {
    this.shared.sortBy = arg
  }
}
