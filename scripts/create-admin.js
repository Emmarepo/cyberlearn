const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  const email = process.argv[2];
  
  if (!email) {
    console.log('Usage: node scripts/create-admin.js <email>');
    console.log('Example: node scripts/create-admin.js admin@example.com');
    process.exit(1);
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log(`❌ User with email ${email} not found.`);
      console.log('Please register this user first, then run this script.');
      process.exit(1);
    }

    // Update user role to admin
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: 'admin' },
      select: { id: true, email: true, name: true, role: true }
    });

    console.log('✅ User promoted to admin successfully!');
    console.log('Admin user details:');
    console.log(`- ID: ${updatedUser.id}`);
    console.log(`- Email: ${updatedUser.email}`);
    console.log(`- Name: ${updatedUser.name || 'Not set'}`);
    console.log(`- Role: ${updatedUser.role}`);
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
