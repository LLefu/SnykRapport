import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserProfileComponent} from './user-profile.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let componentHtml: HTMLHtmlElement;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [HttpClientModule, FormsModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    localStorage.clear()
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    localStorage.setItem('user', "test@test0.nl")
    localStorage.setItem('isLoggedIn', "true")
  })

  // successful setup test
  it('should create', () => {
    expect(component).toBeTruthy()
    expect(componentHtml).toBeTruthy();
  });

  it('Review test 01: get reviews for the user', () => {
    //Arrange
    spyOn(component, 'getReviews');

    //Act
    component.getReviews();

    //Assert
    expect(component.getReviews).toHaveBeenCalled();
  });

  it('User profile test 02: expect the button to edit profile to have been called',  () => {

    //Arrange
    spyOn(component, "editProfile")

    //Act
    component.editProfile();

    //Assert
    expect(component.editProfile).toHaveBeenCalled();

  });


})
