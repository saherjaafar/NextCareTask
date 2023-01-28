import firebase from "firebase/compat/app";

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDWSHOt4Af3HRjb0-bX5oOoDp67ORJsxqc",
  authDomain: "reactproject-c3f47.firebaseapp.com",
  projectId: "reactproject-c3f47",
  storageBucket: "reactproject-c3f47.appspot.com",
  messagingSenderId: "391077051648",
  appId: "391077051648:web:75dc6a6d3328228caac7e5",
  measurementId: "G-TXGT5TRC44",
  
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };