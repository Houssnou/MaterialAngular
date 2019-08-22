import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departmentList: AngularFireList<any>;
  departmentArray = [];

  constructor(private firebase: AngularFireDatabase) {
    this.departmentList = this.firebase.list('departments');
    this.departmentList.snapshotChanges().subscribe(
      list => {
      this.departmentArray = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  getDepartmentName($key: string) {
    if ($key === '0') {
      return '';
    } else {
      // tslint:disable-next-line:arrow-return-shorthand
      return _.find(this.departmentArray, (obj) => { return obj.$key === $key; })['name'];
    }
  }
}
