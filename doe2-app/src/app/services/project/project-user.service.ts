import {EventEmitter, Injectable} from '@angular/core';
import {ProjectUser} from '../../models/project-user.model'
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {ProjectModel} from "../../models/project.model";
import {User} from "../../models/user";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectUserService {
  projectUsers: ProjectUser[];
  arrayprojects: ProjectModel[] = [];
  userChanged = new EventEmitter();
  subject = new Subject<ProjectModel[]>();

  constructor(private httpClient: HttpClient) {
    this.projectUsers = [];
    this.restGetProjectMembers().subscribe(res => {
      this.projectUsers = res;
    }, err => {
      console.log(err.message);
    })
  }

  findAll(): ProjectUser[] {
    return this.projectUsers.map(projects => projects);
  }

  findById(id: number): ProjectUser {
    for (let i = 0; i < this.projectUsers.length; i++) {
      if (this.projectUsers[i].id === id) {
        return this.projectUsers[i];
      }
    }
    return null;
  }

  findSpecificUser(userId: number, projectId: number){
    for (let i = 0; i < this.projectUsers.length; i++) {
      if (this.projectUsers[i].project.projectId == projectId && this.projectUsers[i].user.id == userId){
        return this.projectUsers[i];
      }
    }
    return null;
  }

  save(projectUser: ProjectUser) {
    this.restPostProjectUser(projectUser).subscribe(res => {
      this.projectUsers.push(res);
      this.userChanged.emit();
    })
  }

  update(projectUser: ProjectUser) {
    this.restPutProjectMember(projectUser).subscribe(response => {
      for (let i = 0; i < this.projectUsers.length; i++) {
        if (response.id === this.projectUsers[i].id) {
          this.projectUsers[i] = response;
          console.log(this.projectUsers[i])
          this.userChanged.emit();
        }
      }
    })
  }

  updateWithoutEmit(projectUser: ProjectUser) {
    this.restPutProjectMember(projectUser).subscribe(response => {
      for (let i = 0; i < this.projectUsers.length; i++) {
        if (response.id === this.projectUsers[i].id) {
          this.projectUsers[i] = response;
        }
      }
    })
  }

  deleteById(id: number) {
    this.restDeleteProjectMember(id).subscribe(() => {
      for (let i = 0; i < this.projectUsers.length; i++) {
        if (this.projectUsers[i].id === id) {
          this.projectUsers.splice(i, 1);
          this.userChanged.emit();
        }
      }
    })
  }

  deleteMultipleMembers(projectUsers: ProjectUser[]) {
    this.restDeleteMultipleMembers(projectUsers).subscribe(response => {
      for (let i = 0; i < projectUsers.length; i++) {
        let index = this.projectUsers.indexOf(projectUsers[i]);
        this.projectUsers.splice(index, 1);
      }
      this.userChanged.emit();
    })
  }

  getAllForProject(projectId: number): ProjectUser[] {
    let tempMembers = [];
    for (let i = 0; i < this.projectUsers.length; i++) {
      if (this.projectUsers[i].project.projectId === projectId) {
        tempMembers.push(this.projectUsers[i]);
      }
    }
    return tempMembers;
  }

  getAllForUser(userId: number): ProjectModel[] {
    let tempMembers = [];
    for (let i = 0; i < this.findAll().length; i++) {
      if (this.findAll()[i].user.id === userId) {
        tempMembers.push(this.findAll()[i].project);
      }
    }
    return tempMembers;
  }

  getMemberForUser(userId: number, projectId: number): ProjectUser {
    for (let i = 0; i < this.projectUsers.length; i++) {
      if (this.projectUsers[i].user.id === userId && this.projectUsers[i].project.projectId === projectId) {
        return this.projectUsers[i];
      }
    }
    return null;
  }

  restGetProjectMembers(): Observable<ProjectUser[]> {
    return this.httpClient.get<ProjectUser[]>(`${environment.apiUrl}/project-users`);
  }

  restGetProjectMemberById(id: number): Observable<ProjectUser> {
    return this.httpClient.get<ProjectUser>(`${environment.apiUrl}/project-users/` + id);
  }

  restPostProjectUser(projectUser: ProjectUser): Observable<ProjectUser> {
    return this.httpClient.post<ProjectUser>(`${environment.apiUrl}/project-users`, projectUser);
  }

  restPutProjectMember(user: ProjectUser): Observable<ProjectUser> {
    const url = `${environment.apiUrl}/project-users/` + user.id;
    return this.httpClient.put<ProjectUser>(url, user);
  }

  restDeleteProjectMember(userId: number): Observable<ProjectUser> {
    const url = `${environment.apiUrl}/project-users/` + userId;
    return this.httpClient.delete<ProjectUser>(url);
  }

  restDeleteMultipleMembers(members: ProjectUser[]): Observable<ProjectUser[]> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: members
    };

    return this.httpClient.delete<ProjectUser[]>(`${environment.apiUrl}/project-users`, options);
  }

}
