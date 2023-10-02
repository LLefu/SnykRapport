import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    if (this.confirmationPopUpLogOut()) {
      this.userService.signOutUser();
      this.router.navigate(["/home"]);
    }
  }

  confirmationPopUpLogOut(): boolean {
    return window.confirm('Are sure you want to logout?');
  }

  profile() {
    let email = localStorage.getItem("user")
    if (email != null) email = email.toString(); else email = "";
    let userId = this.userService.findUserByEmail(email)?.id;
    this.router.navigate(['/profile/', userId]).then(() => {
      setTimeout(()=>{location.reload()}, 100)
    });
  }

  dashboard(){
    this.router.navigate(['/projects']).then(() => {
      setTimeout(()=>{location.reload()}, 100)
    });
  }

  invites(){
    this.router.navigate(['/invites']).then(() => {
      setTimeout(()=>{location.reload()}, 100)
    });
  }
}
