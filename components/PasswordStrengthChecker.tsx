'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';

const passwordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

interface StrengthIndicator {
  label: string;
  color: string;
  percentage: number;
}

const strengthIndicators: StrengthIndicator[] = [
  { label: 'Very Weak', color: 'bg-red-500', percentage: 20 },
  { label: 'Weak', color: 'bg-orange-500', percentage: 40 },
  { label: 'Medium', color: 'bg-yellow-500', percentage: 60 },
  { label: 'Strong', color: 'bg-green-500', percentage: 80 },
  { label: 'Very Strong', color: 'bg-emerald-500', percentage: 100 },
];

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!password) {
      setStrength(0);
      setErrors([]);
      return;
    }

    try {
      passwordSchema.parse({ password });
      setErrors([]);
      
      // Calculate strength based on criteria met
      const criteria = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
      ];
      
      const metCriteria = criteria.filter(Boolean).length;
      setStrength((metCriteria / criteria.length) * 100);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors.map(err => err.message));
      }
    }
  }, [password]);

  const getStrengthIndicator = () => {
    return strengthIndicators.find(
      indicator => strength <= indicator.percentage
    ) || strengthIndicators[strengthIndicators.length - 1];
  };

  const currentIndicator = getStrengthIndicator();

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Password Strength Checker</h2>
      
      <div className="mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
        />
      </div>

      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className={`h-full rounded-full transition-all duration-300 ${currentIndicator.color}`}
            style={{ width: `${currentIndicator.percentage}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Strength: {currentIndicator.label}
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-red-600 mb-2">Password Requirements:</h3>
          <ul className="list-disc list-inside text-sm text-red-500">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 