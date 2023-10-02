import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {ProjectUser} from "../../models/project-user.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjectService} from "../../services/project/project.service";
import {ProjectOrganizationService} from "../../services/project/project-organization.service";
import {ProjectModel} from "../../models/project.model";
import {OrganisationModel} from "../../models/organisation.model";
import {ProjectUserService} from "../../services/project/project-user.service";
import {OrganisationService} from "../../services/organization/organisation.service";

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {

  projectUsers: ProjectUser[] = [];
  loggedInUser: User;
  name: string = "projectName";
  description: string = "description";
  orgs: OrganisationModel[] = [];
  projectId: number;
  project: ProjectModel;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private projectOrganisationService: ProjectOrganizationService,
    private projectUserService: ProjectUserService,
    private orgService: OrganisationService
  ) {

  }

  ngOnInit() {
    // @ts-ignore
    this.loggedInUser = this.userService.findUserByEmail(localStorage.getItem("user"))

    this.route.params.subscribe(
      (params: Params) => {
        this.projectId = +params['id'];
        this.project = this.projectService.findProjectById(this.projectId.toString());
        this.orgs = this.projectOrganisationService.findOrganisationsByProject(this.project)
        this.projectUsers = this.projectUserService.getAllForProject(this.projectId)
        // @ts-ignore
        this.loggedInUser = this.userService.findUserByEmail(localStorage.getItem("user"))
      }
    );

    this.projectService.projectChanged.subscribe(
      () => {
        this.project = this.projectService.findProjectById(this.projectId.toString())
        this.orgs = this.projectOrganisationService.findOrganisationsByProject(this.project)
        this.projectUsers = this.projectUserService.getAllForProject(this.projectId)
        // @ts-ignore
        this.loggedInUser = this.userService.findUserByEmail(localStorage.getItem("user"))
      }
    )

    this.projectOrganisationService.userChanged.subscribe(
      () => {
        this.project = this.projectService.findProjectById(this.projectId.toString())
        this.orgs = this.projectOrganisationService.findOrganisationsByProject(this.project)
        this.projectUsers = this.projectUserService.getAllForProject(this.projectId)
        // @ts-ignore
        this.loggedInUser = this.userService.findUserByEmail(localStorage.getItem("user"))
      }
    )

    this.userService.userChanged.subscribe(
      () => {
        this.project = this.projectService.findProjectById(this.projectId.toString())
        this.orgs = this.projectOrganisationService.findOrganisationsByProject(this.project)
        this.projectUsers = this.projectUserService.getAllForProject(this.projectId)
        // @ts-ignore
        this.loggedInUser = this.userService.findUserByEmail(localStorage.getItem("user"))
      }
    )

    this.projectUserService.userChanged.subscribe(
      () => {
        this.project = this.projectService.findProjectById(this.projectId.toString())
        this.orgs = this.projectOrganisationService.findOrganisationsByProject(this.project)
        this.projectUsers = this.projectUserService.getAllForProject(this.projectId)
        // @ts-ignore
        this.loggedInUser = this.userService.findUserByEmail(localStorage.getItem("user"))
      }
    )

    this.orgService.orgChanged.subscribe(
      () => {
        this.project = this.projectService.findProjectById(this.projectId.toString())
        this.orgs = this.projectOrganisationService.findOrganisationsByProject(this.project)
        this.projectUsers = this.projectUserService.getAllForProject(this.projectId)
        // @ts-ignore
        this.loggedInUser = this.userService.findUserByEmail(localStorage.getItem("user"))
      }
    )

    this.projectService.projectChanged.subscribe(
      () => {
        this.project = this.projectService.findProjectById(this.projectId.toString())
        this.orgs = this.projectOrganisationService.findOrganisationsByProject(this.project)
        this.projectUsers = this.projectUserService.getAllForProject(this.projectId)
        // @ts-ignore
        this.loggedInUser = this.userService.findUserByEmail(localStorage.getItem("user"))
      }
    )


  }

  clickOrg(org: OrganisationModel): void{
    this.router.navigate(['/organization-profile', org.orgId]);
  }

  clickUser(user: ProjectUser): void{
    this.router.navigate(['/profile', user.user.id]);
  }

  clickEdit(){
    this.router.navigate(['/edit-project', this.projectId]);
  }

  onClickAddOrg(){
    this.router.navigate(['/org-list', this.projectId]);
  }

  isAdmin(): boolean {
    // console.log(this.projectUserService.findSpecificUser(this.loggedInUser.id, this.projectId)?.admin)
    return this.projectUserService.findSpecificUser(this.loggedInUser.id, this.projectId)?.admin
  }

  clickInvite(){
    this.router.navigate(['/user-list', this.projectId]);
  }

}
