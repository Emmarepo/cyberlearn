'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface SecurityTool {
  id: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  icon: string;
  link?: string;
  isExternal?: boolean;
}

const securityTools: SecurityTool[] = [
  {
    id: 'password-checker',
    name: 'Password Strength Checker',
    description: 'Analyze password strength and get recommendations for creating secure passwords.',
    category: 'Password Security',
    features: [
      'Real-time strength analysis',
      'Security recommendations',
      'Common password detection',
      'Entropy calculation'
    ],
    icon: '🔐',
    link: '/tools/password-checker'
  },
  {
    id: 'phishing-sim',
    name: 'Phishing Email Simulation',
    description: 'Practice identifying phishing emails in a safe, controlled environment.',
    category: 'Email Security',
    features: [
      'Realistic phishing examples',
      'Interactive learning',
      'Detailed explanations',
      'Progress tracking'
    ],
    icon: '🎣',
    link: '/tools/phishing-simulation'
  },
  {
    id: 'network-scanner',
    name: 'Network Security Scanner',
    description: 'Simulate network vulnerability scanning to understand common security issues.',
    category: 'Network Security',
    features: [
      'Port scanning simulation',
      'Vulnerability identification',
      'Risk assessment',
      'Mitigation strategies'
    ],
    icon: '🌐',
    link: '#coming-soon'
  },
  {
    id: 'malware-analyzer',
    name: 'Malware Analysis Sandbox',
    description: 'Learn about malware behavior in a safe, simulated environment.',
    category: 'Malware Protection',
    features: [
      'Safe malware samples',
      'Behavior analysis',
      'Detection techniques',
      'Prevention strategies'
    ],
    icon: '🦠',
    link: '#coming-soon'
  },
  {
    id: 'crypto-tools',
    name: 'Cryptography Tools',
    description: 'Explore encryption, hashing, and digital signature concepts hands-on.',
    category: 'Cryptography',
    features: [
      'Encryption/Decryption',
      'Hash functions',
      'Digital signatures',
      'Key management'
    ],
    icon: '🔒',
    link: '#coming-soon'
  },
  {
    id: 'incident-response',
    name: 'Incident Response Simulator',
    description: 'Practice responding to security incidents with realistic scenarios.',
    category: 'Incident Response',
    features: [
      'Realistic scenarios',
      'Decision trees',
      'Response planning',
      'Post-incident analysis'
    ],
    icon: '🚨',
    link: '#coming-soon'
  }
];

const categories = Array.from(new Set(securityTools.map(tool => tool.category)));

export default function SecurityTools() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data: session } = useSession();

  const filteredTools = selectedCategory === 'All' 
    ? securityTools 
    : securityTools.filter(tool => tool.category === selectedCategory);

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
            Security Tools & Simulators
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Practice cybersecurity skills with hands-on tools and realistic simulations
          </motion.p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-2 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Tools
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <motion.div 
          layout
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
        >
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{tool.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
                    <span className="text-sm text-blue-600 font-medium">{tool.category}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{tool.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  {tool.link === '#coming-soon' ? (
                    <div className="flex-1 bg-gray-100 text-gray-500 py-2 px-4 rounded-lg text-center font-medium">
                      Coming Soon
                    </div>
                  ) : (
                    <Link
                      href={tool.link || '#'}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                    >
                      Launch Tool
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Navigation */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Test Your Knowledge?
            </h3>
            <p className="text-gray-600 mb-6">
              Put your cybersecurity skills to the test with our interactive quizzes
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/quizzes/phishing"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Phishing Quiz
              </Link>
              <Link
                href="/quizzes/password"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Password Quiz
              </Link>
              <Link
                href="/quizzes/security"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Security Quiz
              </Link>
              {session && (
                <Link
                  href="/learn"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Learning Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Practice with Security Tools?
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">🎯 Hands-on Learning</h4>
                <p className="text-sm">
                  Experience real-world security scenarios in a safe, controlled environment
                  without the risks of actual threats.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🧠 Skill Development</h4>
                <p className="text-sm">
                  Build practical cybersecurity skills that translate directly to 
                  real-world security challenges.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔍 Understanding Threats</h4>
                <p className="text-sm">
                  Learn how attacks work to better understand how to defend against them
                  and recognize security vulnerabilities.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📈 Progress Tracking</h4>
                <p className="text-sm">
                  Monitor your improvement over time and identify areas where you need
                  additional practice and learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
