import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragondropTutorialComponent } from './dragondrop-tutorial.component';

describe('DragondropTutorialComponent', () => {
  let component: DragondropTutorialComponent;
  let fixture: ComponentFixture<DragondropTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragondropTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragondropTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
