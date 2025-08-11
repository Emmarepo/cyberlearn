'use client';

import { useState } from 'react';
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

export default function PhishingQuiz() {
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { data: session } = useSession();

  const currentEmail = sampleEmails[currentEmailIndex];

  const handleAnswer = async (isPhishing: boolean) => {
    const isCorrect = isPhishing === currentEmail.isPhishing;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowExplanation(true);

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

  const handleNext = () => {
    if (currentEmailIndex < sampleEmails.length - 1) {
      setCurrentEmailIndex(currentEmailIndex + 1);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  if (quizCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg mb-4">
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Phishing Email Quiz</h2>
        <p className="text-gray-600">
          Question {currentEmailIndex + 1} of {sampleEmails.length}
        </p>
      </div>

      <div className="border rounded-lg p-4 mb-6">
        <div className="mb-4">
          <p className="font-semibold">From: {currentEmail.sender}</p>
          <p className="font-semibold">Subject: {currentEmail.subject}</p>
        </div>
        <div className="whitespace-pre-wrap">{currentEmail.content}</div>
      </div>

      {!showExplanation ? (
        <div className="space-y-4">
          <p className="font-semibold">Is this a phishing email?</p>
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
            <p className="font-semibold mb-2">
              {currentEmail.isPhishing ? 'This is a phishing email!' : 'This is a legitimate email!'}
            </p>
            <p className="text-gray-700">{currentEmail.explanation}</p>
          </div>
          <Button onClick={handleNext}>
            {currentEmailIndex < sampleEmails.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        </div>
      )}
    </div>
  );
} 