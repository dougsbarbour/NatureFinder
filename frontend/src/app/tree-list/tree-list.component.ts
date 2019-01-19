import {Component} from '@angular/core';
import {OrganismListComponent} from "../organism-list/organism-list.component";
import {Tree} from "../models/tree";

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['../organism-list/organism-list.component.css']
})
export class TreeListComponent extends OrganismListComponent {

  public columnHeadings = [[], ['Common Name', '@break@', 'Scientific Name'],
    ['Deciduous or Evergreen', 'Opposite or Alternate',
    'Simple or Compound', 'Broad or Needle']];
  public columnWidths = [
    {
      superWidth: 'col-sm-1',
      subWidths: []
    },
    {
      superWidth: 'col-sm-3',
      subWidths: ['col-sm-12', 'w-100', 'col-sm-12']
    },
    {
      superWidth: 'col-sm-8',
      subWidths: ['col-sm-3 text-center', 'col-sm-3 text-center', 'col-sm-3 text-center', 'col-sm-3 text-center']
    }
  ];

  ngOnInit() {
    this.modelName = 'tree';
    super.ngOnInit();
    this.setRowsObservable((each, included) => new Tree(each, included));
  }
  navigateTo(model) {
    this.router.navigate(['/' + this.modelNamePlural + '/' + model.id], {queryParamsHandling: "preserve"})
  }

}
