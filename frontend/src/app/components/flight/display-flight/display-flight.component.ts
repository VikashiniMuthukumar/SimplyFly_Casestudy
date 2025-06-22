import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/model/Flight';
import { FlightService } from 'src/app/service/flight service/flight.service';

@Component({
  selector: 'app-display-flight',
  templateUrl: './display-flight.component.html',
  styleUrls: ['./display-flight.component.css'],
})
export class DisplayFlightComponent implements OnInit {
  flights: Flight[] = [];
  selectedFlight: Flight = new Flight();
  showEditModal: boolean = false;
  
  errorMessage: string = '';

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe((data) => {
      this.flights = data;
    });
  }
  getAllFlights() {
    this.flightService.getAllFlights().subscribe((data) => {
      this.flights = data;
    });
  }

  deleteFlight(flightId: number) {
    if (confirm('Are you sure you want to delete this flight?')) {
      this.flightService.deleteFlight(flightId).subscribe({
        next: () => {
          alert('Flight deleted successfully');
          this.getAllFlights();
        },
        error: (err) => {
          console.error('Delete error', err);
          alert('Error deleting flight');
        },
      });
    }
  }

  openEditModal(flight: Flight) {
    this.selectedFlight = { ...flight }; // Clone object to avoid direct mutation
    this.showEditModal = true;
  }

  closeModal() {
    this.showEditModal = false;
  }

  updateFlight() {
    this.flightService
      .updateFlight(this.selectedFlight.flightId!, this.selectedFlight)
      .subscribe({
        next: () => {
          alert('Flight updated successfully');
          this.getAllFlights();
          this.closeModal();
        },
        error: (err) => {
          console.error('Update error', err);
          alert('Error updating flight');
        },
      });
  }
}
