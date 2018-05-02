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
  startingTime: any;
  finishingTime: any;
  description: any;


  constructor(private meetingService: MeetingService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  scheduleMeeting() {
    this.formatModel();
    this.meetingService.scheduleMeeting(this.model).subscribe((meeting: Meeting) => {
      this.meeting = meeting;
    }, error => {
      this.alertify.error(error);
    })
  }

  formatModel() {
    this.model = {
      "description" : this.description,
      "startingTime" : this.formatStartingTime().toJSON(),
      "finishingTime" : this.formatFinishingTime().toJSON(), 
    };
  }

  formatStartingTime(){
    let date = new Date(Date.parse(this.day + 'T' + this.startingTime + ':00Z'));
    return date;
  }

  formatFinishingTime(){
    let date = new Date(Date.parse(this.day + 'T' + this.finishingTime + ':00Z'));
    return date;
  }


}
