import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { User, Profile } from '../models';
import { Observable } from 'rxjs';


@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService) { }

  ngOnInit() {}

}
