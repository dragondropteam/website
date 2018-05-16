import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  password = new FormControl('', [
    Validators.required,
  ]);

  // email: string;
  // password: string;

  invalidLogin = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    console.log('login');
    this.authService.login(this.email.value, this.password.value, () => {
      this.invalidLogin = true;
    });
  }
}
