'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface SimulationEmail {
  id: string;
  subject: string;
  sender: string;
  content: string;
  isPhishing: boolean;
  indicators: string[];
  explanation: string;
}

const simulationEmails: SimulationEmail[] = [
  {
    id: 'sim-1',
    subject: 'Urgent: Your PayPal Account Has Been Limited',
    sender: 'security@payp4l-support.com',
    content: `Dear Valued Customer,

We have detected suspicious activity on your PayPal account. Your account has been temporarily limited for your protection.

To restore full access to your account, please verify your information immediately by clicking the link below:

[Verify Account Now]

If you do not verify within 24 hours, your account will be permanently suspended.

Thank you,
PayPal Security Team`,
    isPhishing: true,
    indicators: [
      'Misspelled domain: payp4l-support.com',
      'Generic greeting: "Dear Valued Customer"',
      'Urgent threatening language',
      'Suspicious verification link',
      'Creates false sense of urgency'
    ],
    explanation: 'This is a classic phishing email. PayPal would never ask you to verify account information via email links, and the domain is misspelled to trick users.'
  },
  {
    id: 'sim-2',
    subject: 'Your Monthly Statement is Ready',
    sender: 'statements@chase.com',
    content: `Hello John Smith,

Your Chase credit card statement for March 2024 is now available online.

Statement Date: March 15, 2024
Amount Due: $1,247.83
Due Date: April 10, 2024

To view your statement, log in to your Chase account or use our mobile app.

If you have questions about your statement, please contact us at 1-800-CHASE24.

Thank you for being a valued Chase customer.

Chase Customer Service`,
    isPhishing: false,
    indicators: [
      'Legitimate domain: chase.com',
      'Personal greeting with actual name',
      'Specific account information',
      'No suspicious links or attachments',
      'Official contact information provided'
    ],
    explanation: 'This appears to be a legitimate statement notification. It uses the correct domain, includes specific details, and doesn&apos;t ask for sensitive information.'
  },
  {
    id: 'sim-3',
    subject: 'Action Required: Microsoft Account Security Alert',
    sender: 'account-security@microsoft.com',
    content: `Microsoft Account Team

We detected an unusual sign-in to your Microsoft account from:

Location: Moscow, Russia
Device: Unknown Windows PC
Time: Today at 3:47 AM

If this was you, you can safely ignore this email.

If this wasn&apos;t you, please secure your account immediately:
• Change your password
• Review recent activity
• Enable two-factor authentication

Visit your Microsoft Account Security page to review this activity.

Microsoft Account Team`,
    isPhishing: false,
    indicators: [
      'Legitimate domain: microsoft.com',
      'Specific security information provided',
      'Doesn&apos;t ask for immediate action via links',
      'Provides helpful security recommendations',
      'Professional formatting and language'
    ],
    explanation: 'This is a legitimate security alert from Microsoft. It provides specific information about the suspicious activity and gives helpful advice without asking you to click suspicious links.'
  }
];

export default function PhishingSimulation() {
  const [currentEmail, setCurrentEmail] = useState(0);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(0);
  const { data: session } = useSession();

  const handleChoice = (isPhishing: boolean) => {
    setUserChoice(isPhishing);
    setShowResult(true);
    
    const correct = isPhishing === simulationEmails[currentEmail].isPhishing;
    if (correct) {
      setScore(score + 1);
    }
    setCompleted(completed + 1);
  };

  const nextEmail = () => {
    if (currentEmail < simulationEmails.length - 1) {
      setCurrentEmail(currentEmail + 1);
      setUserChoice(null);
      setShowResult(false);
    }
  };

  const resetSimulation = () => {
    setCurrentEmail(0);
    setUserChoice(null);
    setShowResult(false);
    setScore(0);
    setCompleted(0);
  };

  const email = simulationEmails[currentEmail];
  const isComplete = completed === simulationEmails.length;

  if (isComplete) {
    const percentage = Math.round((score / simulationEmails.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="mb-6">
            {percentage >= 80 ? (
              <div className="text-6xl mb-4">🛡️</div>
            ) : percentage >= 60 ? (
              <div className="text-6xl mb-4">⚠️</div>
            ) : (
              <div className="text-6xl mb-4">🎯</div>
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Simulation Complete!</h2>
            <p className="text-lg text-gray-600">
              You correctly identified {score} out of {simulationEmails.length} emails
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{percentage}%</p>
          </div>

          <div className="mb-6">
            {percentage >= 80 ? (
              <p className="text-green-600 font-semibold">Excellent! You have strong phishing detection skills.</p>
            ) : percentage >= 60 ? (
              <p className="text-yellow-600 font-semibold">Good work! Keep practicing to improve your detection rate.</p>
            ) : (
              <p className="text-red-600 font-semibold">Keep learning! Review phishing indicators and try again.</p>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={resetSimulation}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/lessons/phishing-basics"
              className="block w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Learn More About Phishing
            </Link>
            {session && (
              <Link
                href="/learn"
                className="block w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Back to Learning Dashboard
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Phishing Email Simulation</h1>
          <p className="text-gray-600">Practice identifying phishing emails in a safe environment</p>
        </div>

        {/* Progress */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-600">
              Email {currentEmail + 1} of {simulationEmails.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              Score: {score}/{completed}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentEmail + 1) / simulationEmails.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Email Simulation */}
        <motion.div
          key={currentEmail}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Email Header */}
          <div className="bg-gray-100 px-6 py-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">From:</span>
              <span className="text-sm font-medium">{email.sender}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Subject:</span>
              <span className="text-sm font-medium">{email.subject}</span>
            </div>
          </div>

          {/* Email Content */}
          <div className="p-6">
            <div className="whitespace-pre-line text-gray-800 mb-6 font-mono text-sm bg-gray-50 p-4 rounded border">
              {email.content}
            </div>

            {!showResult ? (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Is this email legitimate or phishing?
                </h3>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => handleChoice(false)}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Legitimate
                  </button>
                  <button
                    onClick={() => handleChoice(true)}
                    className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Phishing
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`p-4 rounded-lg mb-4 ${
                  userChoice === email.isPhishing 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <h3 className={`font-semibold mb-2 ${
                    userChoice === email.isPhishing ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {userChoice === email.isPhishing ? '✅ Correct!' : '❌ Incorrect'}
                  </h3>
                  <p className={`text-sm ${
                    userChoice === email.isPhishing ? 'text-green-700' : 'text-red-700'
                  }`}>
                    This email is {email.isPhishing ? 'phishing' : 'legitimate'}.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Key Indicators:</h4>
                  <ul className="list-disc pl-5 text-blue-800 text-sm">
                    {email.indicators.map((indicator, index) => (
                      <li key={index}>{indicator}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Explanation:</h4>
                  <p className="text-gray-700 text-sm">{email.explanation}</p>
                </div>

                <div className="text-center">
                  {currentEmail < simulationEmails.length - 1 ? (
                    <button
                      onClick={nextEmail}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Next Email
                    </button>
                  ) : (
                    <button
                      onClick={nextEmail}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      View Results
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
