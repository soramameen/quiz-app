// components/Messages.tsx
"use client";

import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

interface Message {
  text: string;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "messages"));
        const msgs: Message[] = querySnapshot.docs.map(
          (doc) => doc.data() as Message
        );
        setMessages(msgs);
      } catch (error) {
        console.error("Firestoreからのデータ取得エラー:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>メッセージ一覧</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
