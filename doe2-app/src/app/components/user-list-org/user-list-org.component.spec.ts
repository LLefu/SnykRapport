import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListOrgComponent } from './user-list-org.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {UserFilterPipe} from "../../../pipes/user-filter.pipe";
import {User} from "../../models/user";

describe('UserListOrgComponent', () => {
  let component: UserListOrgComponent;
  let fixture: ComponentFixture<UserListOrgComponent>;
  let componentHtml: HTMLHtmlElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListOrgComponent, UserFilterPipe ],
      imports: [HttpClientModule, ReactiveFormsModule, FormsModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListOrgComponent);
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
  it('Test user list org 01: should call methods', () => {
    // Arrange
    const dummyUser = new User('Isabel', 'Ayseli', 'isabel.ayseli@hva.nl',
      'testPassword', new Date("2003-09-01"), 'Netherlands', 'description');
    spyOn(component, 'removeExistingUsers');
    spyOn(component, 'onInvite');

    // Act
    component.removeExistingUsers();
    component.onInvite(dummyUser);

    // Assert
    expect(component.removeExistingUsers).toHaveBeenCalled();
    expect(component.onInvite).toHaveBeenCalledWith(dummyUser);
  });
});
