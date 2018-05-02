import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../../_models/Meeting';
import { MeetingService } from '../../_services/meeting.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent implements OnInit {
  model: any = {};
  meeting: Meeting;
  day: any;

  constructor(private meetingService: MeetingService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.meeting = {
      description: '',
      startingTime: new Date(),
      finishingTime: new Date()
    };
  }

  scheduleMeeting() {
    this.formatModel();
    this.meetingService.scheduleMeeting(this.meeting).subscribe((meeting: Meeting) => {
      this.alertify.success('Reunião agendada com sucesso!');
    }, error => {
      this.alertify.error(error);
    });
  }

  formatModel() {
    this.meeting = {
      'description' : this.meeting.description,
      'startingTime' : this.formatStartingTime(),
      'finishingTime' : this.formatFinishingTime()
    };
  }

  formatStartingTime() {
    const date = new Date(Date.parse(this.day + 'T' + this.meeting.startingTime + ':00Z'));
    return date;
  }

  formatFinishingTime() {
    const date = new Date(Date.parse(this.day + 'T' + this.meeting.finishingTime + ':00Z'));
    return date;
  }


}
