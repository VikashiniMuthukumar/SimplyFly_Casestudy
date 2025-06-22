import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { BookingService } from 'src/app/service/booking service/booking.service';

@Component({
  selector: 'app-display-all-booking',
  templateUrl: './display-all-booking.component.html',
  styleUrls: ['./display-all-booking.component.css']
})
export class DisplayAllBookingComponent implements OnInit {

  bookings: Booking[] = [];
  errorMessage: string = '';
  selectedBooking: Booking = new Booking();
  showEditModal: boolean = false;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadAllBookings();
  }

  loadAllBookings() {
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        console.log("All bookings received:", data);
        this.bookings = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load bookings';
      }
    });
  }

  deleteBooking(id?: number) {
    if (!id) {
      alert('Booking ID is missing!');
      return;
    }

    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          alert('Booking deleted successfully.');
          this.loadAllBookings();
        },
        error: () => alert('Failed to delete booking.')
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
        alert('Booking updated successfully.');
        this.loadAllBookings();
        this.closeModal();
      },
      error: () => alert('Failed to update booking.')
    });
  }
}
