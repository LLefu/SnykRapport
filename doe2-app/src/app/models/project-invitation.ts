import {User} from "./user";
import {ProjectModel} from "./project.model";

export class ProjectInvitation {
  id: number;
  sendingUser: User;
  receivingUser: User;
  project: ProjectModel;
  date: Date;

  constructor(sendingUser: User, receivingUser: User, project: ProjectModel, time: Date) {
    this.sendingUser = sendingUser;
    this.receivingUser = receivingUser;
    this.project = project;
    this.date = time;
  }
}
