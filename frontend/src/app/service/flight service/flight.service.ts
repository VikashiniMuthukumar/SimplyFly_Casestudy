import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/model/Flight';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private baseUrl = 'http://localhost:8081/api/flights';

  constructor(private http: HttpClient) {}

  addFlight(flight: Flight): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, flight, {
      responseType: 'text',
    });
  }

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}/all`);
  }

  updateFlight(flightId: number, flightDTO: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${flightId}`, flightDTO);
  }

  deleteFlight(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getFlightByCode(flightCode: string): Observable<Flight> {
    return this.http.get<Flight>(`${this.baseUrl}/byCode/${flightCode}`);
  }

 getAllFlightCodes(): Observable<string[]> {
  return this.http.get<string[]>('http://localhost:8081/api/flights/codes');
}

getFlightByCodeAndRoute(code: string, from: string, to: string): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}search?code=${code}&origin=${from}&destination=${to}`);
}


  
}
