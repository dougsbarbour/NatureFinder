import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-mammal-search',
  templateUrl: './mammal-search.component.html',
  styleUrls: ['./mammal-search.component.css']
})
export class MammalSearchComponent implements OnInit {

  constructor(public apiService: ApiService) {
  }

  ngOnInit() {
  }

}
