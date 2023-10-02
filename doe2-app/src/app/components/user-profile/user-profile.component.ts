import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProjectUserService} from "../../services/project/project-user.service";
import {ProjectOrganizationService} from "../../services/project/project-organization.service";
import {ReviewService} from "../../services/review/review.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {OrganisationModel} from "../../models/organisation.model";
import {Review} from "../../models/review";
import {User} from "../../models/user";
import {ProjectModel} from "../../models/project.model";
import {OrganizationUserService} from "../../services/organization/organization-user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  private currentUser: User;
  private userId: number;
  projects: ProjectModel[] = [];
  loggedInUserProjects: ProjectModel[] = [];
  organizations: OrganisationModel[] = [];
  age: number;
  private reviews: Review[] = [];
  email: string;
  ratings: number = 0;
  isUser: boolean;
  isRate: boolean = false;
  isProject: boolean;
  private giverRatings: Review[] = [];
  private review: Review;
  private oldReview: Review;
  attributes = ['Adapt', 'Balanced', 'Communication', 'Creativity', 'Deadlines', 'Decisions', 'Deliver', 'Effort', 'Engagement', 'Expectations', 'Flexibility',
    'Insight', 'Involvement', 'Knowledge', 'Priorities', 'Productivity', 'Reality', 'Reliability', 'Responsibility', 'Teamwork', 'Valuable'];
  sliderValue: number = 1
  selectAttribute: string;
  private value: boolean = true;

  constructor(private userService: UserService,
              private projectUserService: ProjectUserService,
              private projectOrganizationService: ProjectOrganizationService,
              private organisationUserService: OrganizationUserService,
              private reviewService: ReviewService,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.userId = +params['id'];
        this.compareUsers();
        this.loadProjectsAndOrganizations();
        this.loadReviews();
      }
    );

    this.userService.userChanged.subscribe(
      () => {
        this.compareUsers();
      }
    )

  }

  compareUsers() {
    this.email = localStorage.getItem("user");
    this.currentUser = this.userService.findUserByEmail(this.email);
    this.user = this.userService.findUserById(this.userId);
    this.isUser = this.user === this.currentUser;
  }

  compareProjects() {
    this.isProject = !!this.projects.find(p => p);
  }

  loadProjectsAndOrganizations() {
    this.projects = [];
    this.organizations = [];
    this.projectUserService.restGetProjectMembers().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].user.id === this.userId) {
          this.projects.push(res[i].project)
        }

      }
      this.loadProjectsUser()
    })
    this.organisationUserService.restGetOrganisationUser().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].user.id === this.userId) {
          this.organizations.push(res[i].organization)
        }
      }
    })
  }

  loadProjectsUser() {
    this.loggedInUserProjects = [];
    this.projectUserService.restGetProjectMembers().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].user.id === this.currentUser.id) {
          this.loggedInUserProjects.push(res[i].project)
        }
      }
      this.compareProjects()
    }, err => {
      console.log(err.message);
    })
  }

  loadReviews() {
    this.reviews = [];
    this.ratings = 0;
    this.reviewService.restGetReview().subscribe((res) => {
      this.reviews = res;
      return res;
    })
  }

  getUser() {
    return this.user;
  }

  getProjects() {
    return this.projects;
  }

  getOrganizations() {
    return this.organizations;
  }

  getAge() {
    this.age = 0;
    let date = new Date(this.user.dateOfBirth);
    let timeDiff = Math.abs(Date.now() - date.getTime());
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return this.age;
  }

  getReviews(): Review[] {
    return this.reviews;
  }

  getReviewCount() {
    let counter = 0;
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].receiverId === this.user.id) {
        counter++
        this.ratings += Number(this.reviews[i].rating);
      }
    }
    return counter;
  }

  getAverageRating() {
    let counter = 0;
    this.ratings = 0;
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].receiverId === this.user.id) {
        counter++
        this.ratings += Number(this.reviews[i].rating);
      }
    }
    if (counter === 0) return counter;
    return (Math.round((this.ratings / counter) * 10) / 10);
  }

  getRatingsForReceiver() {
    let counter = 0;
    this.ratings = 0;
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].receiverId === this.user.id) {
        counter++
      }
    }
    return counter;
  }

  getAverageRatingForAttribute(attribute: string) {
    let counter = 0;
    this.ratings = 0;
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].receiverId === this.user.id) {
        if (this.reviews[i].attribute.toString() == attribute) {
          counter++
          this.ratings += Number(this.reviews[i].rating);
        }
      }
    }
    if (counter === 0) return counter;
    return (Math.round(this.ratings / counter));
  }

  counter(i: number) {
    return new Array(i);
  }

  reverseCounter(i: number) {
    return new Array(5 - i);
  }

  checkRated(event: Event) {
    if (event.target instanceof Element) {
      console.log(event.target.classList.contains('mainColor'))
      if (event.target.classList.contains('mainColor')) {
        this.value = true
      }
    }
  }

  editProfile() {
    this.router.navigate(['/profile-edit/', this.userId]);
  }

  clickStar(event: Event) {
    if (event.target instanceof Element) {
      let attribiute = event.target.id.split("-")[0]
      let rating = Number(event.target.id.split("-")[1])
      this.rateAttribute(attribiute, rating)
    }
  }

  rateUser() {
    if (this.selectAttribute == undefined) {
      return
    }
    this.rateAttribute(this.selectAttribute, this.sliderValue)
  }

  goProject(event: Event) {
    if (event.target instanceof Element) {
      this.router.navigate(['/project-profile/', Number(event.target.id.split("-")[1])]);
    }
  }

  goOrganization(event: Event) {
    if (event.target instanceof Element) {
      this.router.navigate(['/organization-profile/', Number(event.target.id.split("-")[1])]);
    }
  }

  async rateAttribute(attribute: string, rating: number) {
    this.oldReview = undefined;
    if (!this.isUser) {
      rating = Number(rating);
      this.giverRatings = this.reviewService.findAllForGiver(this.currentUser.id);

      for (let i = 0; i < this.giverRatings.length; i++) {
        if (this.giverRatings[i].receiverId == this.userId) {
          if (this.giverRatings[i].attribute.toString() == attribute) {
            this.oldReview = this.giverRatings[i];
            this.review = this.oldReview;
          }
        }
      }

      if (this.oldReview === undefined) {
        let stringToAttr = Attribute[attribute as keyof typeof Attribute];
        this.review = new Review(rating, stringToAttr, this.userId, this.currentUser.id);
        this.reviewService.addReview(this.review);
      } else {
        this.review.rating = rating;
        this.reviewService.updateReview(this.review);
      }

      await new Promise(f => setTimeout(f, 200));
      this.loadReviews()
    }
  }

  toggleAccordion(overview: string) {
    let element = document.getElementById(overview);
    if (element.classList.contains('fa-caret-down')) {
      element.classList.remove('fa-caret-down')
      element.classList.add('fa-caret-right');
    } else {
      element.classList.remove('fa-caret-right');
      element.classList.add('fa-caret-down');
    }
  }
}

enum Attribute {
  Adapt,
  Balanced,
  Communication,
  Creativity,
  Deadlines,
  Decisions,
  Deliver,
  Effort,
  Engagement,
  Expectations,
  Flexibility,
  Insight,
  Involvement,
  Knowledge,
  Priorities,
  Productivity,
  Reality,
  Reliability,
  Responsibility,
  Teamwork,
  Valuable
}



