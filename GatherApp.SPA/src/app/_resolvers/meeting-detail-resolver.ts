import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Meeting } from '../_models/Meeting';
import { Injectable } from '@angular/core';
import { MeetingService } from '../_services/meeting.service';
import { AlertifyService } from '../_services/alertify.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class MeetingDetailResolver implements Resolve <Meeting> {

    constructor (
        private meetingService: MeetingService,
        private router: Router,
        private alertify: AlertifyService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Meeting> {
        return this.meetingService.getMeeting(route.params['id']).catch(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/meetings']);
            return Observable.of(null);
        });
    }
}
