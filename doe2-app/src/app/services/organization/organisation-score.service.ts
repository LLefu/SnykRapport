import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {OrganisationScore} from "../../models/organisation-score.model";

@Injectable({
  providedIn: 'root'
})
export class OrganisationScoreService {
  reviewChanged = new EventEmitter();
  reviews: OrganisationScore[];

  constructor(private httpClient: HttpClient) {
    this.reviews = [];
    this.restGetReview().subscribe(reviews => {
      this.reviews = reviews;
    }, error => {
      console.log(error.message);
    })
  }

  findAll(): OrganisationScore[] {
    return this.reviews.map(reviews => reviews);
  }

  findAllForOrganisation(orgId: number): Number[] {
    let allReviewsForUser = [];
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].reviewedOrgID === orgId) {
        allReviewsForUser.push(this.reviews[i].score);
      }
    }
    return allReviewsForUser;
  }

  findAllGivenScores(userId: number): Number[] {
    let allReviewsForUser = [];
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].criticID === userId) {
        allReviewsForUser.push(this.reviews[i].score);
      }
    }
    return allReviewsForUser;
  }

  addReview(review: OrganisationScore): OrganisationScore  {
    this.restPostReview(review).subscribe(response => {
      this.reviews.push(response);
      review = response;
      this.reviewChanged.emit();
    })
    return review;
  }


  updateReview(review: OrganisationScore): boolean {
    this.restPutReview(review).subscribe(() => {
      for (let i = 0; i < this.reviews.length; i++) {
        if (review.id === this.reviews[i].id) {
          this.reviews[i] = review;
          this.reviewChanged.emit();
          return true;
        }
      }
      return false;
    })
    return false
  }

  deleteReviewById(reviewId: number): void {
    this.restDeleteReview(reviewId).subscribe(() => {
      for (let i = 0; i < this.reviews.length; i++) {
        if (this.reviews[i].id === reviewId) {
          this.reviews.splice(i, 1);
          this.reviewChanged.emit();
        }
      }
    })
  }

  findAllForOrg(score: number): OrganisationScore[] {
    this.restFindAllForOrg(score).subscribe(reviews => {
      this.reviews = reviews;
      this.reviewChanged.emit();
    }, error => {
      console.log(error.message);
    })
    return this.reviews;
  }

  findAllForOrg2(orgId: number): OrganisationScore[] {
    let temp = [];
    for (let i = 0; i < this.findAll().length; i++) {
      if (this.findAll()[i].reviewedOrgID === orgId) {
        temp.push(this.findAll()[i])
      }
    }
    return temp;
  }


  restGetReview(): Observable<OrganisationScore[]> {
    return this.httpClient.get<OrganisationScore[]>(`${environment.apiUrl}/organisation-score`);
  }

  restFindAllForOrg(id: number): Observable<OrganisationScore[]> {
    return this.httpClient.get<OrganisationScore[]>(`${environment.apiUrl}/organisation-score/organisation/` + id);
  }

  restPostReview(review: OrganisationScore): Observable<OrganisationScore> {
    return this.httpClient.post<OrganisationScore>(`${environment.apiUrl}/organisation-score`, review);
  }

  restPutReview(review: OrganisationScore): Observable<OrganisationScore> {
    const url = `${environment.apiUrl}/organisation-score/` + review.id;
    return this.httpClient.put<OrganisationScore>(url, review);
  }

  restDeleteReview(userId: number) {
    const url = `${environment.apiUrl}/organisation-score/` + userId;
    return this.httpClient.delete(url);
  }

}
