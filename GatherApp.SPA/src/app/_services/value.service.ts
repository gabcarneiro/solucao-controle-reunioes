import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ValueService {
    baseUrl = 'http://localhost:5000/api/';
    userToken: any;

    constructor(private http: Http) { }

}
