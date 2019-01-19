import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {titlecase} from "../dsb-utils";
import {SharingService} from "../services/sharing.service";

@Component({
  selector: '[organism-heading]',
  templateUrl: './organism-heading.component.html',
  styleUrls: ['./organism-heading.component.css']
})
export class OrganismHeadingComponent {
  @Output() sortBy = new EventEmitter<string>();
  @Input() input: any;
  @ViewChild('nestedHeading') nestedHeading;

  public currentSortHeading;

  constructor(public acRoute: ActivatedRoute, public shared: SharingService) {
    let routeSortBy = acRoute.snapshot.queryParams['sortBy'];
    if (routeSortBy)
      this.currentSortHeading = routeSortBy.split('_').map(each => titlecase(each)).join(' ')
  }

  isArray(arg: any) {
    return (typeof (arg) == 'object' || arg instanceof Array);
  }

  isString(arg: any) {
    return (typeof (arg) == 'string' || arg instanceof String);
  }

  sort(heading) {
    let headingId = heading.toLowerCase().split(' ').join('_');
    if (this.shared.availableSortByKeys[this.modelName].includes(headingId)) {
      if (this.input.specRow.columnHeadings.includes(heading)) {
        this.currentSortHeading = heading;
        if (this.nestedHeading)
          this.nestedHeading.currentSortHeading = undefined;
      } else
        this.currentSortHeading = undefined;
      this.sortBy.emit(headingId);
    }
  }

  sortClass(heading) {
    return (heading == this.currentSortHeading ? 'sortAsc' : 'noSort');
  }

  get modelName() {
    return (this.input['modelName']);
  }
}
