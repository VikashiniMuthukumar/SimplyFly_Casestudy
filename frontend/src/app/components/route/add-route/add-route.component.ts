

import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/service/route service/route.service';
import { Route } from 'src/app/model/flightroute';
import { Flight } from 'src/app/model/Flight';
import { FlightService } from 'src/app/service/flight service/flight.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css'],
})
export class AddRouteComponent implements OnInit {
  route: Route = new Route();
  flights: Flight[] = [];
  message =  ""

  constructor(
    private routeService: RouteService,
    private flightService: FlightService
  ) {}



  ngOnInit(): void {
  this.flightService.getAllFlights().subscribe((data) => {
    this.flights = data;
    console.log("Loaded Flights: ", this.flights); // ✅ Debug log
  });
}


  insertRoute(): void {
     console.log("Inserting Route:", this.route);

    this.routeService.addRoute(this.route).subscribe({
      next: (res) => alert(res),
      error: (err) => {
        console.error(err);
        alert('Error occurred while adding route');
      },
    });
  }
}
