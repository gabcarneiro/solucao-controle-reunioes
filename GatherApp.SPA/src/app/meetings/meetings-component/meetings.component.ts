import { Component, OnInit } from '@angular/core';
import { Meeting } from '../../_models/Meeting';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {

  meetings : Meeting[];
  //model : any = {};
  description = "";

  constructor() { }

  ngOnInit() {
  }


  create() {
  }

}
