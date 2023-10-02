import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "./services/user.service";
import {OrganizationUserService} from "./services/organization/organization-user.service";
import {OrganisationJoinRequestService} from "./services/organization/organisation-join-request.service";
import {User} from "./models/user";
import {RequestFromUserToJoinOrganization} from "./models/request-to-join-organization";
import {OrganisationModel} from "./models/organisation.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doe2-app';

  constructor(
    private router: Router, private route: ActivatedRoute,
    private userService: UserService,
    private organisationUserService: OrganizationUserService,
    private organisationJoinRequestService: OrganisationJoinRequestService
  ) {
  }

  ngOnInit() {
    // this.router.navigate(["/home"]);

    //empty localstorage
    // this.userService.signOutUser()
  }

  //dit kan je gewoon weghalen maar dit is om te kijken wie er is ingelogd
  testLoggedInUser(){
    //email
    console.log(localStorage.getItem('user'))
    console.log(this.userService.findUserByEmail(localStorage.getItem('user').toString()))
  }

  // testJoinRequestPost()
  //
  // console.log(this.organisationJoinRequestService.save(new RequestFromUserToJoinOrganization(
  //   // @ts-ignore
  //   this.userService.findUserByEmail(localStorage.getItem('user').toString()),this.organizationService.findOrganization)))
  //
  // }

  testGetAllRequests(){
    console.log(this.organisationJoinRequestService.findAll())
  }
}
