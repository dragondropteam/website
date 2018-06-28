import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionsDialogComponent } from './directions-dialog.component';

describe('DirectionsDialogComponent', () => {
  let component: DirectionsDialogComponent;
  let fixture: ComponentFixture<DirectionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
