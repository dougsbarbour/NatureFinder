import {Component, OnInit} from '@angular/core';
import {OrganismListComponent} from "../organism-list/organism-list.component";
import {Flower} from "../models/flower";

@Component({
  selector: 'app-bird-list',
  templateUrl: '../organism-list/organism-list.component.html',
  styleUrls: ['../organism-list/organism-list.component.css']
})
export class FlowerListComponent extends OrganismListComponent {

  public columns = [['commonName', 'color', '@break@', 'scientificName'], 'season'];
  public columnHeadings = [['Common Name', 'Color', '@break@', 'Scientific Name'], 'Season'];
  public columnWidths = [
    {
      superWidth: 'col-sm-8',
      subWidths: ['col-sm-6', 'col-sm-6', 'w-100', 'col-sm-6', 'col-sm-6']
    },
    'col-sm-3 pre-line'
  ];

  ngOnInit() {
    this.modelName = 'flower';
    super.ngOnInit();
    this.setRowsObservable((each, included) => new Flower(each, included));
  }
}
