'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function PasswordBasicsLesson() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Password Security Basics
          </h1>
          <p className="text-xl text-gray-600">
            Learn the fundamentals of creating and managing secure passwords
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Password Security Matters</h2>
            <p className="text-gray-700 mb-6">
              Passwords are your first line of defense against cyber attacks. Weak passwords are responsible for 
              over 80% of data breaches. Understanding how to create and manage strong passwords is essential 
              for protecting your digital identity.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">🔐 What Makes a Strong Password?</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Length:</strong> At least 12 characters (longer is better)</li>
              <li><strong>Complexity:</strong> Mix of uppercase, lowercase, numbers, and symbols</li>
              <li><strong>Unpredictability:</strong> Avoid common words, patterns, or personal information</li>
              <li><strong>Uniqueness:</strong> Different password for each account</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">❌ Common Password Mistakes</h3>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <ul className="list-disc pl-6 text-red-700">
                <li>Using personal information (birthdays, names, addresses)</li>
                <li>Simple patterns (123456, qwerty, password)</li>
                <li>Reusing passwords across multiple accounts</li>
                <li>Storing passwords in plain text files</li>
                <li>Sharing passwords via email or text</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">✅ Best Practices</h3>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <ul className="list-disc pl-6 text-green-700">
                <li>Use a password manager to generate and store unique passwords</li>
                <li>Enable two-factor authentication (2FA) wherever possible</li>
                <li>Create passphrases using random words (e.g., &quot;Coffee-Bicycle-Mountain-42!&quot;)</li>
                <li>Regularly update passwords for critical accounts</li>
                <li>Never share passwords or write them down in visible places</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">🛡️ Password Creation Methods</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Random Generation</h4>
                <p className="text-blue-800 text-sm">
                  Use password managers to create completely random passwords with maximum security.
                </p>
                <code className="block mt-2 text-xs bg-blue-100 p-2 rounded">
                  Example: K#9mP$vL2@nQ8wX!
                </code>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Passphrase Method</h4>
                <p className="text-purple-800 text-sm">
                  Combine random words with numbers and symbols for memorable yet secure passwords.
                </p>
                <code className="block mt-2 text-xs bg-purple-100 p-2 rounded">
                  Example: Thunder-Cake-97-Moon!
                </code>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">🔧 Tools and Resources</h3>
            <p className="text-gray-700 mb-4">
              Use our built-in password strength checker to test your passwords and learn what makes them strong or weak.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/tools/password-checker"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Try Password Checker
          </Link>
          {session && (
            <Link
              href="/learn"
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
            >
              Back to Learning Dashboard
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
