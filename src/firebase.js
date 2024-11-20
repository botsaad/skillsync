// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCI6D5--hkyTzHRUm6D1SFH2DA2Fnz9GwI",
  authDomain: "skills-sync-76820.firebaseapp.com",
  projectId: "skills-sync-76820",
  storageBucket: "skills-sync-76820.appspot.com", // Updated storageBucket (corrected typo)
  messagingSenderId: "291295372825",
  appId: "1:291295372825:web:cb1f3e91b38b524d852c88"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication, Firestore Database, and Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Added Firebase Storage

// Export the auth, db, and storage objects
export { auth, db, storage };
