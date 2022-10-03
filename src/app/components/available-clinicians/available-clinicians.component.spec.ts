import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCliniciansComponent } from './available-clinicians.component';

describe('AvailableCliniciansComponent', () => {
  let component: AvailableCliniciansComponent;
  let fixture: ComponentFixture<AvailableCliniciansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableCliniciansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableCliniciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
