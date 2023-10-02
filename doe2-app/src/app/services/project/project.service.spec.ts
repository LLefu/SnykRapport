// import {ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {ProjectService} from './project.service';
// import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
// import {RouterTestingModule} from "@angular/router/testing";
// import {environment} from "../../../environments/environment";
// import {ProjectsComponent} from "../../components/dashboard/projects/projects.component";
// import {UserService} from "../user.service";
//
// describe('ProjectService', () => {
//   let service: ProjectService;
//   let httpMock: HttpTestingController;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, RouterTestingModule]
//     });
//     service = TestBed.inject(ProjectService);
//     httpMock = TestBed.inject(HttpTestingController);
//
//     // No httpMock.expectOne because restGetProjectUsers is done in the ngOnninit and not in the constructor,
//     // so there wont always be one.
//   });
//
//
//   //successful setup test
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//     expect(httpMock).toBeTruthy();
//   });
//
// });
