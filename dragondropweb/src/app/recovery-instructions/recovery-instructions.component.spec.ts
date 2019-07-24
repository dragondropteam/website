import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryInstructionsComponent } from './recovery-instructions.component';

describe('RecoveryInstructionsComponent', () => {
  let component: RecoveryInstructionsComponent;
  let fixture: ComponentFixture<RecoveryInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
