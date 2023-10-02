// import { TestBed } from '@angular/core/testing';
//
// import { ProjectInvitesService } from './project-invites.service';
// import {User} from "../../models/user";
// import {environment} from "../../../environments/environment";
// import {ProjectModel} from "../../models/project.model";
// import {ProjectInvitation} from "../../models/project-invitation";
// import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
// import {RouterTestingModule} from "@angular/router/testing";
//
// /**
//  * test a correct call to 'getAllInvitesForUser' method
//  * I test this method because it is the most important method for the usage of project
//  * invitations because to use the invites you need to find them per user first
//  *
//  * @author Isabel Ayseli
//  */
// describe('ProjectInvitesService', () => {
//   let service: ProjectInvitesService;
//   let httpMock: HttpTestingController;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, RouterTestingModule]
//     });
//     service = TestBed.inject(ProjectInvitesService);
//     httpMock = TestBed.inject(HttpTestingController);
//
//     httpMock.expectOne(`${environment.apiUrl}/invitations`)
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
//   it('Test 01 ProjectInviteService: should return a valid project invitation', () => {
//
//     const dummySendUser = new User('Isabel', 'Ayseli', 'isabel.ayseli@hva.nl',
//       'testPassword', new Date("2003-09-01"), 'Netherlands', 'description');
//     const dummyReceivingUser = new User('Bob', 'de Bouwer', 'bob.de.bouwer@hva.nl',
//       'testPassword', new Date("2003-05-13"), 'Netherlands', 'description2');
//     const project = new ProjectModel("Project name", "description", 300);
//
//     let tempProjectInvite = new ProjectInvitation(dummySendUser, dummyReceivingUser, project, new Date())
//     service.save(tempProjectInvite);
//
//     let foundProjectInvite = service.getAllInvitesForUser(dummyReceivingUser.email);
//     for (let i = 0; i < foundProjectInvite.length; i++) {
//       if (foundProjectInvite[i] == tempProjectInvite){
//         expect(foundProjectInvite[i].project).toEqual(project);
//         expect(foundProjectInvite[i].sendingUser).toEqual(dummySendUser);
//         expect(foundProjectInvite[i].receivingUser).toEqual(dummyReceivingUser);
//       }
//     }
//
//     //check request of add user, needs to be POST
//     const correctRequest = httpMock.expectOne(
//       `${environment.apiUrl}/invitations`);
//     expect(correctRequest.request.method).toBe('POST');
//
//     correctRequest.flush(tempProjectInvite);
//   });
// });
