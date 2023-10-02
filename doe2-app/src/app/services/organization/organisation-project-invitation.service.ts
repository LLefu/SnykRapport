import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrganisationProjectInvitation} from "../../models/organisation-project-invitation";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {OrganizationUserService} from "./organization-user.service";
import {UserService} from "../user.service";

@Injectable({
  providedIn: 'root'
})
export class OrganisationProjectInvitationService {
  orgProjectInvites: OrganisationProjectInvitation[] = []
  inviteChanged = new EventEmitter();

  constructor(
    private httpClient: HttpClient,
    private orgUserService: OrganizationUserService,
    private userService: UserService) {
    this.restGetOrgProjectInvitations().subscribe(invites => {
      this.orgProjectInvites = invites;
      this.inviteChanged.emit();
    }, error => {
      console.log(error.message);
    })
  }

  findAll(): OrganisationProjectInvitation[]{
    return this.orgProjectInvites;
  }

  getAllForUser(email: string): OrganisationProjectInvitation[] {
    let orgProjectInvites = [];
    for (let i = 0; i < this.orgProjectInvites.length; i++) {
      let users = this.orgUserService.getAllForOrganisation(this.orgProjectInvites[i].toOrg.orgId);
      for (let j = 0; j < users.length; j++) {
        if (this.userService.findUserByEmail(email).id == users[j].id) {
          orgProjectInvites.push(this.orgProjectInvites[i])
        }
      }
    }
    return orgProjectInvites;
  }


  save(invitation: OrganisationProjectInvitation){
    this.restSaveOrgProjectInvitation(invitation).subscribe(
      () => {
        this.inviteChanged.emit();
        this.orgProjectInvites.push(invitation);
      }
    );
  }

  deleteById(id: number) {
    this.restDeleteOrgProjectInvite(id).subscribe(() => {
      this.inviteChanged.emit();
      for (let i = 0; i < this.orgProjectInvites.length; i++) {
        if (this.orgProjectInvites[i].id === id) {
          this.orgProjectInvites.splice(i, 1);
        }
      }
    })
  }

  restSaveOrgProjectInvitation(invitation: OrganisationProjectInvitation): Observable<OrganisationProjectInvitation[]>{
    return this.httpClient.post<OrganisationProjectInvitation[]>(`${environment.apiUrl}/organisations-project-invites`, invitation);
  }

  restGetOrgProjectInvitations(): Observable<OrganisationProjectInvitation[]> {
    return this.httpClient.get<OrganisationProjectInvitation[]>(`${environment.apiUrl}/organisations-project-invites`);
  }

  restDeleteOrgProjectInvite(userId: number): Observable<OrganisationProjectInvitation> {
    const url = `${environment.apiUrl}/organisations-project-invites/` + userId;
    return this.httpClient.delete<OrganisationProjectInvitation>(url);
  }
}
