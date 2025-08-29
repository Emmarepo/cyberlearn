import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('=== DATABASE TEST ===');
    
    // Test database connection
    const user = await prisma.user.findUnique({
      where: { email: 'admin@cybersec.com' }
    });
    
    console.log('User found:', !!user);
    console.log('User email:', user?.email);
    console.log('User role:', user?.role);
    console.log('Has password:', !!user?.password);
    
    if (user?.password) {
      // Test bcrypt comparison
      const isValid = await bcrypt.compare('password', user.password);
      console.log('Password valid:', isValid);
      
      return NextResponse.json({
        success: true,
        userFound: !!user,
        email: user?.email,
        role: user?.role,
        hasPassword: !!user?.password,
        passwordValid: isValid
      });
    }
    
    return NextResponse.json({
      success: true,
      userFound: !!user,
      email: user?.email,
      role: user?.role,
      hasPassword: !!user?.password,
      passwordValid: false
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
