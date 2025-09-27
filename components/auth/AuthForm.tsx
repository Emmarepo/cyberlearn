'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../ui/Button';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const registerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      
      console.log('=== CLIENT SIDE LOGIN ATTEMPT ===');
      console.log('Email:', data.email);
      console.log('Mode:', mode);
      
      // Both login and registration use the same signIn flow
      // The NextAuth.js configuration handles auto-registration
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        name: mode === 'register' ? data.name : undefined,
        redirect: false,
      });
      
      console.log('SignIn result:', result);
      console.log('SignIn result.ok:', result?.ok);
      console.log('SignIn result.error:', result?.error);
      console.log('SignIn result.status:', result?.status);

      if (result?.error) {
        console.log('Login error detected:', result.error);
        if (mode === 'login') {
          setError('Invalid email or password');
        } else {
          setError('Registration failed. Please try again.');
        }
      } else {
        console.log('No error detected, checking redirect...');
        // Success - redirect regardless of result.ok status
        // NextAuth sometimes doesn't set ok:true but authentication still works
        if (mode === 'register') {
          setSuccess('Account created successfully! Redirecting...');
        }
        
        console.log('Attempting redirect to /learn...');
        // Force redirect after short delay
        setTimeout(() => {
          window.location.href = '/learn';
        }, 100);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {mode === 'register' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Full Name <span className="text-gray-500">(optional)</span>
          </label>
          <div className="mt-2">
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register('name')}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            {...register('password')}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">{success}</h3>
            </div>
          </div>
        </div>
      )}

      <div>
        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
        >
          {mode === 'login' ? 'Sign in' : 'Sign up'}
        </Button>
      </div>
    </form>
  );
} 