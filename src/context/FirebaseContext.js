import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   getDocs,
//   getDoc,
//   doc,
//   query,
//   where,
// } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyA8dgGA8HWBrJ8V25QL4Hv4pADvTksTfRM",
  authDomain: "usertouser-fdade.firebaseapp.com",
  projectId: "usertouser-fdade",
  storageBucket: "usertouser-fdade.appspot.com",
  messagingSenderId: "1021612910042",
  appId: "1:1021612910042:web:b95b2ab996a6d80809cce3",
  measurementId: "G-E77PCHN9MR",
};
export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    try {
      onAuthStateChanged(firebaseAuth, (user) => {
        setUserName(user?.displayName || "");
        if (user) {
          setUser(user);
          setUserName(user.displayName);
        } else setUser(null);
      });
    } catch (error) {}
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const singinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const isLoggedIn = user ? true : false;

  const logOut = () => firebaseAuth.signOut();

  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        singinUserWithEmailAndPass,
        isLoggedIn,
        logOut,
        user,
        userName,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
