import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AdminUserTableDataSource } from './admin-user-table-datasource';
import {UserService} from '../user.service';

@Component({
  selector: 'admin-user-table',
  templateUrl: './admin-user-table.component.html',
  styleUrls: ['./admin-user-table.component.css']
})
export class AdminUserTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: AdminUserTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['email', 'name', 'lastLogin'];

  constructor(private userService: UserService){
  }

  ngOnInit() {
    this.dataSource = new AdminUserTableDataSource(this.paginator, this.sort, this.userService);
  }
}
