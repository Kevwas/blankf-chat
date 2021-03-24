import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbviz_gqH6Wx897Sfd4H1JRZtAcmPkOps",
  authDomain: "signal-clone-2e211.firebaseapp.com",
  projectId: "signal-clone-2e211",
  storageBucket: "signal-clone-2e211.appspot.com",
  messagingSenderId: "125473289971",
  appId: "1:125473289971:web:5e3363c14307a9ac6a6986",
  measurementId: "G-WEGSEQGW4L"
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
