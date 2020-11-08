<template>
  <v-app>
   
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      light
    >

      <v-toolbar-title v-text="title" />

      <v-text-field
        v-model="search"
        label="Search"
        hide-details
        prepend-inner-icon="mdi-magnify" class="shrink mx-4"
        single-line
        filled
        rounded
        dense 
        v-if="getUserName"
    ></v-text-field>

      <v-spacer />

      <div v-if="getUserName">

    <v-btn
      text
      rounded
      color="primary"
      to="/homepage"
    > Home Page
    </v-btn>

      <v-btn
      text
      rounded
      color="primary"
      to="/popular"
    > Popular
    </v-btn>
        <v-btn
      text
      rounded
      color="primary"
      to="/attending"
    >
      Attending
    </v-btn>
    <v-btn
      text
      rounded
      color="primary"
      to="/organized"
    > Organized
    </v-btn>
      <v-btn icon>
        <v-icon color="red">mdi-bell</v-icon>
      </v-btn>
    <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            @click="logout"
            to="/"
          >
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      </div>

    </v-app-bar>
    <v-main>
      <v-container class="mx-0"> 
        <nuxt />
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>

import Vue from 'vue'
import Component from 'nuxt-class-component'
import {userStore} from './../store/userStore.ts'


@Component({})
export default class Default extends Vue{

      clipped= false;
      drawer= false;
      fixed= false;
      miniVariant= false;
      right= true;
      rightDrawer= false;
      title= 'Protester';

      get getUserName(){
        return userStore.username;
      }
      logout(){
        userStore.setUserName('');
        userStore.setPassword('');
        userStore.setEmail('');
        userStore.setAttendingProtests([]);
        userStore.setAttendingProtests([]);
      }


  
}
  

</script>

<style scoped>

.container{
  max-width: none !important;
  height: 100%;
}

</style>
