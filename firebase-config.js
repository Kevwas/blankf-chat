import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYnxSZsJ6tuua9oODSIHoyVVWW_ZiYkls",
  authDomain: "blankf-chat.firebaseapp.com",
  projectId: "blankf-chat",
  storageBucket: "blankf-chat.appspot.com",
  messagingSenderId: "751221901769",
  appId: "1:751221901769:web:63ff4436634fb60a400018",
  measurementId: "G-4YGD03TX34"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
