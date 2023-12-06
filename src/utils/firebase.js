import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDR-i2oc5kRxfqS2l0uNGUzzx5tVSKu9Oo",
    authDomain: "clone-3e912.firebaseapp.com",
    projectId: "clone-3e912",
    storageBucket: "clone-3e912.appspot.com",
    messagingSenderId: "868237761165",
    appId: "1:868237761165:web:94948291f1af6b8bf860c4"
  };
  
  
  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();
  const auth=firebase.auth();

  export {db, auth};