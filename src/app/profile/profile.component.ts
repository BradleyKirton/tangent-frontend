import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, Profile } from '../models';
import { Observable } from 'rxjs';


@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	userProfile: Observable<Profile>;

  constructor(private userService: UserService) { }

  /**
  	Fork join the current user's data with the call to the profiles and filter
  	the profiles for the current user's profile. The current user's profile is
  	then provided via the userProfile observable.
  */
  ngOnInit() {
  	Observable.forkJoin(this.userService.me, this.userService.profiles)
			.subscribe( ([user, profiles]) => {
				let profile = profiles.filter( (profile: Profile) => {
					if (profile.user != null) {
						return profile.user.id == user.id;
					}

					return false;
				});

				this.userProfile = Observable.create( (observer) => {
					observer.next(profile);
				});
			})
  }

}
