import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganismHeadingComponent} from './organism-heading.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('OrganismHeadingComponent', () => {
  let component: OrganismHeadingComponent;
  let fixture: ComponentFixture<OrganismHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganismHeadingComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(OrganismHeadingComponent);
    component = fixture.componentInstance;
    component.input = {specRow: {columnHeadings: [], columnWidths: []}, dataRow: {}};
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
