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

  ngOnInit() {
    this.userService.authenticationError.subscribe( (response: HttpErrorResponse) => {
      this.errorMessage = "";
      Object.entries(response.error).forEach( ([key, value]) => {
        this.errorMessage += `${key} - ${value}`;
      })
      
    });
  }

  login(username: string, password: string, remember: boolean) {
  	this.userService.login(username, password, remember);
  }
}
