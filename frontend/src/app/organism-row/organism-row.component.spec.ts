import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganismRowComponent} from './organism-row.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('OrganismHeadingComponent', () => {
  let component: OrganismRowComponent;
  let fixture: ComponentFixture<OrganismRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganismRowComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(OrganismRowComponent);
    component = fixture.componentInstance;
    component.input = {specRow: {columns: [], columnWidths: []}, dataRow: {}};
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
