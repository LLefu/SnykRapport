
export class OrganisationModel{
   orgId: number = 0; //gets assigned in the backend
   orgName: string;
   employeeCountSize: number;
   description: string;

  constructor(orgName: string,description: string, employeeCountSize: number  ) {
    this.orgName = orgName;
    this.description = description;
    this.employeeCountSize = employeeCountSize;
  }
}
