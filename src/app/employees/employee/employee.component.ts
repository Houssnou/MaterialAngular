import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { EmployeeService } from 'src/app/shared/employee.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>) { }

  // departments = [
  //   { id: 1, value: 'HR' },
  //   { id: 2, value: 'Engineering Team' },
  //   { id: 3, value: 'Billing' },
  //   { id: 4, value: 'Customer Service' },
  //   { id: 5, value: 'Technical Service' }
  // ];

  ngOnInit() {
    this.service.getEmployees();
  }

  onClear() {
    // reset the form
    this.service.form.reset();

    // initialize the form to with default values
    this.service.initializeFormGroup();
  }

  onSubmit() {
    // console log inputs
    console.log(this.service.form.value);
    // if form is valid
    if (this.service.form.valid) {
      // submit data to firebase
      // console.log(this.service.form.value);

      if (!this.service.form.get('$key').value) {
        this.service.insertEmployee(this.service.form.value);
      } else {
        this.service.updateEmployee(this.service.form.value);
      }
      // reset the form after successfull insertion
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted Successfully');
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
