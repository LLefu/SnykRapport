// import { TestBed } from '@angular/core/testing';
//
// import {User} from "../../models/user";
// import {environment} from "../../../environments/environment";
// import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
// import {RouterTestingModule} from "@angular/router/testing";
// import {OrganisationInvitationService} from "./organisation-invitation-service";
// import {OrganisationModel} from "../../models/organisation.model";
// import {OrganisationInvitation} from "../../models/organisation-invitation";
//
// /**
//  * test a correct call to 'getAllInvitesForUser' method
//  * I test this method because it is the most important method for the usage of organisation
//  * invitations because to use the invites you need to find them per user first
//  *
//  * @author Isabel Ayseli
//  */
// describe('OrganisationInvitationService', () => {
//   let service: OrganisationInvitationService;
//   let httpMock: HttpTestingController;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, RouterTestingModule]
//     });
//     service = TestBed.inject(OrganisationInvitationService);
//     httpMock = TestBed.inject(HttpTestingController);
//
//     httpMock.expectOne(`${environment.apiUrl}/org-invitations`)
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
//
//   it('Test 01 OrganisationInviteService: should return a valid organisation invitation', () => {
//
//     const dummySendUser = new User('Isabel', 'Ayseli', 'isabel.ayseli@hva.nl',
//       'testPassword', new Date("2003-09-01"), 'Netherlands', 'description');
//     const dummyReceivingUser = new User('Bob', 'de Bouwer', 'bob.de.bouwer@hva.nl',
//       'testPassword', new Date("2003-05-13"), 'Netherlands', 'description2');
//     const organisation = new OrganisationModel("Org name", "description", 500);
//
//     let tempOrgInvite = new OrganisationInvitation(dummySendUser, dummyReceivingUser, organisation, new Date())
//     service.save(tempOrgInvite);
//
//     let foundOrgInvite = service.getAllInvitesForUser(dummyReceivingUser.email);
//     for (let i = 0; i < foundOrgInvite.length; i++) {
//       if (foundOrgInvite[i] == tempOrgInvite){
//         expect(foundOrgInvite[i].organisation).toEqual(organisation);
//         expect(foundOrgInvite[i].sendingUser).toEqual(dummySendUser);
//         expect(foundOrgInvite[i].receivingUser).toEqual(dummyReceivingUser);
//       }
//     }
//
//     //check request of add user, needs to be POST
//     const correctRequest = httpMock.expectOne(
//       `${environment.apiUrl}/org-invitations`);
//     expect(correctRequest.request.method).toBe('POST');
//
//     correctRequest.flush(tempOrgInvite);
//   });
// });
