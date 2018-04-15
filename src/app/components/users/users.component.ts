import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLSearchParams } from '@angular/http' ;
import { AuthService } from '../../services/auth/auth.service';
import { UsersService} from '../../services/users/users.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	data = { "firstname": "", "lastname": "", "phone": "", "email": "", "gender": "", "password":"", "role": ""}
	showmsg: boolean;
	alert_btn: any;
	message: any;
	res:any;

	show_retrieve_msg: boolean;
	list_found: boolean;
	user_list: any = [];
	saved_art : any;

	constructor(private authservice: AuthService, private router: Router, private users: UsersService) 
	{ 
	}

	ngOnInit() {
		this.getUsers();
	}

	onSave(){
		if (this.data.firstname && this.data.lastname && this.data.email && this.data.phone && this.data.gender && this.data.password && this.data.role) { 

			this.showmsg = true;
			this.alert_btn = 'alert alert-info text-center';
			this.message = 'Connecting to server...';

			let urlSearchParams = new URLSearchParams();
			urlSearchParams.append('email', this.data.email);
			urlSearchParams.append('password', this.data.password);
			urlSearchParams.append('firstname', this.data.firstname);
			urlSearchParams.append('lastname', this.data.lastname);
			urlSearchParams.append('phone', this.data.phone);
			urlSearchParams.append('role', this.data.role);
			urlSearchParams.append('gender', this.data.gender);

			this.authservice.register(urlSearchParams).then((result) => {
				this.res = result;

				if (this.res.message == "success") { 
					this.showmsg = true;
					this.alert_btn = 'alert alert-success text-center';
					this.message = this.res.message;

					window.location.reload();

					this.data.email = "";
					this.data.password = "";
					this.data.firstname = "";
					this.data.lastname = "";
					this.data.phone = "";
					this.data.role = "";
					this.data.gender = "";

				} else {
					this.showmsg = true;
					this.alert_btn = 'alert alert-danger text-center';
					this.message = this.res.message;
				}
			}).catch((err) => {
				this.showmsg = true;
				this.alert_btn = 'alert alert-danger text-center';
				this.message = 'No Internet Connection. Please check your connections';
			});
		} else {
			this.showmsg = true;
			this.alert_btn = 'alert alert-danger text-center';
			this.message = 'You must enter all fields';
		}
	}

	getUsers()
	{
		this.list_found = false;
		this.show_retrieve_msg = true;
		this.alert_btn = 'alert alert-info text-center';
		this.message = 'Retrieving Your List of Inspections...';

		this.users.getUsers().subscribe(users => {
			
			if (users.message == 'success') { 
				this.list_found = true;

				this.user_list = users.data;
				console.log(this.user_list);

			} else {
				console.log(users.status);
				this.list_found = false;
				this.show_retrieve_msg = true;
				this.alert_btn = 'alert alert-danger text-center';
				this.message = 'No data found';
			}
		}, (err) => {
			this.list_found = false;
			this.show_retrieve_msg = true;
			this.alert_btn = 'alert alert-danger text-center';
			this.message = 'Error fetching data from the server';
			console.log(err);
		});
	}

	delete(id){
		var conf = confirm("Are you sure want to delete from record??");
		if (conf) { 
			this.users.delete(id).then((result) => {

				console.log('article deleted');
				window.location.reload();

			}).catch((error) => {
				console.log(error);
				this.showmsg = true;
				this.alert_btn = 'alert alert-danger text-center';
				this.message = 'Article not deleted';
				
			})
		} else {
			// code...
		}
	}

}
