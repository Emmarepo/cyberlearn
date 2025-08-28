import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's progress across all modules
    const userProgress = await prisma.userProgress.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        module: {
          include: {
            path: true,
          },
        },
      },
    });

    const userId = session.user.id;
    
    // Get recent quiz results
    const recentQuizzes = await prisma.quizResult.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: 5,
      select: {
        id: true,
        quizType: true,
        moduleId: true,
        score: true,
        timestamp: true,
      },
    });

    // Get achievements
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: {
        achievement: true,
      },
      orderBy: { unlockedAt: 'desc' },
    });

    // Calculate learning progress by module
    const moduleProgress = await prisma.quizResult.groupBy({
      by: ['moduleId'],
      where: { userId: session.user.id },
      _avg: {
        score: true,
      },
      _count: {
        id: true,
      },
    });

    // Calculate overall stats
    const overallStats = await prisma.quizResult.aggregate({
      where: { userId: session.user.id },
      _avg: {
        score: true,
      },
      _count: {
        id: true,
      },
    });

    // Get user's total points and achievements
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        totalPoints: true,
        currentStreak: true,
        lastActive: true,
      },
    });

    return NextResponse.json({
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        totalPoints: user?.totalPoints || 0,
        currentStreak: user?.currentStreak || 0,
        lastActive: user?.lastActive,
      },
      recentQuizzes,
      achievements: userAchievements.map((ua: { achievement: { id: string; name: string; description: string; points: number }; unlockedAt: Date }) => ({
        ...ua.achievement,
        unlockedAt: ua.unlockedAt,
      })),
      moduleProgress: moduleProgress.map((mp: { moduleId: string | null; _avg: { score: number | null }; _count: { id: number } }) => ({
        moduleId: mp.moduleId || 'unknown',
        averageScore: Math.round(mp._avg.score || 0),
        attemptsCount: mp._count.id,
      })),
      overallStats: {
        averageScore: Math.round(overallStats._avg.score || 0),
        totalQuizzes: overallStats._count.id,
      },
      progress: {
        modules: userProgress,
        overall: userProgress.length > 0 ? Math.round((userProgress.filter((p: { status: string }) => p.status === 'completed').length / userProgress.length) * 100) : 0,
        completed: userProgress.filter((p: { status: string }) => p.status === 'completed').length,
        inProgress: userProgress.filter((p: { status: string }) => p.status === 'in-progress').length,
        total: userProgress.length,
      },
    });

  } catch (error) {
    console.error('User progress error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { moduleId, status, score } = body;

    if (!moduleId || !status) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Update or create user progress
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId,
        },
      },
      update: {
        status,
        score: score || null,
        completedAt: status === 'completed' ? new Date() : null,
      },
      create: {
        userId: session.user.id,
        moduleId,
        status,
        score: score || null,
        completedAt: status === 'completed' ? new Date() : null,
      },
      include: {
        module: {
          include: {
            path: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      progress,
    });

  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
