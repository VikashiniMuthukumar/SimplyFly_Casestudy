import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

 

login() {
  this.authService.login({ username: this.username, password: this.password }).subscribe(
    (response) => {
      const token = response.token;

      // Save token
      this.authService.saveToken(token);

      // Save username
      localStorage.setItem('username', this.username);

      // Decode token
      const decoded: any = this.authService.decodeToken(token);
      const role = decoded.roles[0]?.authority;

      // Redirect based on role
      if (role === 'ROLE_USER') {
        this.router.navigate(['/user-dashboard']).then(() => {
          window.location.reload(); // 🔁 Force reload to refresh navbar
        });
      } else if (role === 'ROLE_ADMIN') {
        this.router.navigate(['/admin-dashboard']).then(() => {
          window.location.reload();
        });
      } else if (role === 'ROLE_FLIGHT_OWNER') {
        this.router.navigate(['/flight-owner-dashboard']).then(() => {
          window.location.reload();
        });
      } else {
        this.message = 'Unknown role. Please contact admin.';
      }
    },
    (error) => {
      this.message = 'Login failed. Invalid credentials.';
    }
  );
}



}


 // login() {
  //   this.auth.login({ username: this.username, password: this.password }).subscribe({
  //     next: res => {
  //       this.auth.saveToken(res.token);
  //       const role = this.auth.getRole();
  //       if (role === 'ROLE_ADMIN') this.router.navigate(['/book']);
  //       else if (role === 'ROLE_FLIGHT_OWNER') this.router.navigate(['/flight']);
  //       else this.router.navigate(['/route']);
  //     },
  //     error: () => this.message = 'Login failed. Check credentials.'
  //   });
  // }

// login() {
//   this.authService.login({ username: this.username, password: this.password }).subscribe(
//     (response) => {
//       const token = response.token;
//       this.authService.saveToken(token);

//       const decoded: any = this.authService.decodeToken(token);
//       const role = decoded.roles[0]?.authority; // ROLE_USER / ROLE_ADMIN / ROLE_FLIGHT_OWNER

//       console.log('Extracted role:', role);

//        localStorage.setItem('username', this.username);


//       // Redirect based on role
//       if (role === 'ROLE_USER') {
//         this.router.navigate(['/user-dashboard']);
//       } else if (role === 'ROLE_ADMIN') {
//         this.router.navigate(['/admin-dashboard']);
//       } else if (role === 'ROLE_FLIGHT_OWNER') {
//         this.router.navigate(['/flight-owner-dashboard']);
//       } else {
//         this.message = 'Unknown role. Please contact admin.';
//       }
//     },
//     (error) => {
//       this.message = 'Login failed. Invalid credentials.';
//     }
//   );
// }
