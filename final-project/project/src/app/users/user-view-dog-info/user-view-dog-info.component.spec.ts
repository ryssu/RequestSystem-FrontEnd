import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewDogInfoComponent } from './user-view-dog-info.component';

describe('UserViewDogInfoComponent', () => {
  let component: UserViewDogInfoComponent;
  let fixture: ComponentFixture<UserViewDogInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewDogInfoComponent]
    });
    fixture = TestBed.createComponent(UserViewDogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
