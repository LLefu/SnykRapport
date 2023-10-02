import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserLoginComponent } from './user-login.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let componentHtml: HTMLHtmlElement;
  let fixture: ComponentFixture<UserLoginComponent>; //fixture for debugging and testing a component.

  beforeEach(async () => {
    //TestBed is an API for writing unit tests in Angular
    await TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
      imports: [HttpClientModule, FormsModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges(); // Angular should be updated
  });

  //successful setup test
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentHtml).toBeTruthy();
  });

  /**
   * test if the input fields work correctly (don't forget to run back-end while testing fe!)
   *
   * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
   *
   * @author Collin Poetoehena
   */
  it( 'User login test 01: check if the input fields work correctly',  () => {
    // Arrange (getting UI components)
    const registerInputEmail: HTMLInputElement = <HTMLInputElement>componentHtml.querySelector('#email');
    const registerInputPassword: HTMLInputElement = <HTMLInputElement>componentHtml.querySelector('#password');
    const loginButton: HTMLButtonElement = <HTMLButtonElement>componentHtml.querySelector('#loginButton');

    // Act: Performing search
    //email
    registerInputEmail.value = 'collin.poetoehena@hva.nl';
    registerInputEmail.dispatchEvent(new Event('input'));

    //password
    registerInputPassword.value = 'testPassword';
    registerInputPassword.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // Angular should be updated

    // Assert: Check if the property was updated with the correct values
    expect(component.email).toEqual(registerInputEmail.value);
    expect(component.password).toEqual(registerInputPassword.value);
  });

  /**
   * Test if the methods can be called
   *
   * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
   *
   * @author Collin Poetoehena
   */
  it('User login test 02: should call methods', () => {
    //Arrange
    //SpyOn is a Jasmine feature that allows dynamically intercepting the calls to a function and change its result.
    spyOn(component, 'onSubmit');

    //Act
    component.onSubmit();

    //Assert
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
