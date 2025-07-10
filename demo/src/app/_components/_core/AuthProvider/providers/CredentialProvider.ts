import { delay } from "@jumbo/utilities/helpers";

export class CredentialProvider implements IAuthProvider {
  constructor() {}
  async login(data: any) {
    //send http request to check the credentials and return the response
    await delay(3000);
    if (data.email === "abc@example.com" && data.password === "zab#723") {
      return {
        id: 1,
        firstName: "Abhishek",
        lastName: "Mittal",
        profilePic: "avatar-1.jpg",
        token: "dslfkjlk8r427r89iodhfisadf9878rwru",
      };
    }
  }

  async logout() {
    //api call if success return true otherwise return false
    await delay(3000);
    return true;
  }
}
