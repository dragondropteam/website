import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from './user-model';

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

  createUser(user: UserModel): Observable<any> {
    return this.httpClient.post(this.userURL, user);
  }
}
