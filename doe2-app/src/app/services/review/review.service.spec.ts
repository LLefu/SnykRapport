import {TestBed} from '@angular/core/testing';

import {ReviewService} from './review.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Review} from "../../models/review";
import {RouterTestingModule} from "@angular/router/testing";
import {environment} from "../../../environments/environment";

describe('ReviewService', () => {
  let service: ReviewService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(ReviewService);
    httpMock = TestBed.inject(HttpTestingController);

    httpMock.expectOne(`${environment.apiUrl}/reviews`)
  });

  // verify the httpMock
  afterEach(() => {
    httpMock.verify();
  })

  //successful setup test
  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });


  it('ReviewService test 01: should call methods', () => {
    //Arrange
    const dummyReview = new Review(5, 0, 10001, 10002);
    spyOn(service, 'findAll');
    spyOn(service, 'addReview');
    spyOn(service, 'updateReview');
    spyOn(service, 'findAllForGiver');
    spyOn(service, 'findAllForReceiver');
    spyOn(service, 'deleteReviewById');

    //Act
    service.findAll();
    service.addReview(dummyReview)
    service.updateReview(dummyReview)
    service.findAllForGiver(dummyReview.giverId)
    service.findAllForReceiver(dummyReview.receiverId)
    service.deleteReviewById(dummyReview.reviewId)

    //Assert
    expect(service.findAll).toHaveBeenCalled();
    expect(service.addReview).toHaveBeenCalledOnceWith(dummyReview);
    expect(service.updateReview).toHaveBeenCalledOnceWith(dummyReview);
    expect(service.findAllForGiver).toHaveBeenCalledOnceWith(dummyReview.giverId);
    expect(service.findAllForReceiver).toHaveBeenCalledOnceWith(dummyReview.receiverId);
    expect(service.deleteReviewById).toHaveBeenCalledOnceWith(dummyReview.reviewId);
  });

  it('ReviewService test 02: test a correct call to findAllForReceiver', () => {

    const dummyReviews = [];
    const dummyReviewsWithExpectedReceiverId = [];
    const receiverId = 10001;

    for (let i = 0; i < 4; i++) {
      dummyReviews.push(new Review(i, i, (receiverId + Math.floor(Math.random() * 3)), 10002))
      service.reviews.push(dummyReviews[i])
      if (dummyReviews[i].receiverId === receiverId) dummyReviewsWithExpectedReceiverId.push(dummyReviews[i])
    }

    for (let dummyReview of dummyReviews) {
      expect(service.findAllForReceiver(dummyReview.receiverId)).toBeDefined()
      if (dummyReview.receiverId === receiverId) expect(service.findAllForReceiver(dummyReview.receiverId)).toEqual(dummyReviewsWithExpectedReceiverId)
    }
  });

  it('ReviewService test 03: test findAll method', () => {
    const dummyReviews = [];
    const receiverId = 10001;

    for (let i = 0; i < 4; i++) {
      dummyReviews.push(new Review(i, i, (receiverId + Math.floor(Math.random() * 3)), 10002))
      service.reviews.push(dummyReviews[i])
    }

    const reviews: Review[] = service.findAll();

    expect(reviews).toBeDefined()
    for (let i = 0; i < dummyReviews.length; i++) {
      expect(reviews[i]).toEqual(dummyReviews[i])
    }
    expect(reviews.length).toEqual(dummyReviews.length)
  });

  it('ReviewService test 04: test deleting a review', () => {
    const review = new Review(5, 0, 10001, 10002)

    service.reviews.push(review)

    for (let i = 0; i < service.reviews.length; i++) {
      if (service.reviews[i] == review) {
        service.reviews.splice(i, 1);
      }
    }
    expect(service.reviews.length).toEqual(0)
  });

});
