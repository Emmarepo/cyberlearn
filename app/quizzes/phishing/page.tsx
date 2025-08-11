import Navigation from '../../../components/Navigation';
import PhishingQuiz from '../../../components/quizzes/PhishingQuiz';

export default function PhishingQuizPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Phishing Email Quiz
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Test your ability to identify phishing emails. Learn to spot common tactics used by cybercriminals to trick users.
          </p>
        </div>
        <div className="mt-12">
          <PhishingQuiz />
        </div>
        <div className="mt-12 mx-auto max-w-2xl">
          <div className="rounded-lg bg-blue-50 p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">
              Tips for Identifying Phishing Emails
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-800">
              <li>Check the sender&apos;s email address carefully</li>
              <li>Look for urgent or threatening language</li>
              <li>Be wary of requests for personal information</li>
              <li>Check for poor grammar and spelling</li>
              <li>Hover over links before clicking</li>
              <li>Verify unexpected attachments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 