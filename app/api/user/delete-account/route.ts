import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { authOptions } from '../../../../lib/auth';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { password, confirmation } = await request.json();

    if (!password || confirmation !== 'DELETE') {
      return NextResponse.json(
        { error: 'Password and confirmation required' },
        { status: 400 }
      );
    }

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, password: true, role: true }
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'User not found or no password set' },
        { status: 404 }
      );
    }

    // Prevent admin from deleting their own account
    if (user.role === 'admin') {
      return NextResponse.json(
        { error: 'Admin accounts cannot be self-deleted' },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Password is incorrect' },
        { status: 400 }
      );
    }

    // Delete user and all related data (cascading deletes handled by Prisma schema)
    await prisma.user.delete({
      where: { id: session.user.id }
    });

    return NextResponse.json({ message: 'Account deleted successfully' });

  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
