import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDsOiZNfVDbKuyEvtWFVJ-6eP8sX-aFbWA",
  authDomain: "braga-updated.firebaseapp.com",
  projectId: "braga-updated",
  storageBucket: "braga-updated.appspot.com",
  messagingSenderId: "1006974270726",
  appId: "1:1006974270726:web:051f4fc83402032e21f287",
  measurementId: "G-J5C9L43LCP"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const database = firebase.database();
