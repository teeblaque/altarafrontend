import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/articles/article.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	info = { "id": "", "title": "testing blog", "content": "this is my first blog post for altara project and its to explain how am going to fix all their project in no time us to be son"}

	data = { "title": "", "content": "", "image": "", "slug": "", "user_id": "", "token": "", "role": ""}

	show_retrieve_msg: boolean;
	singlelists: any;

	showmsg: boolean;
	showmsgs: boolean;

	list_found: boolean;
	articles_list: any = [];
	articles_lists: any = [];

	message: any;
	messages: any;

	alert_btn: any;
	alert_btns: any;
	saved_art : any;
	saved_arts : any;

	// fileToUpload: File = null;

	constructor(private router: Router, private article: ArticleService) { 
		this.data.token = JSON.parse(localStorage.getItem('token'));
		this.data.role = JSON.parse(localStorage.getItem('role'));
		this.data.user_id = JSON.parse(localStorage.getItem('user_id'));
		console.log(this.data); 
	}

	ngOnInit() {
		if (this.data.role == 'admin') { 
			this.getDashboard();
		}else if(this.data.role == 'user1'){
			this.router.navigateByUrl('');
		} 
		else {
			this.router.navigateByUrl('/login');
		}
	}

	getDashboard()
	{
		this.list_found = false;
		this.show_retrieve_msg = true;
		this.alert_btn = 'alert alert-info text-center';
		this.message = 'Retrieving Your List of Inspections...';

		this.article.getArticlesAdmin().subscribe(articles => {
			// console.log(articles);
			
			if (articles.message == 'success') { 
				this.list_found = true;

				this.articles_list = articles.data;
				console.log(this.articles_list);

			} else {
				console.log(articles.status);
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
		});
	}

	onSave(){
		if (this.data.title && this.data.content) { 
			
			this.showmsg = true;
			this.alert_btn = 'alert alert-info text-center';
			this.message = 'Connecting to server...';
			
			this.article.createArticles(this.data).then((result) => {
				this.saved_art = result;
				console.log(this.saved_art);
				window.location.reload();

				this.showmsg = true;
				this.alert_btn = 'alert alert-info text-center';
				this.message = 'Article Added Successfully';

			}).catch((error) => {
				console.log(error);
				this.showmsg = true;
				this.alert_btn = 'alert alert-danger text-center';
				this.message = 'Article not uploaded';
				
			})
		} else {
			this.showmsg = true;
			this.alert_btn = 'alert alert-danger text-center';
			this.message = 'Fields Required';
		}
	}

	// handleFileInput(files: FileList) {
	// 	this.fileToUpload = files.item(0);
	// }

	updateForm(id){
		this.info.id = id;
		this.article.getSingleById(id).subscribe(articles => {
			console.log(id);
			if (articles.message == 'success') { 
				this.singlelists = articles;
				console.log(this.singlelists);
				
			} else {
				console.log('data not found');
				
			}
		}, (err) => {
			console.log(err);
			
		});
	}

	onUpdate(){
		// console.log(this.info.id);
		this.showmsgs = true;
		this.alert_btns = 'alert alert-info text-center';
		this.messages = 'Connecting to server...';

		this.article.update(this.info, this.info.id).then((result) => {
			this.saved_arts = result;
			console.log(this.saved_arts);
			window.location.reload();

			this.showmsgs = true;
			this.alert_btns = 'alert alert-info text-center';
			this.messages = 'Article Updated Successfully';

		}).catch((error) => {
			console.log(error);
			this.showmsgs = true;
			this.alert_btns = 'alert alert-danger text-center';
			this.messages = 'An error occured';

		});
	}

	delete(id){
		var conf = confirm("Are you sure want to delete from record??");
		if (conf) { 
			this.article.delete(id).then((result) => {

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
