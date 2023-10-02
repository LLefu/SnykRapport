import { Component, OnInit } from '@angular/core';
import {OrganisationService} from "../../services/organization/organisation.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjectModel} from "../../models/project.model";
import {ProjectService} from "../../services/project/project.service";
import {OrganisationModel} from "../../models/organisation.model";
import {OrganisationUser} from "../../models/organization-user";
import {OrganizationUserService} from "../../services/organization/organization-user.service";
import {ProjectOrganization} from "../../models/project-organization.model";
import {ProjectOrganizationService} from "../../services/project/project-organization.service";

@Component({
  selector: 'app-edit-organisation',
  templateUrl: './edit-organisation.component.html',
  styleUrls: ['./edit-organisation.component.css']
})
export class EditOrganisationComponent implements OnInit {

  orgId!: number;
  org!: OrganisationModel;
  organisationUser !: OrganisationUser;
  projectOrganisation !: ProjectOrganization;

  constructor(
    private orgService: OrganisationService,
    private orgUserService: OrganizationUserService,
    private projectOrganisationService: ProjectOrganizationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.orgId = +params['id'];
        this.org = this.orgService.findOrgById(this.orgId.toString());
      }
    );

    this.orgService.orgChanged.subscribe(
      () => {
        this.org = this.orgService.findOrgById(this.orgId.toString())
      }
    )
  }

  submit(){
    this.org.orgName = (<HTMLInputElement>document.getElementById("name")).value;
    this.org.description = (<HTMLInputElement>document.getElementById("description")).value;
    this.orgService.updateOrg(this.org);
    this.router.navigate(['/organization-profile', this.orgId]);

    this.addToOtherTables(this.orgUserService, this.organisationUser);
    this.addToOtherTables(this.projectOrganisationService, this.projectOrganisation);
  }

  addToOtherTables(service: OrganizationUserService | ProjectOrganizationService,
                   organisation: OrganisationUser | ProjectOrganization){

    for (let i = 0; i < service.findAll().length; i++) {
      if (service.findAll()[i].organization.orgId == this.org.orgId){
        organisation = service.findAll()[i];
        this.projectOrganisation.organization = this.org;
        // @ts-ignore
        service.update(organisation);
      }
    }

  }

}
