import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
/**
 * @author Collin Poetoehena
 */
export class UserRegisterComponent implements OnInit {

  user: User;
  userSubmitted = false;

  //user attributes
  public firstName: string = "";
  public lastName: string = "";
  public email: string = "";
  public password: string = "";
  public passwordRepeat: string = "";
  public dateOfBirth: Date;
  public country: string = "";
  public personalDescription: string = "";

  constructor(
    private userService: UserService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }

  submitUser(): boolean { //true if user was submitted, false if not
    if (this.firstName == "" || this.lastName == "" || this.email == ""
      || this.password == "" || this.dateOfBirth == null) { //input is not valid
      alert("all fields, except for country have to be filled")
    } else { //sign up the user
      if (this.password.length < 8) {
        alert("Your password should contain at least 8 characters");
        return false;
      }

      //check if the email is already taken
      if (this.emailIsTaken(this.email)) {
        alert("This email is already taken");
        return false;
      }

      if (this.password !== this.passwordRepeat) {
        alert("passwords do not match")
        return false;
      }

      //check if the repeated password equals password, then login
      if (this.password === this.passwordRepeat) {
        //add the user
        const user = new User(this.firstName, this.lastName,
          this.email, this.password, this.dateOfBirth,
          this.country, this.personalDescription);
        this.userService.addUser(user);
        alert("You can now login with your account")

        //navigate to login
        this.router.navigate(['/login']);

        return true;
      }
    }

    return false;
  }

  //method to check if an email is already taken
  emailIsTaken(email: string): boolean {
    let users = this.userService.findAll();
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        return true;
      }
    }
    return false; //false means that the email is free
  }
}
