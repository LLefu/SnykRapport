/**
 * Test a correct call to the 'save' and 'update' method
 * This test is important because it tests the most important functionality of the organisation service.
 * @author Tommy Bank
 */

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {environment} from "../../../environments/environment";
import {OrganisationModel} from "../../models/organisation.model";
import {OrganisationService} from "./organisation.service";

describe('OrganisationService', () => {
  let service: OrganisationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(OrganisationService);
    httpMock = TestBed.inject(HttpTestingController);

    httpMock.expectOne(`${environment.apiUrl}/organisations`)
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });

  it('Test 01 OrganisationService: should return the saved organisation (Tommy)', () => {

    //Dummy org
    const organisation = new OrganisationModel("Organisation Name", "description", 350)

    //Save dummy org
    let savedOrg = service.addOrg(organisation);

    //Find the saved org by id
    let foundOrg = service.findOrgById(savedOrg.orgId.toString());

    //expect the found org to be the same as the dummy org
    expect(foundOrg == organisation)

    //check request of save Organisation, needs to be POST
    const correctRequest = httpMock.expectOne(
      `${environment.apiUrl}/organisations`);
    expect(correctRequest.request.method).toBe('POST');

    //Flush the dummy org
    correctRequest.flush(organisation);
  });

  it('Test 02 OrganisationService: should return the updated organisation (Tommy)', () => {

    //Dummy org
    const organisation = new OrganisationModel("Organisation Name", "description", 350)

    //Save dummy org
    service.addOrg(organisation);

    //Update the dummy org
    organisation.orgName = "Updated name" +

    //Update the saved org
    service.updateOrg(organisation)

    //Find the updated org by id
    let foundOrg = service.findOrgById(organisation.orgId.toString());

    //Expect the found org to equal the updated org
    expect(foundOrg == organisation)

    //check request of saveOrg, should be POST
    const correctRequest = httpMock.expectOne(
      `${environment.apiUrl}/organisations`);
    expect(correctRequest.request.method).toBe('POST');

    //check request of updateOrg, should be PUT
    const correctRequest2 = httpMock.expectOne(
      `${environment.apiUrl}/organisations/` + 0);
    expect(correctRequest2.request.method).toBe('PUT');

    //Flush dummy org
    correctRequest2.flush(organisation);

  });

  it('Test 03 OrganisationService: should not find a non saved org and return null (Tommy)', () => {

    //Dummy org
    const organisation = new OrganisationModel("noname", "nodesc", 0)

    //Find the dummy org by id
    let result = service.findOrgById(organisation.orgId.toString())

    //Expect the result to be null, since it wasn't saved
    expect(result).toBe(null)

  });
});
