import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' }
      },
      async authorize(credentials) {
        console.log('=== AUTH FUNCTION CALLED ===')
        console.log('Credentials received:', { email: credentials?.email, hasPassword: !!credentials?.password })
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials, returning null')
          return null
        }

        try {
          // Check if user exists
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          console.log('Auth debug - User found:', !!user)
          console.log('Auth debug - Has password:', !!user?.password)
          console.log('Auth debug - Email:', credentials.email)

          if (user && user.password) {
            // Verify password
            const isValid = await bcrypt.compare(credentials.password, user.password)
            console.log('Auth debug - Password valid:', isValid)
            
            if (isValid) {
              console.log('Auth debug - Login successful for:', user.email)
              return {
                id: user.id,
                email: user.email,
                name: user.name || user.email.split('@')[0],
                image: user.image,
              }
            }
            // Password doesn't match - return null (failed login)
            console.log('Auth debug - Password mismatch for:', user.email)
            return null
          }

          // If user doesn't exist, create a new one (for demo purposes)
          // In production, you'd handle registration separately
          if (!user) {
            const hashedPassword = await bcrypt.hash(credentials.password, 12)
            const userName = credentials.name && credentials.name.trim() !== '' 
              ? credentials.name.trim()
              : credentials.email.split('@')[0]
            
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                password: hashedPassword,
                name: userName,
              }
            })

            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name || newUser.email.split('@')[0],
              image: newUser.image,
            }
          }
        } catch (error) {
          console.error('Auth error:', error)
        }

        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        // Fetch user role from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true }
        })
        token.role = dbUser?.role || 'user'
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
}
