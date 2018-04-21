import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User, Profile } from './models';
import { BehaviorSubject } from 'rxjs';


/**
	This service provides the user profile used when creating the profile page.

	Admin users can filter on a particular user while non admin users will provide
	their own user instances to find the appropriate profile instance.
*/
@Injectable()
export class ProfileService {
	userProfile: BehaviorSubject<Profile> = new BehaviorSubject(null);

  constructor(private userService: UserService) {
    // Clear the profile
    this.userService.isAuthenticated.subscribe( (isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        this.userProfile.next(null);
      } else {
        // Set the initial profile to the current user
        this.userService.me.subscribe( (user: User) => {
          this.filterForUser(user);
        });
      }
    });
  }

  /**
    Filter the employee profiles exposed in the user service on the specified user

    @param user  A user object
  */
  filterForUser(user: User): void {
  	this.userService.profiles.subscribe( (profiles) => {
  		let filteredProfiles = profiles.filter( (profile: Profile) => {
        if (profile.user != null) {
          return profile.user.username == user.username;
        }

        return false;
  		});
      
      this.userProfile.next(filteredProfiles[0])
  	});
  }
}
