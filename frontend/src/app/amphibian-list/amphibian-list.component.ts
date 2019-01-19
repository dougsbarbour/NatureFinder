import {Component} from '@angular/core';
import {OrganismListComponent} from "../organism-list/organism-list.component";
import {Amphibian} from "../models/amphibian";

@Component({
  selector: 'app-amphibian-list',
  templateUrl: '../organism-list/organism-list.component.html',
  styleUrls: ['../organism-list/organism-list.component.css']
})
export class AmphibianListComponent extends OrganismListComponent {

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
    this.modelName = 'amphibian';
    super.ngOnInit();
    this.setRowsObservable((each, included) => new Amphibian(each, included));
  }
}
