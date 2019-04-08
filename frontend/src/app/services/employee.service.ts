import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: Employee;

  readonly URL_API = 'http://localhost:3000/crud/employees/';
  
  HttpUploadOptions  = {
    headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
  }
  constructor(private http: HttpClient) {
    this.selectedEmployee = new Employee();
   }

  getAllEmployees() {
    return this.http.get<Employee[]>(this.URL_API);  
  }

  addEmployee(employee: FormData) {
    return this.http.post(this.URL_API, employee, {
      reportProgress: true,
      observe: 'events'
    }).pipe();
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.URL_API + `/${ employee._id }`, employee);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.URL_API + `/${ _id }`);
  }
}
