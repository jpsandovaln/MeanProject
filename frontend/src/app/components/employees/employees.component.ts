import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/models/employee';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  selectedFile: File = null;
  displayedColumns: string[] = ['First Name','Last Name', 'Age', 'Image', 'Operations'];

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
    return false;
  }

  addEmployee(form: NgForm) {
    console.log(form.value);
    const fd = new FormData();
    fd.append('imageUpload', this.selectedFile);
    fd.append('firstName', form.value.firstName);
    fd.append('lastName', form.value.lastName);
    fd.append('age', form.value.age);   

    this.employeeService.addEmployee(fd)
      .subscribe( res => {
        this.resetForm(form);
      });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees()
      .subscribe(
          employees => {
            this.employees = employees;
            console.log(employees);
          },
          err => console.log(err)
      );
  }
}
