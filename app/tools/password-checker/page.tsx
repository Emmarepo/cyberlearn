import Navigation from '../../../components/Navigation';
import PasswordStrengthChecker from '../../../components/PasswordStrengthChecker';

export default function PasswordCheckerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Password Strength Checker
          </h1>
          <p className="mt-4 text-lg leading-8 text-text-secondary">
            Test your password strength and learn how to create more secure passwords.
          </p>
        </div>
        <div className="mt-12 flex justify-center">
          <PasswordStrengthChecker />
        </div>
        <div className="mt-12 mx-auto max-w-2xl">
          <div className="rounded-lg bg-primary-50 p-6">
            <h2 className="text-lg font-semibold text-primary-900 mb-4">
              Password Security Tips
            </h2>
            <ul className="list-disc list-inside space-y-2 text-primary-800">
              <li>Use at least 8 characters</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Add numbers and special characters</li>
              <li>Avoid common words and personal information</li>
              <li>Use unique passwords for different accounts</li>
              <li>Consider using a password manager</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 