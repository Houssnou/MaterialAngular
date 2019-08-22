import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DepartmentService } from 'src/app/shared/department.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService,
              private departmentService: DepartmentService) { }

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'phoneNumber', 'city', 'departmentName', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
        const employeeArray = list.map(item => {
          // tslint:disable-next-line:prefer-const
          let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
          return {
            $key: item.key,
            departmentName,
            ...item.payload.val()
          };
        });
        this.dataSource = new MatTableDataSource(employeeArray);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter) => {
            return this.displayedColumns.some(elt => {
              return elt !== 'actions' && data[elt].toLowerCase().indexOf(filter) !== -1;
            });
        };
      });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
