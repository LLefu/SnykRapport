import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Review} from "../../models/review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviewChanged = new EventEmitter();
  reviews: Review[];

  constructor(private httpClient: HttpClient) {
    this.reviews = [];

    this.restGetReview().subscribe(reviews => {
      this.reviews = reviews;
      this.reviewChanged.emit();
    }, error => {
      console.log(error.message);
    })
  }

  findAll(): Review[] {
    return this.reviews;
  }

  findAllForGiver(userId: number): Review[] {
    let allReviewsForUser = [];
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].giverId === userId) {
        allReviewsForUser.push(this.reviews[i]);
      }
    }
    return allReviewsForUser;
  }

  findAllForReceiver(userId: number): Review[] {
    let allReviewsForUser = [];
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].receiverId === userId) {
        allReviewsForUser.push(this.reviews[i]);
      }
    }
    return allReviewsForUser;
  }

  addReview(review: Review): Review {
    this.restPostReview(review).subscribe(response => {
      this.reviews.push(response);
      review = response;
      this.reviewChanged.emit();
    })

    return review;
  }

  updateReview(review: Review): boolean {
    this.restPutReview(review).subscribe(() => {
      for (let i = 0; i < this.reviews.length; i++) {
        if (review.reviewId === this.reviews[i].reviewId) {
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
        if (this.reviews[i].reviewId === reviewId) {
          this.reviews.splice(i, 1);
          this.reviewChanged.emit();
        }
      }
    })
  }

  restGetReview(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${environment.apiUrl}/reviews`);
  }

  private restPostReview(review: Review): Observable<Review> {
    return this.httpClient.post<Review>(`${environment.apiUrl}/reviews`, review);
  }

  restPutReview(review: Review): Observable<Review> {
    const url = `${environment.apiUrl}/reviews/` + review.reviewId;
    return this.httpClient.put<Review>(url, review);
  }

  private restDeleteReview(userId: number) {
    const url = `${environment.apiUrl}/reviews/` + userId;
    return this.httpClient.delete(url);
  }

}
