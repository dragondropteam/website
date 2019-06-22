/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import * as auth0 from 'auth0-js';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  private authPath = '/api/auth';

  constructor(public router: Router, public httpClient: HttpClient, private jwtHelperService: JwtHelperService) {
  }

  public login(email, password, onError = () => {}): void {
    this.httpClient.post<string>(`${this.authPath}/login`, {email: email, password: password})
      .subscribe((jwt: string) => {
        console.log(jwt);
        this.setSession(jwt);
        this.router.navigate(['/']);
      }, (error) => {
        console.log(error);
        onError();
      });
  }

  public handleAuthentication(): void {

  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    localStorage.setItem('access_token', authResult);
    // const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelperService.isTokenExpired();
  }

  public isAdmin(): boolean {
    const decodedToken = this.jwtHelperService.decodeToken();
    return this.isAuthenticated() && (decodedToken.data.roles && decodedToken.data.roles.includes('site-admin'));
  }
}
