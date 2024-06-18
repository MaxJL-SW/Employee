import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  newEmployee: any = {};
  editingEmployee: any = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  addEmployee(): void {
    this.employeeService.addEmployee(this.newEmployee).subscribe((employee) => {
      this.employees.push(employee);
      this.newEmployee = {};
    });
  }

  editEmployee(employee: any): void {
    this.editingEmployee = { ...employee };
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.editingEmployee.id, this.editingEmployee).subscribe(() => {
      this.loadEmployees();
      this.editingEmployee = null;
    });
  }

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }
}
