// app/quiz/start/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

const StartQuiz: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "it";
  const num = parseInt(searchParams.get("num") || "5");
  const router = useRouter();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/data/${category}.json`);
        const data: QuizQuestion[] = await res.json();
        const selectedQuestions = data.slice(0, num);
        setQuestions(selectedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("問題データの取得エラー:", error);
      }
    };

    fetchQuestions();
  }, [category, num]);

  const handleAnswer = (option: string) => {
    setUserAnswers([...userAnswers, option]);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      // 結果ページへ遷移
      router.push(
        `/quiz/result?category=${category}&num=${num}&answers=${userAnswers.join(
          ","
        )},${option}`
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        読み込み中...
      </div>
    );
  }

  const currentQuestion = questions[current];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-6">
        クイズ:{" "}
        {category === "it"
          ? "IT基礎"
          : category === "english"
          ? "英単語"
          : "プログラミング基礎"}
      </h2>
      <div className="w-full max-w-lg bg-white p-6 rounded shadow">
        <p className="mb-4">
          {current + 1}. {currentQuestion.question}
        </p>
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-4 text-right">
          <span>
            {current + 1} / {questions.length}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <Link href="/quiz">
          <button className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600">
            戻る
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StartQuiz;
