<template>
  <v-container>
    <div class="create">
      <h1>Search</h1>
      
        <v-text-field
        v-model="search"
        label="Search"
        hide-details
        prepend-inner-icon="mdi-magnify" class="shrink mx-4"
        append-icon="mdi-close-circle" 
        @click:append="clear"
        single-line
        filled
        rounded
        dense 
        :clear-button="true"
        @keyup.enter="searchStatus"
        @paste="searchStatus"
    ></v-text-field>
    </div>

    <div class="protestList">
      <v-spacer></v-spacer>
       <h2   v-if= "searching">{{"\""+search+"\""}}</h2>
      <h2  v-else >Popular Protests</h2>
      <v-row>
        <v-col
          cols="12"
          sm="3"
          md="3"
          v-for="protest in topProtests"
          :key="protest.title"
        >
          <GridItem :protest="protest"  @card-clicked="handleCardClick($event)"></GridItem>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="dialog" width="80%">
      <template>
        
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

div h2{
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
  dialog=false;
  selectedProtest={};
  searching = false;
  search = '';

  async mounted() {
    //console.log(userStore.userUsername);
    //ar protests = userStore.userOrganizedProtests;
    //console.log(userStore.userOrganizedProtests);
     this.loadAllProtests();

  }

  async loadAllProtests(){
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
    this.selectedProtest = this.topProtests.find(protest => protest.protestID == event);
    this.dialog = true;

  }


  get topProtests() {
    if(this.searching){
        if(this.search != '' && this.search != null){
      this.search = this.search.trim().toLowerCase();
      console.log(this.search);
    } else{
      this.clear();
    }
    console.log(this.protests);
    for(var i=0; i<this.protests.length; i++){
        console.log(this.protests[i].title);
        if(this.protests[i].title.includes(this.search)){
          console.log("INCLUDES!!!");
        }
    }
     return this.protests.filter(
      (protest) => protest.title.includes(this.search)
    );
    }else{return this.protests.sort((a, b) =>{
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
  .slice(0,12);}
  }

  searchStatus(){
      this.searching = true;
    console.log("searching:"+this.searching);
  }

  clear(){
    this.searching = false;
    this.search= '';
  }

}


</script>