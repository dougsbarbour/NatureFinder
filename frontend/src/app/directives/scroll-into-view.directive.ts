import {Directive, ElementRef, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {distinctUntilChanged, filter, map, tap} from "rxjs/operators";

@Directive({
  selector: '[appScrollIntoView]'
})
export class ScrollIntoViewDirective {
  @Input() itemId: number;
  private scrollIntoView$: Subscription;

  constructor(private el: ElementRef,
              private route: ActivatedRoute) {
  }

  ngAfterViewInit() {
    this.scrollIntoView$ = this.route.paramMap.pipe(map(paramMap => paramMap.get('id')),
      distinctUntilChanged(),
      map(itId => +itId),
      filter(itId => this.itemId === itId),
      tap(() => this.el.nativeElement.scrollIntoView()))
      .subscribe()
  }

  ngOnDestroy(): void {
    this.scrollIntoView$.unsubscribe();
  }

}
