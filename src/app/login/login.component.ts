import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  rememberMe: boolean;
  
  constructor(private user: UserService) { }

  ngOnInit() { }

  login(username: string, password: string) {
  	console.log(username, password)
  	this.user.authenticate(username, password);
  }
}
