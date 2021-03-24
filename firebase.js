import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9qAwD8R718019dMeC-gyvlZ2rGnY0qz0",
  authDomain: "signal-clone-a1ff9.firebaseapp.com",
  projectId: "signal-clone-a1ff9",
  storageBucket: "signal-clone-a1ff9.appspot.com",
  messagingSenderId: "537272729071",
  appId: "1:537272729071:web:71824cb2077be4f415ca1a",
  measurementId: "G-YFPL1JGRMQ"
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
