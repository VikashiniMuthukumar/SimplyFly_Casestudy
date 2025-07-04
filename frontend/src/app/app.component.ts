import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simplyfly';

   isLoggedIn: boolean = false;

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }
}
