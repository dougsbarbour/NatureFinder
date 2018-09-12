import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {Flower} from "../models/flower";
import {charCount} from "../dsb-utils";


@Component({
  selector: 'app-organism-navigation',
  templateUrl: './organism-navigation.component.html',
  styleUrls: ['./organism-navigation.component.css']
})
export class OrganismNavigationComponent implements OnInit {

  @Input() model;
  public navigationExtras: NavigationExtras = {
    queryParamsHandling: 'merge',
    relativeTo: this.route
  };

  constructor(private router: Router, private route: ActivatedRoute, public shared: SharingService) {
  }

  ngOnInit() {
  }

  nextItem() {
    if (!this.shared.latestListQueryIds) {
      console.log('can\'t get latestListQueryIds!');
      return;
    }
    let current = this.shared.latestListQueryIds.indexOf(this.model.id);
    if (current != -1) {
      if (current == this.shared.latestListQueryIds.length - 1)
        current = -1;
      this.router.navigateByUrl(this.router.url.replace(this.model.id, this.shared.latestListQueryIds[current + 1]));
    }
  }

  previousItem() {
    if (!this.shared.latestListQueryIds) {
      console.log('can\'t get latestListQueryIds!');
      return;
    }
    let current = this.shared.latestListQueryIds.indexOf(this.model.id);
    if (current != -1) {
      if (current == 0)
        current = this.shared.latestListQueryIds.length;
      this.router.navigateByUrl(this.router.url.replace(this.model.id, this.shared.latestListQueryIds[current - 1]));
    }
  }

  previousButtonVisibility() {
    if (this.shared.latestListQueryIds && this.shared.latestListQueryIds.length > 1)
      return ('visible')
    else
      return ('hidden')
  }

  nextButtonVisibility() {
    return (this.previousButtonVisibility())
  }

  goToMapLocationButtonVisibility() {
    return (!this.shared.mapLocationButtonHidden && this.model instanceof Flower ? 'visible' : 'hidden')
  }

  isGoBackButtonAvailable() {
    return (['/zoom', '/map'].some((v) => this.router.url.indexOf(v) >= 0))
  }

  isHomeButtonAvailable() {
    return (!this.isGoBackButtonAvailable())
  }

  returnToSearch() {
    let baseUrl = this.router.url.split('?')[0].split('/zoom')[0].split('/map')[0];
    baseUrl = baseUrl.replace(this.model.id, 'search');
    this.router.navigateByUrl(baseUrl);
  }

  returnToList() {
    let numberOfLevels = charCount(this.router.url, '/') - 1;
    let targetUrl = '../'.repeat(numberOfLevels);
    this.router.navigate([targetUrl, {id: this.model.id}], this.navigationExtras);
  }

  zoomOut() {
    let numberOfLevels = charCount(this.router.url, '/') - 2;
    let targetUrl = '../'.repeat(numberOfLevels);
    this.router.navigate([targetUrl, {id: this.model.id}], this.navigationExtras);
  }

  goToMapLocation() {
    let baseUrl = this.router.url.split('?')[0];
    let queryParams = this.router.url.includes('?') ? '?' + this.router.url.split('?')[1] : "";
    this.router.navigateByUrl(baseUrl + '/map' + queryParams);
  }
}

