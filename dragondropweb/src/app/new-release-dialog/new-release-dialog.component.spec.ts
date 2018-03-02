/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReleaseDialogComponent } from './new-release-dialog.component';

describe('NewReleaseDialogComponent', () => {
  let component: NewReleaseDialogComponent;
  let fixture: ComponentFixture<NewReleaseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReleaseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReleaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
