import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {ProjectUserService} from "../../services/project/project-user.service";
import {ProjectUser} from "../../models/project-user.model";
import {ProjectService} from "../../services/project/project.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjectInvitation} from "../../models/project-invitation";
import {ProjectInvitesService} from "../../services/project/project-invites.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  projectId: number;
  existingUsers: ProjectUser[] = [];
  currentUser!: User
  searchText: '';

  constructor(
    private userService: UserService,
    private projectUser: ProjectUserService,
    private projectService: ProjectService,
    private projectInvitesService: ProjectInvitesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.users = this.userService.findAll();
    this.currentUser = this.userService.findUserByEmail(localStorage.getItem('user'));

    this.route.params.subscribe(
      (params: Params) => {
        this.projectId = +params['id'];
        this.existingUsers = this.projectUser.getAllForProject(this.projectId)
      }
    );
  }

  onInvite(user: User): void{
    let projectInvite = new ProjectInvitation(this.currentUser, user, this.projectService.findProjectById(this.projectId.toString()), new Date())
    this.projectInvitesService.save(projectInvite);
    alert("User invited!");
    this.router.navigate(['/project-profile', this.projectId]);
  }

  removeExistingUsers() {
    let array = this.projectInvitesService.findAll()
    let idList: string[] = [];
    for (let i = 0; i < this.existingUsers.length; i++) {
      idList.push(this.existingUsers[i].user.id.toString())
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i].project == this.projectService.findProjectById(this.projectId.toString())){
        idList.push(array[i].receivingUser.id.toString())
      }
    }
    return this.users.filter(item => !idList.includes(item.id.toString()));
  }

}
