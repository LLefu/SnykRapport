export class OrganisationScore {
  public id: number = 0;
  public score: number;
  public reviewedOrgID: number;
  public criticID: number;


  constructor(score: number, reviewedOrgID: number, criticID: number) {
    this.score = score;
    this.reviewedOrgID = reviewedOrgID;
    this.criticID = criticID;
  }
}
