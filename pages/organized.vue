<template>
  <v-container>
    <div class="create">
      <h1>Organized Protests</h1>

      <v-btn text color="primary" to="/organizeprotest" rounded>
        <v-icon dark> mdi-plus </v-icon>
        Organize a Protest
      </v-btn>
    </div>

    <div class="organizedProtestList">
      <v-row>
        <v-col
          cols="12"
          sm="3"
          md="3"
          v-for="protest in myProtests"
          :key="protest.title"
        >
          <GridItem :protest="protest" @card-clicked="handleCardClick($event)"></GridItem>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="dialog" width="80%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>

      <Protest :protestInfo="selectedProtest"></Protest>
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
export default class Organized extends Vue {

  protests = [];
  dialog=false;
  selectedProtest={};

  async mounted() {
    //console.log(userStore.userUsername);
    //ar protests = userStore.userOrganizedProtests;
    //console.log(userStore.userOrganizedProtests);

    const protests = await fireDb.collection("protests");
    protests.get().then((querySnapshot) => {
      console.log(querySnapshot.docs);
      let tempProtests = [];
      querySnapshot.docs.forEach((doc) => {
        tempProtests.push(doc.data());
      });
      this.protests = tempProtests;
    });
  }

  handleCardClick(event){
    
    this.selectedProtest = this.myProtests.find(protest => protest.protestID == event);
    this.dialog = true;

  }


  get myProtests() {
    return this.protests.filter(
      (protest) => protest.createdBy == userStore.userUsername
    );
  }
}
</script>