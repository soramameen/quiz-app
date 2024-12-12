// components/LoginButton.tsx
"use client";

import { auth } from "../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useState, useEffect } from "react";

const LoginButton: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser: User | null) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>こんにちは、{user.displayName}さん！</p>
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Googleでログイン</button>
      )}
    </div>
  );
};

export default LoginButton;
