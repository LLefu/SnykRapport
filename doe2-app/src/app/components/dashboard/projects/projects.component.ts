import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProjectModel} from "../../../models/project.model";
import {DashboardService} from "../../../services/dashboard.service";
import {ProjectUserService} from "../../../services/project/project-user.service";
import {ProjectUser} from "../../../models/project-user.model";
import {UserService} from "../../../services/user.service";
import {ProjectOrganizationService} from "../../../services/project/project-organization.service";
import {OrganisationModel} from "../../../models/organisation.model";
import {Router} from "@angular/router";
import {ProjectService} from "../../../services/project/project.service";
import {OrganisationService} from "../../../services/organization/organisation.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  form: FormGroup;
  projects: ProjectModel[] = [];
  coreNumber: number = 4;
  changePage: boolean = false;
  @Input() selectedProject: ProjectModel;
  projectsArray: ProjectModel[] = [];
  tempProjectsArray: ProjectModel[] | null = [];
  projectUser: ProjectUser | undefined;
  organizationArray: OrganisationModel[] = [];
  toIgnoreOrganizationArray: OrganisationModel[] | null = [];
  toIgnoreOrganizationArray2: OrganisationModel[] | null = [];
  toIgnoreOrganizationArray3: OrganisationModel[] | null = [];

  constructor(private formBuilder: FormBuilder,
              private dashboardService: DashboardService,
              private projectUserService: ProjectUserService,
              private userService: UserService,
              private projectOrganizationService: ProjectOrganizationService,
              private projectService: ProjectService,
              private organisationService: OrganisationService,
              private router: Router,
  ) {
    this.form = this.formBuilder.group({});


  }

  async ngOnInit() {

  }

  getProjectsByIndex(index: number) {
    return this.projectsArray[index];
  }

  getProjects(): ProjectModel[] {
    return this.projectUserService.getAllForUser(this.userService.findUserByEmail(localStorage.getItem('user'))?.id);
  }

  setSelectedProject(project: ProjectModel) {
    this.selectedProject = project;
    this.selectOrganization(4);
  }

  projectAlert(){
    if (this.selectedProject == null || undefined){
      return alert("First select a project! \nClick on 'first time?' for a more detailed explanation")
    }
    return null;
  }

  clickProject() {
    this.projectAlert()
    this.router.navigate(['/project-profile', this.selectedProject?.projectId]);
  }

  selectOrganization(coreNumber: number) {
    this.projectAlert()
    if (coreNumber == 0) {
      this.SetOrgsDegree()
    } else if (coreNumber == 1) {
      this.SetOrgsDegree2();
    } else if (coreNumber == 2) {
      this.SetOrgsDegree3()
    } else if (coreNumber == 3) {
      this.SetOrgsDegree4()
    }

    // if same core is selected it is unselected
    if (this.coreNumber == coreNumber) {
      this.coreNumber = 4;
    } else this.coreNumber = coreNumber;
  }

  SetOrgsDegree() {
    this.organizationArray = [];
    for (let i = 0; i < this.projectOrganizationService.findOrganisationsByProject(this.selectedProject).length; i++) {
      if (this.organisationService.findOrgById(this.projectOrganizationService.findOrganisationsByProject(
        this.selectedProject)[i].orgId.toString()) != null) {
        this.organizationArray.push(this.organisationService.findOrgById(
          this.projectOrganizationService.findOrganisationsByProject(this.selectedProject)[i].orgId.toString()));
      }
    }
    return this.organizationArray;
  }

  SetOrgsDegree2() {
    this.toIgnoreOrganizationArray = this.SetOrgsDegree();
    this.SetOtherDegrees(this.SetOrgsDegree(), this.toIgnoreOrganizationArray)
    return this.organizationArray;
  }

  SetOrgsDegree3() {
    this.toIgnoreOrganizationArray2 = [...this.SetOrgsDegree(), ...this.SetOrgsDegree2()];
    this.SetOtherDegrees(this.SetOrgsDegree2(), this.toIgnoreOrganizationArray2)
    return this.organizationArray;
  }

  SetOrgsDegree4() {
    this.toIgnoreOrganizationArray3 = [...this.SetOrgsDegree(), ...this.SetOrgsDegree2(), ...this.SetOrgsDegree3()];
    this.SetOtherDegrees(this.SetOrgsDegree3(), this.toIgnoreOrganizationArray3)
    return this.organizationArray;
  }

  SetOtherDegrees(orgArray: OrganisationModel[], toIgnoreOrgArray: OrganisationModel[]) {
    // gets projects from previous core
    this.tempProjectsArray = this.projectOrganizationService.findProjectsByOrganizations(orgArray);
    //pak voor elke project de orgs op
    this.organizationArray = this.projectOrganizationService.findOrganisationsByProjects(this.tempProjectsArray);
    //filters out items from previous degree
    const isEqual = (...objects: any[]) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));

    for (let i = 0; i < this.organizationArray.length; i++) {
      if (isEqual(this.organizationArray[i].orgId, toIgnoreOrgArray[i].orgId)) {
        this.organizationArray.splice(i, toIgnoreOrgArray.length);
      }
    }

    return this.organizationArray;
  }
}

