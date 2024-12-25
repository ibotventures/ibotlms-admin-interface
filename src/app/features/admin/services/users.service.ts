import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl; 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getAllUserDetails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/signin/`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Sign up user (POST request)
  signUpUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/`, userData, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Sign in user (POST request)
  signInUser(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/signin/`, credentials, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get user by ID (GET request)
  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}/`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update user details (PUT request)
  updateUser(userId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/${userId}/`, updatedData, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Partially update user details (PATCH request)
  patchUser(userId: string, updatedData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/user/${userId}/`, updatedData, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete user (DELETE request)
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user/${userId}/`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Handle errors from HTTP requests
  private handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
