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
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Check if user exists
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (user && user.password) {
            // Verify password
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (isValid) {
              return {
                id: user.id,
                email: user.email,
                name: user.name || user.email.split('@')[0],
                image: user.image,
              }
            }
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
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}
