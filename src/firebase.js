import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyCV4Ld8CXpgCtbiGTPe5_MCWD5_HKWtkKs',
  authDomain: 'questions-react.firebaseapp.com',
  projectId: 'questions-react',
  storageBucket: 'questions-react.appspot.com',
  messagingSenderId: '129956767124',
  appId: '1:129956767124:web:a1e04d96dd19111a511b81',
  measurementId: 'G-ZVBYFT725N',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
const auth = getAuth(app);

export { db, app, database, auth };
