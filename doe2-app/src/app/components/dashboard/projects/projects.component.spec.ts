// import {ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {ProjectsComponent} from './projects.component';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms'
// import {HttpClientModule} from '@angular/common/http';
// import {RouterTestingModule} from '@angular/router/testing';
// import {ProjectOrganizationService} from "../../../services/project/project-organization.service";
//
//
// describe('ProjectsComponent', () => {
//   let component: ProjectsComponent;
//   let componentHtml: HTMLElement;
//   let fixture: ComponentFixture<ProjectsComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ProjectsComponent],
//       imports: [HttpClientModule, ReactiveFormsModule, FormsModule, RouterTestingModule]
//     })
//       .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProjectsComponent);
//     component = fixture.componentInstance;
//     componentHtml = fixture.debugElement.nativeElement;
//     fixture.detectChanges();
//   });
//
//
//   /**
//    * Test if clickable degree's are functioning
//    *
//    * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
//    *
//    * @author Emre Muhlandiz
//    */
//   it('Test 01: Degree of Engagement should call methods (emre)', () => {
//
//     // first degree:
//     //Arrange
//     const degreeButton: HTMLButtonElement = componentHtml.querySelector('#coreLegendButton');
//     const spy = spyOn(component, 'SetOrgsDegree');
//
//
//     //Act
//     degreeButton.click();
//     fixture.detectChanges(); // Angular should be updated
//
//     //Assert
//     expect(spy).toHaveBeenCalled();
//
//     //Second degree
//     //Arrange
//     const degreeButton2: HTMLButtonElement = componentHtml.querySelector('#coreLegendButton1');
//     const locationService2 = fixture.debugElement.injector.get(ProjectOrganizationService);
//     const spy2 = spyOn(locationService2, 'findOrganisationsByProjects');
//     //Act
//     degreeButton2.click();
//     fixture.detectChanges(); // Angular should be updated
//
//     //Assert
//     expect(spy2).toHaveBeenCalled();
//
//     //Third degree
//     //Arrange
//     const degreeButton3: HTMLButtonElement = componentHtml.querySelector('#coreLegendButton2');
//     const spy3 = spyOn(component, 'SetOrgsDegree3');
//     //Act
//     degreeButton3.click();
//     fixture.detectChanges(); // Angular should be updated
//
//     //Assert
//     expect(spy3).toHaveBeenCalled();
//
//     //Fourth degree
//     //Arrange
//     const degreeButton4: HTMLButtonElement = componentHtml.querySelector('#coreLegendButton3');
//     const spy4 = spyOn(component, 'SetOrgsDegree4');
//     //Act
//     degreeButton4.click();
//     fixture.detectChanges(); // Angular should be updated
//
//     //Assert
//     expect(spy4).toHaveBeenCalled();
//   });
//
//
//     /**
//      * tests whether the getProjects function gets called properly
//      *
//      * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
//      *
//      * @author Emre Muhlandiz
//      */
//     it('Test 02: should get projects for the user (emre)', () => {
//       //Arrange
//       spyOn(component, 'getProjects');
//
//       //Act
//       component.getProjects();
//
//       //Assert
//       expect(component.getProjects).toHaveBeenCalled();
//     });
//
//     /**
//      *
//      *
//      * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
//      *
//      * @author Emre Muhlandiz
//      */
//     it('Test 03: Degree of Engagement should call methods (emre)', () => {
//
//       //Arrange
//       const degreeButton: HTMLButtonElement = componentHtml.querySelector('#coreLegendButton');
//
//       //Act
//       fixture.detectChanges(); // Angular should be updated
//       const getDataSpy = spyOn(component,'SetOrgsDegree');
//       const getDataSpy3 = spyOn(component,'projectAlert');
//       degreeButton.click();
//
//       //Assert methods
//       expect(getDataSpy).toHaveBeenCalled();
//       expect(getDataSpy3).toHaveBeenCalled();
//
//     });
//
// });
