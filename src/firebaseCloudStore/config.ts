import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDzOvJnMuK6qiW_kxOPiUP3U4VV5bGpCGo',
  authDomain: 'cloud-store-75117.firebaseapp.com',
  projectId: 'cloud-store-75117',
  storageBucket: 'cloud-store-75117.firebasestorage.app',
  messagingSenderId: '608415102078',
  appId: '1:608415102078:web:6144c5ef609306ab8b942f',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
