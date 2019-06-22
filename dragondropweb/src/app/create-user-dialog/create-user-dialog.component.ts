import { Component, OnInit } from '@angular/core';
import {UserModel} from '../user-model';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css']
})
export class CreateUserDialogComponent implements OnInit {
  userModel = new UserModel();
  repeatPassword: string;
  generatePassword = false;

  constructor() { }

  ngOnInit() {
  }

}
