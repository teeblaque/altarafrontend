import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http' ;
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginData = { "email": "", "password": ""}
  showmsg: boolean;
  alert_btn: any;
  message: any;
  data:any;

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(){
  	if (this.loginData.email && this.loginData.password) { 

      this.showmsg = true;
      this.alert_btn = 'alert alert-info text-center';
      this.message = 'Connecting to server...';

      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('email', this.loginData.email);
      urlSearchParams.append('password', this.loginData.password);

      this.authservice.login(urlSearchParams).then((result) => {
        this.data = result;

        if (this.data.message == "success") { 
          console.log(this.data);
          localStorage.setItem('token',JSON.stringify(this.data.data.api_token));
          localStorage.setItem('role', JSON.stringify(this.data.data.role));
          localStorage.setItem('user_id', JSON.stringify(this.data.data.user_id));

          this.router.navigateByUrl('/dashboard');

        } else {
          this.showmsg = true;
          this.alert_btn = 'alert alert-success text-center';
          this.message = this.data.message;
        }
      }).catch((err) => {
        this.showmsg = true;
        this.alert_btn = 'alert alert-danger text-center';
        this.message = 'No Internet Connection. Please check your connections';
      });
      
    } else {
      this.showmsg = true;
      this.alert_btn = 'alert alert-danger text-center';
      this.message = 'Login and Password field cannot be null';
    }
  }

}
