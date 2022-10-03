import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicianRegistrationComponent } from './clinician-registration.component';

describe('ClinicianRegistrationComponent', () => {
  let component: ClinicianRegistrationComponent;
  let fixture: ComponentFixture<ClinicianRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicianRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicianRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
