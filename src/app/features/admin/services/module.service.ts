import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private apiUrl = environment.apiUrl;  // Base URL from environment file

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),
  };

  constructor(private http: HttpClient) { }

  // POST Request: Create a new module
  createModule(moduleData: any): Observable<any> {
    // Define headers
    const headers = {
      'Accept-Encoding': 'gzip, deflate',
    };
  
    // Send POST request with headers
    return this.http.post(`${this.apiUrl}/modules/`, moduleData, { headers });
  }
  

  // GET Request: Get a specific module by ID
  getModuleById(moduleId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/modules/module/${moduleId}/`, this.httpOptions);
  }

  // GET Request: Get all modules for a specific course
  getModulesByCourse(courseId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/modules/course/${courseId}/`, this.httpOptions);
  }

  // PUT Request: Update an existing module by ID
  updateModule(moduleId: string, updatedModuleData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/modules/${moduleId}/`, updatedModuleData, this.httpOptions);
  }

  // PATCH Request: Partially update an existing module by ID
  patchModule(moduleId: string, updatedFields: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/modules/module/${moduleId}/`, updatedFields, this.httpOptions);
  }

  // DELETE Request: Delete a module by ID
  deleteModule(moduleId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/modules/delete/${moduleId}/`, this.httpOptions);
  }

  getFile(moduleId: string, filePath: string): Observable<Blob> {
    const url = `${this.apiUrl}/module/file/`;
    const params = {
      module_id: moduleId,
      file_path: filePath,
    };
    
    return this.http.get(url, {
      params,
      responseType: 'blob', // Specify Blob to handle file download
    });
  }
  
}
