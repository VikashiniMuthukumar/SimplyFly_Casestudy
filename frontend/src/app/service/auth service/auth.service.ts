
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtResponse } from 'src/app/model/JwtResponse';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8081/api/auth';

  // 👇 BehaviorSubject for login state
  private loggedIn = new BehaviorSubject<boolean>(this.isTokenPresent());

  constructor(private http: HttpClient) {}

  // 👇 Expose Observable
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private isTokenPresent(): boolean {
    return !!localStorage.getItem('token');
  }

  login(data: { username: string; password: string }): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/login`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false); // 🔁 broadcast logout
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true); // 🔁 broadcast login
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  }

  getRole(): string {
    const token = this.getToken();
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles || '';
    } catch (e) {
      console.error('Error decoding token:', e);
      return '';
    }
  }

  isLoggedIn(): boolean {
    return this.isTokenPresent();
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, { responseType: 'text' });
  }
}
