import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyAubl8w5sBzjV7pKberZSLAw0mXTRkrqSg",
  authDomain: "braga-67e6d.firebaseapp.com",
  databaseURL: "https://braga-67e6d-default-rtdb.firebaseio.com/",
  projectId: "braga-67e6d",
  storageBucket: "braga-67e6d.appspot.com",
  messagingSenderId: "305750185039",
  appId: "1:305750185039:web:b73331ff9fadb92651863a"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const database = firebase.database();
