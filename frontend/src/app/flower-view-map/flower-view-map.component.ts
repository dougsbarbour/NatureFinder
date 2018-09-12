import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {SharingService} from "../services/sharing.service";
import {ApiService} from "../services/api.service";
import {Flower} from "../models/flower";
import {CSVService} from "../services/csv.service";

@Component({
  selector: 'app-flower-view-map',
  templateUrl: './flower-view-map.component.html',
  styleUrls: ['../organism-view.shared.css', './flower-view-map.component.css']
})
export class FlowerViewMapComponent implements OnInit {
  public model$: Observable<any>;
  public baseMapImage = 'Flower-Location-Trail-Map-Cropped.jpg';
  public inCapturePointsMode = false;
  public startingMapLocations;
  @ViewChild('mapCanvas') mapCanvas: ElementRef;
  public navigationExtras: NavigationExtras = {
    queryParamsHandling: 'preserve',
    relativeTo: this.acRoute
  };

  constructor(private acRoute: ActivatedRoute, private router: Router, private shared: SharingService,
              private apiService: ApiService, private csvService: CSVService) {
  }

  ngOnInit() {
    this.model$ = this.shared.getModelObservable(this.acRoute, each => new Flower(each));
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
      model.mapLocations.push([xPercent, yPercent]);
      this.mergeImages();
    }, {once: true});
    this.router.navigate(['./'], this.navigationExtras);
  }

  removeLastMapPoint() {
    this.shared.model.mapLocations.pop();
    this.mergeImages();
    this.router.navigate(['./'], this.navigationExtras);
  }

  endCaptureMapLocationsSave() {
    let updateModel = {};
    updateModel['id'] = this.shared.model.id;
    updateModel['mapLocations'] = this.shared.model.mapLocations.map(each => ({'x': each[0], 'y': each[1]}));
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
    this.router.navigate(['./'], this.navigationExtras);
  }

  downloadPointsFile() {
    this.apiService.get('/flowers?sortBy=common_name').subscribe((data: any[]) => {
      this.csvService.exportAsCSVFile(data, 'flowerMapLocations',
        {
          alwaysQuoteFields: true,
          columnsToInclude: ['commonName', 'mapLocations']
        }
      );
    });
  }

  imagePrefix() {
    return (this.shared.imagePrefix())
  }

  imageFilenameMatching(...args: any[]) {
    return (this.shared.imageFilenameMatching.apply(this.shared, args))
  }

  mergeImages() {
    let canvas: HTMLCanvasElement = this.mapCanvas.nativeElement;
    let context = canvas.getContext('2d');
    let imagePrefix = this.imagePrefix();
    let model: Flower = this.shared.model;
    let mapLegendLocation = [5, 35];
    let baseImage = new Image();
    let flowerIcon = new Image();

    baseImage.onload = () => {
      canvas.width = baseImage.width;
      canvas.height = baseImage.height;
      let flowerIconWidth = baseImage.width * 0.02;
      flowerIcon.onload = () => {
        context.globalAlpha = 1.0;
        context.drawImage(baseImage, 0, 0);
        context.drawImage(flowerIcon,
          baseImage.width * (mapLegendLocation[0] / 100),
          baseImage.height * (mapLegendLocation[1] / 100),
          flowerIconWidth, flowerIconWidth);
        context.font = "16px Georgia";
        context.fillText("A Wildflower Location",
          (flowerIconWidth * 1.5) + baseImage.width * (mapLegendLocation[0] / 100),
          (baseImage.height * (mapLegendLocation[1] / 100) + 16));
        if (model.mapLocations) {
          model.mapLocations.forEach((xY) => {
            context.drawImage(flowerIcon,
              (baseImage.width * (xY[0] / 100)) - (flowerIconWidth / 2),
              (baseImage.height * (xY[1] / 100)) - (flowerIconWidth / 2),
              flowerIconWidth, flowerIconWidth);
          });
        }
      };
      flowerIcon.src = imagePrefix + 'flower-icon.svg';
    };
    baseImage.src = this.imagePrefix() + this.baseMapImage;
  }
}
