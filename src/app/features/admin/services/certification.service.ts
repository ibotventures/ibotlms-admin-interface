import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CertificationService {
 private apiUrl = environment.apiUrl;
 
   private httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
     }),
     responseType: 'json' as 'json' 
   };
 
   constructor(private http: HttpClient) { }

  // Create Certification
  createCertification(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/certification/`, data);
  }

  // Get Certification by ID
  getCertificationById(certificationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/certification/${certificationId}/`);
  }

  // Get Certifications by Course ID
  getCertificationsByCourseId(courseId: string): Observable<any> {
    const params = new HttpParams().set('course_id', courseId);
    return this.http.get(`${this.apiUrl}/certification/`, { params });
  }

  // Update Certification
  updateCertification(certificationId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/certification/${certificationId}/`, data);
  }

  // Delete Certification
  deleteCertification(certificationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/certification/${certificationId}/`);
  }

  // Create Certification Question
  createCertificationQuestion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/certification-question/`, data);
  }

  // Get Certification Questions by Certification ID
  getCertificationQuestionsByCertificationId(certificationId: string): Observable<any> {
    const params = new HttpParams().set('certification_id', certificationId);
    return this.http.get(`${this.apiUrl}/certification-question/`, { params });
  }

  // Get Certification Question by ID
  getCertificationQuestionById(questionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/certification-question/${questionId}/`);
  }

  // Update Certification Question
  updateCertificationQuestion(questionId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/certification-question/${questionId}/`, data);
  }

  // Delete Certification Question
  deleteCertificationQuestion(questionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/certification-question/${questionId}/`);
  }
}
