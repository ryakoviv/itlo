import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user.interface';
import { share } from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly COOKIE_NAME_AUTH = 'auth';

  protected curUser: Observable<User>;

  constructor(private http: HttpClient, private cookieService: CookieService) {

  }

  getAuth(): string {
    const auth = this.cookieService.get(this.COOKIE_NAME_AUTH);
    if (auth) {
      return 'Basic ' + auth;
    }
    return null;
  }

  setCurUser(auth: string, rememberMe: boolean) {
    if (rememberMe) {
      this.cookieService.set( this.COOKIE_NAME_AUTH, auth, 14 );
    } else {
      this.cookieService.set( this.COOKIE_NAME_AUTH, auth );
    }
  }

  getCurUser(): Observable<User> {
    if (!this.curUser) {
      this.curUser = this.http.get<User>(
        '/v1/user/me',
        {
          headers: new HttpHeaders(
            {'http_authorization': this.getAuth()}
          ),
        }).pipe(
          publishReplay(1), // this tells Rx to cache the latest emitted
          refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
        );
    }
    return this.curUser;
  }

  isLogged(): boolean {
    return !!this.getAuth();
  }

  login(email: string, password: string) {
    // const fd = new FormData();
    // fd.append('username', username);
    // fd.append('password', password);
    // const headers = new HttpHeaders(
    //   {'Content-Type': 'application/x-www-form-urlencoded'}
    // );
    const observer = this.http.post<string>('/v1/user/login', {email, password}).pipe(share());
    observer.subscribe(data => this.setCurUser(data, true));
    return observer;
    // {headers: {}}
  }

  logout() {
      this.curUser = null;
      this.cookieService.delete(this.COOKIE_NAME_AUTH, '/');
  }

  create(username: string, email: string, password: string) {
    const observer = this.http.post<string>('/v1/user', {username, email, password}).pipe(share());
    observer.subscribe(data => this.setCurUser(data, true));
    return observer;
    // {headers: {}}
  }
}
