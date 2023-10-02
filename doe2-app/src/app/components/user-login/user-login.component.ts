import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
/**
 * @author Collin Poetoehena
 */
export class UserLoginComponent implements OnInit {
  user: User;
  //user login attributes
  public email: string = "";
  public password: string = "";

  constructor(
    private userService: UserService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): boolean { //true if user was submitted, false if not
    this.user = this.userService.findUserByEmailAndPassword(this.email, this.password);
    //if the input is incorrect, send an alert to the user
    if (this.user == null) {
      alert("email or password is not valid!")
      return false;
    } else { //if the input is correct, login
      this.userService.userLogin(this.user);
      this.router.navigate(['/projects']);
      return true;
    }
  }
}
