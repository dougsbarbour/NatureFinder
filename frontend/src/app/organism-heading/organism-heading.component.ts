import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[organism-heading]',
  templateUrl: './organism-heading.component.html',
  styleUrls: ['./organism-heading.component.css']
})
export class OrganismHeadingComponent {

  @Input() input:any;

  isArray(arg: any) {
    return(typeof(arg) == 'object' || arg instanceof Array);
  }
  isString(arg: any) {
    return(typeof(arg) == 'string' || arg instanceof String);
  }
}
