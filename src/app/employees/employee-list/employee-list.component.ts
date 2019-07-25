import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService) { }

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'phoneNumber', 'city'];
  ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
        const employeeArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.dataSource = new MatTableDataSource(employeeArray);
      });
  }

}
