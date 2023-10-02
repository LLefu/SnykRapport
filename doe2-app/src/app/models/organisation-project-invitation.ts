import {OrganisationModel} from "./organisation.model";
import {ProjectModel} from "./project.model";


export class OrganisationProjectInvitation{
  id: number | undefined;
  fromProject: ProjectModel;
  toOrg: OrganisationModel;

  constructor(fromProject: ProjectModel, toOrg: OrganisationModel) {
    this.fromProject = fromProject;
    this.toOrg = toOrg;
  }
}
