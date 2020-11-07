<template>
  <section class="container">
    <div>
      <h2>
        Login
      </h2>
      <div>
        <input type="text" placeholder="Enter username" v-model="user" required>
        <input type="text" placeholder="Enter password" v-model="password" required>
        <button @click="login" :disabled="LoginSuccessful">
          <span v-if="!LoginSuccessful">Login</span>
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
        writeSuccessful: false,
        LoginSuccessful: false,
        text: ""
      }
    },

    methods: {
      async login() {
        if (this.user === '' || this.user === null){
            this.user='must enter username';
        }
        if (this.password === '' || this.password === null){
            this.password='must enter password';
        }
        const usersRef = fireDb.collection('users').doc(this.user)
        const doc = await usersRef.get()
        if (doc.exists) {
            const pass = doc.data().password
            if(this.password == pass){
                this.LoginSuccessful = true;
            }
        } 
        else {
            this.user = 'login unsuccessful'
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
<style scoped>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
