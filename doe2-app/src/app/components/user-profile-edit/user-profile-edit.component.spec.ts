import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserProfileEditComponent} from './user-profile-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

describe('UserProfileEditComponent', () => {
  let component: UserProfileEditComponent;
  let componentHtml: HTMLHtmlElement;
  let fixture: ComponentFixture<UserProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileEditComponent],
      imports: [HttpClientModule, FormsModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    localStorage.clear()
    fixture = TestBed.createComponent(UserProfileEditComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });


  // successful setup test
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentHtml).toBeTruthy();
  });

  beforeEach(async()=>{
    localStorage.setItem('user', "test@test0.nl")
    localStorage.setItem('isLoggedIn', "true")
  })

  it('User profile edit test 01: expect the button "save changes" to have been called',  () => {

    //Arrange
    spyOn(component, "submit")

    //Act
    component.submit();

    //Assert
    expect(component.submit).toHaveBeenCalled();

  });

});
