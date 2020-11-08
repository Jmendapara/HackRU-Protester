<template>
  <v-card class="pa-4">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img height="250" :src="protestInfo.url"></v-img>

    <v-card-title class="card-title">{{protestInfo.title}}</v-card-title>

    <v-card-text>
      <div v-if="editMode">
        <v-form class="form" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="location"
            label="Location"
            :placeholder="protestInfo.location"
            outlined
            color="custom-color"
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

          <div class="my-2 subtitle-1">
            <v-icon color="primary" small>mdi-account-group</v-icon>
            {{protestInfo.attendees}}
          </div>

          <div class="mt-5">{{protestInfo.description}}</div>
        </v-form>
      </div>

      <div v-else>
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

        <div class="mt-5">{{protestInfo.description}}</div>
      </div>
    </v-card-text>
    <v-card-title class="mt-0 pt-0">Forum</v-card-title>
    <v-card-text v-for="comment in protestInfo.comments" :key="comment">{{comment}}</v-card-text>
    <v-card-title class="mt-0 pt-0">ForumRef4</v-card-title>
    <v-card-text>
       <li v-for="value in protestInfo.forum3" v-bind:key="value.id">{{value}}</li>
      <ul v-for="value in protestInfo.forum3" v-bind:key="value.id">
        <li v-for="(userBy, comment) in value.replies" v-bind:key="comment.id">{{userBy}}:{{ comment }}</li>
      </ul>
    </v-card-text>
    <v-card-title class="mt-0 pt-0">Related Tags</v-card-title>

    <v-card-text>
      <v-chip-group v-model="selection" column>
        <v-chip v-for="tag in protestInfo.tags" :key="tag">{{tag}}</v-chip>
      </v-chip-group>

      <div class="button-group" v-if="!editMode">
        <v-btn rounded color="primary">Attend</v-btn>

        <v-btn rounded color="secondary" v-on:click="edit" text>Edit</v-btn>
      </div>

      <div class="button-group" v-else>
        <v-btn rounded color="primary" v-on:click="updateProtest">Save</v-btn>

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

@Component({})
export default class Protest extends Vue {
  fromDateMenu = null;
  fromDateVal = "";
  editMode = false;
  minDate = new Date().toISOString().slice(0, 10);
  location = "";
  date = new Date();
  time = null;
  menu2 = false;

  @Prop()
  protestInfo;

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

  updateProtest() {


    if (this.location != "") {
      const res1 = this.protestInfo.update({
        location: this.location,
      });
    }

    if (this.fromDateVal != "") {
      const res2 = this.protestInfo.protestID.update({
        date: this.fromDateVal,
      });
    }

    if (this.time != "") {
      const res3 = this.protestInfo.protestID.update({
        time: this.time,
      });
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