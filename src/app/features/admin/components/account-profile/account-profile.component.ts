import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditDialogComponent } from '../profile-edit-dialog/profile-edit-dialog.component';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {
  user: any = {}; // Object to store user details

  constructor(public dialog: MatDialog, private http: HttpClient, private userservice: UsersService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.fetchUserDetails(userId); // Use service to fetch user details
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  fetchUserDetails(userId: string): void {
    this.userservice.getUserById(userId).subscribe(
      (response) => {
        this.user = response.data;
        console.log('User details:', this.user);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(ProfileEditDialogComponent, {
      width: '600px',
      data: this.user, // Pass user details to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
