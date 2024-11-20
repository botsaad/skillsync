import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { signInAnonymously } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const FirebaseTest = () => {
  const [status, setStatus] = useState('Checking Firebase...');

  const testFirebaseAuth = async () => {
    try {
      await signInAnonymously(auth);
      console.log("Firebase Authentication is working!");
      setStatus("Firebase Authentication: Success!");
    } catch (error) {
      console.error("Firebase Authentication Error:", error);
      setStatus("Firebase Authentication: Failed");
    }
  };

  const testFirestore = async () => {
    try {
      const docRef = doc(db, "testCollection", "testDoc");
      await setDoc(docRef, { testKey: "testValue" });

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Firebase Firestore is working!", docSnap.data());
        setStatus((prevStatus) => prevStatus + " | Firestore: Success!");
      } else {
        setStatus((prevStatus) => prevStatus + " | Firestore: Failed");
      }
    } catch (error) {
      console.error("Firestore Error:", error);
      setStatus((prevStatus) => prevStatus + " | Firestore: Failed");
    }
  };

  useEffect(() => {
    testFirebaseAuth();
    testFirestore();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Firebase Status</h2>
      <p>{status}</p>
    </div>
  );
};

export default FirebaseTest;
