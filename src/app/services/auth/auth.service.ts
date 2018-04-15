import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

	url;

  constructor(private router: Router, private http: Http) { 

  	this.url = 'http://localhost:8000/api/v1';
  }

   login(credentials) {
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        
        this.http.post(this.url+'/auth/login', credentials, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
      });
    }

    register(credentials) {
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        
        this.http.post(this.url+'/auth/create', credentials, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
      });
    }

}
