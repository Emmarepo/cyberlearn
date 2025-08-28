'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizAnswer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  timestamp: Date;
}

const passwordQuestions: Question[] = [
  {
    id: 1,
    question: "What is the minimum recommended length for a strong password?",
    options: ["6 characters", "8 characters", "12 characters", "16 characters"],
    correctAnswer: 2,
    explanation: "Security experts recommend at least 12 characters for strong passwords. Longer passwords are exponentially harder to crack."
  },
  {
    id: 2,
    question: "Which of these is the strongest password?",
    options: ["Password123!", "MyBirthday1990", "Coffee-Mountain-42-Blue!", "qwerty123"],
    correctAnswer: 2,
    explanation: "Coffee-Mountain-42-Blue! uses a passphrase method with random words, numbers, and symbols, making it both strong and memorable."
  },
  {
    id: 3,
    question: "What should you do if a website is breached and your password is compromised?",
    options: [
      "Change the password on that site only",
      "Change passwords on all sites where you used the same password",
      "Wait to see if anything happens",
      "Contact the police"
    ],
    correctAnswer: 1,
    explanation: "If you reused the password on other sites, change it everywhere immediately. This is why unique passwords for each site are crucial."
  },
  {
    id: 4,
    question: "What is the best way to store your passwords?",
    options: [
      "Write them down on paper",
      "Save them in a text file on your computer",
      "Use a reputable password manager",
      "Memorize all of them"
    ],
    correctAnswer: 2,
    explanation: "Password managers encrypt your passwords and generate unique, strong passwords for each account. They&apos;re the most secure option."
  },
  {
    id: 5,
    question: "Which password creation method is most secure?",
    options: [
      "Using personal information like birthdays",
      "Random generation by password managers",
      "Simple patterns like 123456",
      "Dictionary words"
    ],
    correctAnswer: 1,
    explanation: "Randomly generated passwords are the most secure because they&apos;re unpredictable and don&apos;t follow any patterns attackers can exploit."
  },
  {
    id: 6,
    question: "How often should you change your passwords?",
    options: [
      "Every month",
      "Every 3 months",
      "Only when there&apos;s a security breach or compromise",
      "Never, if they&apos;re strong"
    ],
    correctAnswer: 2,
    explanation: "Modern security advice suggests changing passwords only when compromised, as frequent changes often lead to weaker passwords."
  },
  {
    id: 7,
    question: "What makes two-factor authentication (2FA) important for password security?",
    options: [
      "It makes passwords unnecessary",
      "It provides a second layer of security if passwords are compromised",
      "It makes passwords stronger",
      "It&apos;s required by law"
    ],
    correctAnswer: 1,
    explanation: "2FA adds an extra security layer. Even if your password is stolen, attackers still need the second factor to access your account."
  },
  {
    id: 8,
    question: "Which of these is a sign of a weak password?",
    options: [
      "Contains uppercase and lowercase letters",
      "Uses personal information like your name or birthday",
      "Is longer than 12 characters",
      "Contains special characters"
    ],
    correctAnswer: 1,
    explanation: "Personal information is easily guessed or found through social media and public records, making passwords predictable."
  }
];

export default function PasswordQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<QuizAnswer[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === passwordQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    const answer: QuizAnswer = {
      questionId: passwordQuestions[currentQuestion].id,
      selectedAnswer,
      isCorrect,
      timestamp: new Date(),
    };

    setUserAnswers([...userAnswers, answer]);

    if (!showExplanation) {
      setShowExplanation(true);
    } else {
      if (currentQuestion < passwordQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
        submitQuizResults();
      }
    }
  };

  const submitQuizResults = async () => {
    if (!session?.user?.id || !startTime) return;

    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizType: 'password',
          moduleId: 'password-quiz',
          score: Math.round((score / passwordQuestions.length) * 100),
          totalQuestions: passwordQuestions.length,
          correctAnswers: score,
          timeSpent: Math.floor((Date.now() - startTime.getTime()) / 1000),
          answers: userAnswers,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Quiz results submitted:', result);
        
        // Show achievement notifications if any were unlocked
        if (result.newAchievements && result.newAchievements.length > 0) {
          result.newAchievements.forEach((achievement: { name: string; description: string; points: number }) => {
            alert(`🎉 Achievement Unlocked: ${achievement.name}\n${achievement.description}\n+${achievement.points} points!`);
          });
        }
      }
    } catch (error) {
      console.error('Error submitting quiz results:', error);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
    setStartTime(new Date());
  };

  if (quizCompleted) {
    const percentage = Math.round((score / passwordQuestions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="mb-6">
            {percentage >= 80 ? (
              <div className="text-6xl mb-4">🎉</div>
            ) : percentage >= 60 ? (
              <div className="text-6xl mb-4">👍</div>
            ) : (
              <div className="text-6xl mb-4">📚</div>
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-lg text-gray-600">
              You scored {score} out of {passwordQuestions.length}
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{percentage}%</p>
          </div>

          <div className="mb-6">
            {percentage >= 80 ? (
              <p className="text-green-600 font-semibold">Excellent! You have a strong understanding of password security.</p>
            ) : percentage >= 60 ? (
              <p className="text-yellow-600 font-semibold">Good job! Review the areas you missed to improve further.</p>
            ) : (
              <p className="text-red-600 font-semibold">Keep learning! Consider reviewing password security best practices.</p>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={restartQuiz}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Take Quiz Again
            </button>
            <a
              href="/learn"
              className="block w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Back to Learning Dashboard
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = passwordQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / passwordQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Password Security Quiz</h1>
          <p className="text-gray-600">Test your knowledge of password security best practices</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-600">
              Question {currentQuestion + 1} of {passwordQuestions.length}
            </span>
            <span className="text-sm font-medium text-blue-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {question.question}
          </h2>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === question.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-red-500 bg-red-50 text-red-800'
                      : 'border-blue-500 bg-blue-50'
                    : showExplanation && index === question.correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 hover:border-gray-300'
                } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
                {showExplanation && index === question.correctAnswer && (
                  <span className="ml-2 text-green-600">✓</span>
                )}
                {showExplanation && selectedAnswer === index && index !== question.correctAnswer && (
                  <span className="ml-2 text-red-600">✗</span>
                )}
              </button>
            ))}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6"
            >
              <h3 className="font-semibold text-blue-900 mb-2">Explanation:</h3>
              <p className="text-blue-800">{question.explanation}</p>
            </motion.div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
            </div>
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                selectedAnswer === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {showExplanation
                ? currentQuestion === passwordQuestions.length - 1
                  ? 'Finish Quiz'
                  : 'Next Question'
                : 'Submit Answer'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
