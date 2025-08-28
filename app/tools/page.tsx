'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  isAvailable: boolean;
}

const tools: Tool[] = [
  {
    id: 'password-checker',
    title: 'Password Strength Checker',
    description: 'Analyze password strength and get security recommendations',
    icon: '🔐',
    href: '/tools/password-checker',
    difficulty: 'Beginner',
    category: 'Password Security',
    isAvailable: true
  },
  {
    id: 'phishing-simulation',
    title: 'Phishing Email Simulation',
    description: 'Practice identifying phishing emails in realistic scenarios',
    icon: '🎣',
    href: '/tools/phishing-simulation',
    difficulty: 'Intermediate',
    category: 'Email Security',
    isAvailable: true
  },
  {
    id: 'security-tools',
    title: 'Security Tools Collection',
    description: 'Comprehensive collection of cybersecurity tools and simulators',
    icon: '🛠️',
    href: '/tools/security-tools',
    difficulty: 'Beginner',
    category: 'General Security',
    isAvailable: true
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

export default function ToolsIndex() {
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
            Cybersecurity Tools
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Practice and strengthen your cybersecurity skills with interactive tools and simulations
          </motion.p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-12">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{tool.icon}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tool.difficulty)}`}>
                    {tool.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{tool.description}</p>
                
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
                
                {tool.isAvailable ? (
                  <Link
                    href={tool.href}
                    className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Launch Tool
                  </Link>
                ) : (
                  <div className="w-full bg-gray-100 text-gray-500 text-center py-3 px-4 rounded-lg font-semibold">
                    Coming Soon
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Continue Your Learning Journey
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Quizzes */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">📝</span>
                  <h3 className="text-xl font-semibold text-gray-900">Test Your Knowledge</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Challenge yourself with interactive quizzes covering various cybersecurity topics.
                </p>
                <Link
                  href="/quizzes"
                  className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  View All Quizzes
                </Link>
              </div>

              {/* Lessons */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">📚</span>
                  <h3 className="text-xl font-semibold text-gray-900">Learn the Basics</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Start with foundational lessons covering essential cybersecurity concepts.
                </p>
                <div className="space-y-2">
                  <Link
                    href="/lessons/password-basics"
                    className="block text-blue-600 hover:text-blue-800 font-medium"
                  >
                    → Password Security Basics
                  </Link>
                  <Link
                    href="/lessons/phishing-basics"
                    className="block text-blue-600 hover:text-blue-800 font-medium"
                  >
                    → Phishing Awareness
                  </Link>
                  <Link
                    href="/lessons/network-security"
                    className="block text-blue-600 hover:text-blue-800 font-medium"
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
                  Go to Learning Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Use Our Security Tools?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hands-On Practice</h3>
              <p className="text-gray-600 text-sm">
                Learn by doing with interactive tools that simulate real-world security scenarios
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Safe Environment</h3>
              <p className="text-gray-600 text-sm">
                Practice with potentially dangerous concepts in a completely safe, controlled setting
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600 text-sm">
                Monitor your learning journey and see how your skills improve over time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
