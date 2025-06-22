import { Component } from '@angular/core';
import { Flight } from 'src/app/model/Flight';
import { FlightService } from 'src/app/service/flight service/flight.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent {

  flightCode: string = '';
  flight: Flight | null = null;
  errorMsg: string = '';

  constructor(private flightService: FlightService) {}

  searchFlight(): void {
    this.flightService.getFlightByCode(this.flightCode).subscribe({
      next: (data) => {
        this.flight = data;
        this.errorMsg = '';
      },
      error: (err) => {
        this.flight = null;
        this.errorMsg = err.error.message || 'Flight not found';
      }
    });
  }
}
