import {EventEmitter, Injectable} from '@angular/core';
import {ProjectInvitation} from "../../models/project-invitation";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectInvitesService {
  invites: ProjectInvitation[] = [];
  inviteChanged = new EventEmitter();

  constructor(private httpClient: HttpClient) {
    this.restGetProjectInvitations().subscribe(invites => {
      this.invites = invites;
      this.inviteChanged.emit();
    }, error => {
      console.log(error.message);
    })
  }

  findAll(): ProjectInvitation[] {
    return this.invites;
  }

  getAllInvitesForUser(email: string | undefined): ProjectInvitation[] {
    let tempInvites = [];
    for (let i = 0; i < this.findAll().length; i++) {
      if (this.findAll()[i].receivingUser.email === email) {
        tempInvites.push(this.findAll()[i]);
      }
    }
    return tempInvites;
  }

  deleteById(id: number) {
    this.restDeleteProjectInvite(id).subscribe(() => {
      this.inviteChanged.emit();
      for (let i = 0; i < this.invites.length; i++) {
        if (this.invites[i].id === id) {
          this.invites.splice(i, 1);
        }
      }
    })
  }

  save(invitation: ProjectInvitation){
    this.restSaveProjectInvitation(invitation).subscribe(
      () => {
        this.inviteChanged.emit();
        this.invites.push(invitation);
      }
    );
  }

  restSaveProjectInvitation(invitation: ProjectInvitation): Observable<ProjectInvitation[]>{
    return this.httpClient.post<ProjectInvitation[]>(`${environment.apiUrl}/invitations`, invitation);
  }

  restGetProjectInvitations(): Observable<ProjectInvitation[]> {
    return this.httpClient.get<ProjectInvitation[]>(`${environment.apiUrl}/invitations`);
  }

  restDeleteProjectInvite(userId: number): Observable<ProjectInvitation> {
    const url = `${environment.apiUrl}/invitations/` + userId;
    return this.httpClient.delete<ProjectInvitation>(url);
  }
}
