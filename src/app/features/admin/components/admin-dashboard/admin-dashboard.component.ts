import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatSidenavModule, RouterModule, MatSidenavModule, MatListModule, MatIconModule, MatMenuModule, MatButtonModule, MatExpansionModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  logo: string = '../../assets/logo.png';

  constructor(private router: Router) { }
  logout() {
    // Clear user session data (e.g., JWT, user details from localStorage/sessionStorage)
    localStorage.removeItem('token');  // Adjust this as per your storage mechanism
    
    // Optionally, redirect to login page
    this.router.navigate(['/auth/login']);
  }
}


