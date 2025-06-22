import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/model/booking';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://localhost:8081/api/bookings';

  constructor(private http: HttpClient) {}

  // ✅ Add booking
  addBooking(booking: Booking): Observable<string> {
  return this.http.post(`${this.baseUrl}`, booking, { responseType: 'text' });
}


  // ✅ Get all bookings
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl);
  }

  // ✅ Get booking by ID
  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${id}`);
  }

  // ✅ Get bookings by username
  getBookingsByUsername(username: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/user/${username}`);
  }

  // ✅ Update booking
  updateBooking(id: number, booking: Booking): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}`, booking, { responseType: 'text' });
}


  // ✅ Delete booking
  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ✅ Get bookings by status
  getBookingsByStatus(status: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/status/${status}`);
  }

  // ✅ Get user by username
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/api/users/${username}`);
  }
}
