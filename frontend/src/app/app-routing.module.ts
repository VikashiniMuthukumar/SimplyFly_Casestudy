import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookingComponent } from './components/booking/add-booking/add-booking.component';
import { FlightDashboardComponent } from './components/dashboard/flight-dashboard/flight-dashboard.component';
import { RouteDashboardComponent } from './components/dashboard/route-dashboard/route-dashboard.component';
import { DisplayBookingComponent } from './components/booking/display-booking/display-booking.component';
import { SearchBookingComponent } from './components/booking/search-booking/search-booking.component';
import { MainDashboardComponent } from './components/dashboard/main-dashboard/main-dashboard.component';
import { BookDashboardComponent } from './components/dashboard/book-dashboard/book-dashboard.component';
import { SearchFlightComponent } from './components/flight/search-flight/search-flight.component';
import { AddRouteComponent } from './components/route/add-route/add-route.component';
import { SearchRouteComponent } from './components/route/search-route/search-route.component';
import { DisplayRouteComponent } from './components/route/display-route/display-route.component';
import { DisplayFlightComponent } from './components/flight/display-flight/display-flight.component';
import { AddflightComponent } from './components/flight/addflight/addflight.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/dashboard/user-dashboard/user-dashboard.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FlightownerDashboardComponent } from './components/dashboard/flightowner-dashboard/flightowner-dashboard.component';
import { DisplayAllUsersComponent } from './components/display-all-users/display-all-users.component';
import { HomeComponent } from './components/home/home.component';
import { DisplayAllBookingComponent } from './components/display-all-booking/display-all-booking.component';


const routes: Routes = [
  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

 
{ path: '', component: HomeComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  {path: 'display-all-booking', component: DisplayAllBookingComponent},

  // User Management
  { path: 'display-users', component: DisplayAllUsersComponent },
  { path: 'edit-user', component: EditUserComponent },

  // Booking Management
  { path: 'add-booking', component: AddBookingComponent },
  { path: 'display-bookings', component: DisplayBookingComponent },
  { path: 'search-booking', component: SearchBookingComponent },

  // Flight Management
  { path: 'add-flight', component: AddflightComponent },
  { path: 'display-flights', component: DisplayFlightComponent },
  { path: 'search-flight', component: SearchFlightComponent },

  // Route Management
  { path: 'add-route', component: AddRouteComponent },
  { path: 'display-routes', component: DisplayRouteComponent },
  { path: 'search-route', component: SearchRouteComponent },

  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
{ path: 'add-booking', component: AddBookingComponent, canActivate: [AuthGuard] },
{ path: 'display-booking', component: DisplayBookingComponent, canActivate: [AuthGuard] },
{ path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuard] },

{ path: 'flight-owner-dashboard', component: FlightownerDashboardComponent, canActivate: [AuthGuard], data: { role: 'ROLE_FLIGHT_OWNER' } },

  { path: 'add-flight', component: AddflightComponent },
  { path: 'display-flights', component: DisplayFlightComponent },
  { path: 'search-flight', component: SearchFlightComponent },


  { path: 'add-route', component: AddRouteComponent },
  { path: 'display-routes', component: DisplayRouteComponent },
  { path: 'search-route', component: SearchRouteComponent },
  // Default & Wildcard
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
