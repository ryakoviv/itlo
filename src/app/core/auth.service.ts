import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user.interface';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly STORAGE_ITEM = 'user';

  curUser: User = null;

  constructor(private http: HttpClient) {

  }

  getAuth(): string {
    const user = this.getCurUser();
    if (user) {
      return 'Basic ' + user.auth;
    }
    return null;
  }

  getCurUser(): User {
    if (!this.curUser) {
      const user = this.getUserDataFromStorage();
      if (user) {
        return this.setCurUser(user, true);
      }
      return null;
    }
    return this.curUser;
  }

  setCurUser(user: User, rememberMe: boolean) {
    this.curUser = user;
    if (rememberMe) {
      this.saveUserDataInStorage(user);
    }
    return this.curUser;
  }

  isLogged(): boolean {
    return !!this.getCurUser();
  }

  login(email: string, password: string) {
    // const fd = new FormData();
    // fd.append('username', username);
    // fd.append('password', password);
    // const headers = new HttpHeaders(
    //   {'Content-Type': 'application/x-www-form-urlencoded'}
    // );
    const observer = this.http.post<User>('/v1/user/login', {email, password}).pipe(share());
    observer.subscribe(data => this.setCurUser(data, true));
    return observer;
    // {headers: {}}
  }

  create(username: string, email: string, password: string) {

    const observer = this.http.post<User>('/v1/user', {username, email, password}).pipe(share());
    observer.subscribe(data => this.setCurUser(data, true));
    return observer;
    // {headers: {}}
  }

  protected saveUserDataInStorage(user: User) {
    localStorage.setItem(this.STORAGE_ITEM, JSON.stringify(user));
  }

  protected getUserDataFromStorage(): User {
    const user = localStorage.getItem(this.STORAGE_ITEM);
    if (user) {
      return <User>JSON.parse(user);
    }
    return null;
  }
}
