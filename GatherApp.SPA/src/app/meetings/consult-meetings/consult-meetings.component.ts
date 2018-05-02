import { Component, OnInit } from '@angular/core';
import { Meeting } from '../../_models/Meeting';
import { MeetingService } from '../../_services/meeting.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-consult-meetings',
  templateUrl: './consult-meetings.component.html',
  styleUrls: ['./consult-meetings.component.css']
})
export class ConsultMeetingsComponent implements OnInit {

  meetings: Meeting[];
  day: any;

  constructor(private meetingService: MeetingService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMeetings();
  }

  loadMeetings() {
    this.meetingService.getMeetings().subscribe((meetings: Meeting[]) => {
      this.meetings = meetings;
    }, error => {
      this.alertify.error(error);
    });
  }

  // '"' + this.day + '"'
  getMeetingsByDay() {
    this.meetingService.getMeetingsByDay(new Date(this.day)).subscribe((meetings: Meeting[]) => {
      this.meetings = meetings;
    }, error => {
      this.alertify.error(error);
    });
  }

  format(date) {
    return new Date(date).toLocaleTimeString();
  }

}
