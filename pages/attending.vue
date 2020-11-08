<template>
  <v-container>
    <div class="create">
      <h1>Attending Protests</h1>
    </div>

    <div class="organizedProtestList" :key="key">
      <v-row>
        <v-col
          cols="12"
          sm="3"
          md="3"
          v-for="protest in myProtests"
          :key="protest.protestID"
        >
          <GridItem :protest="protest" @card-clicked="handleCardClick($event)"></GridItem>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="dialog" width="60%">
      <template>
        
      </template>

      <Protest :protestInfo="selectedProtest" @update="updatePage()"></Protest>
    </v-dialog>
  </v-container>
</template>

<style scoped>
/* .create{
    position: absolute;
    top:70px;
    right:40px;
}
div h1{
    position: absolute;
    top:70px;
    left: 60px;
    letter-spacing: 0.08em;
    font-family: Spartan, Sans-Serif;
    font-style: normal;
    font-weight: 300;
    font-size: 40px;
    line-height: 45px;
} */

.create {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  letter-spacing: 0.06em;
  font-family: Spartan, Sans-Serif;
  font-style: normal;
  font-weight: 300;
  line-height: 45px;
}

.organizedProtestList {
}
</style>

<script>
import { fireDb } from "~/plugins/firebase.js";
import Vue from "vue";
import Component from "nuxt-class-component";
import { userStore } from "~/store/userStore";
import * as firebase from "firebase/app";
import GridItem from "./../components/GridItem.vue";

@Component({})
export default class Attending extends Vue {

  protests = [];
  dialog=false;
  selectedProtest={};
  attendingProtests = []; 
  key = 0;

  async mounted() {
    //console.log(userStore.userUsername);
    //ar protests = userStore.userOrganizedProtests;
    //console.log(userStore.userOrganizedProtests);

    const protests = await fireDb.collection("protests");
    protests.get().then((querySnapshot) => {
      let tempProtests = [];
      querySnapshot.docs.forEach((doc) => {
        tempProtests.push(doc.data());
      });
      this.protests = tempProtests;
    });

    const attendingProtests = await fireDb.collection("users")
        .doc(userStore.userUsername)
        .get().then(
            (userInfo) => this.attendingProtests = userInfo.data().attendingProtests
        );
  }

  handleCardClick(event){
    
    this.selectedProtest = this.myProtests.find(protest => protest.protestID == event);
    this.dialog = true;

  }

  async updatePage(){

    const protests = await fireDb.collection("protests");
    protests.get().then((querySnapshot) => {
      let tempProtests = [];
      querySnapshot.docs.forEach((doc) => {
        tempProtests.push(doc.data());
      });
      this.protests = tempProtests;
    });

    const attendingProtests = await fireDb.collection("users")
        .doc(userStore.userUsername)
        .get().then(
            (userInfo) => this.attendingProtests = userInfo.data().attendingProtests
        );

    this.dialog = false;
    this.key++;

  }

  get myProtests() {

    let tempProtests = [];

    for(let i = 0; i < this.attendingProtests.length; i++){
        const currId = this.attendingProtests[i];
        tempProtests.push(this.protests.find(protest => protest.protestID == currId));
    }

    return tempProtests;

  }
}
</script>