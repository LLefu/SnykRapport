import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ProjectUserService} from "../../services/project/project-user.service";
import {OrganisationModel} from "../../models/organisation.model";
import {OrganizationUserService} from "../../services/organization/organization-user.service";

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {

  email: any;
  user: any;
  currentUser: any;
  userId: any;
  projects: any;
  organizations: OrganisationModel[] = [];
  age: any;
  profile: any;
  isUser: any;

  constructor(private userService: UserService,
              private projectUserService: ProjectUserService,
              private organisationUserService: OrganizationUserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.userId = +params['id'];
        this.compareUsers();
        this.loadProjectsAndOrganizations()
      }
    );

    this.userService.userChanged.subscribe(
      () => {
        this.compareUsers();
      }
    )
  }

  compareUsers() {
    this.email = localStorage.getItem("user");
    this.currentUser = this.userService.findUserByEmail(this.email);
    this.user = this.userService.findUserById(this.userId);
    this.profile = this.userService.findUserById(this.userId);
    this.isUser = this.user === this.currentUser;
    if (!this.isUser) {
      this.router.navigate(["/home"])
    }
  }

  loadProjectsAndOrganizations() {
    this.projects = [];
    this.organizations = [];
    this.projectUserService.restGetProjectMembers().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].user.id === this.userId) {
          this.projects.push(res[i].project)
        }
      }
    })
    this.organisationUserService.restGetOrganisationUser().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].user.id === this.userId) {
          this.organizations.push(res[i].organization)
        }
      }
    })
  }

  getUser() {
    return this.user;
  }

  getLoggedInUser() {
    this.email = localStorage.getItem("user");
    this.currentUser = this.userService.findUserByEmail(this.email);
    return this.currentUser;
  }

  getProjects() {
    return this.projects;
  }

  getOrganizations() {
    return this.organizations;
  }

  submit() {
    if (((<HTMLInputElement>document.getElementById("firstName")).value) != "") {
      this.profile.firstName = ((<HTMLInputElement>document.getElementById("firstName")).value)
    }
    if (((<HTMLInputElement>document.getElementById("lastName")).value) != "") {
      this.profile.lastName = ((<HTMLInputElement>document.getElementById("lastName")).value)
    }
    if (((<HTMLInputElement>document.getElementById("email")).value) != "") {
      this.profile.email = ((<HTMLInputElement>document.getElementById("email")).value)
    }
    if (((<HTMLInputElement>document.getElementById("country")).value) != "") {
      this.profile.country = ((<HTMLInputElement>document.getElementById("country")).value)
    }
    if (((<HTMLInputElement>document.getElementById("dateOfBirth")).value) != "") {
      this.profile.dateOfBirth = ((<HTMLInputElement>document.getElementById("dateOfBirth")).value)
    }
    if (((<HTMLInputElement>document.getElementById("personalDescription")).value) != "") {
      this.profile.personalDescription = ((<HTMLInputElement>document.getElementById("personalDescription")).value)
    }
    this.userService.updateUser(this.profile);
    localStorage.setItem("user", this.profile.email)
    this.router.navigate(['/profile/', this.userId]);
  }


}
