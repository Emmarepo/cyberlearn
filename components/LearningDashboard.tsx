'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  progress: number;
  modules: {
    id: string;
    title: string;
    type: 'quiz' | 'tool' | 'lesson';
    status: 'locked' | 'in-progress' | 'completed';
    points: number;
  }[];
}

const learningPaths: LearningPath[] = [
  {
    id: 'fundamentals',
    title: 'Security Fundamentals',
    description: 'Master the basics of cybersecurity',
    progress: 0,
    modules: [
      {
        id: 'password-basics',
        title: 'Password Security Basics',
        type: 'lesson',
        status: 'in-progress',
        points: 100
      },
      {
        id: 'password-checker',
        title: 'Password Strength Checker',
        type: 'tool',
        status: 'locked',
        points: 150
      },
      {
        id: 'password-quiz',
        title: 'Password Security Quiz',
        type: 'quiz',
        status: 'locked',
        points: 200
      }
    ]
  },
  {
    id: 'phishing',
    title: 'Phishing Awareness',
    description: 'Learn to identify and prevent phishing attacks',
    progress: 0,
    modules: [
      {
        id: 'phishing-basics',
        title: 'Understanding Phishing',
        type: 'lesson',
        status: 'in-progress',
        points: 100
      },
      {
        id: 'phishing-quiz',
        title: 'Phishing Email Quiz',
        type: 'quiz',
        status: 'locked',
        points: 200
      },
      {
        id: 'phishing-simulation',
        title: 'Phishing Simulation',
        type: 'tool',
        status: 'locked',
        points: 250
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Security',
    description: 'Deep dive into advanced security concepts',
    progress: 0,
    modules: [
      {
        id: 'network-security',
        title: 'Network Security',
        type: 'lesson',
        status: 'locked',
        points: 150
      },
      {
        id: 'security-quiz',
        title: 'Security Fundamentals Quiz',
        type: 'quiz',
        status: 'locked',
        points: 200
      },
      {
        id: 'security-tools',
        title: 'Security Tools Workshop',
        type: 'tool',
        status: 'locked',
        points: 300
      }
    ]
  }
];

const achievements = [
  {
    id: 'first-quiz',
    title: 'First Quiz Completed',
    description: 'Complete your first security quiz',
    icon: '🎯',
    unlocked: true
  },
  {
    id: 'password-master',
    title: 'Password Master',
    description: 'Create a password with maximum strength',
    icon: '🔐',
    unlocked: false
  },
  {
    id: 'phishing-expert',
    title: 'Phishing Expert',
    description: 'Score 100% on the phishing quiz',
    icon: '🎣',
    unlocked: false
  }
];

export default function LearningDashboard() {
  const { data: session } = useSession();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const handlePathSelect = (pathId: string) => {
    setSelectedPath(pathId);
    // You can add additional logic here when a path is selected
  };

  const getModuleLink = (module: LearningPath['modules'][0]) => {
    switch (module.type) {
      case 'quiz':
        return `/quizzes/${module.id}`;
      case 'tool':
        return `/tools/${module.id}`;
      case 'lesson':
        return `/lessons/${module.id}`;
      default:
        return '#';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* User Progress Section */}
      {session && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Welcome back, {session.user.email}</h2>
          {/* Add user progress content here */}
        </div>
      )}

      {/* Progress Overview */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold">Total Points</h3>
              <p className="text-3xl font-bold">1,250</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold">Completed Modules</h3>
              <p className="text-3xl font-bold">3/9</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold">Achievements</h3>
              <p className="text-3xl font-bold">1/3</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold">Current Streak</h3>
              <p className="text-3xl font-bold">3 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Learning Paths</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {learningPaths.map((path) => (
            <motion.div
              key={path.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                selectedPath === path.id ? 'ring-2 ring-blue-500' : ''
              }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              onClick={() => handlePathSelect(path.id)}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{path.title}</h3>
                <p className="mt-2 text-gray-600">{path.description}</p>
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          Progress
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          {path.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                      <div
                        style={{ width: `${path.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {path.modules.map((module) => (
                    <Link
                      key={module.id}
                      href={getModuleLink(module)}
                      className={`block p-4 rounded-lg border ${
                        module.status === 'locked'
                          ? 'bg-gray-50 border-gray-200 cursor-not-allowed'
                          : 'border-blue-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{module.title}</h4>
                          <p className="text-sm text-gray-500">{module.points} points</p>
                        </div>
                        <div className="flex items-center">
                          {module.status === 'completed' && (
                            <span className="text-green-500">✓</span>
                          )}
                          {module.status === 'in-progress' && (
                            <span className="text-blue-500">⟳</span>
                          )}
                          {module.status === 'locked' && (
                            <span className="text-gray-400">🔒</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Achievements</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                className={`bg-white rounded-lg shadow-lg p-6 ${
                  achievement.unlocked ? 'opacity-100' : 'opacity-50'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{achievement.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 