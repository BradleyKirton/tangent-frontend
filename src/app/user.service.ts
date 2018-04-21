import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


export interface IToken {
	token: string;
}


export class Token implements IToken {
	token: string;
}


@Injectable()
export class UserService {
	token: string;
	isAuthenticated: boolean = false;

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string) {
  	let uri = `${environment.backend_uri}accounts/obtain-auth-token/`
  	
  	return this.http.post(uri, {username: username, password: password})
  		.subscribe( 
  			(response: Token) => {
	  			this.token = response.token;
	  			this.isAuthenticated = true;
  			},
  			(error: Error) => {
  				console.log(error)
  			}
  		)
  }
}
