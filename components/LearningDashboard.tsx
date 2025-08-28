'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface UserProgress {
  user: {
    id: string;
    name: string | null;
    email: string;
    totalPoints: number;
    currentStreak: number;
    lastActive: Date | null;
  };
  recentQuizzes: Array<{
    id: string;
    quizType: string;
    moduleId: string;
    score: number;
    timestamp: Date;
  }>;
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    points: number;
    unlockedAt: Date;
  }>;
  moduleProgress: Array<{
    moduleId: string;
    averageScore: number;
    attemptsCount: number;
  }>;
  overallStats: {
    averageScore: number;
    totalQuizzes: number;
  };
}

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
        id: 'password',
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
        id: 'phishing',
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
        id: 'security',
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


export default function LearningDashboard() {
  const { data: session } = useSession();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user/progress');
        if (response.ok) {
          const data = await response.json();
          setUserProgress(data);
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [session]);

  // Calculate dynamic progress for learning paths
  const getModuleStatus = (moduleId: string, moduleType: string) => {
    if (!userProgress) return 'locked';
    
    if (moduleType === 'quiz') {
      const hasCompleted = userProgress.moduleProgress.some(
        mp => mp.moduleId === moduleId && mp.averageScore >= 70
      );
      if (hasCompleted) return 'completed';
      
      const hasAttempted = userProgress.moduleProgress.some(
        mp => mp.moduleId === moduleId
      );
      return hasAttempted ? 'in-progress' : 'locked';
    }
    
    // For lessons and tools, mark as in-progress if user is logged in
    return session ? 'in-progress' : 'locked';
  };

  const calculatePathProgress = (pathId: string) => {
    if (!userProgress) return 0;
    
    const pathModules = learningPaths.find(p => p.id === pathId)?.modules || [];
    if (pathModules.length === 0) return 0;
    
    const completedModules = pathModules.filter(module => {
      if (module.type === 'quiz') {
        return userProgress.moduleProgress.some(
          mp => mp.moduleId === module.id && mp.averageScore >= 70
        );
      }
      return false; // For now, only count quiz completions
    }).length;
    
    return Math.round((completedModules / pathModules.length) * 100);
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* User Progress Section */}
      {session && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Welcome back, {userProgress?.user?.name || session.user.email}
          </h2>
        </div>
      )}

      {/* Progress Overview */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold">Total Points</h3>
              <p className="text-3xl font-bold">{userProgress?.user?.totalPoints || 0}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold">Quizzes Completed</h3>
              <p className="text-3xl font-bold">{userProgress?.overallStats?.totalQuizzes || 0}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold">Achievements</h3>
              <p className="text-3xl font-bold">{userProgress?.achievements?.length || 0}</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold">Average Score</h3>
              <p className="text-3xl font-bold">{userProgress?.overallStats?.averageScore || 0}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Learning Paths</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {learningPaths.map((path) => {
            const dynamicProgress = calculatePathProgress(path.id);
            return (
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
                            {dynamicProgress}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div
                          style={{ width: `${dynamicProgress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    {path.modules.map((module) => {
                      const dynamicStatus = getModuleStatus(module.id, module.type);
                      return (
                        <Link
                          key={module.id}
                          href={getModuleLink(module)}
                          className={`block p-4 rounded-lg border ${
                            dynamicStatus === 'locked'
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
                              {dynamicStatus === 'completed' && (
                                <span className="text-green-500">✓</span>
                              )}
                              {dynamicStatus === 'in-progress' && (
                                <span className="text-blue-500">⟳</span>
                              )}
                              {dynamicStatus === 'locked' && (
                                <span className="text-gray-400">🔒</span>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {userProgress?.recentQuizzes && userProgress.recentQuizzes.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Recent Activity</h2>
          <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Quiz Results</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {userProgress.recentQuizzes.slice(0, 5).map((quiz) => (
                <div key={quiz.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {quiz.quizType.replace('-', ' ')} Quiz
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(quiz.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${
                      quiz.score >= 80 ? 'text-green-600' : 
                      quiz.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {quiz.score}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Achievements */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Achievements</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userProgress?.achievements && userProgress.achievements.length > 0 ? (
              userProgress.achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className="bg-white rounded-lg shadow-lg p-6 opacity-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center">
                    <span className="text-4xl mr-4">🏆</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-blue-600 mt-1">
                        {achievement.points} points • {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <span className="text-6xl">🎯</span>
                <h3 className="text-lg font-medium text-gray-900 mt-4">No achievements yet</h3>
                <p className="text-gray-600">Complete quizzes to unlock your first achievement!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}