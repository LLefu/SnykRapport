import {EventEmitter, Injectable} from '@angular/core';
import {OrganisationUser} from "../../models/organization-user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrganizationUserService {
  users: OrganisationUser[];
  usersChanged = new EventEmitter();

  constructor(private httpClient: HttpClient) {
    this.users = [];
    this.restGetOrganisationUser().subscribe(res => {
      this.users = res;
    }, err => {
      console.log(err.message);
    })
  }

  findAll(): OrganisationUser[] {
    return this.users;
  }

  findById(id: number): OrganisationUser {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return this.users[i];
      }
    }
    return null;
  }

  //the methods with rest in there name are all http requests to the backend
  restGetOrganisationUser(): Observable<OrganisationUser[]> {
    // return this.httpClient.get<OrganisationUser[]>(`${environment.apiUrl}/organisation-users`);
    return this.httpClient.get<OrganisationUser[]>(`${environment.apiUrl}/organisation-users`);
  }

  restPostOrganisationUser(user: OrganisationUser): Observable<OrganisationUser> {
    return this.httpClient.post<OrganisationUser>(`${environment.apiUrl}/organisation-users`, user);
  }

  restPutOrganisationUser(user: OrganisationUser): Observable<OrganisationUser> {
    const url = `${environment.apiUrl}/organisation-users/` + user.id;
    return this.httpClient.put<OrganisationUser>(url, user);
  }

  restDeleteOrganisationUser(userId: number): Observable<OrganisationUser> {
    const url = `${environment.apiUrl}/organisation-users/` + userId;
    return this.httpClient.delete<OrganisationUser>(url);
  }

  restDeleteMultipleUsers(users: OrganisationUser[]): Observable<OrganisationUser[]> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: users
    };

    return this.httpClient.delete<OrganisationUser[]>(`${environment.apiUrl}/organisation-users`, options);
  }

  save(user: OrganisationUser) {
    this.restPostOrganisationUser(user).subscribe(res => {
      this.users.push(res);
      this.usersChanged.emit();
    })
  }

  update(user: OrganisationUser) {
    this.restPutOrganisationUser(user).subscribe(res => {
      for (let i = 0; i < this.users.length; i++) {
        if (res.id === this.users[i].id) {
          this.users[i] = res;
          this.usersChanged.emit();
        }
      }
    })
  }

  updateWithoutEmit(user: OrganisationUser) {
    this.restPutOrganisationUser(user).subscribe(res => {
      for (let i = 0; i < this.users.length; i++) {
        if (res.id === this.users[i].id) {
          this.users[i] = res;
        }
      }
    })
  }

  deleteById(id: number) {
    this.restDeleteOrganisationUser(id).subscribe(() => {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === id) {
          this.users.splice(i, 1);
          this.usersChanged.emit();
        }
      }
    })
  }

  deleteMultipleMembers(users: OrganisationUser[]) {
    this.restDeleteMultipleUsers(users).subscribe(res => {
      for (let i = 0; i < users.length; i++) {
        let index = this.users.indexOf(users[i]);
        this.users.splice(index, 1);
      }
      this.usersChanged.emit();
    })
  }

  getAllForOrganisation(organisationId: number): User[] {
    let temporaryUsers: User[] = [];
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].organization.orgId === organisationId) {
        temporaryUsers.push(this.users[i].user);
      }
    }
    return temporaryUsers;
  }

  findOrgsByUser(userId: number): OrganisationUser[] {
    let tempOrgUsers: OrganisationUser[] = [];
    let everything: OrganisationUser[] = this.findAll();
    for (let i = 0; i < this.users.length; i++) {
      if (everything[i].user.id === userId){
        tempOrgUsers.push(everything[i])
      }
    }
    return tempOrgUsers;
  }

  findSpecificUser(userId: number, orgID: number){
    for (let i = 0; i < this.users.length; i++) {
      console.log(this.users[i])
      if (this.users[i].organization.orgId == orgID && this.users[i].user.id == userId){
        return this.users[i];
      }
    }
    return null;
  }


  getMemberForUser(userId: number): OrganisationUser | null {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].user.id === userId) {
        return this.users[i];
      }
    }
    return null;
  }

  // isAdmin(user: User): boolean {
  //   for (let i = 0; i < this.users.length; i++) {
  //     if (this.users[i].user.id === user.id) {
  //       return this.users[i].isAdmin === true;
  //     }
  //   }
  //   return false;
  // }
}
