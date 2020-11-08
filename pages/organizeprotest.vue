<template>
  <container>
    <v-card class="mx-auto my-12" elevation="0" max-width="800">
      <v-flex text-xs-center>
        <h2>Create a Protest</h2>
        <p></p>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="title"
            label="Title"
            outlined
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="location"
            label="Location"
            prepend-inner-icon="mdi-map-marker"
            required
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
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu2"
              v-model="time"
              full-width
              @click:minute="$refs.menu.save(time)"
            ></v-time-picker>
          </v-menu>

          <v-text-field
            v-model="imageurl"
            label="Image Url"
            outlined
            required
          ></v-text-field>

          <img :src="imageurl" @error="onImgLoad" width="30%" height="20%" />

          <v-textarea
            v-model="description"
            label="Description"
            outlined
            required
          ></v-textarea>

          <v-combobox
            multiple
            outlined
            color="#3058A4"
            v-model="taglist"
            label="Tags"
            append-icon
            chips
            deletable-chips
            class="tag-input"
            :search-input.sync="search"
            @keyup.tab="updateTags"
            @paste="updateTags"
          >
          </v-combobox>
          <div style="text-align: center">
            <v-btn
              class="btn"
              color="primary"
              elevation="1"
              rounded
              large
              @click="createProtest"
              >Create</v-btn
            >
          </div>
        </v-form>
      </v-flex>
    </v-card>
  </container>
</template>

<style scoped>
label {
  display: block;
  font: 1rem "Fira Sans", sans-serif;
}
btn {
  height: 50px;
  width: 500px;
}
input,
label {
  margin: 0.4rem 0;
  color: white;
}
h2 {
  letter-spacing: 0.03em;
  font-family: Spartan, Sans-Serif;
  font-style: normal;
  font-weight: 300;
  font-size: 40px;
  line-height: 45px;
}
form {
  top: 300px;
}
.btn {
  width: 17%;
}
</style>


<script>
import { fireDb } from "~/plugins/firebase.js";
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { userStore } from "~/store/userStore";
import * as firebase from 'firebase/app'

@Component({})
export default class OrganizeProtest extends Vue {

  fromDateMenu = null;
  fromDateVal = "";
  writeSuccessful = true;
 

  minDate = new Date().toISOString().slice(0, 10);
  date = new Date();
  time = null;
  menu2 = false;
  modal2 = false;
  imageurl = "";
  title = "";
  location = "";
  description = "";
  taglist = "";

  get maxDate() {
    var endDate = new Date(this.date.getFullYear() + 10, 11, 31);
    return endDate.toISOString().slice(0, 10);
  }

  onImgLoad() {
    if (this.imageurl != "") {
      alert("Image not found");
    }
  }

   get fromDateDisp(){
     return this.fromDateVal;
   } 

  async createProtest() {

    let id="";

    let tempURL = '';

    if(this.imageurl == ''){
      tempURL = 'https://i.pinimg.com/originals/48/40/a1/4840a17966325d0c974a4c915b35dfcb.jpg';
    }
    else{
      tempURL = this.imageurl
    }

    if (
      this.title === "" ||
      this.title === null ||
      this.fromDateVal === "" ||
      this.fromDateVal === null ||
      this.time === "" ||
      this.time === null ||
      this.location === "" ||
      this.location === null
    ) {
      alert("Error: Missing fields");
      this.writeSuccessful = false;
    }
    if (this.writeSuccessful) {
      const res = await fireDb.collection("protests").add({
        createdBy: userStore.userUsername,
        title: this.title,
        date: this.fromDateVal,
        time: this.time,
        imgURL: tempURL,
        location: this.location,
        description: this.description,
        tags: this.taglist,
        attendees: 1,
        protestID:''
      }).then(docRef => {
       id = docRef.id;
      })

    const res3 = fireDb.collection("protests")
        .doc(id)
        .update({
          protestID: id,
        });
  
    const res2 = await fireDb.collection("users")
        .doc(userStore.userUsername)
        .update({
          organizedProtests: firebase.firestore.FieldValue.arrayUnion(id),
          attendingProtests: firebase.firestore.FieldValue.arrayUnion(id)
        });


    this.$router.push('/organized')
  }
  }

  updateTags() {
    alert("Entered updateTags");
    this.$nextTick(() => {
      this.taglist.push(...this.search.split(","));
      this.$nextTick(() => {
        this.search = "";
      });
    });
    alert("Left updateTags");
  }
}
</script>

