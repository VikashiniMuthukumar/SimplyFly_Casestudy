

import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { BookingService } from 'src/app/service/booking service/booking.service';

@Component({
  selector: 'app-display-booking',
  templateUrl: './display-booking.component.html',
  styleUrls: ['./display-booking.component.css']
})
export class DisplayBookingComponent implements OnInit {
  userBookings: Booking[] = [];
  selectedBooking: Booking = new Booking();
  showEditModal: boolean = false;

  constructor(private bookingService: BookingService) {}

 ngOnInit(): void {
  const username = localStorage.getItem("username");
  if (username) {
    this.bookingService.getBookingsByUsername(username).subscribe({
      next: (data) => {
        console.log("Received bookings:", data); // 👈 DEBUG this
        this.userBookings = data.filter(b =>
          b.departureTime && b.arrivalTime && b.baseFare > 0
        );
      },
      error: (err) => console.error('Error loading bookings:', err)
    });
  }
}


  deleteBooking(bookingId: number) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(bookingId).subscribe({
        next: () => {
          alert('Booking deleted');
          this.userBookings = this.userBookings.filter(b => b.bookingId !== bookingId);
        },
        error: (err) => alert('Error deleting booking')
      });
    }
  }

  openEditModal(booking: Booking) {
    this.selectedBooking = { ...booking };
    this.showEditModal = true;
  }

  closeModal() {
    this.showEditModal = false;
  }

 updateBooking() {
  if (!this.selectedBooking.baseFare || !this.selectedBooking.seat || this.selectedBooking.seat < 1) {
    alert('Base Fare or Seat is missing. Cannot update booking.');
    return;
  }

  this.selectedBooking.totalFare = this.selectedBooking.baseFare * this.selectedBooking.seat;

  this.bookingService.updateBooking(this.selectedBooking.bookingId!, this.selectedBooking).subscribe({
    next: () => {
      alert('Booking updated');
      this.ngOnInit();
      this.closeModal();
    },
    error: () => alert('Error updating booking')
  });
}

}
