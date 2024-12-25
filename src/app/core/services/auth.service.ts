import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };
    console.log('Sending login request with body:', body);  // Debug log
    return this.http.post<any>(`${this.apiUrl}/user/signin/`, body);
  }

  signup(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    console.log('Sending signup request with payload:', payload);  // Debug log
  
    return this.http.post<any>(`${this.apiUrl}/user/signup`, payload, { headers }).pipe(
      catchError(error => {
        console.error('Signup error in AuthService:', error);
        return throwError(error);
      })
    );
  }
  

  isAuthenticated(): boolean {
    // Implement logic to check if the user is authenticated
    // For example, check if a JWT token exists in localStorage
    return !!localStorage
    
    .getItem('token');
  }

  getUserRole(): string | null {
    // Retrieve role from local storage or wherever it’s stored
    return localStorage.getItem('role'); // e.g., 'admin' or 'user'
  }

  // Example method for setting role (e.g., on login)
  setUserRole(role: string) {
    localStorage.setItem('role', role);

  }
}
