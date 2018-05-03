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
  day: any;

  constructor(private meetingService: MeetingService, private alertify: AlertifyService) { }

  ngOnInit() {}

  scheduleMeeting() {
    console.log(this.model);
    this.formatModel();
    console.log(this.model)
    this.meetingService.scheduleMeeting(this.model).subscribe((model: Meeting) => {
      this.alertify.success('Reunião agendada com sucesso!');
    }, error => {
      this.alertify.error(error);
    });
  }

  formatModel() {
    this.model = {
      'description' : this.model.description,
      'startingTime' : this.formatStartingTime(),
      'finishingTime' : this.formatFinishingTime()
    };
  }

  formatStartingTime() {
    const date = new Date(this.day + 'T' + this.model.startingTime);
    return date.toJSON();
  }

  formatFinishingTime() {
    const date = new Date(this.day + 'T' + this.model.finishingTime);
    return date.toJSON();
  }


}
