import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../models/user";
import {OrganizationUserService} from "../../services/organization/organization-user.service";
import {OrganisationService} from "../../services/organization/organisation.service";
import {OrganisationInvitation} from "../../models/organisation-invitation";
import {OrganisationInvitationService} from "../../services/organization/organisation-invitation-service";

@Component({
  selector: 'app-user-list-org',
  templateUrl: './user-list-org.component.html',
  styleUrls: ['./user-list-org.component.css']
})
export class UserListOrgComponent implements OnInit {

  users: User[] = [];
  existingUsers: User[] = [];
  orgId!: number
  currentUser!: User;
  searchText: ''

  constructor(
    private userService: UserService,
    private orgUser: OrganizationUserService,
    private orgService: OrganisationService,
    private router: Router,
    private route: ActivatedRoute,
    private organisationInvitationService: OrganisationInvitationService
  ) { }


  ngOnInit(): void {
    this.users = this.userService.findAll();

    this.currentUser = this.userService.findUserByEmail(localStorage.getItem('user'));
    this.route.params.subscribe(
      (params: Params) => {
        this.orgId = +params['id'];
        this.existingUsers = this.orgUser.getAllForOrganisation(this.orgId)
        this.removeExistingUsers();
      }
    );
  }

  onInvite(user: User): void{
    let orgInvite = new OrganisationInvitation(this.currentUser, user, this.orgService.findOrgById(this.orgId.toString()), new Date())
    this.organisationInvitationService.save(orgInvite);
    alert("User invited!");
    this.router.navigate(['/organization-profile', this.orgId]);
  }

  removeExistingUsers() {
    let idList: string[] = [];
    let array = this.organisationInvitationService.findAll();
    for (let i = 0; i < this.existingUsers.length; i++) {
      idList.push(this.existingUsers[i].id.toString())
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i].organisation == this.orgService.findOrgById(this.orgId.toString())){
        idList.push(array[i].receivingUser.id.toString())
      }
    }
    return this.users.filter(item => !idList.includes(item.id.toString()));
  }

}
