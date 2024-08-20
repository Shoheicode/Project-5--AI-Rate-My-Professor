// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: ""+process.env.FIREBASE_API_KEY,
  authDomain: "astar-rate-my-professor.firebaseapp.com",
  projectId: "astar-rate-my-professor",
  storageBucket: "astar-rate-my-professor.appspot.com",
  messagingSenderId: "835933829829",
  appId: "1:835933829829:web:162ef09d567a7fcc134eac",
  measurementId: "G-PNSX8NYRWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getFirestore(app);
export {app, database}
