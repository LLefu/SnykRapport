import {Component, Input, OnInit} from '@angular/core';

import {ProjectsComponent} from '../projects/projects.component';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {OrganizationUserService} from "../../../services/organization/organization-user.service";
import {Router} from "@angular/router";
import {OrganisationModel} from "../../../models/organisation.model";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() coreNumber: number = 0;
  @Input() organizationArray: any;

  constructor(private projectComponent: ProjectsComponent,
              private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  onClickOrg(org: OrganisationModel): void{
    this.router.navigate(['/organization-profile', org.orgId]);
  }
}
