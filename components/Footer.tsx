import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">About CyberSecure</h3>
            <p className="text-sm">
              Empowering individuals with essential cybersecurity knowledge through interactive learning and practical tools.
            </p>
          </div>

          {/* Learning */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Learning</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/learn" className="text-sm hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/quizzes" className="text-sm hover:text-white transition-colors">
                  Practice Quizzes
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-sm hover:text-white transition-colors">
                  Security Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Popular Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/password-checker" className="text-sm hover:text-white transition-colors">
                  Password Checker
                </Link>
              </li>
              <li>
                <Link href="/quizzes/phishing" className="text-sm hover:text-white transition-colors">
                  Phishing Quiz
                </Link>
              </li>
              <li>
                <Link href="/quizzes/security" className="text-sm hover:text-white transition-colors">
                  Security Quiz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} CyberSecure Learning Platform. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">
                Built for cybersecurity education
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 