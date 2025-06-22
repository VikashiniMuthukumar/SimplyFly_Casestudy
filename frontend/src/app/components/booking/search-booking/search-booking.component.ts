import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { BookingService } from 'src/app/service/booking service/booking.service';

@Component({
  selector: 'app-search-booking',
  templateUrl: './search-booking.component.html',
  styleUrls: ['./search-booking.component.css']
})
export class SearchBookingComponent {
  status: string = '';
  bookings: Booking[] = [];
  errorMsg: string = '';

  constructor(private bookingService: BookingService) {}

 

  getAllBookings() {
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: (err) => {
        console.error('Failed to fetch bookings', err);
      }
    });
  }

searchBooking(): void {
  const formattedStatus = this.status.trim().toUpperCase();  // 🔥 FIX: to match BookingStatus enum

  this.bookingService.getBookingsByStatus(formattedStatus).subscribe({
    next: (data) => {
      this.bookings = data;
      this.errorMsg = '';
    },
    error: (err) => {
      this.bookings = [];
      this.errorMsg = err.error.message || 'No bookings found with this status';
    }
  });
}



}
