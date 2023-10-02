import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../../services/project/project.service";
import {ProjectModel} from "../../models/project.model";
import {ProjectUserService} from "../../services/project/project-user.service";
import {ProjectUser} from "../../models/project-user.model";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {ProjectInvitesService} from "../../services/project/project-invites.service";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  project: ProjectModel;
  projectUser: ProjectUser;
  users: User[] = [];
  currentUser!: User;
  pickedUsers: User[] = [];
  searchText: ''
  existingUsers: User[] = []

  constructor(
    private projectService: ProjectService,
    public router: Router,
    private userService: UserService,
    private projectUserService: ProjectUserService,
    private projectInvitationService: ProjectInvitesService
  )

  { }

  ngOnInit(): void {
    this.users = this.userService.findAll();
    this.currentUser = this.userService.findUserByEmail(localStorage.getItem('user'));
    this.existingUsers.push(this.currentUser);
    this.removeExistingUsers()
  }

  submit(){
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var description = (<HTMLInputElement>document.getElementById("description")).value;
    this.project = new ProjectModel(name,description,1 );
    this.projectUser = new ProjectUser(this.project,this.userService.findUserByEmail(localStorage.getItem("user")),true)
    this.projectUserService.save(this.projectUser);
    this.projectService.addProject(this.project);
    this.router.navigate(['/projects']).then(() =>{
      setTimeout(()=>{location.reload()}, 100)
    })
  }

  addUser(id: number){
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id){
        this.pickedUsers.push(this.users[i]);
        this.existingUsers.push(this.users[i])
        this.removeExistingUsers()
      }
    }
  }

  removeExistingUsers() {
    let idList: string[] = [];
    for (let i = 0; i < this.existingUsers.length; i++) {
      idList.push(this.existingUsers[i].id.toString())
    }
    return this.users.filter(item => !idList.includes(item.id.toString()));
  }
}
