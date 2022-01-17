// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC0gGyoBt-U6bMX0hQaSr_eL2GXZEdWc_s",
	authDomain: "react-bookoe.firebaseapp.com",
	projectId: "react-bookoe",
	storageBucket: "react-bookoe.appspot.com",
	messagingSenderId: "1030688198410",
	appId: "1:1030688198410:web:1cd9ccbc5228efd47fb4f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
