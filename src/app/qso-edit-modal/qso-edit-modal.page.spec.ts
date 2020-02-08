import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QsoEditModalPage } from './qso-edit-modal.page';

describe('QsoEditModalPage', () => {
  let component: QsoEditModalPage;
  let fixture: ComponentFixture<QsoEditModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QsoEditModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QsoEditModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
