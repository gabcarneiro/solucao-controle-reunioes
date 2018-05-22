import { Component, OnInit } from '@angular/core';
import { Meeting } from '../../_models/Meeting';
import { MeetingService } from '../../_services/meeting.service';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.component.html',
  styleUrls: ['./my-meetings.component.css']
})
export class MyMeetingsComponent implements OnInit {

  meetings: Meeting[];

  constructor(
    private meetingService: MeetingService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getMeetings();
  }

  getMeetings() {
    this.meetingService.getMeetingsByUserId(this.authService.decodedToken.nameid).subscribe((meetings: Meeting[]) => {
      this.meetings = meetings;
    }, error => {
      this.alertify.error(error);
    });
  }

}
