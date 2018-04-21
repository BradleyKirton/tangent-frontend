import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Token, Profile, User } from './models';


@Injectable()
export class UserService {
	token: string;
	isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(null);
	authenticationError: BehaviorSubject<Error> = new BehaviorSubject(null);
  me: Observable<User>;
  profiles: Observable<Profile[]>;
  picture: Observable<string>;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("tangent-key");
    
    if (this.token != null) {
      this.isAuthenticated.next(true);
    }

    this.isAuthenticated
      .filter( (isAuthenticated) => { 
        return isAuthenticated == true 
      })
      .subscribe( (isAuthenticated) => {
        this.refreshUser();
        this.refreshProfiles();
        this.refreshProfilePic();
    });
  }
  
  /**
    Helper function to create an object which contains the authorization headers
  */
  getAuthHeaders() {
    return {
      'Authorization': `Token ${this.token}`
    };
  }

  /**
    Fetch a random profile pic for the user
  */
  getProfilePic() {
    let subject = new BehaviorSubject(null);
    this.http.get('https://randomuser.me/api/')
      .subscribe( (response: any) => {
        subject.next(response.results[0].picture.large);
      })

    return subject
  }
  
  /**
    Refresh the service picture
  */
  refreshProfilePic() {
    this.picture = this.getProfilePic();
  }

  /**
    Refresh the employee profiles
  */
  refreshUser() {
    let headers = this.getAuthHeaders();
    this.me = this.http.get<User>(`${environment.backend_uri}accounts/users/me/`, {headers:  headers});
  }

  /**
    Refresh the employee profiles
  */
  refreshProfiles() {
    let headers = this.getAuthHeaders();
    this.profiles = this.http.get<Profile[]>(`${environment.backend_uri}employees/profiles/`, {headers: headers});
  }

  /**
    Logout the user by removing the api key from local storage and setting authenticated to false
  */
  logout() {
    localStorage.removeItem("tangent-key");
    this.isAuthenticated.next(false);
  }

  /**
    Attempt to log the user in given the username and password. If specified to remember the user
    the token returned will be set in local storage.

      @param username  The user's username
      @param password  The user's password
      @param remember  If true the token will be set in local storage
  */
  login(username: string, password: string, remember: boolean=false): void {
  	let uri = `${environment.backend_uri}accounts/obtain-auth-token`
  	
    if (!remember) {
      this.logout();
    }

  	this.http.post(uri, {username: username, password: password})
  		.subscribe( 
  			(response: Token) => {
	  			this.token = response.token;
	  			this.isAuthenticated.next(true);

          if (remember) {
            localStorage.setItem("tangent-key", this.token);
          }
  			},
  			(error: Error) => {
  				this.authenticationError.next(error);
  			}
  		)
  }
}
