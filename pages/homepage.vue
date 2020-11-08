<template>
  <v-container>
    <div class="create">
      <h1>Search</h1>

      <v-text-field
        v-model="search"
        label="Search"
        hide-details
        prepend-inner-icon="mdi-magnify"
        class="shrink mx-4"
        single-line
        filled
        rounded
        dense
      ></v-text-field>
    </div>

    <div class="protestList">
      <v-spacer></v-spacer>
      <h2>Popular Protests</h2>
      <v-row>
        <v-col
          cols="12"
          sm="3"
          md="3"
          v-for="protest in topProtests"
          :key="protest.title"
        >
          <GridItem
            :protest="protest"
            @card-clicked="handleCardClick($event)"
            @attending="startAttending($event)"
            @not-attending="unAttend($event)"
          ></GridItem>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="dialog" width="60%">
      <template> </template>

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
 */

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

div h2 {
  position: relative;
  letter-spacing: 0.08em;
  font-family: Spartan, Sans-Serif;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 45px;
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
export default class Homepage extends Vue {
  protests = [];
  dialog = false;
  selectedProtest = {};


  async startAttending(event) {

    console.log(event);

    const attendees = await fireDb.collection("protests").doc(event);
    protests.get().then((querySnapshot) => {
      console.log(querySnapshot.data());
    });

    // const res2 = await fireDb
    //   .collection("users")
    //   .doc(userStore.userUsername)
    //   .update({
    //     attendingProtests: firebase.firestore.FieldValue.arrayUnion(id),
    //   });

    // attendees++;

    // const res3 = await fireDb
    //   .collection("protests")
    //   .doc(event)
    //   .update({
    //     attendees: attendees
    //   });
  }

  async unAttend(event) {}

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

  handleCardClick(event) {
    this.selectedProtest = this.topProtests.find(
      (protest) => protest.protestID == event
    );
    this.dialog = true;
  }

  get topProtests() {
    console.log();
    return this.protests
      .sort((a, b) => {
        const protestA = a.attendees;
        const protestB = b.attendees;

        let comparison = 0;
        if (protestA < protestB) {
          comparison = 1;
        } else if (protestA > protestB) {
          comparison = -1;
        }
        return comparison;
      })
      .slice(0, 12);
  }

  /*compare(a, b) {
    const protestA = a.attendees;
    const protestB = b.attendees;

    let comparison = 0;
    if (protestA > protestB) {
      comparison = 1;
    } else if (protestA < protestB) {
      comparison = -1;
    }
    return comparison;
  }*/
}
</script>