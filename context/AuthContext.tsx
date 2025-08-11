'use client';

// This file is deprecated - NextAuth.js is now used for authentication
// Use useSession from next-auth/react instead of this context

export const useAuth = () => {
  throw new Error('useAuth is deprecated. Use useSession from next-auth/react instead.');
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  throw new Error('AuthProvider is deprecated. Use SessionProvider from next-auth/react instead.');
};