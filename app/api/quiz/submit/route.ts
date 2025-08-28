import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { PrismaClient } from '@prisma/client';
import { checkAndUnlockAchievements } from '../../../../lib/achievements';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      quizType, 
      moduleId, 
      score, 
      totalQuestions, 
      correctAnswers, 
      timeSpent, 
      answers 
    } = body;

    // Validate required fields
    if (!quizType || score === undefined || !totalQuestions || correctAnswers === undefined) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Save quiz result to database
    const quizResult = await prisma.quizResult.create({
      data: {
        userId: session.user.id,
        quizType,
        moduleId: moduleId || null,
        score,
        totalQuestions,
        correctAnswers,
        timeSpent: timeSpent || null,
        answers: JSON.stringify(answers || []),
      },
    });

    // Update user's total points
    const pointsEarned = Math.round((correctAnswers / totalQuestions) * 100);
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        totalPoints: {
          increment: pointsEarned,
        },
        lastActive: new Date(),
      },
    });

    // Update user progress if moduleId is provided
    if (moduleId) {
      const progressStatus = score >= 70 ? 'completed' : 'in-progress';
      
      await prisma.userProgress.upsert({
        where: {
          userId_moduleId: {
            userId: session.user.id,
            moduleId: moduleId,
          },
        },
        update: {
          status: progressStatus,
          score,
          completedAt: progressStatus === 'completed' ? new Date() : null,
        },
        create: {
          userId: session.user.id,
          moduleId,
          status: progressStatus,
          score,
          completedAt: progressStatus === 'completed' ? new Date() : null,
        },
      });
    }

    // Check for new achievements after quiz completion
    const newAchievements = await checkAndUnlockAchievements(session.user.id);

    return NextResponse.json({
      success: true,
      result: {
        id: quizResult.id,
        score,
        pointsEarned,
        passed: score >= 70,
      },
      newAchievements: newAchievements.map((ua: { achievement: { id: string; name: string; description: string; icon: string; points: number }; unlockedAt: Date }) => ({
        id: ua.achievement.id,
        name: ua.achievement.name,
        description: ua.achievement.description,
        icon: ua.achievement.icon,
        points: ua.achievement.points,
        unlockedAt: ua.unlockedAt
      }))
    });

  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
