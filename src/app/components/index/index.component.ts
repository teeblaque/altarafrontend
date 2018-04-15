import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/articles/article.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

	articles_list: any = [];
	selectedContactId: any;

  constructor(private router: Router, private article: ArticleService) { }

  ngOnInit() {
  	this.getArticles();
  }

  getArticles()
  {
  	this.article.getArticles().subscribe(articles => {
  		if (articles.message == 'success') { 
  			
  			this.articles_list = articles.data;
  			console.log(this.articles_list);

  		} else {
  			console.log('data not found');
  		}
  	});
  }

}
