// lib/firebase.js

// 必要なFirebaseモジュールをインポート
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebaseの設定情報を環境変数から取得
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Firebaseアプリの初期化（既に初期化されている場合は既存のアプリを取得）
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase Authenticationの初期化
const auth = getAuth(app);

// Firestoreの初期化
const db = getFirestore(app);

// Analyticsの初期化（クライアントサイドのみ）
let analytics;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((err) => {
      console.error("Analyticsの初期化エラー:", err);
    });
}

export { app, auth, db, analytics };
