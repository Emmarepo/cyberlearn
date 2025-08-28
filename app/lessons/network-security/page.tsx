'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function NetworkSecurityLesson() {
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
            Network Security Fundamentals
          </h1>
          <p className="text-xl text-gray-600">
            Understand how to protect networks and data from cyber threats
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Network Security?</h2>
            <p className="text-gray-700 mb-6">
              Network security involves protecting computer networks and their data from unauthorized access, 
              misuse, or theft. It encompasses both hardware and software technologies that work together to 
              create a secure computing environment.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">🛡️ Core Network Security Components</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Firewalls</h4>
                <p className="text-blue-800 text-sm">
                  Act as barriers between trusted internal networks and untrusted external networks, 
                  filtering traffic based on security rules.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Encryption</h4>
                <p className="text-green-800 text-sm">
                  Converts data into coded format to prevent unauthorized access during transmission 
                  or storage.
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">VPNs</h4>
                <p className="text-purple-800 text-sm">
                  Virtual Private Networks create secure connections over public networks, 
                  protecting data in transit.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Access Control</h4>
                <p className="text-orange-800 text-sm">
                  Systems that verify user identity and determine what resources they can access 
                  within the network.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">⚠️ Common Network Threats</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Malware:</strong> Viruses, worms, trojans, and ransomware that can damage or steal data</li>
              <li><strong>DDoS Attacks:</strong> Overwhelming networks with traffic to cause service disruption</li>
              <li><strong>Man-in-the-Middle:</strong> Intercepting communications between two parties</li>
              <li><strong>SQL Injection:</strong> Exploiting database vulnerabilities to access sensitive data</li>
              <li><strong>Zero-Day Exploits:</strong> Attacks targeting unknown software vulnerabilities</li>
              <li><strong>Insider Threats:</strong> Security risks from people within the organization</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">🔐 Network Security Best Practices</h3>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <ul className="list-disc pl-6 text-green-700">
                <li><strong>Regular Updates:</strong> Keep all systems and software patched and current</li>
                <li><strong>Strong Authentication:</strong> Use multi-factor authentication for all access points</li>
                <li><strong>Network Segmentation:</strong> Divide networks into smaller, isolated segments</li>
                <li><strong>Monitoring:</strong> Continuously monitor network traffic for suspicious activity</li>
                <li><strong>Backup Systems:</strong> Maintain secure, regular backups of critical data</li>
                <li><strong>Employee Training:</strong> Educate staff about security policies and threats</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">🏠 Home Network Security</h3>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Essential Steps for Home Users:</h4>
              <ol className="list-decimal pl-6 text-blue-700">
                <li>Change default router passwords and use WPA3 encryption</li>
                <li>Enable automatic security updates on all devices</li>
                <li>Use a reputable antivirus solution</li>
                <li>Set up a guest network for visitors</li>
                <li>Regularly review connected devices</li>
                <li>Disable unnecessary services and ports</li>
              </ol>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">🏢 Enterprise Network Security</h3>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
              <h4 className="font-semibold text-purple-900 mb-2">Advanced Security Measures:</h4>
              <ul className="list-disc pl-6 text-purple-700">
                <li><strong>SIEM Systems:</strong> Security Information and Event Management for threat detection</li>
                <li><strong>Network Access Control (NAC):</strong> Automated device authentication and policy enforcement</li>
                <li><strong>Intrusion Detection/Prevention:</strong> Real-time monitoring and response systems</li>
                <li><strong>Data Loss Prevention (DLP):</strong> Protecting sensitive data from unauthorized access</li>
                <li><strong>Security Audits:</strong> Regular assessments of security posture and vulnerabilities</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Security Frameworks</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-gray-900 mb-2">NIST Framework</h4>
                <p className="text-gray-700 text-sm">Identify, Protect, Detect, Respond, Recover</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-gray-900 mb-2">ISO 27001</h4>
                <p className="text-gray-700 text-sm">International standard for information security management</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Zero Trust</h4>
                <p className="text-gray-700 text-sm">&quot;Never trust, always verify&quot; security model</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">🔍 Incident Response</h3>
            <p className="text-gray-700 mb-4">
              When a security incident occurs, having a well-defined response plan is crucial:
            </p>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
              <ol className="list-decimal pl-6 text-red-700">
                <li><strong>Preparation:</strong> Develop and test incident response procedures</li>
                <li><strong>Detection:</strong> Identify and analyze potential security incidents</li>
                <li><strong>Containment:</strong> Limit the scope and impact of the incident</li>
                <li><strong>Eradication:</strong> Remove the threat from the environment</li>
                <li><strong>Recovery:</strong> Restore systems and services to normal operation</li>
                <li><strong>Lessons Learned:</strong> Document and improve based on the incident</li>
              </ol>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Test Your Knowledge</h3>
            <p className="text-gray-700 mb-4">
              Ready to test your understanding of network security concepts? Take our comprehensive 
              security quiz to evaluate your knowledge.
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
            href="/quizzes/security"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Take Security Quiz
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
