import { Component, OnInit } from '@angular/core';
import {OrganisationService} from "../../services/organization/organisation.service";
import {ProjectService} from "../../services/project/project.service";
import {ProjectOrganizationService} from "../../services/project/project-organization.service";
import {OrganisationModel} from "../../models/organisation.model";
import {ProjectOrganization} from "../../models/project-organization.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjectModel} from "../../models/project.model";
import {OrganisationProjectInvitationService} from "../../services/organization/organisation-project-invitation.service";
import {OrganisationProjectInvitation} from "../../models/organisation-project-invitation";

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.css']
})
export class OrgListComponent implements OnInit {

  orgList: OrganisationModel[] = []
  existingOrgs: OrganisationModel[] = []
  projectId!: number;
  currentProject!: ProjectModel
  searchText : '';

  constructor(private orgService: OrganisationService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router,
              private projectOrgService: ProjectOrganizationService,
              private orgProjectInviteService: OrganisationProjectInvitationService) { }

  ngOnInit(): void {
    //fill the organisation list
    this.orgList = this.orgService.getOrgs();

    this.route.params.subscribe(
      (params: Params) => {
        this.projectId = +params['id'];
        this.existingOrgs = this.projectOrgService.findOrganisationsByProject(this.projectService.findProjectById(this.projectId.toString()));
      }
    );

    this.orgService.orgChanged.subscribe(
      () => {
        this.orgList = this.orgService.getOrgs();
      }
    )

    this.projectService.projectChanged.subscribe(
      () => {
        this.orgList = this.orgService.getOrgs();
        let projects : ProjectModel[] = this.projectService.projects
        for (let i = 0; i < projects.length; i++) {
          if (projects[i].projectId === this.projectId){
            this.currentProject = projects[i];
          }
        }
      }
    )

    this.projectOrgService.userChanged.subscribe(
      () => {
        this.existingOrgs = this.projectOrgService.findOrganisationsByProject(this.projectService.findProjectById(this.projectId.toString()));
        this.orgList = this.orgService.getOrgs();
      }
    )
  }

  removeExistingOrgs() {
    let idList: string[] = [];
    let array = this.orgProjectInviteService.findAll();
    for (let i = 0; i < this.existingOrgs.length; i++) {
      idList.push(this.existingOrgs[i].orgId.toString())
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i].fromProject == this.projectService.findProjectById(this.projectId.toString())){
        idList.push(array[i].toOrg.orgId.toString())
      }
    }
    return this.orgList.filter(item => !idList.includes(item.orgId.toString()));
  }

  onInvite(orgModel: OrganisationModel){
    this.orgProjectInviteService.save(new OrganisationProjectInvitation(this.projectService.findProjectById(this.projectId.toString()), orgModel));
    alert("Organisation added!");
    this.router.navigate(['/project-profile', this.projectId]);
  }
}
