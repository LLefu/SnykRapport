// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import {HttpClientModule} from "@angular/common/http";
// import {FormsModule} from "@angular/forms";
// import {RouterTestingModule} from "@angular/router/testing";
// import {ProjectProfileComponent} from "./project-profile.component";
// import {User} from "../../models/user";
// import {ProjectModel} from "../../models/project.model";
// import {ProjectUser} from "../../models/project-user.model";
// import {OrganisationModel} from "../../models/organisation.model";
//
// describe('ProjectProfileComponent', () => {
//   let component: ProjectProfileComponent;
//   let componentHtml: HTMLHtmlElement;
//   let fixture: ComponentFixture<ProjectProfileComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ProjectProfileComponent ],
//       imports: [HttpClientModule, FormsModule, RouterTestingModule]
//     })
//       .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProjectProfileComponent);
//     component = fixture.componentInstance;
//     componentHtml = fixture.debugElement.nativeElement;
//     fixture.detectChanges();
//   });
//
//   //successful setup test
//   it('should create', () => {
//     expect(component).toBeTruthy();
//     expect(componentHtml).toBeTruthy();
//   });
//
//   /**
//    * test the input fields  (don't forget to run back-end while testing fe!)
//    *
//    * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
//    *
//    * @author Tommy Bank
//    */
//   it( 'Buttons Should Work (Tommy)',  () => {
//
//     const dummyUser = new User('Tommy', 'Bank', 'tommy.bank@hva.nl',
//       'testPassword', new Date("2003-09-01"), 'Netherlands', 'description');
//     const project = new ProjectModel('Name', 'Description', 200);
//     const projectUser = new ProjectUser(project, dummyUser, false);
//     const organisation = new OrganisationModel('Org', "description", 200);
//
//
//     spyOn(component, "clickEdit");
//     spyOn(component, "clickInvite");
//     spyOn(component, "clickUser");
//     spyOn(component, "clickOrg");
//     spyOn(component, "onClickAddOrg");
//     spyOn(component, "isAdmin");
//
//     component.clickEdit();
//     component.clickInvite();
//     component.clickUser(projectUser);
//     component.clickOrg(organisation);
//     component.onClickAddOrg();
//     component.isAdmin();
//
//     expect(component.clickEdit).toHaveBeenCalled();
//     expect(component.clickInvite).toHaveBeenCalled();
//     expect(component.clickUser).toHaveBeenCalledWith(projectUser);
//     expect(component.clickOrg).toHaveBeenCalledWith(organisation);
//     expect(component.onClickAddOrg).toHaveBeenCalled();
//     expect(component.isAdmin).toHaveBeenCalled();
//
//   });
//
//
// });
