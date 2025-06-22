import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Route } from 'src/app/model/flightroute';
import { AuthService } from '../auth service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private baseUrl = 'http://localhost:8081/api/routes';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken()
    });
  }

 addRoute(route: Route): Observable<string> {
  const token = localStorage.getItem('token'); // or use AuthService.getToken()

  return this.http.post(`${this.baseUrl}/add`, route, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    responseType: 'text'
  });
}



  updateRoute(id: number, route: Route): Observable<string> {
    return this.http.put(`${this.baseUrl}/update/${id}`, route, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

  deleteRoute(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

  getAllRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(`${this.baseUrl}/getAll`, {
      headers: this.getAuthHeaders()
    });
  }

  getRouteById(id: number): Observable<Route> {
    return this.http.get<Route>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getRoutesByFlightCode(flightCode: string): Observable<Route[]> {
    return this.http.get<Route[]>(`${this.baseUrl}/flightCode/${flightCode}`, {
      headers: this.getAuthHeaders()
    });
  }

  getRouteFlightInfo(origin: string, destination: string, flightCode: string): Observable<any> {
    const params = new HttpParams()
      .set('origin', origin)
      .set('destination', destination)
      .set('flightCode', flightCode);

    return this.http.get(`${this.baseUrl}/route-flight-info`, {
      params,
      headers: this.getAuthHeaders()
    });
  }

  getOriginsAndDestinationsByFlightCode(flightCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/origins-destinations/${flightCode}`, {
      headers: this.getAuthHeaders()
    });
  }
}
