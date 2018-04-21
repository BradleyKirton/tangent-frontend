import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ProfileService } from '../profile.service';
import { Profile } from '../models';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
  	private router: Router,
  	private userService: UserService,
  	private profileService: ProfileService) { }

  ngOnInit() {}

  viewProfile(profile: Profile) {
  	this.profileService.userProfile.next(profile);
  	this.router.navigate(['profile']);
  }

}
