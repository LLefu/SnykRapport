import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRegisterComponent } from './user-register.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {User} from "../../models/user";

describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let componentHtml: HTMLHtmlElement;
  let fixture: ComponentFixture<UserRegisterComponent>; //fixture for debugging and testing a component.

  beforeEach(async () => {
    //TestBed is an API for writing unit tests in Angular
    await TestBed.configureTestingModule({
      declarations: [ UserRegisterComponent ],
      imports: [HttpClientModule, FormsModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();  // Angular should be updated
  });

  //successful setup test
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentHtml).toBeTruthy();
  });

  /**
   * test the input fields  (don't forget to run back-end while testing fe!)
   *
   * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
   *
   * @author Collin Poetoehena
   */
  it( 'User register test 01: input should update component property',  () => {
    // Arrange (getting UI components)
    const registerInputFirstName: HTMLInputElement = <HTMLInputElement>componentHtml.querySelector('#FirstName');
    const registerInputLastName: HTMLInputElement = <HTMLInputElement>componentHtml.querySelector('#LastName');
    const registerInputEmail: HTMLInputElement = <HTMLInputElement>componentHtml.querySelector('#email');
    const registerInputPassword: HTMLInputElement = <HTMLInputElement>componentHtml.querySelector('#password');
    const registerInputDateOfBirth: HTMLInputElement = <HTMLInputElement>componentHtml.querySelector('#dateOfBirth');
    const registerInputCountry: HTMLInputElement = <HTMLInputElement>componentHtml.querySelector('#country');
    const registerButton: HTMLButtonElement = <HTMLButtonElement>componentHtml.querySelector('#registerButton');

    // Act: Performing register
    //firstName
    registerInputFirstName.value = 'Collin';
    registerInputFirstName.dispatchEvent(new Event('input'));

    //lastName
    registerInputLastName.value = 'Poetoehena';
    registerInputLastName.dispatchEvent(new Event('input'));

    //email
    registerInputEmail.value = 'collin.poetoehena@hva.nl';
    registerInputEmail.dispatchEvent(new Event('input'));

    //password
    registerInputPassword.value = 'testPassword';
    registerInputPassword.dispatchEvent(new Event('input'));

    // dateOfBirth
    registerInputDateOfBirth.value = new Date('2003-05-12').toString();
    registerInputDateOfBirth.dispatchEvent(new Event('input'));

    //country
    registerInputCountry.value = 'Netherlands';
    registerInputCountry.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // Angular should be updated

    // Assert: Check if the property was updated with the correct values
    expect(component.firstName).toEqual(registerInputFirstName.value);
    expect(component.lastName).toEqual(registerInputLastName.value);
    expect(component.email).toEqual(registerInputEmail.value);
    expect(component.password).toEqual(registerInputPassword.value);
    expect(component.dateOfBirth).toContain(registerInputDateOfBirth.value.toString());
    expect(component.country).toEqual(registerInputCountry.value);
  });

  /**
   * Test if the methods can be called
   *
   * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
   *
   * @author Collin Poetoehena
   */
  it('User register test 02: should call methods', () => {
    //Arrange
    const dummyUser = new User('Collin', 'Poetoehena', 'collin.poetoehena@hva.nl',
      'testPassword', new Date("2003-05-12"), 'Netherlands', 'test description');
    //SpyOn is a Jasmine feature that allows dynamically intercepting the calls to a function and change its result.
    spyOn(component, 'submitUser');
    spyOn(component, 'emailIsTaken');

    //Act
    component.submitUser();
    component.emailIsTaken(dummyUser.email);

    //Assert
    expect(component.submitUser).toHaveBeenCalled();
    expect(component.emailIsTaken).toHaveBeenCalledWith(dummyUser.email);
  });
});
