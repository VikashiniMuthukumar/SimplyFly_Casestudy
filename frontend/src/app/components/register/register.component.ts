import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
password: string = '';
email: string = '';
role: string = '';
airlineName: string = '';
contactNumber: string = '';
message: string = '';


  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    const newUser = {
      username: this.username,
      password: this.password,
      email: this.email,
      roles: this.role
    };

    this.authService.register(newUser).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        if (err.status === 409) {
          this.message = 'Username already exists.';
        } else if (err.error && typeof err.error === 'string') {
          this.message = err.error; // Show backend error message
        } else {
          this.message = 'Registration failed. Please try again.';
        }
      }
    });
  }



}
