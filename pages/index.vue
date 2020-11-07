<template>
  <v-container>
      <v-card class="loginOptions elevation-10">
        <div class="protestImage">
          <v-img  
          height="100%"
          src="https://cdn.theatlantic.com/thumbor/eQZI1sD90Rhx4w5G1vieWLybhpQ=/1920x1080/media/img/2018/05/04/BOB_Kornhaber_PopCultureEdit/original.jpg"
          ></v-img>
        </div>

        <div class="buttons">

          <h1 class="mb-n2 mx-10 headerSize">Protester</h1>
          <p class="mx-10 mb-15 my-5">Be the change you want to see in the world.</p>
          <v-btn color="primary" flat rounded class="my-3 mx-10" to="/newLogin">login</v-btn>
          <v-btn flat rounded class="my-3 mx-10"  to="/newRegister">sign up</v-btn>
        </div>
      </v-card>
  </v-container>
</template>

<script>

import Vue from 'vue'
import Component from 'nuxt-class-component'
import {fireDb} from '~/plugins/firebase.js'

import {userStore} from './../store/userStore.ts'

  
@Component({})
export default class MainPage extends Vue{


}
</script>
<style scoped>
  .container {
    display: flex;
    flex-grow: 1;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .loginOptions{
    display:flex;
    height: 80%;
    width: 80%;
    align-items: center;
    justify-content: center;
  }

  .protestImage{
    display: flex;
    width: 50%;
    height: 100%;
    align-items: flex-start;
    justify-content: center;
  }

  .buttons{
    display: flex;
    width: 50%;
    height: 100%;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

  }

  .headerSize{
    font-size: 3rem;
  }
  h1{
    letter-spacing: 0.03em;
    font-style: normal;
    font-size: 40px;
    line-height: 45px;
  }



</style>