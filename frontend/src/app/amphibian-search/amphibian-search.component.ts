import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-amphibian-search',
  templateUrl: './amphibian-search.component.html',
  styleUrls: ['./amphibian-search.component.css']
})
export class AmphibianSearchComponent implements OnInit {

  constructor(public apiService: ApiService) {
  }

  ngOnInit() {
  }

}
