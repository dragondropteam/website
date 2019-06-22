import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {AdminUserTableDataSource} from './admin-user-table-datasource';
import {UserService} from '../user.service';
import {CreateUserDialogComponent} from '../create-user-dialog/create-user-dialog.component';
import {UserModel} from '../user-model';

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

  constructor(private userService: UserService, private matDialog: MatDialog, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new AdminUserTableDataSource(this.paginator, this.sort, this.userService);
  }

  addUser() {
    const dialog = this.matDialog.open(CreateUserDialogComponent, {
      height: '800px',
      width: '600px'
    });

    dialog.afterClosed().subscribe(user => {
      if (user) {
        this.userService.createUser(user)
          .subscribe((newUser => {
            //Update the datasource
          }), (error) => {
            if (error.status === 409) {
              this.snackbar.open('User Already Exists', null, {
                duration: 2000
              });
            }
          });
      }
    });
  }
}
