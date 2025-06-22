import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/model/flightroute';
import { RouteService } from 'src/app/service/route service/route.service';
import { FlightService } from 'src/app/service/flight service/flight.service';

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.css']
})
export class SearchRouteComponent implements OnInit {

  searchFlightCode: string = '';
  routes: Route[] = [];
  errorMsg: string = '';
  flightCodes: string[] = [];

  constructor(private routeService: RouteService, private flightService: FlightService) {}

  ngOnInit(): void {
  this.flightService.getAllFlightCodes().subscribe({
    next: (codes) => this.flightCodes = codes,
    error: () => this.flightCodes = []
  });
}


  searchRoutes(): void {
    if (!this.searchFlightCode) return;

    this.routeService.getRoutesByFlightCode(this.searchFlightCode).subscribe({
      next: (data) => {
        this.routes = data;
        this.errorMsg = '';
      },
      error: () => {
        this.routes = [];
        this.errorMsg = 'No routes found for this flight code.';
      }
    });
  }
}
