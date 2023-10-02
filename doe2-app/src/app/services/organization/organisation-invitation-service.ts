import {EventEmitter, Injectable} from '@angular/core';
import {OrganisationInvitation} from "../../models/organisation-invitation";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class OrganisationInvitationService {
  invites: OrganisationInvitation[] = []
  inviteChanged = new EventEmitter();

  constructor(private httpClient: HttpClient) {
    this.restGetOrgInvitations().subscribe(invites => {
      this.invites = invites;
      this.inviteChanged.emit();
    }, error => {
      console.log(error.message);
    })
  }

  findAll(): OrganisationInvitation[]{
    return this.invites;
  }

  getAllInvitesForUser(email: string | undefined): OrganisationInvitation[] {
    let tempInvites = [];
    for (let i = 0; i < this.findAll().length; i++) {
      if (this.findAll()[i].receivingUser.email === email) {
        tempInvites.push(this.findAll()[i]);
      }
    }
    return tempInvites;
  }

  deleteById(id: number) {
    this.restDeleteOrgInvite(id).subscribe(() => {
      this.inviteChanged.emit();
      for (let i = 0; i < this.invites.length; i++) {
        if (this.invites[i].id === id) {
          this.invites.splice(i, 1);
        }
      }
    })
  }

  save(invitation: OrganisationInvitation){
    this.restSaveOrgInvitation(invitation).subscribe(
      () => {
        this.inviteChanged.emit();
        this.invites.push(invitation);
      }
    );
  }

  restSaveOrgInvitation(invitation: OrganisationInvitation): Observable<OrganisationInvitation[]>{
    return this.httpClient.post<OrganisationInvitation[]>(`${environment.apiUrl}/org-invitations`, invitation);
  }

  restGetOrgInvitations(): Observable<OrganisationInvitation[]> {
    return this.httpClient.get<OrganisationInvitation[]>(`${environment.apiUrl}/org-invitations`);
  }

  restDeleteOrgInvite(userId: number): Observable<OrganisationInvitation> {
    const url = `${environment.apiUrl}/org-invitations/` + userId;
    return this.httpClient.delete<OrganisationInvitation>(url);
  }

}
