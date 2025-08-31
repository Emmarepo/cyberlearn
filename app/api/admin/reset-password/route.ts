import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, newPassword, adminKey } = await request.json();
    
    // Security check - require admin key for password reset
    if (adminKey !== process.env.ADMIN_RESET_KEY) {
      return NextResponse.json(
        { error: 'Invalid admin key' },
        { status: 403 }
      );
    }

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: 'Email and new password are required' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update or create admin user
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: 'admin',
        updatedAt: new Date()
      },
      create: {
        email,
        password: hashedPassword,
        role: 'admin',
        name: 'Admin User'
      }
    });

    return NextResponse.json({ 
      message: 'Admin password reset successfully',
      userId: user.id,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    console.error('Admin password reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
