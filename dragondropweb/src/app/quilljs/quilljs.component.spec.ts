import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuilljsComponent } from './quilljs.component';

describe('QuilljsComponent', () => {
  let component: QuilljsComponent;
  let fixture: ComponentFixture<QuilljsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuilljsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuilljsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
