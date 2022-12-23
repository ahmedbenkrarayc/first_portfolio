import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage"
import "firebase/auth"
import { getAuth } from "firebase/auth";
import "firebase/storage"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDRArZncZTDbGzuiMDrKpi9WPkm4bXyydI",
    authDomain: "portfolio-266fd.firebaseapp.com",
    databaseURL: "https://portfolio-266fd-default-rtdb.firebaseio.com",
    projectId: "portfolio-266fd",
    storageBucket: "portfolio-266fd.appspot.com",
    messagingSenderId: "857096610257",
    appId: "1:857096610257:web:cee3eecbfa104e636900f0",
    measurementId: "G-9FPDFNZEP4"
  };

  firebase.initializeApp(firebaseConfig);
firebase
  .firestore()
  .enablePersistence({ synchronizeTabs: !0 })
  .catch(() => {
    console.warn("DB offline support not available");
  });

  const storageRef = (name) => ref(firebase.storage(),name)
  
export default {
  firestore: firebase.firestore(),
  storage: firebase.storage(),
  auth: getAuth(),
  Ref: storageRef,
  upload: (ref,file) => uploadBytes(ref,file),
  download: (ref) => getDownloadURL(ref)
};