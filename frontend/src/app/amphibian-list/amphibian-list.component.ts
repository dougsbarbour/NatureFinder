import {Component} from '@angular/core';
import {OrganismListComponent} from "../organism-list/organism-list.component";
import {Amphibian} from "../models/amphibian";

@Component({
  selector: 'app-amphibian-list',
  templateUrl: '../organism-list/organism-list.component.html',
  styleUrls: ['../organism-list/organism-list.component.css']
})
export class AmphibianListComponent extends OrganismListComponent {

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
    this.modelName = 'amphibian';
    super.ngOnInit();
    this.setRowsObservable(each => new Amphibian(each));
  }
}
