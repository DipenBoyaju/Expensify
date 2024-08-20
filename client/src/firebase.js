// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTiUzjTYw_JQ82MLY7oj-XAnhqscB3MjA",
  authDomain: "expensify-ff84c.firebaseapp.com",
  projectId: "expensify-ff84c",
  storageBucket: "expensify-ff84c.appspot.com",
  messagingSenderId: "411748239486",
  appId: "1:411748239486:web:261e578507d0e9c0dcf02f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;