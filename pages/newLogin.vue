<template>
  <v-container>
    <v-card class="pa-8">

      <v-card-title class="mb-3"><h2>Login</h2></v-card-title>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
            v-model="user"
            label="Username"
            placeholder="Username"
            outlined
            required
            :rules="[rules.required]"
        ></v-text-field>

        <v-text-field
            v-model="password"
            label="Password"
            placeholder="Password"
            outlined
            required
            :type="'password'"
            :rules="[rules.required]"
        ></v-text-field>

        <v-btn class="mb-3" color="primary"
          rounded
          large
          @click="login"
        >Login</v-btn>
      </v-form>
      <p></p>
      <p>Don't have an account? <a color="secondary" style="text-decoration: none;" href="/newRegister" target="_top">Sign Up</a></p>
    </v-card>
  </v-container>
</template>


<script>
import Vue from 'vue'
import Component from 'nuxt-class-component'
import {fireDb} from '~/plugins/firebase.js'
import {userStore} from './../store/userStore.ts'

import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
 

@Component({})
export default class NewLogin extends Vue{

      user= '';
      password='';
      writeSuccessful= false;
      LoginSuccessful= false;
      text;

      rules= {
        required: value => !!value || 'Required',
        min: v => v.length >= 8 || 'Min 8 characters',
      }

      async login() {
        if (this.user === '' || this.user === null ||this.password === '' || this.password === null){
            alert("Error: Must enter all fields")
            this.LoginSuccessful =false;
        }
        else{
        const usersRef = fireDb.collection('users').doc(this.user)
        const doc = await usersRef.get()
        if (doc.exists) {
            const pass = doc.data().password
            if(this.password == pass){
                console.log(doc.data());
                this.LoginSuccessful = true;
                userStore.setUserName(this.user);
                userStore.setPassword(this.password);
                userStore.setAttendingProtests(doc.data().attendingProtests);
                userStore.setAttendingProtests(doc.data().organizedProtests);

                this.$router.push('/homepage')
            }
            else{
                alert("Error: Login unsuccessful")
                this.LoginSuccessful= false;
                this.user=''
                this.password='' 
            }
        } 
        else {
            alert("Error: Login unsuccessful")
            this.LoginSuccessful= false;
            this.user=''
            this.password=''

        }
        }
      }

      async readFromFirestore(user) {
        const ref = fireDb.collection("test").doc("test")
        let snap
        try {
          snap = await ref.get()
        } catch (e) {
          // TODO: error handling
          console.error(e)
        }
        this.text = snap.data().text
        this.readSuccessful = true
      }



}
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-grow: 1;
    height: 100%;
  }
  .pa-8{
    width:30%;
  }
</style>