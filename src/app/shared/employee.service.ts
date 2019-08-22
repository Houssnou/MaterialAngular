import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase: AngularFireDatabase,
              private datePipe: DatePipe) { }

  employeeList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });


 // new Date(new FormControl(''));

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      phoneNumber: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false
    });
  }

  // get operations
  getEmployees() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }

  // post
  insertEmployee(employee) {
    this.employeeList.push({
      fullName: employee.fullName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate: employee.hireDate === ' ' ? ' ' : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      isPermanent: employee.isPermanent
    });
  }

  // put
  updateEmployee(employee) {
    this.employeeList.update(employee.$key, {
      fullName: employee.fullName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate: employee.hireDate === ' ' ? ' ' : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      isPermanent: employee.isPermanent
    });
  }

  // delete
  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }

  populateForm(employee) {
    this.form.setValue(_.omit(employee, 'departmentName'));
  }
}
