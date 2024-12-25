import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated();
    const userRole = this.authService.getUserRole(); // Get user role from AuthService
    const requiredRole = route.data['role']; // Get required role from route data

    if (isAuthenticated && userRole === requiredRole) {
      return true;
    } else {
      // Redirect to login if not authenticated, or to unauthorized page if role mismatch
      this.router.navigate(['/login']);
      return false;
    }
  }
}
