import { Component } from '@angular/core';

@Component({
  selector: 'app-flightowner-dashboard',
  templateUrl: './flightowner-dashboard.component.html',
  styleUrls: ['./flightowner-dashboard.component.css']
})
export class FlightownerDashboardComponent {

  username: string | null = localStorage.getItem('username');
}
