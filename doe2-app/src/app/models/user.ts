export class User {
  public id: number = 0; //gets assigned in the backend
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public dateOfBirth: Date;
  public country: string;
  public personalDescription: string;

  constructor(firstName: string, lastName: string, email: string, password: string,
              dateOfBirth: Date, country: string, personalDescription: string) {
    //id must be assigned in the back-end!!
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
    this.country = country;
    this.personalDescription = personalDescription;
  }
}
