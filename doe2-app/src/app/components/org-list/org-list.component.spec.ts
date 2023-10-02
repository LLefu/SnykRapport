import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgListComponent } from './org-list.component';
import {OrganisationFilterPipe} from "../../../pipes/organisation-filter.pipe";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {OrganisationModel} from "../../models/organisation.model";

describe('OrgListComponent', () => {
  let component: OrgListComponent;
  let fixture: ComponentFixture<OrgListComponent>;
  let componentHtml: HTMLHtmlElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgListComponent, OrganisationFilterPipe ],
      imports: [HttpClientModule, FormsModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgListComponent);
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
  it('Test org list 01: should call methods', () => {
    // Arrange
    const organisation = new OrganisationModel('Org', "description", 200);
    spyOn(component, 'removeExistingOrgs');
    spyOn(component, 'onInvite');

    // Act
    component.removeExistingOrgs();
    component.onInvite(organisation);

    // Assert
    expect(component.removeExistingOrgs).toHaveBeenCalled();
    expect(component.onInvite).toHaveBeenCalledWith(organisation);
  });
});
