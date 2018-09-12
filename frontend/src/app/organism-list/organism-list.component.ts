import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Observable} from "rxjs/internal/Observable";
import {SharingService} from "../services/sharing.service";
import {map, switchMap, tap} from "rxjs/operators";
import {combineLatest} from "rxjs/internal/observable/combineLatest";
import {baseImagePrefix} from "../dsb-utils";

@Component({
  selector: ' ',
  template: ' ',
})
export class OrganismListComponent implements OnInit {

  constructor(private elementRef: ElementRef, public apiService: ApiService, public router: Router, public acRoute: ActivatedRoute, public shared: SharingService) {
  }
  public currentItemId;
  public columns = [['commonName', 'genus', 'color', '@break@', 'size', 'species', 'habitat'], 'notes'];
  public columnHeadings = [['Common Name', 'Genus', 'Color', '', 'Size', 'Species', 'Habitat'], 'Additional Information'];
  public columnWidths = [
    {
      superWidth: 'col-sm-8',
      subWidths: ['col-sm-5', 'col-sm-3', 'col-sm-4', 'w-100', 'col-sm-5', 'col-sm-3', 'col-sm-4']
    },
    'col-sm-3 pre-line'
  ];
  public rows$: Observable<any>;
  public selectedRowId;
  public modelName = "";
  public modelNamePlural = "";
  public imagePrefix;

  ngOnInit() {
    this.modelNamePlural = this.modelName + 's';
    this.imagePrefix = baseImagePrefix + this.modelNamePlural + '/';
  }
  navigateTo(model) {
    this.router.navigate(['/' + this.modelNamePlural + '/' + model.id], {queryParamsHandling: "preserve"})
  }

  setRowsObservable(instanceFunction: Function) {
    this.rows$ = combineLatest(this.acRoute.paramMap, this.acRoute.queryParamMap)
      .pipe(
        switchMap((array) => {
          let [paramMap, queryParamMap] = array;
          this.selectedRowId = paramMap.get('id') ? paramMap.get('id') : this.selectedRowId;
          return (this.apiService.get(this.modelNamePlural, this.preprocessQueryParams(queryParamMap['params'])))
        }),
        map((array: any[]) => array.map(each => instanceFunction(each))),
        tap(array => {
          this.shared.latestListQueryIds = array.map(each => each.id);
        })
      );
  }

  preprocessQueryParams(arg) {
    let result = Object.assign({}, arg);
    if (result.sortBy && result.sortBy == 'commonName')
      result.sortBy = 'common_name';
    return (result);
  }

  public delete(id: string) {
    console.log("delete : " + id);
    let path = this.modelName + 's' + '/' + id;
    this.apiService.delete(path).subscribe((r) => {
      this.rows$ = this.rows$.pipe(map(r => {
        r.filter((p, i) => {
          return (Number(id) != p.id)
        })
      }));
    })
  }

  public update(id: string) {
    console.log("update : " + id);
    this.router.navigateByUrl('/' + this.modelName + 's' + '/add/' + id);
  }

  public imageFilenameMatching(photoFilename, commonName) {
    if (photoFilename)
      return (this.imagePrefix + photoFilename);
    else
      return (this.imagePrefix + commonName + '.jpg');
  }

  public scrollIntoView() {
    if (this.selectedRowId) {
      console.log('scrolling to ' + this.selectedRowId);
      let element = this.elementRef.nativeElement.querySelector('#item' + this.selectedRowId);
      if (element) {
        console.log('found ' + element.id);
        setTimeout(() => {
          console.log('scrolling ' + element.id);
          element.scrollIntoView(true);
        }, 1000);
      }
    }
  }
}
