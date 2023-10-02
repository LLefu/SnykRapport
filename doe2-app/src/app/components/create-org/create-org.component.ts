import { Component, OnInit } from '@angular/core';
import {OrganisationModel} from "../../models/organisation.model";
import {Router} from "@angular/router";
import {OrganisationService} from "../../services/organization/organisation.service";
import {OrganisationUser} from "../../models/organization-user";
import {OrganizationUserService} from "../../services/organization/organization-user.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.css']
})
export class CreateOrgComponent implements OnInit {

  organization: OrganisationModel;
  orgUser: OrganisationUser;
  constructor(
    private orgService: OrganisationService,
    public router: Router,
    private organisationUserService: OrganizationUserService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
  }


  submit(){
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var description = (<HTMLInputElement>document.getElementById("description")).value;
    this.organization = new OrganisationModel(name, description,1);
    this.orgUser = new OrganisationUser(this.userService.findUserByEmail(localStorage.getItem("user")),this.organization,true)
    this.organisationUserService.save(this.orgUser);
    this.goToMyProfile();
  }

  goToMyProfile() {
    let email = localStorage.getItem("user")
    if (email != null) email = email.toString(); else email = "";
    let userId = this.userService.findUserByEmail(email)?.id;
    this.router.navigate(['/profile/', userId]).then(() => {
      setTimeout(()=>{location.reload()}, 100)
    });
  }

}
