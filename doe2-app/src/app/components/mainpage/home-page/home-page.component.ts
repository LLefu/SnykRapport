import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  // loggedInUser: User | null = null;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.userService.userChanged.subscribe(
    //   () => {
    //     this.loggedInUser = this.userService.loggedInUser;
    //     console.log("loggedIn user: " + this.loggedInUser)
    //   }
    // )
  }
}
