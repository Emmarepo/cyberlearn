import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const quizType = searchParams.get('quizType');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query conditions
    const whereCondition: { userId: string; quizType?: string } = {
      userId: session.user.id,
    };

    if (quizType) {
      whereCondition.quizType = quizType;
    }

    // Get quiz results with pagination
    const results = await prisma.quizResult.findMany({
      where: whereCondition,
      orderBy: {
        timestamp: 'desc',
      },
      take: limit,
      skip: offset,
      select: {
        id: true,
        quizType: true,
        moduleId: true,
        score: true,
        totalQuestions: true,
        correctAnswers: true,
        timeSpent: true,
        timestamp: true,
      },
    });

    // Get total count for pagination
    const totalCount = await prisma.quizResult.count({
      where: whereCondition,
    });

    // Calculate statistics
    const stats = await prisma.quizResult.aggregate({
      where: whereCondition,
      _avg: {
        score: true,
      },
      _max: {
        score: true,
      },
      _count: {
        id: true,
      },
    });

    return NextResponse.json({
      results,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount,
      },
      stats: {
        averageScore: Math.round(stats._avg.score || 0),
        bestScore: stats._max.score || 0,
        totalAttempts: stats._count.id || 0,
      },
    });

  } catch (error) {
    console.error('Quiz results error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
