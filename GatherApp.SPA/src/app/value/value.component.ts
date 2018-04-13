import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import { RequestOptions, Http, Headers } from '@angular/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  values: any;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.
    get('http://localhost:5000/api/values', this.jwt()).subscribe(response => {
      this.values = response.json();
    });
  }

  private jwt() {
    let token = localStorage.getItem('token');
    if (token) {
      let headers = new Headers({Authorization : 'Bearer ' + token});
      headers.append('Content-type', 'application/json');
      return new RequestOptions({headers: headers});
    }
  }

}
