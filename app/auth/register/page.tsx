import Link from 'next/link';
import Navigation from '../../../components/Navigation';
import AuthForm from '../../../components/auth/AuthForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <AuthForm mode="register" />
          </div>
        </div>
      </div>
    </div>
  );
} 