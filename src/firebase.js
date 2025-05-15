// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔐 اطلاعات زیر از پروژه Firebase شما باید باشد
const firebaseConfig = {
  apiKey: "AIzaSyBzwihVjyK0JrOklPDr3OAdsJm0Do9XQEg",
  authDomain: "shanset-d4b2d.firebaseapp.com",
  projectId: "shanset-d4b2d",
  storageBucket: "shanset-d4b2d.appspot.com",
  messagingSenderId: "112270132887",
  appId: "1:112270132887:web:e9bda502e8d4a3b9a14bd2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
