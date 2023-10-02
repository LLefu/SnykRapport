/**
 * Test a correct call to the 'save' and 'findOrganisationsByProject' method
 * This test is important because it tests the most important functionality of the project organisation table.
 * @author Tommy Bank
 */

import {ProjectOrganizationService} from "./project-organization.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {environment} from "../../../environments/environment";
import {ProjectModel} from "../../models/project.model";
import {OrganisationModel} from "../../models/organisation.model";
import {ProjectOrganization} from "../../models/project-organization.model";

describe('ProjectOrganisationService', () => {
  let service: ProjectOrganizationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(ProjectOrganizationService);
    httpMock = TestBed.inject(HttpTestingController);

    httpMock.expectOne(`${environment.apiUrl}/project-organisations`)
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });

  it('Test 01 ProjectOrganisationService: should return a the saved organisation (Tommy)', () => {

    //Dummy project & org
    const project = new ProjectModel("Project name", "description", 300);
    const organisation = new OrganisationModel("Organisation Name", "description", 350)

    //Dummy projectOrg
    let tempProjectOrganisation = new ProjectOrganization(project, organisation)

    //Save projectOrg
    service.save(tempProjectOrganisation);

    //find the org for the saved projectOrg by project
    let foundOrganisation = service.findOrganisationsByProject(project);

    //Check if the found org is the same as the dummy org
    expect(foundOrganisation[0] == organisation)

    //check request of save projectOrganisation, needs to be POST
    const correctRequest = httpMock.expectOne(`${environment.apiUrl}/project-organisations`);
    expect(correctRequest.request.method).toBe('POST');

    //Flush the saved projectOrg
    correctRequest.flush(tempProjectOrganisation);
  });
});
