import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-organism-view',
  templateUrl: './organism-view.component.html',
  styleUrls: ['./organism-view.component.css']
})
export class OrganismViewComponent implements OnInit {
  @Input() domainClass;
  @Input() customTemplate;
  public model$: Observable<any>;

  constructor(private acRoute: ActivatedRoute, private shared: SharingService, private apiService: ApiService) {
    this.domainClass = this.acRoute.snapshot.data['domainClass']
  }

  ngOnInit() {
    this.model$ = this.shared.getModelObservable(this.acRoute,
      (each => new this.domainClass(each.data, this.shared.getIncludedMap(each.included))));
  }

  videoPlaying(carousel) {
    carousel.pause();
  }

  videoEnded(carousel) {
    carousel.cycle();
  }

}
