import { Component } from '@angular/core';
import { Flight } from 'src/app/model/Flight';
import { FlightService } from 'src/app/service/flight service/flight.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addflight',
  templateUrl: './addflight.component.html',
  styleUrls: ['./addflight.component.css']
})
export class AddflightComponent {


  flight: Flight = new Flight();
  message: string = '';
  

  constructor(private flightService: FlightService) {}

  addFlight(form :NgForm) {

  this.flightService.addFlight(this.flight).subscribe({
    next: data => {
      this.message = "Flight added successfully!";
      this.flight = new Flight(); 
      form.resetForm();
    },
    error: err => {
      console.error("Error response:", err);
      this.message = "Error adding flight!";
    }
  });
}
}
