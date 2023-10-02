// import {TestBed} from '@angular/core/testing';
// import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
// import {RouterTestingModule} from "@angular/router/testing";
// import {environment} from "../../../environments/environment";
// import {ProjectUserService} from "./project-user.service";
// import {ProjectUser} from "../../models/project-user.model";
// import {ProjectModel} from '../../models/project.model';
// import {User} from '../../models/user';
//
//
// describe('ProjectUserService', () => {
//   let service: ProjectUserService;
//   let httpMock: HttpTestingController;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, RouterTestingModule]
//     });
//     service = TestBed.inject(ProjectUserService);
//     httpMock = TestBed.inject(HttpTestingController);
//
//     httpMock.expectOne(`${environment.apiUrl}/project-users`)
//   });
//
//   // verify the httpMock
//   afterEach(() => {
//     httpMock.verify();
//   })
//
//   //successful setup test
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//     expect(httpMock).toBeTruthy();
//   });
//
//
//   /**
//    * tests whether valid address info is returned
//    *
//    * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
//    *
//    * @author Emre Muhlandiz
//    */
//   it('Test 01: should return valid address info (emre)', () => {
//
//     const dummyData = [
//       {
//         id: 0,
//         project: {
//           projectId: 0,
//           projectName: '',
//           description: '',
//           employeeCountSize: 0,
//           financeSize: 500,
//           organizations: null,
//           users: null,
//         },
//         user: {
//           id: 10001,
//           firstName: 'Bert',
//           lastName: '',
//           email: '',
//           password: '',
//           dateOfBirth: null,
//           country: '',
//           personalDescription: '',
//         },
//         admin: true,
//       }
//     ];
//
//     service.save(new ProjectUser(new ProjectModel("Bert","desc",500),new User(
//       "name","lastname","email","password",null,"netherlands","desc"
//     ),true))
//
//     const reqP = httpMock.expectOne(
//       'http://localhost:8080/project-users');
//     expect(reqP.request.method).toBe('POST');
//
//     service.restGetProjectMemberById(0).subscribe((res: ProjectUser) => {
//       expect(res.user.firstName).toEqual('Bert');
//       expect(res.user.id).toEqual(10001);
//       expect(res.project.financeSize).toEqual(500);
//     });
//
//     const req = httpMock.expectOne(
//       'http://localhost:8080/project-users/' + 0);
//     expect(req.request.method).toBe('GET');
//
//     req.flush(dummyData);
//   });
//
//
//   /**
//    * Shows how wrong arguments don't work
//    *
//    * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
//    *
//    * @author Emre Muhlandiz
//    */
//   it('Test 02: should generate an exception due to wrong argument (emre)', () => {
//
//     //Arrange
//     const dummyData = [];
//
//     //Act
//     service.restGetProjectMemberById(0).subscribe((res: ProjectUser) => {
//     }, (err) => {
//       expect(err).toBeTruthy();
//     });
//
//     //Assert
//     const req = httpMock.expectOne(
//       'http://localhost:8080/project-users/' + 0);
//     expect(req.request.method).toBe('GET');
//
//     req.flush({
//       type: 'ERROR',
//       status: 400
//     });
//   });
// });
