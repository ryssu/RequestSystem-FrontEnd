import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDogInfoComponent } from './view-dog-info.component';

describe('ViewDogInfoComponent', () => {
  let component: ViewDogInfoComponent;
  let fixture: ComponentFixture<ViewDogInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDogInfoComponent]
    });
    fixture = TestBed.createComponent(ViewDogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
