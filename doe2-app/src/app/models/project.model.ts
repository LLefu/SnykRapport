import {OrganisationModel} from "./organisation.model";
import {User} from "./user";

export class ProjectModel{
    projectId: number = 0;
    projectName: string;
    description: string;
    employeeCountSize: number;
    financeSize: number;
    organizations: OrganisationModel[][];
    users: User[][];


  constructor(projectName: string, description : string, employeeCountSize: number) {
    this.projectName = projectName;
    this.description = description;
    this.employeeCountSize = employeeCountSize;
  }

/*
  setProjectId(value: string | null) {
    // @ts-ignore
    this._projectId = +value;
  }


  get getProjectId(): number {
    return this.projectId;
  }


  get getProjectName(): string {
    return this.projectName;
  }

  setProjectName(value: string) {
    this.projectName = value;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(value: string) {
    this.description = value;
  }

  get getEmployeeCountSize(): number {
    return this.employeeCountSize;
  }

  set setEmployeeCountSize(value: number) {
    this.employeeCountSize = value;
  }

  get getFinanceSize(): number {
    return this.financeSize;
  }

  set setFinanceSize(value: number) {
    this.financeSize = value;
  }

  get getOrganizations(): OrganisationModel[][] {
    return this.organizations;
  }

  set setOrganizations(value: OrganisationModel[][]) {
    this.organizations = value;
  }

  get getUsers(): User[][] {
    return this.users;
  }

  set setUsers(value: User[][]) {
    this.users = value;
  }*/

}
