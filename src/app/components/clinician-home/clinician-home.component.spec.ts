import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicianHomeComponent } from './clinician-home.component';

describe('ClinicianHomeComponent', () => {
  let component: ClinicianHomeComponent;
  let fixture: ComponentFixture<ClinicianHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicianHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicianHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
