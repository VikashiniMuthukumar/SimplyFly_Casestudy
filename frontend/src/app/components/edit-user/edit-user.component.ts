import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  username: string = '';
  user: User = {
    username: '', email: '', password: '',
    id: 0
  };
  message: string = '';

  constructor(private userService: UserService, private router: Router) {}



ngOnInit(): void {
  const uname = localStorage.getItem('username');
  const role = localStorage.getItem('role'); // Save role during login

  if (uname) {
    this.username = uname;
    this.userService.getUserByUsername(uname).subscribe({
      next: (data) => {
        this.user = data;
        this.user.roles = role ?? data.roles; // For safety
      },
      error: (err) => {
        console.error("Error loading user data", err);
        this.message = err.error?.message || "Something went wrong while loading user.";
      }
    });
  }
}


updateUser() {
  console.log("Updating user with username:", this.username);
  this.userService.updateUser(this.username, this.user).subscribe({
    next: (res) => {
      console.log("Update response", res);
      this.message = "Profile updated successfully";
    },
    error: (err) => {
      console.error("Update failed", err);
      this.message = "Update failed: " + (err.error?.message || "Unknown error");
    }
  });
}


}
