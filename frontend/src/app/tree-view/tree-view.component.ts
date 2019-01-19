import {Component, OnInit} from '@angular/core';
import {Tree} from "../models/tree";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent {

  treeClass() {
    return(Tree);
  }
}
