import {User} from "./user";
import {OrganisationModel} from "./organisation.model";

/**
 * @author Collin Poetoehena
 */
export class RequestFromUserToJoinOrganization {
  id: number = 0; //gets assigned in the backend
  fromUser: User;
  organisation: OrganisationModel;

  constructor(fromUser: User, organisation: OrganisationModel) {
    this.fromUser = fromUser;
    this.organisation = organisation;
  }
}
