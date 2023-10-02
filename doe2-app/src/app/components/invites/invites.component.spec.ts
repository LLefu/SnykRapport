import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitesComponent } from './invites.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {ProjectInvitation} from "../../models/project-invitation";
import {User} from "../../models/user";
import {ProjectModel} from "../../models/project.model";
import {OrganisationInvitation} from "../../models/organisation-invitation";
import {OrganisationModel} from "../../models/organisation.model";
import {OrganisationProjectInvitation} from "../../models/organisation-project-invitation";

describe('InvitesComponent', () => {
  let component: InvitesComponent;
  let fixture: ComponentFixture<InvitesComponent>;
  let componentHtml: HTMLHtmlElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitesComponent ],
      imports: [HttpClientModule, FormsModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitesComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentHtml).toBeTruthy();
  });

  /**
   * Test if the methods can be called
   *
   * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
   *
   * @author Isabel Ayseli
   */
  it('Test invites 01: should call methods', () => {
    // Arrange
    const dummySendingUser = new User('Isabel', 'Ayseli', 'isabel.ayseli@hva.nl',
      'testPassword', new Date("2003-09-01"), 'Netherlands', 'description');
    const dummyReceivingUser = new User('Bob', 'de Bouwer', 'bob.de.bouwer@hva.nl',
      'testPassword', new Date('1985-04-20'), 'the Netherlands', 'description');
    const project = new ProjectModel('Name', 'Description', 200);
    const organisation = new OrganisationModel('Org', "description", 200);

    const dummyProjectInvite = new ProjectInvitation(dummySendingUser, dummyReceivingUser, project, new Date());
    const dummyOrgInvite = new OrganisationInvitation(dummySendingUser, dummyReceivingUser, organisation, new Date());
    const dummyOrgProjectInvite = new OrganisationProjectInvitation(project, organisation);


    // Arrange
    spyOn(component, 'onAccept');
    spyOn(component, 'onOrgAccept');
    spyOn(component, 'onOrgProjectAccept');
    spyOn(component, 'onDecline');
    spyOn(component, 'onOrgDecline');
    spyOn(component, 'onOrgProjectDecline');

    // Act
    component.onAccept(dummyProjectInvite);
    component.onOrgAccept(dummyOrgInvite);
    component.onOrgProjectAccept(dummyOrgProjectInvite);
    component.onDecline(dummyProjectInvite);
    component.onOrgDecline(dummyOrgInvite);
    component.onOrgProjectDecline(dummyOrgProjectInvite);

    // Assert
    expect(component.onAccept).toHaveBeenCalledWith(dummyProjectInvite);
    expect(component.onOrgAccept).toHaveBeenCalledWith(dummyOrgInvite);
    expect(component.onOrgProjectAccept).toHaveBeenCalledWith(dummyOrgProjectInvite);
    expect(component.onDecline).toHaveBeenCalledWith(dummyProjectInvite);
    expect(component.onOrgDecline).toHaveBeenCalledWith(dummyOrgInvite);
    expect(component.onOrgProjectDecline).toHaveBeenCalledWith(dummyOrgProjectInvite);
  });
});
