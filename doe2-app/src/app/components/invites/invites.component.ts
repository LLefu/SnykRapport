import { Component, OnInit } from '@angular/core';
import {ProjectInvitesService} from "../../services/project/project-invites.service";
import {ProjectInvitation} from "../../models/project-invitation";
import {ProjectUserService} from "../../services/project/project-user.service";
import {ProjectService} from "../../services/project/project.service";
import {Router} from "@angular/router";
import {ProjectUser} from "../../models/project-user.model";
import {UserService} from "../../services/user.service";
import {OrganisationInvitation} from "../../models/organisation-invitation";
import {OrganisationInvitationService} from "../../services/organization/organisation-invitation-service";
import {OrganisationService} from "../../services/organization/organisation.service";
import {OrganisationUser} from "../../models/organization-user";
import {OrganizationUserService} from "../../services/organization/organization-user.service";
import {OrganisationProjectInvitation} from "../../models/organisation-project-invitation";
import {OrganisationProjectInvitationService} from "../../services/organization/organisation-project-invitation.service";
import {ProjectOrganizationService} from "../../services/project/project-organization.service";
import {ProjectOrganization} from "../../models/project-organization.model";

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {

  invites: ProjectInvitation[] = [];
  orgInvites: OrganisationInvitation[] = [];
  orgProjectInvites: OrganisationProjectInvitation[] = [];

  constructor(
    private projectInviteService: ProjectInvitesService,
    private projectUserService: ProjectUserService,
    public projectService: ProjectService,
    private userService: UserService,
    public orgInviteService: OrganisationInvitationService,
    private orgProjectInviteService: OrganisationProjectInvitationService,
    private orgUserService: OrganizationUserService,
    private projectOrgService: ProjectOrganizationService,
    private orgService: OrganisationService,
    private router: Router) { }

  ngOnInit(): void {

    this.invites = this.projectInviteService.getAllInvitesForUser(localStorage.getItem("user"));

    this.orgProjectInviteService.inviteChanged.subscribe(
      () => {
        this.populateOrgProjectInvites()
        this.orgInvites = this.orgInviteService.getAllInvitesForUser(localStorage.getItem("user"));
        this.invites = this.projectInviteService.getAllInvitesForUser(localStorage.getItem("user"));
      }
    )

    this.orgInviteService.inviteChanged.subscribe(
      () => {
        this.populateOrgProjectInvites()
        this.orgInvites = this.orgInviteService.getAllInvitesForUser(localStorage.getItem("user"));
        this.invites = this.projectInviteService.getAllInvitesForUser(localStorage.getItem("user"));
      }
    )

    this.projectInviteService.inviteChanged.subscribe(
      () => {
        this.populateOrgProjectInvites()
        this.orgInvites = this.orgInviteService.getAllInvitesForUser(localStorage.getItem("user"));
        this.invites = this.projectInviteService.getAllInvitesForUser(localStorage.getItem("user"));
      }
    )

  }

  clickProject(projectId: number){
    this.router.navigate(['/project-profile', projectId]);
  }

  clickOrg(orgId: number){
    this.router.navigate(['/organization-profile', orgId]);
  }

  clickUser(userId: number){
    this.router.navigate(['/profile', userId]);
  }

  populateOrgProjectInvites(){
    this.orgProjectInvites = this.orgProjectInviteService.getAllForUser(localStorage.getItem("user"));
  }

  onAccept(invitation: ProjectInvitation){
    this.projectUserService.save(new ProjectUser(invitation.project, invitation.receivingUser, false))
    this.projectInviteService.deleteById(invitation.id)
    setTimeout(()=>{location.reload()}, 500)
    this.invites = this.projectInviteService.getAllInvitesForUser(localStorage.getItem("user"))
  }

  onOrgAccept(invitation: OrganisationInvitation){
    this.orgUserService.save(new OrganisationUser(invitation.receivingUser, invitation.organisation, false));
    this.orgInviteService.deleteById(invitation.id);
    setTimeout(()=>{location.reload()}, 500)
    this.orgInvites = this.orgInviteService.getAllInvitesForUser(localStorage.getItem('user'));
  }
  onOrgProjectAccept(invitation: OrganisationProjectInvitation){
    this.projectOrgService.save(new ProjectOrganization(invitation.fromProject, invitation.toOrg));
    this.orgProjectInviteService.deleteById(invitation.id);
    setTimeout(()=>{location.reload()}, 500)
    this.orgProjectInvites = this.orgProjectInviteService.getAllForUser(localStorage.getItem("user"));
  }

  onDecline(invitation: ProjectInvitation){
    this.projectInviteService.deleteById(invitation.id);
    setTimeout(()=>{location.reload()}, 500)
    this.invites = this.projectInviteService.getAllInvitesForUser(localStorage.getItem("user"))
  }

  onOrgDecline(invitation: OrganisationInvitation){
    this.orgInviteService.deleteById(invitation.id);
    setTimeout(()=>{location.reload()}, 500)
    this.orgInvites = this.orgInviteService.getAllInvitesForUser(localStorage.getItem('user'));
  }

  onOrgProjectDecline(invitation: OrganisationProjectInvitation){
    this.orgProjectInviteService.deleteById(invitation.id);
    setTimeout(()=>{location.reload()}, 500)
    this.orgProjectInvites = this.orgProjectInviteService.getAllForUser(localStorage.getItem("user"));
  }
}
