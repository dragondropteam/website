import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userURL = '/api/user';

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<any> {
    return this.httpClient.get(this.userURL);
  }

  createUser(): Observable<any> {
    return null;
  }
}
