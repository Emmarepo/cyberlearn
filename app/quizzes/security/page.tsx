import Navigation from '../../../components/Navigation';
import SecurityQuiz from '../../../components/quizzes/SecurityQuiz';

export default function SecurityQuizPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Security Fundamentals Quiz
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Test your knowledge of essential cybersecurity concepts. Learn about network security, password practices, and more.
          </p>
        </div>
        <div className="mt-12">
          <SecurityQuiz />
        </div>
        <div className="mt-12 mx-auto max-w-2xl">
          <div className="rounded-lg bg-blue-50 p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">
              Key Security Concepts
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-800">
              <li>Network security and firewalls</li>
              <li>Strong password practices</li>
              <li>Two-factor authentication</li>
              <li>Data encryption</li>
              <li>Secure browsing habits</li>
              <li>Regular software updates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 