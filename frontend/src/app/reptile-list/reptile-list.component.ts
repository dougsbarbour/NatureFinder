import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Bird} from '../models/bird';
import {filter, map} from "rxjs/operators";
import {Subscription} from "rxjs/internal/Subscription";
import {Observable} from "rxjs/internal/Observable";
import {OrganismListComponent} from "../organism-list/organism-list.component";
import {Reptile} from "../models/reptile";

@Component({
  selector: 'app-reptile-list',
  templateUrl: '../organism-list/organism-list.component.html',
  styleUrls: ['../organism-list/organism-list.component.css']
})
export class ReptileListComponent extends OrganismListComponent {

  public columns = [['commonName', 'genus', 'familyLatin', '@break@', 'habitat', 'species', 'familyEnglish'], 'notes'];
  public columnHeadings = [['Common Name', 'Genus', 'Family', '@break@', 'Habitat', 'Species', ''], 'Additional Info'];
  public columnWidths = [
    {
      superWidth: 'col-sm-8',
      subWidths: ['col-sm-5', 'col-sm-3', 'col-sm-4', 'w-100', 'col-sm-5', 'col-sm-3', 'col-sm-4']
    },
    'col-sm-3 pre-line'
  ];

  ngOnInit() {
    this.modelName = 'reptile';
    super.ngOnInit();
    this.setRowsObservable(each => new Reptile(each));
  }
}
