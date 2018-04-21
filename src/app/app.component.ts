import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	showLogin: boolean = true;

  constructor(
  	private userService: UserService,
  	private router: Router
  ) { }

  ngOnInit() {
  	this.userService.isAuthenticated.subscribe( (isAuthenticated) => {
  		if (!isAuthenticated) {
  			this.router.navigate(['login']);
  		} else {
  			this.userService.me.subscribe( (user: User) => {
          if (user.is_superuser) {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['profile']);
          }
        });
  		}

  		this.showLogin = !isAuthenticated;
  	})
  }
}
