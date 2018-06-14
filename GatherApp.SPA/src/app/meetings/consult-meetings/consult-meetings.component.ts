import { Component, OnInit } from '@angular/core';
import { Meeting } from '../../_models/Meeting';
import { MeetingService } from '../../_services/meeting.service';
import { AlertifyService } from '../../_services/alertify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService, BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-consult-meetings',
  templateUrl: './consult-meetings.component.html',
  styleUrls: ['./consult-meetings.component.css']
})
export class ConsultMeetingsComponent implements OnInit {
  locale = 'pt-br';
  model: any = {};
  daySelectorForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  meetings: Meeting[];

  constructor(
    private meetingService: MeetingService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private _localeService: BsLocaleService
    ) {}

  ngOnInit() {
    this._localeService.use(this.locale);
    this.bsConfig = {
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-green'
    };
    this.createForm();
  }

  loadMeetings() {
    this.meetingService.getMeetings().subscribe((meetings: Meeting[]) => {
      this.meetings = meetings;
    }, error => {
      this.alertify.error(error);
    });
  }

  createForm() {
    this.daySelectorForm = this.fb.group({
      day: [new Date().toLocaleString(), Validators.required],
    });
  }

  getMeetingsByDay() {
    this.meetingService.getMeetingsByDay(new Date(this.daySelectorForm.get('day').value)).subscribe((meetings: Meeting[]) => {
      this.meetings = meetings;
      this.alertify.success('Ok!');
    }, error => {
      this.alertify.error(error);
    });
  }

  format(date) {
    return new Date(date).toLocaleTimeString();
  }

}
