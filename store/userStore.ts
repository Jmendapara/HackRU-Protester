// user-module.ts
import { Getter } from "vuex-class";
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";

@Module
class UserStore extends VuexModule {
  // state

  email = '';
  username = '';
  password = '';
  attendingProtests = [];
  organizedProtests = [];


  @Mutation
  setUserName(username: any) {
    this.username = username;
  }

  @Mutation
  setPassword(password: any) {
    this.password = password;
  }

  @Mutation
  setEmail(email: any) {
    this.email = email;
  }

  @Mutation
  setAttendingProtests(attendingProtests: any) {
    this.attendingProtests = attendingProtests;
  }

  @Mutation
  setOrganizedProtests(organizedProtests: any) {
    this.organizedProtests = organizedProtests;
  }

  get userUsername(){
    return this.username;
  }

  get userPassword(){
    return this.password;
  }

  get userAttendingProtests(){
    return this.attendingProtests;
  }
  
  get userOrganizedProtests(){
    return this.organizedProtests;
  }
  
}

// register module (could be in any file)
import {store} from "./index";
export const userStore = new UserStore({ store, name: "user" });