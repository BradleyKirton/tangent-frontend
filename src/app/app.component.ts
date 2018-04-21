import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	
  constructor(private user: UserService) { }

  ngOnInit() { }
}