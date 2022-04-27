// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuE3qqRdjZZNoEFYDvRZ_02hLD0x5zncE",
  authDomain: "fir-auth-a8bb1.firebaseapp.com",
  projectId: "fir-auth-a8bb1",
  storageBucket: "fir-auth-a8bb1.appspot.com",
  messagingSenderId: "1087708794802",
  appId: "1:1087708794802:web:0c6dab87228007713f1eab",
  measurementId: "G-62LLTTVVCV",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
