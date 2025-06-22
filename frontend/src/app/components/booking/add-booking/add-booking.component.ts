import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/service/flight service/flight.service';
import { RouteService } from 'src/app/service/route service/route.service';
import { BookingService } from 'src/app/service/booking service/booking.service';
import { Flight } from 'src/app/model/Flight';
import { Booking } from 'src/app/model/booking';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
})
export class AddBookingComponent implements OnInit {
  booking: Booking = {
    username: '',
    flightCode: '',
    flightName: '',
    origin: '',
    destination: '',
    arrivalTime: '',
    departureTime: '',
    baseFare: 0,
    seat: 1,
    checkInBaggageLimit: 0,
    cabinBaggageLimit: 0,
    status: 'APPLIED',
    totalFare: 0,
    bookDate: '',
    bookedAt: '',
  };

  minDate: string = '';
  message = '';
  flights: Flight[] = [];
  origins: string[] = [];
  destinations: string[] = [];

  constructor(
    private flightService: FlightService,
    private routeService: RouteService,
    private bookingService: BookingService
  ) {}

 ngOnInit(): void {
  // Set minimum date to tomorrow
  const today = new Date();
  today.setDate(today.getDate() + 1);
  this.minDate = today.toISOString().split('T')[0];

  // Fetch flight data
  this.flightService.getAllFlights().subscribe({
    next: (data) => (this.flights = data),
    error: (err) => console.error('Failed to load flights', err),
  });
}


  onFlightCodeSelect(): void {
    const code = this.booking.flightCode;
    const selected = this.flights.find(f => f.flightCode === code);

    if (selected) {
      this.booking.flightName = selected.name;
      this.booking.checkInBaggageLimit = selected.checkInBaggageLimit;
      this.booking.cabinBaggageLimit = selected.cabinBaggageLimit;
    }

    this.routeService.getRoutesByFlightCode(code).subscribe((routes) => {
      this.origins = [...new Set(routes.map(r => r.origin))];
      this.destinations = [...new Set(routes.map(r => r.destination))];
      this.booking.origin = '';
      this.booking.destination = '';
    });
  }

  onRouteSelect(): void {
    const { origin, destination, flightCode } = this.booking;
    if (origin && destination && flightCode) {
      this.routeService.getRouteFlightInfo(origin, destination, flightCode).subscribe((data) => {
        this.booking.arrivalTime = data.arrivalTime;
        this.booking.departureTime = data.departureTime;
        this.booking.baseFare = data.baseFare;
        this.calculateTotalFare();
      });
    }
  }

  calculateTotalFare(): void {
    const seats = this.booking.seat || 1;
    this.booking.totalFare = this.booking.baseFare * seats;
  }


submitBooking(): void {
  this.booking.username = localStorage.getItem('username') || '';
  this.booking.bookedAt = new Date().toISOString();

  this.bookingService.addBooking(this.booking).subscribe({
    next: (res) => {
      this.message = 'Booking Successful!';
      this.resetForm();
    },
    error: (err) => {
      console.error('Booking Failed:', err);
      this.message = 'Booking Failed: ' + err.error;
    },
  });
}


  resetForm(): void {
    this.booking = {
      username: '',
      flightCode: '',
      flightName: '',
      origin: '',
      destination: '',
      arrivalTime: '',
      departureTime: '',
      baseFare: 0,
      seat: 1,
      checkInBaggageLimit: 0,
      cabinBaggageLimit: 0,
      status: 'APPLIED',
      totalFare: 0,
      bookDate: '',
      bookedAt: '',
    };
  }
}
