import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../../_models/Meeting';
import { MeetingService } from '../../_services/meeting.service';
import { AlertifyService } from '../../_services/alertify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent implements OnInit {
  locale = 'pt-br';
  model: any = {};
  day: any;
  meetingRegisterForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

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

  createForm() {
    this.meetingRegisterForm = this.fb.group({
      description: ['', Validators.required],
      day: [null, Validators.required],
      startingTime: [null, Validators.required],
      finishingTime: [null, Validators.required]
    }, this.meetingTimeValidator);
  }

  scheduleMeeting() {
    this.formatModel();
    this.meetingService.registerMeeting(this.model).subscribe( () => {
      this.alertify.success('Reunião agendada com sucesso!');
    }, error => {
      this.alertify.error(error);
    });
  }

  meetingTimeValidator (g: FormGroup) {
    return g.get('finishingTime').value > g.get('startingTime').value ? null : {'missmatch' : true};
  }

  formatModel() {
    this.model = {
      'description' : this.meetingRegisterForm.get('description').value,
      'startingTime' : this.formatStartingTime(),
      'finishingTime' : this.formatFinishingTime()
    };
  }

  formatStartingTime() {
    const date = new Date(this.meetingRegisterForm.get('day').value);
    let time = this.meetingRegisterForm.get('startingTime').value;
    time = time.split(':');
    date.setHours(time[0] - 3, time[1]);
    return date.toJSON();
  }

  formatFinishingTime() {
    const date = new Date(this.meetingRegisterForm.get('day').value);
    let time = this.meetingRegisterForm.get('finishingTime').value;
    time = time.split(':');
    date.setHours(time[0] - 3, time[1]);
    return date.toJSON();
  }

}
