import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRequestsNotifComponent } from './all-requests-notif.component';

describe('AllRequestsNotifComponent', () => {
  let component: AllRequestsNotifComponent;
  let fixture: ComponentFixture<AllRequestsNotifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllRequestsNotifComponent]
    });
    fixture = TestBed.createComponent(AllRequestsNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
