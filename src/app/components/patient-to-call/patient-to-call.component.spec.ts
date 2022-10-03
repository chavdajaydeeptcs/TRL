import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientToCallComponent } from './patient-to-call.component';

describe('PatientToCallComponent', () => {
  let component: PatientToCallComponent;
  let fixture: ComponentFixture<PatientToCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientToCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientToCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
