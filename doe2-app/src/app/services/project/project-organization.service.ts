import {EventEmitter, Injectable} from '@angular/core';
import {ProjectModel} from "../../models/project.model";
import {ProjectOrganization} from "../../models/project-organization.model";
import {OrganisationModel} from "../../models/organisation.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectOrganizationService {
  arrayProjectOrganizations: ProjectOrganization[];
  arrayProjects: ProjectModel[] = [];
  arrayOrganizations: OrganisationModel[] = [];
  userChanged = new EventEmitter();

  constructor(private httpClient: HttpClient) {
    this.arrayProjectOrganizations = [];
    this.restGetProjectOrganisations().subscribe(res => {
      this.arrayProjectOrganizations = res;
      this.userChanged.emit()
    }, err => {
      console.log(err.message);
    })
  }

  findAll(): ProjectOrganization[] {
    return this.arrayProjectOrganizations;
  }

  findById(id: number): ProjectOrganization {
    for (let i = 0; i < this.arrayProjectOrganizations.length; i++) {
      if (this.arrayProjectOrganizations[i].id === id) {
        return this.arrayProjectOrganizations[i];
      }
    }
    return null;
  }

  findOrganisationsByProject(project: ProjectModel): OrganisationModel[] {
    let temp: OrganisationModel[] = [];
    for (let i = 0; i < this.findAll().length; i++) {
      if (this.findAll()[i].project.projectId == project?.projectId) {
        temp.push(this.findAll()[i].organization)
      }
    }
    return temp;
  }

  findOrganisationsByProjects(projects: ProjectModel[]): OrganisationModel[] {
    let temp: OrganisationModel[] = [];
    if (projects == undefined) return temp
    for (let i = 0; i < projects.length; i++) {
      if (this.arrayProjectOrganizations[i].project.projectId == projects[i].projectId) {
        temp.push(this.arrayProjectOrganizations[i].organization)
      }
    }
    return temp;
  }


  findProjectsByOrganizations(organisations: OrganisationModel[]): ProjectModel[] {
    let temp: ProjectModel[] = [];
    if (organisations == undefined) return temp
    for (let i = 0; i < this.arrayProjectOrganizations.length; i++) {
      for (let j = 0; j < organisations.length; j++) {
        if (this.arrayProjectOrganizations[i].organization.orgId == organisations[j].orgId) {
          temp.push(this.arrayProjectOrganizations[i].project)
        }
      }
    }
    temp = [...new Set(temp)];
    return temp;
  }

  findProjectsByOrganization(organisations: OrganisationModel): ProjectModel[] {
    let temp: ProjectModel[] = [];
    if (organisations == undefined) return temp
    for (let i = 0; i < this.arrayProjectOrganizations.length; i++) {
      if (this.arrayProjectOrganizations[i].organization.orgId == organisations.orgId) {
        temp.push(this.arrayProjectOrganizations[i].project)
      }
    }
    temp = [...new Set(temp)];
    return temp;
  }

  findProjectsByOrganization2(organisations: OrganisationModel[]): ProjectModel[] {
    let temp: ProjectModel[] = [];
    if (organisations == undefined) return temp
    for (let i = 0; i < this.arrayProjectOrganizations.length; i++) {
      for (let j = 0; j < organisations.length; j++) {
        if (this.arrayProjectOrganizations[i].organization.orgId == organisations[j].orgId) {
          temp.push(this.arrayProjectOrganizations[i].project)
        }
      }
    }
    temp = [...new Set(temp)];
    return temp;
  }

  save(org: ProjectOrganization) {
    this.restSaveProjectOrganisation(org).subscribe(response => {
      this.arrayProjectOrganizations = response
      this.userChanged.emit();
    })
  }

  restGetProjectOrganisations(): Observable<ProjectOrganization[]> {
    return this.httpClient.get<ProjectOrganization[]>(`${environment.apiUrl}/project-organisations`);
  }

  restSaveProjectOrganisation(projectOrg: ProjectOrganization): Observable<ProjectOrganization[]> {
    return this.httpClient.post<ProjectOrganization[]>(`${environment.apiUrl}/project-organisations`, projectOrg);
  }


}
