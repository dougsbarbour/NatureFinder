import {Component} from '@angular/core';
import {OrganismListComponent} from "../organism-list/organism-list.component";
import {Tree} from "../models/tree";

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['../organism-list/organism-list.component.css']
})
export class TreeListComponent extends OrganismListComponent {

  public columnHeadings = [['Common Name', '@break@', 'Genus'], ['Deciduous or Evergreen', 'Opposite or Alternate',
    'Simple or Compound', 'Broad or Needle']];
  public columnWidths = [
    {
      superWidth: 'col-sm-4',
      subWidths: ['col-sm-12', 'w-100', 'col-sm-12']
    },
    {
      superWidth: 'col-sm-7',
      subWidths: ['col-sm-3 text-center', 'col-sm-3 text-center', 'col-sm-3 text-center', 'col-sm-3 text-center']
    }
  ];

  ngOnInit() {
    this.modelName = 'tree';
    super.ngOnInit();
    this.setRowsObservable(each => new Tree(each));
  }
  navigateTo(model) {
    this.router.navigate(['/' + this.modelNamePlural + '/' + model.id], {queryParamsHandling: "preserve"})
  }

}
