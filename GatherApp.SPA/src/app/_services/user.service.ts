import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Meeting } from '../_models/meeting';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {
    baseUrl = environment.apiUrl;

    constructor(private authHttp: AuthHttp) { }

    registerUser(model): Observable<Meeting> {
      return this.authHttp.post(this.baseUrl + 'auth/register', model)
      .catch(this.handleError);
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
