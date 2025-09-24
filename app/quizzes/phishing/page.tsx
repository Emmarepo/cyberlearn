import Navigation from '../../../components/Navigation';
import PhishingQuiz from '../../../components/quizzes/PhishingQuiz';

export default function PhishingQuizPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Phishing Email Quiz
          </h1>
          <p className="mt-4 text-lg leading-8 text-text-secondary">
            Test your ability to identify phishing emails. Learn to spot common tactics used by cybercriminals to trick users.
          </p>
        </div>
        <div className="mt-12">
          <PhishingQuiz />
        </div>
        <div className="mt-12 mx-auto max-w-2xl">
          <div className="rounded-lg bg-primary-50 p-6">
            <h2 className="text-lg font-semibold text-primary-900 mb-4">
              Phishing Red Flags
            </h2>
            <ul className="list-disc list-inside space-y-2 text-primary-800">
              <li>Urgent or threatening language</li>
              <li>Generic greetings like &quot;Dear Customer&quot;</li>
              <li>Suspicious email addresses or domains</li>
              <li>Requests for sensitive information</li>
              <li>Poor grammar and spelling</li>
              <li>Unexpected attachments or links</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}