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
  remember: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() { }

  login(username: string, password: string, remember: boolean) {
  	this.userService.login(username, password, remember);
  }
}
