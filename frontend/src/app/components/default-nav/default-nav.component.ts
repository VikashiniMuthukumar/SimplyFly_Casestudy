import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-nav',
  templateUrl: './default-nav.component.html',
  styleUrls: ['./default-nav.component.css']
})
export class DefaultNavComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
