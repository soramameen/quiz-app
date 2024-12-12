// app/quiz/result/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface Result {
  questions: QuizQuestion[];
  userAnswers: string[];
  score: number;
}

const ResultPage: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "it";
  const num = parseInt(searchParams.get("num") || "5");
  const answersParam = searchParams.get("answers") || "";
  const router = useRouter();

  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const calculateResult = async () => {
      try {
        // Fetch questions
        const res = await fetch(`/data/${category}.json`);
        const data: QuizQuestion[] = await res.json();
        const selectedQuestions = data.slice(0, num);

        // Parse user answers
        const userAnswers = answersParam.split(",");

        // Calculate score
        let score = 0;
        const detailedResults = selectedQuestions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === question.answer;
          if (isCorrect) score += 1;
          return {
            question: question.question,
            userAnswer,
            correctAnswer: question.answer,
            isCorrect,
          };
        });

        setResult({
          questions: selectedQuestions,
          userAnswers,
          score,
        });
        setLoading(false);
      } catch (error) {
        console.error("結果計算エラー:", error);
      }
    };

    calculateResult();
  }, [category, num, answersParam]);

  if (loading || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        結果を計算中...
      </div>
    );
  }

  const { score, questions, userAnswers } = result;

  // 関連書籍リンクの設定
  const relatedBooks = {
    it: [
      {
        title: "基本情報技術者試験対策書",
        url: "https://www.amazon.co.jp/dp/B08L3QG5Y5",
      },
      {
        title: "応用情報技術者試験対策",
        url: "https://www.amazon.co.jp/dp/B08XYZ1234",
      },
    ],
    english: [
      {
        title: "TOEIC 公式問題集",
        url: "https://www.amazon.co.jp/dp/B07Y5Y6Y7Z",
      },
      { title: "速読英単語", url: "https://www.amazon.co.jp/dp/B07ABCDEF1" },
    ],
    programming: [
      {
        title: "初心者向けJavaScript入門書",
        url: "https://www.amazon.co.jp/dp/B08GHS6L9M",
      },
      {
        title: "React実践ガイド",
        url: "https://www.amazon.co.jp/dp/B07GHIJKL2",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-3xl font-semibold mb-6">結果</h2>
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <p className="text-xl mb-4">
          得点: {score} / {questions.length}
        </p>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="border-b pb-2">
              <p className="font-medium">
                {index + 1}. {question.question}
              </p>
              <p>あなたの答え: {userAnswers[index]}</p>
              <p>正解: {question.answer}</p>
              <p
                className={
                  userAnswers[index] === question.answer
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {userAnswers[index] === question.answer ? "正解" : "不正解"}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-2">おすすめの書籍</h3>
          <ul className="list-disc list-inside space-y-1">
            {relatedBooks[category as keyof typeof relatedBooks].map(
              (book, idx) => (
                <li key={idx}>
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {book.title}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <div className="mt-6 space-x-4">
        <Link href="/quiz">
          <button className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">
            新しいクイズ
          </button>
        </Link>
        <Link href="/">
          <button className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600">
            ホームに戻る
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
