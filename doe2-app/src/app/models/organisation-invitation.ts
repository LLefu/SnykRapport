import {User} from "./user";
import {OrganisationModel} from "./organisation.model";


export class OrganisationInvitation{
  id: number | undefined;
  sendingUser: User;
  receivingUser: User;
  organisation: OrganisationModel;
  date: Date;

  constructor(sendingUser: User, receivingUser: User, organisation: OrganisationModel, date: Date) {
    this.sendingUser = sendingUser;
    this.receivingUser = receivingUser;
    this.organisation = organisation;
    this.date = date;
  }

}
