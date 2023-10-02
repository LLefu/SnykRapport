import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrganisationModel} from "../../models/organisation.model";
import {ProjectModel} from "../../models/project.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  orgChanged = new EventEmitter<OrganisationModel>();
  organisations: OrganisationModel[];

  constructor(private httpClient: HttpClient) {
    this.organisations = [];

    this.restGetOrgs().subscribe(organisations => {
      this.organisations = organisations;
      this.orgChanged.emit();
    }, error => {
      console.log(error.message);
    })
  }

  updateOrg(org: OrganisationModel): OrganisationModel{
    this.restPutOrg(org).subscribe(response => {
      this.organisations.push(response);
      org = response;
      this.orgChanged.emit();
    })

    return org;
  }

  addOrg(org: OrganisationModel): OrganisationModel {
    this.restPostOrg(org).subscribe(response => {
      this.organisations.push(response);
      org = response;
      this.orgChanged.emit();
    })

    return org;
  }

  // @ts-ignore
  findOrgById(id: string): OrganisationModel{
    for (let i = 0; i < this.organisations.length; i++){
      if (this.organisations[i].orgId.toString() == id){
        return this.organisations[i];
      }
    }
    return null
  }

  private restGetOrgs(): Observable<OrganisationModel[]> {
    return this.httpClient.get<OrganisationModel[]>(`${environment.apiUrl}/organisations`);
  }

  private restPostOrg(org: OrganisationModel): Observable<OrganisationModel> {
    return this.httpClient.post<OrganisationModel>(`${environment.apiUrl}/organisations`, org);
  }

  private restPutOrg(org: OrganisationModel): Observable<OrganisationModel> {
    const url = `${environment.apiUrl}/organisations/` + org.orgId;
    return this.httpClient.put<OrganisationModel>(url, org);
  }

  private restDeleteOrg(orgId: number) {
    const url = `${environment.apiUrl}/organisations/` + orgId;
    return this.httpClient.delete(url);
  }

  getOrgs(): OrganisationModel[]{
    return this.organisations;
  }
}
