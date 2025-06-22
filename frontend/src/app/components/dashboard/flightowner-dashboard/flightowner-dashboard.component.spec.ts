import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightownerDashboardComponent } from './flightowner-dashboard.component';

describe('FlightownerDashboardComponent', () => {
  let component: FlightownerDashboardComponent;
  let fixture: ComponentFixture<FlightownerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightownerDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightownerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
