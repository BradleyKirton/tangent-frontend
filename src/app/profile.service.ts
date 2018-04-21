import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User, Profile } from './models';
import { Observable } from 'rxjs';


/**
	This service provides the user profile used when creating the profile page.

	Admin users can filter on a particular user while non admin users will provide
	their own user instances to find the appropriate profile instance.
*/
@Injectable()
export class ProfileService {
	userProfile: Observable<Profile>;

  constructor(private userService: UserService) {
    // Set the initial profile to the current user
    this.userService.me.subscribe( (user: User) => {
      this.filterForUser(user);
    })
  }

  filterForUser(user: User): void {
  	this.userService.profiles.subscribe( (profiles) => {
  		let filteredProfiles = profiles.filter( (profile: Profile) => {
        if (profile.user != null) {
          return profile.user.username == user.username;
        }
  		});

      this.userProfile = Observable.create( (observer) => {
        observer.next(filteredProfiles[0]);
      });
  	});
  }
}
