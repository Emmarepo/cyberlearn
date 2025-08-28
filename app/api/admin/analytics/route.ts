import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAdmin } from '../../../../lib/admin';

const prisma = new PrismaClient();

export async function GET() {
  try {
    await requireAdmin();

    // Get overall statistics
    const [
      totalUsers,
      totalQuizResults,
      totalAchievements,
      recentUsers,
      quizStats,
      topPerformers,
      activityData
    ] = await Promise.all([
      // Total users count
      prisma.user.count(),
      
      // Total quiz results
      prisma.quizResult.count(),
      
      // Total achievements unlocked
      prisma.userAchievement.count(),
      
      // Recent users (last 7 days)
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Quiz statistics by type
      prisma.quizResult.groupBy({
        by: ['quizType'],
        _count: { id: true },
        _avg: { score: true }
      }),
      
      // Top performers (exclude admin users)
      prisma.user.findMany({
        where: {
          role: 'user' // Only include regular users, not admins
        },
        select: {
          id: true,
          name: true,
          email: true,
          totalPoints: true,
          _count: {
            select: {
              quizResults: true,
              achievements: true
            }
          }
        },
        orderBy: { totalPoints: 'desc' },
        take: 5
      }),
      
      // Activity data for the last 30 days
      prisma.quizResult.findMany({
        where: {
          timestamp: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        },
        select: {
          timestamp: true,
          quizType: true,
          score: true
        },
        orderBy: { timestamp: 'desc' }
      })
    ]);

    // Process activity data for charts
    const dailyActivity = activityData.reduce((acc: Record<string, number>, result) => {
      const date = result.timestamp.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Calculate average scores
    const averageScores = quizStats.reduce((acc: Record<string, number>, stat) => {
      acc[stat.quizType] = Math.round(stat._avg.score || 0);
      return acc;
    }, {});

    return NextResponse.json({
      overview: {
        totalUsers,
        totalQuizResults,
        totalAchievements,
        recentUsers
      },
      quizStats: {
        byType: quizStats.map(stat => ({
          type: stat.quizType,
          count: stat._count.id,
          averageScore: Math.round(stat._avg.score || 0)
        })),
        averageScores
      },
      topPerformers,
      activity: {
        daily: dailyActivity,
        recent: activityData.slice(0, 20)
      }
    });

  } catch (error) {
    console.error('Admin analytics API error:', error);
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: error instanceof Error && error.message === 'Admin access required' ? 403 : 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
