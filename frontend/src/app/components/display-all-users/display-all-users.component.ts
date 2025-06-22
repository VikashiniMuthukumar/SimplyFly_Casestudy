import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user service/user.service';

@Component({
  selector: 'app-display-all-users',
  templateUrl: './display-all-users.component.html',
  styleUrls: ['./display-all-users.component.css']
})
export class DisplayAllUsersComponent implements OnInit {

   users: User[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => this.errorMessage = err.error?.message || 'Failed to load users'
    });
  }

  editUser(username: string) {
    localStorage.setItem('username', username);
    this.router.navigate(['/edit-user']);
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete user ${user.username}?`)) {
      this.userService.deleteUserById(user.id!).subscribe({
        next: () => {
          alert("User deleted successfully");
          this.loadAllUsers();
        },
        error: (err) => {
          console.error("Delete failed", err);
          alert("Failed to delete user");
        }
      });
    }
  }
}
