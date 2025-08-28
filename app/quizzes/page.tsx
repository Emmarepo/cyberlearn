'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: number;
  timeEstimate: string;
  points: number;
  category: string;
}

const quizzes: Quiz[] = [
  {
    id: 'phishing',
    title: 'Phishing Awareness Quiz',
    description: 'Test your ability to identify phishing emails and social engineering attacks',
    icon: '🎣',
    href: '/quizzes/phishing',
    difficulty: 'Beginner',
    questions: 10,
    timeEstimate: '5-10 min',
    points: 100,
    category: 'Email Security'
  },
  {
    id: 'password',
    title: 'Password Security Quiz',
    description: 'Evaluate your knowledge of password best practices and security principles',
    icon: '🔐',
    href: '/quizzes/password',
    difficulty: 'Beginner',
    questions: 10,
    timeEstimate: '5-10 min',
    points: 200,
    category: 'Password Security'
  },
  {
    id: 'security',
    title: 'General Security Quiz',
    description: 'Comprehensive test covering network security, malware, and cybersecurity fundamentals',
    icon: '🛡️',
    href: '/quizzes/security',
    difficulty: 'Intermediate',
    questions: 20,
    timeEstimate: '15-20 min',
    points: 300,
    category: 'General Security'
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'Advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function QuizzesIndex() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Cybersecurity Quizzes
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Test your cybersecurity knowledge and earn points to unlock achievements
          </motion.p>
        </div>

        {/* Quizzes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-12">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{quiz.icon}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{quiz.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Questions:</span>
                    <span className="font-medium">{quiz.questions}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Time:</span>
                    <span className="font-medium">{quiz.timeEstimate}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Points:</span>
                    <span className="font-medium text-blue-600">{quiz.points}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {quiz.category}
                  </span>
                </div>
                
                <Link
                  href={quiz.href}
                  className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Quiz
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Enhance Your Learning
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Tools */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">🛠️</span>
                  <h3 className="text-xl font-semibold text-gray-900">Practice with Tools</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Use interactive tools and simulations to practice cybersecurity skills hands-on.
                </p>
                <Link
                  href="/tools"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Explore Tools
                </Link>
              </div>

              {/* Lessons */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">📚</span>
                  <h3 className="text-xl font-semibold text-gray-900">Study the Fundamentals</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Review key concepts before taking quizzes to maximize your learning.
                </p>
                <div className="space-y-2">
                  <Link
                    href="/lessons/password-basics"
                    className="block text-green-600 hover:text-green-800 font-medium"
                  >
                    → Password Security Basics
                  </Link>
                  <Link
                    href="/lessons/phishing-basics"
                    className="block text-green-600 hover:text-green-800 font-medium"
                  >
                    → Phishing Awareness
                  </Link>
                  <Link
                    href="/lessons/network-security"
                    className="block text-green-600 hover:text-green-800 font-medium"
                  >
                    → Network Security Fundamentals
                  </Link>
                </div>
              </div>
            </div>

            {/* Dashboard Link */}
            {session && (
              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/learn"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Learning Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Achievement Info */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Unlock Achievements
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-semibold text-gray-900 mb-2">Quiz Master</h3>
                <p className="text-sm text-gray-600">Score 80% or higher on any quiz</p>
              </div>
              
              <div>
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Perfect Score</h3>
                <p className="text-sm text-gray-600">Get 100% on any quiz</p>
              </div>
              
              <div>
                <div className="text-4xl mb-3">📚</div>
                <h3 className="font-semibold text-gray-900 mb-2">Knowledge Seeker</h3>
                <p className="text-sm text-gray-600">Complete all available quizzes</p>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-gray-600">
                {session ? 'Complete quizzes to earn points and unlock achievements!' : 'Sign in to track your progress and earn achievements!'}
              </p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Quiz Tips</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>Before you start:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Review related lesson materials</li>
                  <li>Ensure you have enough time to complete</li>
                  <li>Find a quiet environment to focus</li>
                </ul>
              </div>
              <div>
                <strong>During the quiz:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Read each question carefully</li>
                  <li>Consider all answer options</li>
                  <li>Use your practical knowledge</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
