import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/get/${username}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateUser(username: string, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${username}`, user, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json'
      
    });
  }

  getAllUsers(): Observable<User[]> {
  return this.http.get<User[]>('http://localhost:8081/api/users');
}

deleteUserById(id: number): Observable<any> {
  return this.http.delete(`http://localhost:8081/api/users/${id}`, { responseType: 'text' });
}



  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
