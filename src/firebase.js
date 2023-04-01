import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import{getStorage}    from 'firebase/storage'
import{getAuth}    from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyBloZL6-UpR1YHpXiSAL-G1PbtX4oCzGSw",
    authDomain: "react-blog-c8dd0.firebaseapp.com",
    projectId: "react-blog-c8dd0",
    storageBucket: "react-blog-c8dd0.appspot.com",
    messagingSenderId: "196896751262",
    appId: "1:196896751262:web:485269eed756d7ebf6458f"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app)
  const storage = getStorage(app)


  export {auth ,db ,storage}