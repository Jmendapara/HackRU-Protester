<template>
  <v-card class="pa-4">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img height="250" :src="protestInfo.imgURL"></v-img>

    <v-card-title class="card-title">{{protestInfo.title}}</v-card-title>

    <v-card-text class="pb-0">
      <div v-if="editMode">
        <v-form class="form" ref="form" v-model="valid" lazy-validation>

          <v-text-field
            v-model="description"
            label="Description"
            :placeholder="protestInfo.description"
            outlined
            dense
          ></v-text-field>


          <v-text-field
            v-model="location"
            label="Location"
            :placeholder="protestInfo.location"
            outlined
            dense
          ></v-text-field>

          <v-menu
            v-model="fromDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                label="Date"
                readonly
                :value="fromDateDisp"
                v-on="on"
                outlined
                dense
                prepend-inner-icon="mdi-calendar"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="en-in"
              v-model="fromDateVal"
              no-title
              @input="fromDateMenu = false"
              :min="minDate"
              :max="maxDate"
            ></v-date-picker>
          </v-menu>

          <v-menu
            ref="menu"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                label="Time"
                prepend-inner-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                dense
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu2"
              v-model="time"
              full-width
              @click:minute="$refs.menu.save(time)"
            ></v-time-picker>
          </v-menu>

        </v-form>
      </div>

      <div v-else>

        <div >{{protestInfo.description}}</div>

        <div class="my-2 subtitle-1">
          <v-icon color="primary" small>mdi-map-marker</v-icon>
          {{protestInfo.location}}
        </div>

        <div class="my-2 subtitle-1">
          <v-icon color="primary" small>mdi-calendar</v-icon>
          {{protestInfo.date}}
        </div>

        <div class="my-2 subtitle-1">
          <v-icon color="primary" small>mdi-clock</v-icon>
          {{protestInfo.time}}
        </div>

        <div class="my-2 subtitle-1">
          <v-icon color="primary" small>mdi-account-group</v-icon>
          {{protestInfo.attendees}}
        </div>

        <div class="my-2 subtitle-1">
          <v-icon color="primary" small>mdi-account</v-icon>
          {{protestInfo.createdBy}}
        </div>

        <v-card-title class="pl-0 pb-0">Related Tags</v-card-title>
          <v-chip-group v-model="selection" column>
            <v-chip v-for="tag in protestInfo.tags" :key="tag">{{tag}}</v-chip>
          </v-chip-group>

      </div>
    </v-card-text>

    <v-card-text>

      <div class="button-group" v-if="!editMode">
        <v-btn v-if="!attending" :disabled="userName == protestInfo.createdBy" v-on:click="clickAttend" class="mr-2" rounded color="primary">Attend</v-btn>

        <v-btn v-if="attending" :disabled="userName == protestInfo.createdBy" v-on:click="clickAttend" class="mr-2" rounded color="success">Attending</v-btn>

        <v-btn v-if="userName == protestInfo.createdBy" rounded color="secondary" v-on:click="edit" text>Edit</v-btn>
      </div>

      <div class="button-group" v-else>
        <v-btn class="mr-2" rounded color="primary" v-on:click="updateProtest">Save</v-btn>

        <v-btn rounded color="secondary" v-on:click="edit" text>Cancel</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { fireDb } from "~/plugins/firebase.js";
import * as firebase from 'firebase/app'
import { userStore } from "~/store/userStore";

@Component({})
export default class Protest extends Vue {
  fromDateMenu = null;
  fromDateVal = "";
  editMode = false;
  minDate = new Date().toISOString().slice(0, 10);
  location = "";
  description = "";
  date = new Date();
  time = null;
  menu2 = false;

  attending=true;

  @Prop()
  protestInfo;

  async mounted(){

    attendingProtests = [];

    let attendingProtests = await fireDb.collection("users")
        .doc(userStore.userUsername)
        .get().then(
            (userInfo) => attendingProtests = userInfo.data().attendingProtests
        );

    if(attendingProtests.includes(this.protestInfo.protestID)){
      this.attending = true;
    }

    else{
      this.attending = false;
    }

  }

  edit() {
    this.editMode = !this.editMode;
  }

  get maxDate() {
    var endDate = new Date(this.date.getFullYear() + 10, 11, 31);
    return endDate.toISOString().slice(0, 10);
  }

  get fromDateDisp() {
    return this.fromDateVal;
  }

  get userName(){
    return userStore.userUsername;
  }

  async updateProtest() {

    if (this.location != "") {
      const res1 = fireDb.collection("protests")
        .doc(this.protestInfo.protestID)
        .update({
          location: this.location,
        });
    }

    if (this.description != "") {
      const res2 = fireDb.collection("protests")
        .doc(this.protestInfo.protestID)
        .update({
          description: this.description,
        });
    }

    if (this.fromDateVal != "") {
      const res3 = fireDb.collection("protests")
        .doc(this.protestInfo.protestID)
        .update({
          date: this.fromDateVal,
        });
    }

    if (this.time != null) {
      const res4 = fireDb.collection("protests")
        .doc(this.protestInfo.protestID)
        .update({
          time: this.time,
        });
    }

    this.editMode = false;
    setTimeout(()=>this.$emit('update'),1000);

    this.time = null;
    this.description = '';
    this.fromDateVal = '';
    this.location = '';

  }

  async clickAttend(){

    if(this.attending){
      
      const query2 = await fireDb.collection("protests").doc(this.protestInfo.protestID);
        query2.get().then((querySnapshot) => {
        return querySnapshot.data().attendees - 1;
      }).then((attendees)=>{
         const res3 = fireDb
          .collection("protests")
          .doc(this.protestInfo.protestID)
          .update({
          attendees: attendees
          });
        }
      );

      const res2 = await fireDb
      .collection("users")
      .doc(userStore.userUsername)
      .update({
        attendingProtests: firebase.firestore.FieldValue.arrayRemove((this.protestInfo.protestID)),
      });

    if(this.$router.currentRoute.path!='/attending'){
      setTimeout(()=>{this.$router.push('attending')},1000);
    }

    else{
      setTimeout(()=>{this.$router.push('homepage')},1000);
    }


    }

    else{

      const query = await fireDb.collection("protests").doc(this.protestInfo.protestID);
      query.get().then((querySnapshot) => {
        return querySnapshot.data().attendees + 1;
      }).then((attendees)=>{
         const res1 = fireDb
          .collection("protests")
          .doc(this.protestInfo.protestID)
          .update({
          attendees: attendees
          });
        }
      );;


    const res2 = await fireDb
      .collection("users")
      .doc(userStore.userUsername)
      .update({
        attendingProtests: firebase.firestore.FieldValue.arrayUnion(this.protestInfo.protestID),
      });

  
    setTimeout(()=>{this.$router.push('attending')},1000);

    }


  }


}
</script>

<style scoped>
.button-group {
  margin-top: 24px;
}

.form {
  margin-top: 16px;
}

.card-title {
  font-size: 2rem !important;
}
</style>