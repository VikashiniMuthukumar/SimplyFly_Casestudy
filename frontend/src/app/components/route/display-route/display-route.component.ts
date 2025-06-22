import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/model/flightroute';
import { RouteService } from 'src/app/service/route service/route.service';

@Component({
  selector: 'app-display-route',
  templateUrl: './display-route.component.html',
  styleUrls: ['./display-route.component.css']
})
export class DisplayRouteComponent implements OnInit {
  routes: Route[] = [];
  selectedRoute: Route = new Route();
  showEditModal = false;
  errorMessage: string = '';

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {
    this.loadRoutes();
  }

  loadRoutes(): void {
    this.routeService.getAllRoutes().subscribe(data => {
      this.routes = data;
    });
  }

  openEditModal(route: Route): void {
    this.selectedRoute = { ...route };
    this.showEditModal = true;
  }

  closeModal(): void {
    this.showEditModal = false;
  }

  updateRoute(): void {
    if (this.selectedRoute.route_id) {
      this.routeService.updateRoute(this.selectedRoute.route_id, this.selectedRoute).subscribe(() => {
        this.loadRoutes();
        this.closeModal();
      });
    }
  }

  deleteRoute(id: number | undefined): void {
    if (id && confirm('Are you sure to delete this route?')) {
      this.routeService.deleteRoute(id).subscribe(() => {
        this.loadRoutes();
      });
    }
  }
}
