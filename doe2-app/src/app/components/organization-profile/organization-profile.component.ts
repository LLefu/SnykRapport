import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProjectService} from "../../services/project/project.service";
import {OrganisationService} from "../../services/organization/organisation.service";
import {OrganizationUserService} from "../../services/organization/organization-user.service";
import {User} from "../../models/user";
import {ProjectOrganizationService} from "../../services/project/project-organization.service";
import {ProjectModel} from "../../models/project.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {OrganisationModel} from "../../models/organisation.model";
import {OrganisationScore} from "../../models/organisation-score.model";
import {OrganisationScoreService} from "../../services/organization/organisation-score.service";
import {ProjectUser} from "../../models/project-user.model";

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit {

  orgId: number;
  org: OrganisationModel;
  projects: ProjectModel[] = [];
  people: User[] = [];
  newOrganisationScore: OrganisationScore;
  oldOrganisationScore: OrganisationScore;
  loggedInUser: User;
  organisationsScores: OrganisationScore[];

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private orgService: OrganisationService,
    private route: ActivatedRoute,
    private orgUser: OrganizationUserService,
    private projectOrgService: ProjectOrganizationService,
    private router: Router,
    private organisationScoreService: OrganisationScoreService,
  ) {

  }

  async ngOnInit() {
    this.loggedInUser = this.userService.findUserByEmail(localStorage.getItem("user"))

    this.route.params.subscribe(
      (params: Params) => {
        this.orgId = +params['id'];
        this.org = this.orgService.findOrgById(this.orgId.toString());
        this.people = this.orgUser.getAllForOrganisation(this.orgId)
        this.projects = this.projectOrgService.findProjectsByOrganization(this.org)
      }
    );

    this.projectService.projectChanged.subscribe(
      () => {
        this.org = this.orgService.findOrgById(this.orgId.toString());
        this.projects = this.projectOrgService.findProjectsByOrganization(this.org)
        this.people = this.orgUser.getAllForOrganisation(this.orgId)
      }
    )

    this.userService.userChanged.subscribe(
      () => {
        this.org = this.orgService.findOrgById(this.orgId.toString());
        this.projects = this.projectOrgService.findProjectsByOrganization(this.org)
        this.people = this.orgUser.getAllForOrganisation(this.orgId)
      }
    )

    this.orgService.orgChanged.subscribe(
      () => {
        this.org = this.orgService.findOrgById(this.orgId.toString());
        this.projects = this.projectOrgService.findProjectsByOrganization(this.org)
        this.people = this.orgUser.getAllForOrganisation(this.orgId)
      }
    )

    this.projectOrgService.userChanged.subscribe(
      () => {
        this.org = this.orgService.findOrgById(this.orgId.toString());
        this.projects = this.projectOrgService.findProjectsByOrganization(this.org)
        this.people = this.orgUser.getAllForOrganisation(this.orgId)
      }
    )

    this.orgUser.usersChanged.subscribe(
      () => {
        this.people = this.orgUser.getAllForOrganisation(this.orgId)
      }
    )



    /*    this.route.params.subscribe(
          async (params: Params) => {
            console.log("$$$$$$$$$$$$$$")
            console.log(params.id)
            this.organisationsScores = await this.getAllScores(params.id);
          }
        );*/


  }

  clickEdit() {
    this.router.navigate(['/edit-organisation', this.orgId]);
  }

  isAdmin(): boolean | undefined{
    return this.orgUser.findSpecificUser(this.loggedInUser.id, this.orgId)?.isAdmin
  }

  clickInvite() {
    this.router.navigate(['/user-list-org', this.orgId]);
  }

  getAllScores(id: number): OrganisationScore[] {
    return this.organisationScoreService.findAllForOrg2(id);
  }

  getCount(id: number): number {
    let counter = 0;
    for (let i = 0; i < this.getAllScores(id).length; i++) {
      counter++
    }
    return counter;
  }

  counter(i: number) {
    if (i == undefined){
      return [0];
    }
    return new Array(Math.round(i));
  }

  getAverageRound(id: number) {
    if (id == 0) {
      return 0;
    }
    return Math.round(this.getAverageScore(id))
  }

  getAverageScore(id: number) {
    let counter = this.getCount(id);
    if (counter === 0) return counter;
    let average = 0;
    for (let i = 0; i < counter; i++) {
      average += this.organisationScoreService.findAllForOrg2(id)[i].score;
    }
    return (Math.round((average / counter)));
  }

  reverseCounter(i: number) {
    if (i == undefined) {
      i = 0
    }
    return new Array(5 - i);
  }

  clickStar(event: Event) {
    if (event.target instanceof Element) {
      let rating = Number(event.target.id);
      this.rateAttribute(rating);
    }
  }

  async rateAttribute(rating: number) {
    this.oldOrganisationScore = undefined;
    rating = Number(rating)
    this.organisationsScores = this.getAllScores(this.orgId);
    for (let i = 0; i < this.getAllScores(this.org.orgId).length; i++) {
      if (this.getAllScores(this.orgId)[i].criticID == this.loggedInUser.id) {


        this.oldOrganisationScore = this.organisationsScores[i];
        this.newOrganisationScore = this.oldOrganisationScore;
      }
    }
    if (this.oldOrganisationScore === undefined) {
      this.newOrganisationScore = new OrganisationScore(rating, this.orgId, this.loggedInUser.id)
      this.organisationScoreService.addReview(this.newOrganisationScore);
    } else {
      this.newOrganisationScore.score = rating;
      this.organisationScoreService.updateReview(this.newOrganisationScore);
    }
  }

  clickProject(project: ProjectModel): void{
    this.router.navigate(['/project-profile', project.projectId]);
  }

  clickUser(user: User): void{
    this.router.navigate(['/profile', user.id]);
  }



  /*
    getProjects() : ProjectModel[]{
      // @ts-ignore
      return this.projectUserService.getAllForUser(this.userService.findUserByEmail(localStorage.getItem('user'))?.id);
    }
  */

  /*  getAllScores3(id: number): OrganisationScore[]{
      return this.organisationScoreService.get
    }*/

}
