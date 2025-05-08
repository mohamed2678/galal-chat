// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCQAqjR5ookWsA4nGB1vDh0qQAuEixHq_Y',
  authDomain: 'galal-chat.firebaseapp.com',
  projectId: 'galal-chat',
  storageBucket: 'galal-chat.firebasestorage.app',
  messagingSenderId: '874724130831',
  appId: '1:874724130831:web:a3418d719bf087a456237a',
  measurementId: 'G-8XNPFL89W0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app) // Initialize Firestore

export { app, analytics, db }
export default app
