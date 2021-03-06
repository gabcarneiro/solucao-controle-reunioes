import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  baseUrl = environment.apiUrl;
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  currentUser: any = {};

  constructor(private http: Http) {}

  login(model: any) {
    return this.http
      .post(this.baseUrl + 'auth/login', model, this.requestOptions())
      .map((response: Response) => {
        const user = response.json();
        if (user && user.tokenString) {
          localStorage.setItem('token', user.tokenString);
          localStorage.setItem('user', JSON.stringify(user));
          this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
          this.userToken = user.tokenString;
          this.currentUser = user.user;
        }
      })
      .catch(this.handleError);
  }

  logout() {
    this.userToken = null;
    this.currentUser = null;
    this.decodedToken = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  loggedIn() {
    return tokenNotExpired('token');
  }

  private requestOptions() {
    const headers = new Headers({ 'Content-type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) { modelStateErrors += serverError[key] + '\n'; }
      }
    }
    return Observable.throw(modelStateErrors || 'Server error');
  }
}
