"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userCredential) => {
      if (userCredential) {
        const uid = userCredential.uid;
        console.log("User logged in with UID:", uid); // Debugging log
        const userDoc = await getDoc(doc(db, "users", uid));
        setUser({ uid, ...userDoc.data() });
        console.log(uid);
      } else {
        console.log("No user logged in");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
