<template>
  <section class="container">
    <div>
      <h2>
        Sign Up
      </h2>
      <div>
        <input type="text" placeholder="Enter username" v-model="user" required>
        <input type="text" placeholder="Enter password" v-model="password" required>
        <input type="text" placeholder="Enter email" v-model="email" required>
        <button @click="writeToFirestore" :disabled="writeSuccessful">
          <span v-if="!writeSuccessful">Submit user</span>
          <span v-else>Successful!</span>
        </button>
      </div>
    </div>
  </section>
</template>
<script>
  import {fireDb} from '~/plugins/firebase.js'
  export default {
    data() {
      return {
        user: '',
        password:'',
        email: '',
        writeSuccessful: false,
        readSuccessful: false,
        text: ""
      }
    },

    methods: {
      async writeToFirestore() {
        if (this.user === '' || this.user === null){
            this.user='must enter username';
        }
        if (this.password === '' || this.password === null){
            this.password='must enter password';
        }
        if (this.email === '' || this.email === null){
            this.email='must enter email';
        }
        const usersRef = fireDb.collection('users').doc(this.user)
        const doc = await usersRef.get()
        if (!doc.exists) {
          const ref = fireDb.collection("users").doc(this.user)
          const document = {
            username: this.user,
            password: this.password,
            email: this.email
          }
          try {
            await ref.set(document)
          } catch (e) {
            // TODO: error handling
            console.error(e)
          }
          this.writeSuccessful = true
          } else {
            this.writeSuccessful = false;
            this.user= "Username is taken"
          }
      },
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
  }
</script>
<style>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: lightblue;
  }
</style>