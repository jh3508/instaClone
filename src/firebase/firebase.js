import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvpvNmDnqLrk_cnxK1_ZrY-L9vQ7_rlrA",
  authDomain: "insta-clone-jhoss.firebaseapp.com",
  projectId: "insta-clone-jhoss",
  storageBucket: "insta-clone-jhoss.appspot.com",
  messagingSenderId: "1017041991330",
  appId: "1:1017041991330:web:089f2980252fb46303c9fb",
  measurementId: "G-E8WE6FW7X7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
