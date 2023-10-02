// import { TestBed } from '@angular/core/testing';
//
// import { OrganisationProjectInvitationService } from './organisation-project-invitation.service';
// import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
// import {RouterTestingModule} from "@angular/router/testing";
// import {environment} from "../../../environments/environment";
// import {User} from "../../models/user";
// import {OrganisationModel} from "../../models/organisation.model";
// import {OrganisationProjectInvitation} from "../../models/organisation-project-invitation";
// import {ProjectModel} from "../../models/project.model";
// import {OrganisationUser} from "../../models/organization-user";
//
// /**
//  * test a correct call to 'getAllForUser' method
//  * I test this method because it is the most important method for the usage of organisation
//  * invitations because to use the invites you need to find them per user first
//  *
//  * @author Isabel Ayseli
//  */
// describe('OrganisationProjectInvitationService', () => {
//   let service: OrganisationProjectInvitationService;
//   let httpMock: HttpTestingController;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, RouterTestingModule]
//     });
//     service = TestBed.inject(OrganisationProjectInvitationService);
//     httpMock = TestBed.inject(HttpTestingController);
//
//     httpMock.expectOne(`${environment.apiUrl}/organisations-project-invites`);
//   });
//
//   afterEach(() => {
//     httpMock.verify();
//   })
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//     expect(httpMock).toBeTruthy();
//   });
//   /**
//    * dit zegt steeds dat ie 2 get requests krijgt idk why
//    */
//
//   it('Test 01 OrganisationProjectInvitationService: should return a valid organisationProjectInvitation', () => {
//     const project = new ProjectModel("Project", "description", 100);
//     const organisation = new OrganisationModel("Org name", "description", 500);
//     const dummySendUser = new User('Isabel', 'Ayseli', 'isabel.ayseli@hva.nl',
//      'testPassword', new Date("2003-09-01"), 'Netherlands', 'description');
//     const orgAdmin = new OrganisationUser(dummySendUser, organisation, true);
//
//     let tempOrgProjectInvite = new OrganisationProjectInvitation(project, organisation);
//     service.save(tempOrgProjectInvite);
//
//     let foundOrgProjectInvite = service.getAllForUser(orgAdmin.user.email);
//     for (let i = 0; i < foundOrgProjectInvite.length; i++) {
//       if (foundOrgProjectInvite[i] == tempOrgProjectInvite){
//         expect(foundOrgProjectInvite[i].toOrg).toEqual(organisation);
//         expect(foundOrgProjectInvite[i].fromProject).toEqual(project);
//       }
//     }
//
//     const correctRequest = httpMock.expectOne(
//       `${environment.apiUrl}/organisations-project-invites`);
//     expect(correctRequest.request.method).toBe('POST');
//
//     correctRequest.flush(tempOrgProjectInvite);
//   });
// });
