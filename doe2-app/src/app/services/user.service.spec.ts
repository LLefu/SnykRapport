import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../models/user";
import {RouterTestingModule} from "@angular/router/testing";
import {environment} from "../../environments/environment";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    //TestBed is an API for writing unit tests in Angular
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);

    /*
    there is always one request here, because when you inject UserService the
    constructor of UserService will be executed and in there you can see that there is a
    request being executed: restGetUsers()
     */
    httpMock.expectOne(`${environment.apiUrl}/users`)
  });

  // verify the httpMock
  // this call is there to ensure that I don’t have any http calls that are unaccounted for, http requests without
  // an expectation will cause the test to fail and an error with unexpected http requests will be thrown
  afterEach(() => {
    httpMock.verify();
  })

  //successful setup test
  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });

  /**
   * Test if the methods can be called (don't forget to run back-end while testing fe!)
   *
   * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
   *
   * @author Collin Poetoehena
   */
  it('Test 01 UserService: should call methods', () => {
    //Arrange
    const dummyUser = new User('Collin', 'Poetoehena', 'collin.poetoehena@hva.nl',
      'testPassword', new Date("2003-05-12"), 'Netherlands', 'test description');
    //SpyOn is a Jasmine feature that allows dynamically intercepting the calls to a function and change its result.
    spyOn(service, 'isLoggedIn');
    spyOn(service, 'findAll');
    spyOn(service, 'signOutUser');
    spyOn(service, 'addUser');
    spyOn(service, 'updateUser');
    spyOn(service, 'findUserByEmailAndPassword');
    spyOn(service, 'findUserByEmail');

    //Act
    service.isLoggedIn();
    service.findAll();
    service.signOutUser();
    service.addUser(dummyUser);
    service.updateUser(dummyUser);
    service.findUserByEmailAndPassword(dummyUser.email, dummyUser.password);
    service.findUserByEmail(dummyUser.email);

    //Assert
    expect(service.isLoggedIn).toHaveBeenCalled();
    expect(service.findAll).toHaveBeenCalled();
    expect(service.signOutUser).toHaveBeenCalled();
    expect(service.addUser).toHaveBeenCalledOnceWith(dummyUser);
    expect(service.updateUser).toHaveBeenCalledOnceWith(dummyUser);
    expect(service.findUserByEmailAndPassword).toHaveBeenCalledOnceWith(dummyUser.email, dummyUser.password);
    expect(service.findUserByEmail).toHaveBeenCalledOnceWith(dummyUser.email);
  });

  /**
   * test a correct call to findUserByEmailAndPassword method
   * I test this method because it is the most important one for the login and register functionality
   * because you login with email and password
   *
   * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
   *
   * @author Collin Poetoehena
   */
  it('Test 02 UserService: test a correct call to findUserByEmailAndPassWord', () => {
    //Arrange
    const dummyUser = new User('Collin', 'Poetoehena', 'collin.poetoehena@hva.nl',
      'testPassword', new Date("2003-05-12"), 'Netherlands', 'test description');

    //Act
    service.users.push(dummyUser)

    //Assert
    expect(service.findUserByEmailAndPassword(dummyUser.email, dummyUser.password)).toBeDefined()
    expect(service.findUserByEmailAndPassword(dummyUser.email, dummyUser.password)).toEqual(dummyUser)
  });

  /**
   * test a call to findUserByEmailAndPassword method with non-existing data
   * if the user does not exist it should return null
   *
   * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
   *
   * @author Collin Poetoehena
   */
  it('Test 03 UserService: call to findUserByEmail should be null for non-existing user', () => {
    //Arrange
    const nonExistingUser = new User('Non', 'Existing', 'nonExisting.user@nonExisting.nl',
      'Non-existing password', new Date("2020-12-12"), 'Netherlands', 'non-existing user');

    //Act: call the service method
    //Assert: should equal null, because user is not submitted, so it is non-existing
    expect(service.findUserByEmailAndPassword(nonExistingUser.email,
      nonExistingUser.password)).toEqual(null);
  });

  /**
   * test the findAll method of userService
   *
   * This test is FIRST: Fast, Isolated, Repeatable, Self-Verifying, Timely
   *
   * @author Collin Poetoehena
   */
  it('Test 04 UserService: test findAll method', () => {
    //Arrange
    const dummyUser1 = new User('Dummy1', 'User1', 'dummy1.user1@hva.nl',
      'testPassword1', new Date("2020-12-12"), 'Netherlands', 'test description1');
    const dummyUser2 = new User('Dummy2', 'User2', 'dummy2.user2@hva.nl',
      'testPassword2', new Date("2020-12-12"), 'Netherlands', 'test description2');
    const dummyUser3 = new User('Dummy3', 'User3', 'dummy3.user3@hva.nl',
      'testPassword3', new Date("2020-12-12"), 'Netherlands', 'test description3');

    //Act
    service.users.push(dummyUser1, dummyUser2, dummyUser3)
    const userArray: User[] = service.findAll();

    //Assert
    expect(userArray).toBeDefined()
    expect(userArray).toEqual([dummyUser1, dummyUser2, dummyUser3])
    expect(userArray.length).toEqual(3)
  });
});
