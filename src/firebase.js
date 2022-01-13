import firebase from "firebase";


const firebaseConfig = {

  apiKey: "AIzaSyDw-mPnE125jr3qNtr8bqiCrBN9XZ1hFGM",
  authDomain: "devathon-952a0.firebaseapp.com",
  projectId: "devathon-952a0",
  storageBucket: "devathon-952a0.appspot.com",
  messagingSenderId: "673252361959",
  appId: "1:673252361959:web:3be0178325c52e930a0442",
  measurementId: "G-H9XR332GRY"

};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();
export const storage = firebase.storage();
export { auth, provider };
export default db;
