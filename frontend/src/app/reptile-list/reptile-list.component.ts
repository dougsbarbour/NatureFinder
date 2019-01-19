import {Component, OnInit} from '@angular/core';
import {OrganismListComponent} from "../organism-list/organism-list.component";
import {Reptile} from "../models/reptile";

@Component({
  selector: 'app-reptile-list',
  templateUrl: '../organism-list/organism-list.component.html',
  styleUrls: ['../organism-list/organism-list.component.css']
})
export class ReptileListComponent extends OrganismListComponent {

  public columns = [['commonName', 'habitat', '@break@', 'scientificName'], 'notes'];
  public columnHeadings = [['Common Name', 'Habitat', '@break@', 'Scientific Name'], 'Additional Info'];
  public columnWidths = [
    {
      superWidth: 'col-sm-8',
      subWidths: ['col-sm-6', 'col-sm-6', 'w-100', 'col-sm-6', 'col-sm-6']
    },
    'col-sm-3 pre-line'
  ];

  ngOnInit() {
    this.modelName = 'reptile';
    super.ngOnInit();
    this.setRowsObservable((each, included) => new Reptile(each, included));
  }
}
