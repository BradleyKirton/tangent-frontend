import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	showLogin: boolean = true;

  constructor(
  	private user: UserService,
  	private router: Router
  ) { }

  ngOnInit() {
  	this.user.isAuthenticated.subscribe( (isAuthenticated) => {
  		if (!isAuthenticated) {
  			this.router.navigate(['login']);
  		} else {
  			this.router.navigate(['admin']);
  		}

  		this.showLogin = !isAuthenticated;
  	})
  }
}
