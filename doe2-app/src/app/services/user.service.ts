import {EventEmitter, Injectable} from '@angular/core';
import {User} from "../models/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
/**
 * @author Collin Poetoehena
 */
export class UserService {
  userChanged = new EventEmitter<User>();
  users: User[];
  loggedInUser: User;

  constructor(private httpClient: HttpClient) {
    this.users = [];

    this.restGetUsers().subscribe(users => {
      this.users = users;
      this.userChanged.emit();
    }, error => {
      console.log(error.message);
    })
  }

  isLoggedIn(): boolean {
    // console.log("is logged in: " + localStorage.getItem("isLoggedIn") == "true")
    return localStorage.getItem("isLoggedIn") == "true";
  }

  //rest methods for the user service
  private restGetUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/users`);
  }

  private restPostUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/users`, user);
  }

  private restPutUser(user: User): Observable<User> {
    const url = `${environment.apiUrl}/users/` + user.id;
    return this.httpClient.put<User>(url, user);
  }

  private restDeleteUser(userId: number) {
    const url = `${environment.apiUrl}/users/` + userId;
    return this.httpClient.delete(url);
  }

  //update user
  updateUser(user: User): boolean {
    this.restPutUser(user).subscribe(() => {
      for (let i = 0; i < this.users.length; i++) {
        if (user.id === this.users[i].id) {
          this.users[i] = user;
          this.userChanged.emit();
          return true;
        }
      }
      return false;
    })
    return false
  }

  //delete a user with a specific id
  deleteUserById(userId: number): void {
    this.restDeleteUser(userId).subscribe(() => {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === userId) {
          this.users.splice(i, 1);
          this.userChanged.emit();
        }
      }
    })
  }

  addUser(user: User): User {
    this.restPostUser(user).subscribe(response => {
      this.users.push(response);
      user = response;
      this.userChanged.emit();
    })
    return user;
  }

  //find all users
  findAll(): User[] {
    return this.users;
  }

  findUserByEmailAndPassword(email: string, password: string): User {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email && this.users[i].password === password) {
        return this.users[i];
      }
    }
    return null;
  }

  findUserByEmail(userEmail: string): User {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === userEmail) {
        return this.users[i];
      }
    }
    return null;
  }

  findUserById(userId: number): User {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === userId) {
        return this.users[i];
      }
    }
    return null
  }

  //login the given user
  userLogin(user: User): boolean {
    for (let i = 0; i < this.users.length; i++) {
      if (user.email === this.users[i].email && user.password === this.users[i].password) {
        this.loggedInUser = user;

        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem('user', this.loggedInUser.email);
        return true;
      }
    }
    return false;
  }

  //sign out
  signOutUser() {
    //reset localstorage
    localStorage.setItem("isLoggedIn", "false")
    localStorage.setItem('user', "null");
    this.loggedInUser = null;
  }
}
