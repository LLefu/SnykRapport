import {ProjectModel} from "./project.model";
import {OrganisationModel} from "./organisation.model";

export class ProjectOrganization {
  id: number = 0;
  project: ProjectModel;
  organization: OrganisationModel;


  constructor(project: ProjectModel, organization: OrganisationModel) {
    this.project = project;
    this.organization = organization;
  }
}
