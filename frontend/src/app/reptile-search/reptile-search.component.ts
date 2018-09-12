import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-reptile-search',
  templateUrl: './reptile-search.component.html',
  styleUrls: ['./reptile-search.component.css']
})
export class ReptileSearchComponent implements OnInit {

  constructor(public apiService: ApiService) {
  }

  ngOnInit() {
  }

}
