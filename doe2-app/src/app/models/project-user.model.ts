import {User} from "./user";
import {ProjectModel} from "./project.model";


export class ProjectUser {

  id: number = 0;
  project: ProjectModel;
  user: User;
  admin: boolean;

  constructor(project: ProjectModel, user: User, admin: boolean) {
    this.project = project;
    this.user = user;
    this.admin = admin;
  }
}
