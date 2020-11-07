// This is `services/fireinit.js`

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

var config = {
    apiKey: "AIzaSyBjusWP1yrMArJJiwfEiZNhantPu4QAvcs",
    authDomain: "protester-859a5.firebaseapp.com",
    databaseURL: "https://protester-859a5.firebaseio.com",
    projectId: "protester-859a5",
    storageBucket: "protester-859a5.appspot.com",
    messagingSenderId: "60209577677"
}

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export default firebase