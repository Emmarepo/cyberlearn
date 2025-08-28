import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function isAdmin(): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return false;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    return user?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export async function requireAdmin() {
  const adminStatus = await isAdmin();
  
  if (!adminStatus) {
    throw new Error('Admin access required');
  }
  
  return adminStatus;
}

export async function getAdminUser() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { 
        id: true,
        name: true,
        email: true,
        role: true 
      }
    });

    return user?.role === 'admin' ? user : null;
  } catch (error) {
    console.error('Error getting admin user:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
