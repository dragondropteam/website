/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import {Component, OnInit} from '@angular/core';
import {ReleaseService} from '../release.service';
import {MatDialog, MatSnackBar, MatTable, MatTableDataSource} from '@angular/material';
import {NewReleaseDialogComponent} from '../new-release-dialog/new-release-dialog.component';
import {Release} from '../release/release.model';
import {EditReleaseDialogComponent} from '../edit-release-dialog/edit-release-dialog.component';
import {ConfirmDeleteComponent} from '../confirm-delete/confirm-delete.component';


// export class ReleaseDataSource extends MatTableDataSource<ReleaseMo> {
//   connect(): BehaviorSubject<any[]> {
//     return this.releaseService.getReleases();
//   }
//
//   disconnect(): void {
//   }
//
//   constructor(private releaseService: ReleaseService) {
//     super();
//   }
//
//   refresh(){
//     this.releaseService.getReleases().subscribe(releases => this.data = releases);
//   }
// }

@Component({
  selector: 'app-release-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.css']
})
export class ReleaseListComponent implements OnInit {
  displayedColumns = ['version', 'channel', 'changenotes', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  constructor(private releaseService: ReleaseService, private dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  refresh() {
    this.releaseService.getReleases().subscribe(releases => this.dataSource.data = releases);
  }

  ngOnInit() {
    this.refresh();
  }

  createRelease() {
    const dialogRef = this.dialog.open(NewReleaseDialogComponent, {
      height: '89%',
      width: '70%',
      maxHeight: '600px',
      maxWidth: '800px'
    });

    dialogRef.afterClosed().subscribe(release => {
      if (release) {
        this.releaseService.createRelease(release)
          .subscribe(newRelease => {
            if (newRelease) {
              console.log(newRelease);
              this.refresh();
            }
          });
      }
    });
  }

  editRelease(release: Release) {
    const dialogRef = this.dialog.open(EditReleaseDialogComponent, {
      data: {release: release},
      height: '78vh',
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(editedRelease => {
      if (editedRelease) {
        this.releaseService.updateRelease(editedRelease).subscribe(result => console.log(result));
      }
    });
  }

  deleteRelease(release: Release) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {});

    dialogRef.afterClosed().subscribe(del => {
      if (del) {
        this.releaseService.deleteRelease(release._id)
          .subscribe(deletedRelease => {
            if (deletedRelease) {
              this.refresh();

              const snackBarRef = this.snackBar.open(`${release.version} deleted`, 'Undo');

              snackBarRef.onAction().subscribe(() => {
                console.log('On Action');
                this.releaseService.createRelease(deletedRelease).subscribe(release_ => {
                  if (release_) {
                    this.refresh();
                    return;
                  }

                  this.snackBar.open('could not undo');
                });
              });
            }
          });
      }
    });
  }
}
