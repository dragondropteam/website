import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragondropDocumentationComponent } from './dragondrop-documentation.component';

describe('DragondropDocumentationComponent', () => {
  let component: DragondropDocumentationComponent;
  let fixture: ComponentFixture<DragondropDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragondropDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragondropDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
