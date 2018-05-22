import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Meeting } from '../_models/Meeting';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class MeetingService {
    baseUrl = environment.apiUrl;

    constructor(private authHttp: AuthHttp) { }

    getMeetings(): Observable<Meeting[]> {
        return this.authHttp.get(this.baseUrl + 'meeting')
        .map(response => <Meeting[]>response.json())
        .catch(this.handleError);
    }

    getMeetingsByDay(date): Observable<Meeting[]> {
      return this.authHttp.post(this.baseUrl + 'meeting/day', date)
      .map(response => <Meeting[]>response.json())
      .catch(this.handleError);
    }

    getMeetingsByUserId(userId): Observable<Meeting[]> {
      return this.authHttp.get(this.baseUrl + 'meeting/user/' + userId)
      .map(response => <Meeting[]>response.json())
      .catch(this.handleError);
    }

    registerMeeting(model): Observable<Meeting> {
      return this.authHttp.post(this.baseUrl + 'meeting', model)
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
