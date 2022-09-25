
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwCWxd2M5NdD7idagpOIqczYxL8RodCds",
  authDomain: "test-38127.firebaseapp.com",
  projectId: "test-38127",
  storageBucket: "test-38127.appspot.com",
  messagingSenderId: "1021886461867",
  appId: "1:1021886461867:web:f7cdb48bebbb6fa88104ee"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


window.onload = function () {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.replace('index.html')
    } else {
      const data = document.getElementById("data");

      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        data.innerHTML += `
        <tr>
            <td>${doc.data().name}</td>
            <td>${doc.data().email}</td>
            <td>${doc.data().password}</td>
            <td>${doc.id}</td>
        </tr>
        `
        
      });

    }
  });
}


var signOutbtn = document.getElementById('signOutbtn');
signOutbtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.replace('index.html')
  }).catch((error) => {
    // An error happened.
  });
})



