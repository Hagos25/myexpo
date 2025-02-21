import { initializeApp ,getApps,getApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA2hwuNDFF7zaDZskeiQFT5KrQ5mx7pECc",
    authDomain: "chatapp-7767e.firebaseapp.com",
    projectId: "chatapp-7767e",
    storageBucket: "chatapp-7767e.appspot.com",
    messagingSenderId: "824403645045",
    appId: "1:824403645045:web:40a98187b2be93c7355e3c"
  };
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  export { db, auth };