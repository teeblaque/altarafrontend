import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

	url;
	private headers: Headers = new Headers({'Content-Type': 'application/json'});
	private headers_formdata: Headers = new Headers({'Content-Type': undefined});

  constructor(private http: Http) 
  { 
  	this.url = 'http://localhost:8000/api/v1';
  }

    getUsers(){
    const listPubValue = JSON.parse(localStorage.getItem('token'));
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.headers.append('Authorization', listPubValue);
    console.log(listPubValue);

    return this.http.get(this.url+'/users/index', {headers: this.headers})
    .map(res => res.json(), (error) => {
      console.log('could not connect to host');
    });
  }

  delete(id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      const listPubValue = JSON.parse(localStorage.getItem('token'));
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', listPubValue);
      let options = new RequestOptions({ headers: headers });

      this.http.delete(this.url+'/users/delete/'+id, options)
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    });
  }

}
