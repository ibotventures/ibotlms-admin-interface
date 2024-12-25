import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private apiUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'json' as 'json' 
  };

  constructor(private http: HttpClient) { }

  // Create a new assessment
  createAssessment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/assessments/`, data, this.httpOptions);
  }

  // Get assessments by module
  getAssessmentsByModule(moduleId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/assessments/module/${moduleId}/`);
  }

  // Get a specific assessment by ID
  getAssessmentById(assessmentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/assessments/${assessmentId}/`);
  }

  // Update an entire assessment (PUT)
  updateAssessment(assessmentId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/assessments/${assessmentId}/`, data, this.httpOptions);
  }

  // Partially update an assessment (PATCH)
  patchAssessment(assessmentId: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/assessments/${assessmentId}/`, data, this.httpOptions);
  }

  deleteAssessment(assessmentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/assessments/${assessmentId}/`);
  }
}
