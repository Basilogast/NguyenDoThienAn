// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd3zZDTGcM7MC9t8M2cSymaN4LMMTHRYI",
  authDomain: "thienanport.firebaseapp.com",
  projectId: "thienanport",
  storageBucket: "thienanport.appspot.com",
  messagingSenderId: "514922497532",
  appId: "1:514922497532:web:e48d5234da2bb8d7b69e79",
  measurementId: "G-BYVC4LCVLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google provider
const provider = new GoogleAuthProvider();

// Export the authentication and Google provider
export { auth, provider, signInWithPopup, signOut };
