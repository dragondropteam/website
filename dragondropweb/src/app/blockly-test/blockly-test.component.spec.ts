import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocklyTestComponent } from './blockly-test.component';

describe('BlocklyTestComponent', () => {
  let component: BlocklyTestComponent;
  let fixture: ComponentFixture<BlocklyTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocklyTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocklyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
