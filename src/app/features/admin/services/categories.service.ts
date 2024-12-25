import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })  };

  constructor(private http: HttpClient) { }
  
  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories/`, data, this.httpOptions);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/`, this.httpOptions);
  }

  updateCategory(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/categories/${id}/`, data, this.httpOptions);
  }


  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}/`, this.httpOptions);
  }
}
