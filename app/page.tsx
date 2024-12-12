// app/page.tsx
"use client";

import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">QuizApp</h1>
      <div className="space-y-4">
        <Link href="/quiz">
          <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
            学習分野を選ぶ
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
