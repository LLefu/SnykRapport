export class Review {
  public reviewId: number = 0;
  public rating: number;
  public attribute: Attribute;
  public receiverId: number;
  public giverId: number;


  constructor(rating: number, attribute: Attribute, receiverId: number, giverId: number) {
    this.rating = rating;
    this.attribute = attribute;
    this.receiverId = receiverId;
    this.giverId = giverId;
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
