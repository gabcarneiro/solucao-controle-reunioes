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

  formatTime(date) {
    const time: string[] = new Date(date).toLocaleTimeString().split(':');
    const formatedTime = time[0] + ':' + time[1];
    return formatedTime;
  }

}
