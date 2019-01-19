import {Component} from '@angular/core';
import {OrganismListComponent} from "../organism-list/organism-list.component";
import {Fish} from "../models/fish";
import {baseImagePrefix} from "../dsb-utils";

@Component({
  selector: 'app-fish-list',
  templateUrl: '../organism-list/organism-list.component.html',
  styleUrls: ['../organism-list/organism-list.component.css']
})
export class FishListComponent extends OrganismListComponent {

  public columns = [['commonName', 'habitat', '@break@', 'scientificName', 'size'], 'notes'];
  public columnHeadings = [['Common Name', 'Habitat', '@break@', 'Scientific Name', 'Average Size'], 'Additional Info'];
  public columnWidths = [
    {
      superWidth: 'col-sm-8',
      subWidths: ['col-sm-6', 'col-sm-6', 'w-100', 'col-sm-6', 'col-sm-6']
    },
    'col-sm-3 pre-line'
  ];

  ngOnInit() {
    this.modelName = 'fish';
    super.ngOnInit();
    this.modelNamePlural = this.modelName;
    this.imagePrefix = baseImagePrefix + this.modelNamePlural + '/';
    this.setRowsObservable((each, included) => new Fish(each, included));
  }
}
