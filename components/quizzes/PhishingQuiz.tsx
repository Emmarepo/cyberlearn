'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Button from '../ui/Button';

interface Email {
  id: number;
  subject: string;
  sender: string;
  content: string;
  isPhishing: boolean;
  explanation: string;
}

const sampleEmails: Email[] = [
  {
    id: 1,
    subject: "Your Account Security Alert",
    sender: "security@bank.com",
    content: "Dear valued customer, we have detected suspicious activity on your account. Please click here to verify your information immediately to prevent account suspension.",
    isPhishing: true,
    explanation: "Legitimate banks never ask for personal information via email. They would address you by name and provide specific details about the suspicious activity."
  },
  {
    id: 2,
    subject: "Your Amazon Order #12345",
    sender: "no-reply@amazon.com",
    content: "Thank you for your order. Your package will be delivered tomorrow. Track your order here: [tracking link]",
    isPhishing: false,
    explanation: "This is a legitimate order confirmation email with specific order details and proper formatting."
  },
  {
    id: 3,
    subject: "URGENT: Your Password Expires Today",
    sender: "support@microsoft.com",
    content: "Your password will expire in 24 hours. Click here to update your password now to avoid account deactivation.",
    isPhishing: true,
    explanation: "Microsoft never sends password expiration notices via email. They would notify you through the official Microsoft account portal."
  }
];

interface QuizAnswer {
  questionId: number;
  userAnswer: boolean;
  correct: boolean;
  timeSpent: number;
}

export default function PhishingQuiz() {
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<QuizAnswer[]>([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const currentEmail = sampleEmails[currentEmailIndex];

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentEmailIndex]);

  const handleAnswer = async (isPhishing: boolean) => {
    const isCorrect = isPhishing === currentEmail.isPhishing;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowExplanation(true);

    // Store individual answer for final submission
    const newAnswers = [...userAnswers];
    newAnswers[currentEmailIndex] = {
      questionId: currentEmail.id,
      userAnswer: isPhishing,
      correct: isCorrect,
      timeSpent: Date.now() - startTime,
    };
    setUserAnswers(newAnswers);

    // Note: Quiz results are now stored locally
    // In a production app, you'd send this to your API endpoint
    if (session) {
      console.log('Quiz result:', {
        userId: session.user.id,
        quizType: 'phishing',
        emailId: currentEmail.id,
        userAnswer: isPhishing,
        isCorrect,
        timestamp: new Date(),
      });
    }
  };

  const submitQuizResults = async () => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizType: 'phishing',
          moduleId: 'phishing',
          score: Math.round((score / sampleEmails.length) * 100),
          totalQuestions: sampleEmails.length,
          correctAnswers: score,
          timeSpent: Math.floor((Date.now() - startTime) / 1000),
          answers: userAnswers,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Quiz results submitted:', result);
        
        // Show achievement notifications if any were unlocked
        if (result.newAchievements && result.newAchievements.length > 0) {
          result.newAchievements.forEach((achievement: { name: string; description: string; points: number }) => {
            // Simple alert for now - could be replaced with a toast notification
            alert(`🎉 Achievement Unlocked: ${achievement.name}\n${achievement.description}\n+${achievement.points} points!`);
          });
        }
      }
    } catch (error) {
      console.error('Error submitting quiz results:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentEmailIndex < sampleEmails.length - 1) {
      setCurrentEmailIndex(currentEmailIndex + 1);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      if (session?.user?.id) {
        submitQuizResults();
      }
    }
  };

  if (quizCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-surface-elevated rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Quiz Completed!</h2>
        <p className="text-lg mb-4 text-foreground">
          Your score: {score} out of {sampleEmails.length}
        </p>
        <Button
          onClick={() => {
            setCurrentEmailIndex(0);
            setScore(0);
            setShowExplanation(false);
            setQuizCompleted(false);
          }}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-surface-elevated rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2 text-foreground">Phishing Email Quiz</h2>
        <p className="text-text-secondary">
          Question {currentEmailIndex + 1} of {sampleEmails.length}
        </p>
      </div>

      <div className="border rounded-lg p-4 mb-6 bg-surface-secondary">
        <div className="mb-4">
          <p className="font-semibold text-foreground">From: {currentEmail.sender}</p>
          <p className="font-semibold text-foreground">Subject: {currentEmail.subject}</p>
        </div>
        <div className="whitespace-pre-wrap text-foreground">{currentEmail.content}</div>
      </div>

      {!showExplanation ? (
        <div className="space-y-4">
          <p className="font-semibold text-foreground">Is this a phishing email?</p>
          <div className="flex space-x-4">
            <Button onClick={() => handleAnswer(true)}>Yes, it&apos;s phishing</Button>
            <Button variant="outline" onClick={() => handleAnswer(false)}>
              No, it&apos;s legitimate
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${
            currentEmail.isPhishing ? 'bg-red-50' : 'bg-green-50'
          }`}>
            <p className="font-semibold mb-2 text-foreground">
              {currentEmail.isPhishing ? 'This is a phishing email!' : 'This is a legitimate email!'}
            </p>
            <p className="text-text-secondary">{currentEmail.explanation}</p>
          </div>
          <Button onClick={handleNext}>
            {currentEmailIndex < sampleEmails.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        </div>
      )}
    </div>
  );
} 