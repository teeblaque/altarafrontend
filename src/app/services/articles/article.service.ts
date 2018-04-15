import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {

	url;
	private headers: Headers = new Headers({'Content-Type': 'application/json'});
	private headers_formdata: Headers = new Headers({'Content-Type': undefined});

  constructor(private http: Http) 
  {
  	this.url = 'http://localhost:8000/api/v1';
  }

  getArticles(){
  	return this.http.get(this.url+'/index', {headers: this.headers})
  	.map(res => res.json(), (error) => {
  		console.log('could not connect to host');
  	});
  }

  getSingle(slug){
    return this.http.get(this.url+'/'+slug, {headers: this.headers})
    .map(res => res.json(), (error) => {
      console.log('could not connect to host');
    });
  }

  getSingleById(id){
    // const listPubValue: string = `Bearer ${localStorage.getItem('token')}`;
    const listPubValue = JSON.parse(localStorage.getItem('token'));
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.headers.append('Authorization', listPubValue);
    console.log(listPubValue);

    return this.http.get(this.url+'/article/single/'+id, {headers: this.headers})
    .map(res => res.json(), (error) => {
      console.log('could not connect to host');
    });
  }

  getArticlesAdmin(){
    // const listPubValue: string = `Bearer ${localStorage.getItem('token')}`;
    const listPubValue = JSON.parse(localStorage.getItem('token'));
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.headers.append('Authorization', listPubValue);
    console.log(listPubValue);

    return this.http.get(this.url+'/article/index', {headers: this.headers})
    .map(res => res.json(), (error) => {
      console.log('could not connect to host');
    });
  }

  createArticles(credentials){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      const listPubValue = JSON.parse(localStorage.getItem('token'));
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', listPubValue);
      let options = new RequestOptions({ headers: headers });

      this.http.post(this.url+'/article/create', credentials, options)
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    });
  }

  update(credentials, id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      const listPubValue = JSON.parse(localStorage.getItem('token'));
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', listPubValue);
      let options = new RequestOptions({ headers: headers });

      this.http.put(this.url+'/article/update/'+id, credentials, options)
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
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

      this.http.delete(this.url+'/article/delete/'+id, options)
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    });
  }

}
