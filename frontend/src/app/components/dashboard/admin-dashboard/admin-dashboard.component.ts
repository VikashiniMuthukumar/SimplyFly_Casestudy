import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  dashboardItems = [
    { title: 'View All Users', link: '/display-users' },
    { title: 'Add Booking', link: '/add-booking' },
    { title: 'Display All Bookings', link: '/display-all-booking' },
    { title: 'Search Booking', link: '/search-booking' },
    { title: 'Add Flight', link: '/add-flight' },
    { title: 'Display Flights', link: '/display-flights' },
    { title: 'Search Flights', link: '/search-flight' },
    { title: 'Add Route', link: '/add-route' },
    { title: 'Display Routes', link: '/display-routes' },
    { title: 'Search Routes', link: '/search-route' },
    { title: 'Edit Profile', link: '/edit-user' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
