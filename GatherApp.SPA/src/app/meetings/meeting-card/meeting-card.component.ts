import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../../_models/Meeting';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.css']
})
export class MeetingCardComponent implements OnInit {
  @Input() meeting: Meeting;

  constructor() { }

  ngOnInit() {
  }

  format(date) {
    return new Date(date).toLocaleTimeString();
  }
}
