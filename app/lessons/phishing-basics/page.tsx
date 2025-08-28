'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function PhishingBasicsLesson() {
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
            Understanding Phishing Attacks
          </h1>
          <p className="text-xl text-gray-600">
            Learn to identify and protect yourself from phishing attempts
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Phishing?</h2>
            <p className="text-gray-700 mb-6">
              Phishing is a cybercrime where attackers impersonate legitimate organizations to steal 
              sensitive information like passwords, credit card numbers, or personal data. These attacks 
              typically come through email, text messages, or fake websites.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎣 Common Phishing Techniques</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Email Phishing</h4>
                <p className="text-red-800 text-sm">
                  Fake emails from banks, social media, or services asking you to click links or provide information.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Spear Phishing</h4>
                <p className="text-orange-800 text-sm">
                  Targeted attacks using personal information to make the message seem more legitimate.
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Smishing (SMS)</h4>
                <p className="text-yellow-800 text-sm">
                  Phishing attacks delivered through text messages, often claiming urgent account issues.
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Vishing (Voice)</h4>
                <p className="text-purple-800 text-sm">
                  Phone calls from fake representatives asking for personal information or passwords.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">🚨 Red Flags to Watch For</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Urgent language:</strong> &quot;Act now!&quot; &quot;Your account will be closed!&quot;</li>
              <li><strong>Generic greetings:</strong> &quot;Dear Customer&quot; instead of your name</li>
              <li><strong>Suspicious links:</strong> URLs that don&apos;t match the claimed sender</li>
              <li><strong>Poor grammar/spelling:</strong> Professional companies proofread their communications</li>
              <li><strong>Unexpected attachments:</strong> Files you weren&apos;t expecting</li>
              <li><strong>Requests for sensitive info:</strong> Legitimate companies won&apos;t ask for passwords via email</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">🔍 How to Verify Suspicious Messages</h3>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <ol className="list-decimal pl-6 text-blue-700">
                <li><strong>Check the sender&apos;s email address</strong> - Look for misspellings or suspicious domains</li>
                <li><strong>Hover over links</strong> - See where they actually lead before clicking</li>
                <li><strong>Contact the company directly</strong> - Use official phone numbers or websites</li>
                <li><strong>Look for HTTPS</strong> - Secure websites start with &quot;https://&quot;</li>
                <li><strong>Trust your instincts</strong> - If something feels wrong, it probably is</li>
              </ol>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">✅ Protection Strategies</h3>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <ul className="list-disc pl-6 text-green-700">
                <li>Enable two-factor authentication on all important accounts</li>
                <li>Keep software and browsers updated with security patches</li>
                <li>Use spam filters and security software</li>
                <li>Never click links or download attachments from suspicious emails</li>
                <li>Regularly monitor your accounts for unauthorized activity</li>
                <li>Educate family and colleagues about phishing risks</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">📧 Example: Spotting a Phishing Email</h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <div className="border border-gray-300 bg-white p-4 rounded">
                <div className="text-sm text-gray-600 mb-2">From: security@payp4l.com</div>
                <div className="text-sm font-semibold mb-2">Subject: URGENT: Verify Your Account Now!</div>
                <div className="text-sm text-gray-800">
                  Dear Valued Customer,<br/><br/>
                  Your PayPal account has been temporarily suspended due to suspicious activity. 
                  Click here immediately to verify your account or it will be permanently closed within 24 hours.
                  <br/><br/>
                  <span className="text-blue-600 underline">Click Here to Verify Account</span>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <p className="font-semibold text-red-600 mb-2">🚨 Red Flags in This Email:</p>
                <ul className="list-disc pl-6 text-red-600">
                  <li>Misspelled domain: &quot;payp4l.com&quot; instead of &quot;paypal.com&quot;</li>
                  <li>Generic greeting: &quot;Dear Valued Customer&quot;</li>
                  <li>Urgent threatening language</li>
                  <li>Suspicious link (hover to see real destination)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Test Your Knowledge</h3>
            <p className="text-gray-700 mb-4">
              Ready to put your phishing detection skills to the test? Try our interactive phishing quiz 
              to see how well you can spot malicious emails.
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
            href="/quizzes/phishing"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Take Phishing Quiz
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
