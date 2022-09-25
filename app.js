
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
  import { getAuth,sendEmailVerification ,signInWithPopup,GoogleAuthProvider ,FacebookAuthProvider , onAuthStateChanged, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  import { getFirestore, doc,setDoc, getDoc  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

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
  const provider = new GoogleAuthProvider();
  const fbprovider = new FacebookAuthProvider();
  const auth = getAuth();
var name = document.getElementById('name')
var S_email = document.getElementById('email')
var S_pass = document.getElementById('pass')
var btn = document.getElementById('btn');

const db = getFirestore(app);

const loader =document.getElementsByClassName("loader")[0];
const main =document.getElementsByClassName("main")[0];


btn.addEventListener("click", () => {
    event.preventDefault();
    loader.classList.toggle("hidden");
    main.classList.toggle("hidden");


    createUserWithEmailAndPassword(auth, S_email.value, S_pass.value)
    .then(async(userCredential) => {

    loader.classList.remove("hidden");
    main.classList.add("hidden");

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: name.value,
      email: S_email.value,
      password: S_pass.value,
    });
    
    sendEmailVerification(auth.currentUser)
    .then(() => {console.log("email sent");})
    .catch(() => {console.log("email not sent");});


    window.location.replace('dashboard.html');
  })
  .catch((error) => {
    loader.classList.toggle("hidden");
    main.classList.toggle("hidden");
    alert("something is incorrect")

    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode , "&" , errorMessage)

  });
  })


var Lemail = document.getElementById("Lemail")
var Lpass = document.getElementById("Lpass")
var Lbtn = document.getElementById('Lbtn')
Lbtn.addEventListener("click", () => {
    event.preventDefault();
    console.log(Lemail.value)
    console.log(Lpass.value)
    signInWithEmailAndPassword(auth, Lemail.value, Lpass.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode , "&" , errorMessage)

    // ..
  });
  })


//   window.onload = function(){
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       console.log(uid)
//       setTimeout(() => {
//       }, 5000);
//     } 
//   });
// }

const google = document.getElementById("google");
const facebook = document.getElementById("facebook");

facebook.addEventListener("click",()=> {
  signInWithPopup(auth, fbprovider)
  .then((result) => {
    console.log(result);
    window.location.replace('dashboard.html');

    // ...
  })
  .catch((error) => {
    console.log(error);
    // Handle Errors here.
    // ...
  });
})


google.addEventListener("click", ()=> {


signInWithPopup(auth, provider)
  .then(async(result) => {
    
      await setDoc(doc(db, "users", result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
        password: "Login with Google",
      });
    
      window.location.replace('dashboard.html');
  })
  .catch((error) => {
    console.log("Error ==>",error.message);
    // Handle Errors here.
    // ...
  });
})








  // btn.addEventListener("click" ,  ()=>{
   
  
//         event.preventDefault();
//         console.log(S_email.value)
//         console.log(S_email.value)
//         const auth = getAuth();
//         createUserWithEmailAndPassword(auth, S_email.value, S_pass.value)
//           .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             console.log(user)
//           })
//           .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//           });
        
// })