import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	info = { "token": "", "role": ""}

	constructor(private router: Router) 
	{
		this.info.token = JSON.parse(localStorage.getItem('token'));
		this.info.role = JSON.parse(localStorage.getItem('role'));
		console.log(this.info); 
	}

	ngOnInit() {
		if (this.info) { 
			// code...
		} else {
			// code...
		}
	}

	logout(){
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		localStorage.removeItem('user_id');

		this.router.navigateByUrl('/login');
	}

}
