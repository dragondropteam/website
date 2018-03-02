/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadVersionListComponent } from './download-version-list.component';

describe('DownloadVersionListComponent', () => {
  let component: DownloadVersionListComponent;
  let fixture: ComponentFixture<DownloadVersionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadVersionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadVersionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
