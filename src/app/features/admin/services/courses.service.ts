import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
  private apiUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  // Get all courses
  getCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses/`, this.httpOptions);
  }

  // Get a course by ID
  getCourseById(courseId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses/${courseId}/`, this.httpOptions);
  }

  // Create a new course
  private headers = new HttpHeaders({
    'Accept-Encoding': 'gzip, deflate',
  });

  createCourse(courseData: any): Observable<any> {
    console.log('courseData:', courseData);
    return this.http.post(`${this.apiUrl}/courses/`, courseData, { headers: this.headers });  
  }

  // Update a course (PUT)
  updateCourse(courseId: string, courseData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/courses/${courseId}/`, courseData, this.httpOptions);
  }

  // Partially update a course (PATCH)
  patchCourse(courseId: string, courseData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/courses/${courseId}/`, courseData, this.httpOptions);
  }

  // Delete a course
  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/courses/${courseId}/`, this.httpOptions);
  }

  updateCourseVisibility(courseId: string, status: boolean): Observable<any> {
    const params = new HttpParams()
      .set('course_id', courseId)
      .set('status', status.toString());

    return this.http.get(`${this.apiUrl}/course-user-visibility/`, { params });
  }
}
