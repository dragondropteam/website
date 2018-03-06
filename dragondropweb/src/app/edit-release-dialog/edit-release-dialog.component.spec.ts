/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReleaseDialogComponent } from './edit-release-dialog.component';

describe('EditReleaseDialogComponent', () => {
  let component: EditReleaseDialogComponent;
  let fixture: ComponentFixture<EditReleaseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReleaseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReleaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
