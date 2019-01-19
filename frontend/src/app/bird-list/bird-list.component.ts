import {Component, OnInit} from '@angular/core';
import {Bird} from '../models/bird';
import {OrganismListComponent} from "../organism-list/organism-list.component";

@Component({
  selector: 'app-bird-list',
  templateUrl: '../organism-list/organism-list.component.html',
  styleUrls: ['../organism-list/organism-list.component.css']
})
export class BirdListComponent extends OrganismListComponent {

  public columns = [['commonName', 'habitat', 'color', '@break@', 'scientificName', 'size'], 'notes'];
  public columnHeadings = [['Common Name', 'Habitat', 'Color', '@break@', 'Scientific Name', 'Size'], 'Additional Information'];
  public columnWidths = [
    {
      superWidth: 'col-sm-8',
      subWidths: ['col-sm-5', 'col-sm-3', 'col-sm-4', 'w-100', 'col-sm-5', 'col-sm-5']
    },
    'col-sm-3 pre-line'
  ];

  ngOnInit() {
    this.modelName = 'bird';
    super.ngOnInit();
    this.setRowsObservable((each, included) => new Bird(each, included));
  }
}
