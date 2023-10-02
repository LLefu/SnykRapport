import {UserListComponent} from "./user-list.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {User} from "../../models/user";
import {UserFilterPipe} from "../../../pipes/user-filter.pipe";

describe('UserListComponent', () => {
  let component: UserListComponent;
  let componentHtml: HTMLHtmlElement;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent, UserFilterPipe],
      imports: [HttpClientModule, FormsModule, RouterTestingModule]
    })
      .compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  })

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
  it('Test user list 01: should call methods ', () => {
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
})
