
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserTableComponent } from './admin-user-table.component';

describe('AdminUserTableComponent', () => {
  let component: AdminUserTableComponent;
  let fixture: ComponentFixture<AdminUserTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
