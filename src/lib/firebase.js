import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAFFXMyM0qLEVZFTE0OF5nhrI2b7SYA4QI",
    authDomain: "first-project-58e45.firebaseapp.com",
    projectId: "first-project-58e45",
    storageBucket: "first-project-58e45.firebasestorage.app",
    messagingSenderId: "567214277924",
    appId: "1:567214277924:web:c16656a8767ce6b0c75fb1",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
