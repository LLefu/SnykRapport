import {EventEmitter, Injectable} from '@angular/core';
import {RequestFromUserToJoinOrganization} from "../../models/request-to-join-organization";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
/**
 * @author Collin Poetoehena
 */
export class OrganisationJoinRequestService {
  joinRequests: RequestFromUserToJoinOrganization[];
  joinRequestsChanged = new EventEmitter();

  constructor(private httpClient: HttpClient) {
    this.joinRequests = [];

    this.restGetOrganisationJoinRequests().subscribe(res => {
      this.joinRequests = res;
    }, error => {
      console.log(error.message);
    })
  }

  //find all requests
  findAll(): RequestFromUserToJoinOrganization[] {
    return this.joinRequests;
  }

  findById(id: number): RequestFromUserToJoinOrganization {
    for (let i = 0; i < this.joinRequests.length; i++) {
      if (this.joinRequests[i].id === id) {
        return this.joinRequests[i];
      }
    }

    return null;
  }

  //all rest methods
  restGetOrganisationJoinRequests(): Observable<RequestFromUserToJoinOrganization[]> {
    // return this.httpClient.get<OrganisationUser[]>(`${environment.apiUrl}/organisation-users`);
    return this.httpClient.get<RequestFromUserToJoinOrganization[]>
    (`${environment.apiUrl}/organisation-join-requests`);
  }

  restPostOrganisationJoinRequest(joinRequest: RequestFromUserToJoinOrganization):
    Observable<RequestFromUserToJoinOrganization> {
    return this.httpClient.post<RequestFromUserToJoinOrganization>
    (`${environment.apiUrl}/organisation-join-requests`, joinRequest);
  }

  restDeleteOrganisationJoinRequest(id: number): Observable<RequestFromUserToJoinOrganization> {
    const url = `${environment.apiUrl}/organisation-join-requests/` + id;
    return this.httpClient.delete<RequestFromUserToJoinOrganization>(url);
  }

  restDeleteMultipleJoinRequests(joinRequests: RequestFromUserToJoinOrganization[]):
    Observable<RequestFromUserToJoinOrganization[]> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: joinRequests
    };

    return this.httpClient.delete<RequestFromUserToJoinOrganization[]>
    (`${environment.apiUrl}/organisation-join-requests`, options)
  }

  restPutOrganisationJoinRequest(joinRequests: RequestFromUserToJoinOrganization):
    Observable<RequestFromUserToJoinOrganization> {
    const url = `${environment.apiUrl}/organisation-join-requests/` + joinRequests.id;
    return this.httpClient.put<RequestFromUserToJoinOrganization>(url, joinRequests);
  }

  //update a join request
  update(joinRequest: RequestFromUserToJoinOrganization) {
    this.restPutOrganisationJoinRequest(joinRequest).subscribe(res => {
      for (let i = 0; i < this.joinRequests.length; i++) {
        if (res.id === this.joinRequests[i].id) {
          this.joinRequests[i] = res;
          this.joinRequestsChanged.emit();
        }
      }
    })
  }

  //delete a request with a given id
  deleteById(id: number) {
    this.restDeleteOrganisationJoinRequest(id).subscribe(() => {
      for (let i = 0; i < this.joinRequests.length; i++) {
        if (this.joinRequests[i].id === id) {
          this.joinRequests.splice(i, 1);
          this.joinRequestsChanged.emit();
        }
      }
    })
  }

  //save a request
  save(joinRequest: RequestFromUserToJoinOrganization) {
    this.restPostOrganisationJoinRequest(joinRequest).subscribe(res => {
      this.joinRequests.push(res);
      joinRequest = res;
      this.joinRequestsChanged.emit();
    })

    return joinRequest;
  }

  //delete multiple requests
  deleteMultipleRequests(joinRequest: RequestFromUserToJoinOrganization[]) {
    this.restDeleteMultipleJoinRequests(joinRequest).subscribe(res => {
      for (let i = 0; i < joinRequest.length; i++) {
        let index = this.joinRequests.indexOf(joinRequest[i]);
        this.joinRequests.splice(index, 1);
      }
      this.joinRequestsChanged.emit();
    })
  }

  //get all requests for a specific user with a given userId
  getAllForUser(userId: number): RequestFromUserToJoinOrganization[] {
    let tempRequests = [];
    for (let i = 0; i < this.joinRequests.length; i++) {
      if (this.joinRequests[i].fromUser.id === userId) {
        tempRequests.push(this.joinRequests[i]);
      }
    }
    return tempRequests;
  }

  //get all requests for a specific organization with a given organisationId
  getAllForOrganisation(organisationId: number): RequestFromUserToJoinOrganization[] {
    let tempRequests = [];
    for (let i = 0; i < this.joinRequests.length; i++) {
      if (this.joinRequests[i].organisation.orgId === organisationId) {
        tempRequests.push(this.joinRequests[i]);
      }
    }
    return tempRequests;
  }
}
