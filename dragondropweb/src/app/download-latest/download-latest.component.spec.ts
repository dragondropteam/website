import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadLatestComponent } from './download-latest.component';

describe('DownloadLatestComponent', () => {
  let component: DownloadLatestComponent;
  let fixture: ComponentFixture<DownloadLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
