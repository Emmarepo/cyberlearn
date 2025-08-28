import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Achievement unlock conditions with proper typing
interface AchievementCondition {
  type: 'quiz_count' | 'perfect_score' | 'average_score' | 'quiz_perfect';
  value: number;
  quizType?: string;
}

interface AchievementData {
  name: string;
  description: string;
  icon: string;
  points: number;
  category: string;
  condition: AchievementCondition;
}

export const ACHIEVEMENT_CONDITIONS: Record<string, AchievementData> = {
  'first-quiz': {
    name: 'First Steps',
    description: 'Complete your first quiz',
    icon: '🎯',
    points: 50,
    category: 'milestone',
    condition: { type: 'quiz_count', value: 1 }
  },
  'perfect-score': {
    name: 'Perfect Score',
    description: 'Score 100% on any quiz',
    icon: '💯',
    points: 100,
    category: 'performance',
    condition: { type: 'perfect_score', value: 100 }
  },
  'quiz-master': {
    name: 'Quiz Master',
    description: 'Complete 5 quizzes',
    icon: '🏆',
    points: 200,
    category: 'milestone',
    condition: { type: 'quiz_count', value: 5 }
  },
  'high-achiever': {
    name: 'High Achiever',
    description: 'Maintain an average score above 80%',
    icon: '⭐',
    points: 150,
    category: 'performance',
    condition: { type: 'average_score', value: 80 }
  },
  'phishing-expert': {
    name: 'Phishing Expert',
    description: 'Score 100% on a phishing quiz',
    icon: '🎣',
    points: 125,
    category: 'expertise',
    condition: { type: 'quiz_perfect', quizType: 'phishing', value: 100 }
  },
  'security-specialist': {
    name: 'Security Specialist',
    description: 'Score 100% on a security quiz',
    icon: '🔐',
    points: 125,
    category: 'expertise',
    condition: { type: 'quiz_perfect', quizType: 'security', value: 100 }
  }
};

export async function checkAndUnlockAchievements(userId: string) {
  const unlockedAchievements = [];

  // Get user's current achievements
  const existingAchievements = await prisma.userAchievement.findMany({
    where: { userId },
    include: { achievement: true }
  });

  const existingAchievementNames = existingAchievements.map(ua => ua.achievement.name);

  // Get user's quiz statistics
  const quizResults = await prisma.quizResult.findMany({
    where: { userId },
    orderBy: { timestamp: 'desc' }
  });

  const totalQuizzes = quizResults.length;
  const averageScore = totalQuizzes > 0 
    ? quizResults.reduce((sum, quiz) => sum + quiz.score, 0) / totalQuizzes 
    : 0;

  // Check each achievement condition
  for (const [, achievementData] of Object.entries(ACHIEVEMENT_CONDITIONS)) {
    if (existingAchievementNames.includes(achievementData.name)) {
      continue; // Already unlocked
    }

    let shouldUnlock = false;

    switch (achievementData.condition.type) {
      case 'quiz_count':
        shouldUnlock = totalQuizzes >= achievementData.condition.value;
        break;
      
      case 'perfect_score':
        shouldUnlock = quizResults.some(quiz => quiz.score >= achievementData.condition.value);
        break;
      
      case 'average_score':
        shouldUnlock = averageScore >= achievementData.condition.value && totalQuizzes >= 3;
        break;
      
      case 'quiz_perfect':
        if (achievementData.condition.quizType) {
          shouldUnlock = quizResults.some(quiz => 
            quiz.quizType === achievementData.condition.quizType && 
            quiz.score >= achievementData.condition.value
          );
        }
        break;
    }

    if (shouldUnlock) {
      // Create or find achievement
      let achievement = await prisma.achievement.findUnique({
        where: { name: achievementData.name }
      });

      if (!achievement) {
        achievement = await prisma.achievement.create({
          data: {
            name: achievementData.name,
            description: achievementData.description,
            icon: achievementData.icon,
            points: achievementData.points,
            category: achievementData.category,
            condition: JSON.stringify(achievementData.condition)
          }
        });
      }

      // Unlock achievement for user
      const userAchievement = await prisma.userAchievement.create({
        data: {
          userId,
          achievementId: achievement.id
        },
        include: {
          achievement: true
        }
      });

      // Update user's total points
      await prisma.user.update({
        where: { id: userId },
        data: {
          totalPoints: {
            increment: achievement.points
          }
        }
      });

      unlockedAchievements.push(userAchievement);
    }
  }

  return unlockedAchievements;
}
