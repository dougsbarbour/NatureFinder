import {Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {ApiService} from "../services/api.service";
import {CSVService} from "../services/csv.service";
import {AuthService} from "../services/auth.service";
import {MapLocation} from "../models/mapLocation";
import {Organism} from "../models/organism";

@Component({
  selector: 'app-organism-view-map',
  templateUrl: './organism-view-map.component.html',
  styleUrls: ['./organism-view-map.component.css']
})
export class OrganismViewMapComponent implements OnInit {
  public model$: Observable<any>;
  public baseMapImage = 'Map-Location-Map.jpg';
  public inCapturePointsMode = false;
  public startingMapLocations;
  @Input() domainClass;
  @ViewChild('mapCanvas') mapCanvas: ElementRef;
  @HostBinding() class = 'main';
  public navigationExtras: NavigationExtras = {
    queryParamsHandling: 'preserve',
    relativeTo: this.acRoute
  };

  constructor(private acRoute: ActivatedRoute, private router: Router, private shared: SharingService,
              private apiService: ApiService, private csvService: CSVService,
              private authService: AuthService) {
    this.domainClass = this.acRoute.snapshot.data['domainClass']
  }

  ngOnInit() {
    this.model$ = this.shared.getModelObservable(this.acRoute,
      each => new this.domainClass(each.data, this.shared.getIncludedMap(each.included)));
    this.shared.afterModelInit = () => this.mergeImages();
    this.shared.mapLocationButtonHidden = true;
  }

  ngOnDestroy() {
    this.shared.mapLocationButtonHidden = false;
  }

  mapContainerClasses() {
    if (this.inCapturePointsMode)
      return ("container map-capture-container");
    else
      return ("container map-container");
  }

  canvasClasses() {
    if (this.inCapturePointsMode)
      return ("base-image-capture-mode");
    else
      return ("base-image");
  }

  isLoggedIn() {
    return (this.authService.isLoggedIn());
  }

  captureMapLocations() {
    this.inCapturePointsMode = true;
    this.startingMapLocations = this.shared.model.mapLocations.slice(0);
  }

  addMapPoint() {
    let canvas = this.mapCanvas.nativeElement;
    let model = this.shared.model;
    let canvasRect = canvas.getBoundingClientRect();
    canvas.addEventListener('click', (ev: MouseEvent) => {
      let xPercent = (ev.offsetX / canvas.width) * 100;
      let yPercent = (ev.offsetY / canvas.height) * 100;
      model.mapLocations.push(new MapLocation(
        {attributes: {xPercentage: xPercent, yPercentage: yPercent}}));
      this.mergeImages();
    }, {once: true});
  }

  removeLastMapPoint() {
    this.shared.model.mapLocations.pop();
    this.mergeImages();
  }

  endCaptureMapLocationsSave() {
    let updateModel = {};
    updateModel['id'] = this.shared.model.id;
    updateModel['mapLocations'] = this.shared.model.mapLocations;
    this.inCapturePointsMode = false;
    (this.apiService.update(this.shared.model.pluralClassName().toLowerCase() + '/' + this.shared.model.id,
      updateModel))
      .subscribe(result => {
      });
  }

  endCaptureMapLocationsNoSave() {
    this.shared.model.mapLocations = this.startingMapLocations;
    this.mergeImages();
    this.inCapturePointsMode = false;
  }

  downloadPointsFile() {
    this.apiService.get('/flowers?sortBy=common_name').subscribe((data: any) => {
      let refMap = this.shared.getIncludedMap(data.included);
      let modelObjects = data.data.map(each => new this.domainClass(each, refMap));
      this.csvService.exportAsCSVFile(modelObjects, 'flowerMapLocations',
        {
          alwaysQuoteFields: true,
          columnsToInclude: ['commonName', 'exportMapLocations']
        }
      );
    });
  }

  mergeImages() {
    let canvas: HTMLCanvasElement = this.mapCanvas.nativeElement;
    let context = canvas.getContext('2d');
    let imagePrefix = 'assets/images/';
    let model: Organism = this.shared.model;
    let mapLegendLocation = [5, 48];
    let baseImage = new Image();
    let icon = new Image();

    baseImage.onload = () => {
      canvas.width = baseImage.width;
      canvas.height = baseImage.height;
      let iconWidth = baseImage.width * 0.02;
      icon.onload = () => {
        let aspectRatio = this.calculateProportionalAspectRatio(icon.width, icon.height, iconWidth, iconWidth);
        context.globalAlpha = 1.0;
        context.drawImage(baseImage, 0, 0);
        context.drawImage(icon, baseImage.width * (mapLegendLocation[0] / 100),
          (baseImage.height * (mapLegendLocation[1] / 100)) - ((icon.height * aspectRatio) / 2),
          icon.width * aspectRatio, icon.height * aspectRatio);
        context.font = "40pt Georgia";
        context.textBaseline = "middle";
        context.fillText(`${model.pluralClassName()} Locations`,
          (iconWidth * 1.5) + (baseImage.width * (mapLegendLocation[0] / 100)),
          ((baseImage.height * (mapLegendLocation[1] / 100))));
        if (model.mapLocations) {
          model.mapLocations.forEach((each) => {
            context.drawImage(icon,
              (baseImage.width * (each.xPercentage / 100)) - ((icon.width * aspectRatio) / 2),
              (baseImage.height * (each.yPercentage / 100)) - ((icon.height * aspectRatio) / 2),
              icon.width * aspectRatio, icon.height * aspectRatio);
          });
        }
      };
      icon.src = model.imagePrefix + 'map-icon.svg';
    };
    baseImage.src = imagePrefix + this.baseMapImage;
  }

  calculateProportionalAspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
    return (Math.min(maxWidth / srcWidth, maxHeight / srcHeight));
  }

}
