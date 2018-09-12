import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-organism-row',
  templateUrl: './organism-row.component.html',
  styleUrls: ['./organism-row.component.css']
})
export class OrganismRowComponent {

  @Input() input:any;

  isArray(arg: any) {
    return(typeof(arg) == 'object' || arg instanceof Array);
  }
  isString(arg: any) {
    return(typeof(arg) == 'string' || arg instanceof String);
  }
}
