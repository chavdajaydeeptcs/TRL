import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScreeningsComponent } from './view-screenings.component';

describe('ViewScreeningsComponent', () => {
  let component: ViewScreeningsComponent;
  let fixture: ComponentFixture<ViewScreeningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewScreeningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScreeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
