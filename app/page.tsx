'use client';

import Link from 'next/link';
import Navigation from '../components/Navigation';
import Button from '../components/ui/Button';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const features = [
  {
    title: "Interactive Learning",
    description: "Engage with real-world cybersecurity scenarios through our interactive modules and simulations.",
    icon: "🎮",
    color: "bg-blue-500",
    link: "/learn"
  },
  {
    title: "Expert Knowledge",
    description: "Learn from industry experts with up-to-date content on the latest security threats and defenses.",
    icon: "🎓",
    color: "bg-purple-500",
    link: "/learn"
  },
  {
    title: "Practical Tools",
    description: "Test your knowledge with our advanced security tools and real-time feedback systems.",
    icon: "🛠️",
    color: "bg-green-500",
    link: "/tools/password-checker"
  }
];

const learningModules = [
  {
    title: "Password Security",
    description: "Learn about creating and managing strong passwords",
    icon: "🔐",
    link: "/tools/password-checker",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Phishing Awareness",
    description: "Master the art of identifying phishing attempts",
    icon: "🎣",
    link: "/quizzes/phishing",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Security Fundamentals",
    description: "Build a strong foundation in cybersecurity",
    icon: "🛡️",
    link: "/quizzes/security",
    color: "from-green-500 to-green-600"
  }
];


export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-slate-200 to-blue-100 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <motion.div 
            className="mx-auto max-w-3xl lg:mx-0 lg:max-w-2xl lg:flex-shrink-0 lg:pt-8"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >

            <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl lg:text-6xl">
              Advanced Cybersecurity
              <span className="block text-blue-600">Education Platform</span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-slate-600 max-w-2xl">
              Develop critical cybersecurity expertise through comprehensive, industry-aligned training modules. 
              Build practical skills with hands-on simulations, expert-designed curricula, and real-world threat scenarios.
            </p>
            
            {/* Key Benefits */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center text-slate-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Industry-Certified Content
              </div>
              <div className="flex items-center text-slate-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Hands-On Simulations
              </div>
              <div className="flex items-center text-slate-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Progress Tracking
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-start gap-4">
              {!session ? (
                <>
                  <Link href="/auth/register">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg">
                      Begin Training
                    </Button>
                  </Link>
                  <Link href="/learn" className="inline-flex items-center text-lg font-semibold text-slate-700 hover:text-blue-600 transition-colors group">
                    View Curriculum
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/learn">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg">
                      Continue Training
                    </Button>
                  </Link>
                  <Link href="/tools/password-checker" className="inline-flex items-center text-lg font-semibold text-slate-700 hover:text-blue-600 transition-colors group">
                    Security Tools
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Learning Modules Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Start Learning</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Choose Your Learning Path
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore our comprehensive learning modules designed to build your cybersecurity knowledge step by step.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {learningModules.map((module) => (
                <motion.div
                  key={module.title}
                  className="relative group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={module.link}>
                    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${module.color} p-8 text-white`}>
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                      <div className="relative">
                        <span className="text-4xl mb-4 block">{module.icon}</span>
                        <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                        <p className="text-white/80">{module.description}</p>
                      </div>
                    </div>
              </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Learn Faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to master cybersecurity
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform combines cutting-edge technology with expert knowledge to provide you with the most comprehensive cybersecurity learning experience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <motion.div 
                  key={feature.title}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.color} text-white`}>
                      {feature.icon}
                    </span>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <Link href={feature.link} className="text-sm font-semibold leading-6 text-blue-600">
                        Learn more <span aria-hidden="true">→</span>
                      </Link>
                    </p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to start your cybersecurity journey?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
              Join our community of learners and start mastering cybersecurity today. Get access to all our premium features and expert guidance.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href={session ? "/learn" : "/auth/register"}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  {session ? "Continue Learning" : "Get Started"}
                </Button>
              </Link>
              <Link href="/learn" className="text-sm font-semibold leading-6 text-white">
                Explore Learning Paths <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}