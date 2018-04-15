import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/articles/article.service';

@Component({
	selector: 'app-single',
	templateUrl: './single.component.html',
	styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

	articles_list: any;
	slug: any; 

	constructor(private router: Router, private article: ArticleService, private route: ActivatedRoute) 
	{ 
		
	}

	ngOnInit() {
		this.route.params.subscribe( params => this.getSingleArticles(params['slug']) );
	}

	getSingleArticles(slug)
	{
		this.article.getSingle(slug).subscribe(articles => {
			if (articles.message == 'success') { 
				
				this.articles_list = articles.data;
				console.log(this.articles_list);

			} else {
				console.log('data not found');
			}
		});
	}

}
