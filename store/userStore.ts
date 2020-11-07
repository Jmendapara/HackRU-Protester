// user-module.ts
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";

@Module
class UserStore extends VuexModule {
  // state
  firstName = "Foo";
  lastName = "Bar";
  username = '';
  password = '';

  // getters
  get fullName() {
    return this.firstName + " " + this.lastName;
  }

  @Mutation
  setUserName(username: any) {
    this.username = username;
  }

  @Mutation
  setPassword(password: any) {
    this.password = password;
  }

  
}

// register module (could be in any file)
import {store} from "./index";
export const userStore = new UserStore({ store, name: "user" });