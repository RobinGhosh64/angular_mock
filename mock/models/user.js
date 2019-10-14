export class User {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public toJson() {
    return {
      email: this.email,
      password: this.password
    };
  }
}
