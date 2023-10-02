import {User} from "./user";
import {OrganisationModel} from "./organisation.model";

export class OrganisationUser {
  id: number = 0; //gets assigned in the backend
  user: User;
  organization: OrganisationModel;
  isAdmin: boolean;

  constructor(user: User, organization: OrganisationModel, isAdmin: boolean) {
    this.user = user;
    this.organization = organization;
    this.isAdmin = isAdmin;
  }
}
