import firebase from 'firebase/app'
import Toasted from 'vue-toasted';
import 'firebase/firestore'
if (!firebase.apps.length) {
    const config = {
        apiKey: "AIzaSyBjusWP1yrMArJJiwfEiZNhantPu4QAvcs",
        authDomain: "protester-859a5.firebaseapp.com",
        databaseURL: "https://protester-859a5.firebaseio.com",
        projectId: "protester-859a5",
        storageBucket: "protester-859a5.appspot.com",
        messagingSenderId: "60209577677",
        appId: "1:60209577677:web:233c64bd81ed93eb94b384",
        measurementId: "G-88NN389V11"
    }
    firebase.initializeApp(config)
    firebase.firestore().settings({timestampsInSnapshots: true})
}
const fireDb = firebase.firestore()
export {fireDb}