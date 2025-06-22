import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear(); // or remove only token/user info if needed
    this.router.navigate(['/login']);
  }
}
