import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';


@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  remember: boolean;
  errorMessage: string;

  constructor(private userService: UserService) { }

  /**
    Subscribe to any authentication errors and build a message for the user.
  */
  ngOnInit() {
    this.userService.authenticationError.subscribe( (response: HttpErrorResponse) => {
      this.errorMessage = "";

      Object.entries(response.error).forEach( ([key, value]) => {
        this.errorMessage += `${key} - ${value}`;
      })
      
    });
  }
  
  /**
    Login function fired from the authentication form

    @param username  The user's username
    @param password  The user's password
    @param remember  A boolean which if checked will store the token in localStorage
  */
  login(username: string, password: string, remember: boolean): void {
  	this.userService.login(username, password, remember);
  }
}
