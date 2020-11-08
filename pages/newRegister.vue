<template>
  <v-container>

    <v-card class="pa-8" width="350px">

      <v-card-title class="mb-3"><h2>Sign Up</h2></v-card-title>

      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          label="E-mail"
          placeholder= "Email"
          outlined
          required
          :rules="[rules.required]"
          color = "custom-color"
        ></v-text-field>
        <v-text-field
            v-model="user"
            label="Username"
            placeholder="Username"
            outlined
            required
            :rules="[rules.required, rules.min]"
        ></v-text-field>

        <v-text-field
            v-model="password"
            label="Password"
            placeholder="Password"
            :type="'password'"
            outlined
            required
            :rules="[rules.required, rules.min]"
        ></v-text-field>
        <p class = "uname mt-4">* Username will be displayed publicly</p>
        <v-btn
          color='primary'
          elevation="1"
          rounded
          large
          @click="writeToFirestore"
        >sign up</v-btn>

      </v-form>
      <p></p>
      <p>Already have an account? <a href="/newLogin" style="text-decoration: none;" target="_top">Login</a></p>
    </v-card>

    <v-snackbar 
        absolute
        top
        color="success"
        right
        v-model="snackbar"
        rounded
      >
        {{ successTest }}
      </v-snackbar>

  </v-container>
</template>

<script>
  import {fireDb} from '~/plugins/firebase.js'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import Vue from 'vue'
  import Component from 'nuxt-class-component'
  import {userStore} from './../store/userStore.ts'

@Component({})
export default class NewRegister extends Vue{

    rules= {
        required: value => !!value || 'Required',
        min: v => v.length >= 5 || 'Min 8 characters',
    };

        user= '';
        password='';
        email= '';
        writeSuccessful=false;
        readSuccessful= false;
        text= "";

        snackbar= false;
        successTest= 'Accounted Created Successfully! Logging you in . . .';

      // get nameErrors () {
      //   const errors = []
      //   if (!this.$v.user.$dirty) return errors
      //   !this.$v.user.maxLength && errors.push('username must be at most 10 characters long')
      //   !this.$v.user.required && errors.push('username is required.')
      //   return errors
      // }
      
      // get passwordErrors () {
      //   const errors = []
      //   if (!this.$v.password.$dirty) return errors
      //   !this.$v.password.required && errors.push('password is required.')
      //   return errors
      // }

      // get emailErrors () {
      //   const errors = []
      //   if (!this.$v.email.$dirty) return errors
      //   !this.$v.email.email && errors.push('Must be valid e-mail')
      //   !this.$v.email.required && errors.push('E-mail is required')
      //   return errors
      // }

      async writeToFirestore() {
        if(this.password === '' || this.username ==='' || this.email ===''){
          alert("Error: Missing fields")
          this.writeSuccessful = false;
        }
        else{
        const usersRef = fireDb.collection('users').doc(this.user)
        const doc = await usersRef.get()
        if (!doc.exists) {
          const ref = fireDb.collection("users").doc(this.user)
          const document = {
            username: this.user,
            password: this.password,
            email: this.email,
            organizedProtests: [],
            attendingProtests: []
          }
          try {
            await ref.set(document)
          } catch (e) {
            // TODO: error handling
            console.error(e)
          }

          userStore.setUserName(this.user);
          userStore.setPassword(this.password);
          this.writeSuccessful = true
          this.snackbar = true;
          setTimeout( () => this.$router.push('/homepage'), 2000);

          } else {
            this.writeSuccessful = false;
            this.user=''
            alert("Username is taken. Please pick another username.")
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
  .uname{
    font-size:12px;
    text-align:left;
    position:relative;
    bottom:20px;  
    }
 
</style>