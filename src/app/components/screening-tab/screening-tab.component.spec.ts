import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningTabComponent } from './screening-tab.component';

describe('ScreeningTabComponent', () => {
  let component: ScreeningTabComponent;
  let fixture: ComponentFixture<ScreeningTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreeningTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
