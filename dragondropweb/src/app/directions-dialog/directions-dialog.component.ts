import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-directions-dialog',
  templateUrl: './directions-dialog.component.html',
  styleUrls: ['./directions-dialog.component.css'],

})
export class DirectionsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {

  }

  ngOnInit() {
  }


}
