import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './user.service';
import { ProfileService } from './profile.service';
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
    private profileService: ProfileService,
  	private router: Router
  ) { }

  ngOnInit() {
    // Keep track of the last route navigated to by the user
    this.router.events.subscribe( (event) => {
      if (event instanceof NavigationEnd && event.url.slice(1) != "login") {
        localStorage.setItem("last-route", event.url);
      }
    });

  	this.userService.isAuthenticated.subscribe( (isAuthenticated) => {
  		if (isAuthenticated) {
  			this.userService.me.subscribe( (user: User) => {
          let lastRoute = localStorage.getItem("last-route");

          if (user.is_superuser) {
            if (lastRoute != null) {
              this.router.navigateByUrl(lastRoute)
            } else {
              this.router.navigate(['admin']);
            }
          } else {
            this.router.navigate(['profile']);
          }
        });
  		}

  		this.showLogin = !isAuthenticated;
  	})
  }

  /**
    Navigate to the current user's profile
  */
  navigateProfile() {
    this.userService.me.subscribe((user: User) => {
      this.profileService.filterForUser(user);
      this.router.navigate(['profile']);
    });
  }
}
