import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })  };

  constructor(private http: HttpClient) { }


  createProduct(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/`, data);
  }

  getProduct(id: string): Observable<any> {
    const url = `${this.apiUrl}/products/${id}/`;
    return this.http.get(url, this.httpOptions);
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/`, this.httpOptions);
  }

  updateProduct(id: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/products/${id}/`;
    return this.http.put(url, data, this.httpOptions);
  }

  deleteProduct(id: string): Observable<any> {
    const url = `${this.apiUrl}/products/${id}/`;
    return this.http.delete(url, this.httpOptions);
  }
}
