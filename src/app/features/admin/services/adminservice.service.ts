import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  private apiUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'json' as 'json' 
  };

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/allproducts`);
  }

  getProductDetails(productId: string): Observable<any> {
    const url = `${this.apiUrl}/product/searchproduct?productId=${productId}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error fetching product details:', error);
        return throwError(() => new Error('Failed to fetch product details'));
      })
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product/deleteproduct?id=${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product/createproduct`, product);
  }

  createPurchase(purchaseData: any): Observable<any> {
    console.log('Purchase data:', purchaseData);
    return this.http.post(`${this.apiUrl}/offline-purchases/`, purchaseData, this.httpOptions);
  }

  // GET all offline purchases
  getAllPurchases(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/offline-purchases/`, this.httpOptions);
  }

  // GET a specific purchase by ID
  getPurchaseById(purchaseId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/offline-purchases/${purchaseId}/`, this.httpOptions);
  }

  // PUT update a specific purchase by ID
  updatePurchase(purchaseId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}${purchaseId}/`,
      updatedData,
      this.httpOptions
    );
  }

  // DELETE a specific purchase by ID
  deletePurchase(purchaseId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}${purchaseId}/`,
      this.httpOptions
    );
  }
}
