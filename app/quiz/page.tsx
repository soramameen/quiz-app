// app/quiz/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const QuizSelection: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category) {
      router.push(`/quiz/start?category=${category}&num=${numQuestions}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">クイズを選択</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">学習分野:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="px-4 py-2 border rounded w-full"
          >
            <option value="">選択してください</option>
            <option value="it">IT基礎</option>
            <option value="english">英単語</option>
            <option value="programming">プログラミング基礎</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">問題数:</label>
          <select
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            required
            className="px-4 py-2 border rounded w-full"
          >
            <option value={5}>5問</option>
            <option value={10}>10問</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 w-full"
        >
          クイズ開始
        </button>
      </form>
      <div className="mt-4">
        <Link href="/">
          <button className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600">
            戻る
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuizSelection;
