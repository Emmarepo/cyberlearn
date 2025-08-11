'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
}

const questions: Question[] = [
  // Network Security (10 questions)
  {
    id: 1,
    category: "Network Security",
    question: "What is a firewall and what is its primary purpose?",
    options: [
      "A physical barrier that prevents unauthorized access to a building",
      "A software or hardware system that monitors and controls incoming and outgoing network traffic",
      "A tool that only prevents viruses from entering a network",
      "A system that only blocks spam emails"
    ],
    correctAnswer: 1,
    explanation: "A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization's previously established security policies. It acts as a barrier between a trusted network and an untrusted network, such as the internet.",
    difficulty: "beginner",
    points: 10
  },
  {
    id: 2,
    category: "Network Security",
    question: "What is the difference between a VPN and a proxy server?",
    options: [
      "They are exactly the same thing",
      "A VPN encrypts all traffic while a proxy only forwards requests",
      "A proxy is more secure than a VPN",
      "A VPN only works for web browsing"
    ],
    correctAnswer: 1,
    explanation: "A VPN (Virtual Private Network) creates an encrypted tunnel for all your internet traffic, while a proxy server simply forwards your requests. VPNs provide better security and privacy as they encrypt all traffic, not just web requests.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 3,
    category: "Network Security",
    question: "What is a DDoS attack and how does it work?",
    options: [
      "A type of virus that spreads through email",
      "An attack that floods a server with traffic from multiple sources to make it unavailable",
      "A way to steal passwords from a network",
      "A method to encrypt network traffic"
    ],
    correctAnswer: 1,
    explanation: "A Distributed Denial of Service (DDoS) attack attempts to make an online service unavailable by overwhelming it with traffic from multiple sources. This is different from a regular DoS attack as it uses multiple compromised systems to target a single system.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 4,
    category: "Network Security",
    question: "What is the purpose of a DMZ (Demilitarized Zone) in network security?",
    options: [
      "A physical security zone in a data center",
      "A network segment that contains and exposes external-facing services to an untrusted network",
      "A type of firewall configuration",
      "A method to encrypt network traffic"
    ],
    correctAnswer: 1,
    explanation: "A DMZ is a physical or logical subnetwork that contains and exposes an organization's external-facing services to an untrusted network, usually the internet. It adds an extra layer of security to an organization's local area network (LAN).",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 5,
    category: "Network Security",
    question: "What is the difference between TCP and UDP protocols?",
    options: [
      "TCP is faster than UDP",
      "TCP provides reliable, ordered delivery while UDP is faster but less reliable",
      "UDP is more secure than TCP",
      "TCP is only used for web browsing"
    ],
    correctAnswer: 1,
    explanation: "TCP (Transmission Control Protocol) provides reliable, ordered delivery of data with error checking, while UDP (User Datagram Protocol) is faster but doesn't guarantee delivery or order of packets. TCP is used when reliability is important, while UDP is used when speed is more important.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 6,
    category: "Network Security",
    question: "What is a man-in-the-middle (MITM) attack?",
    options: [
      "A type of virus that spreads through networks",
      "An attack where the attacker secretly relays and possibly alters communications between two parties",
      "A method to steal passwords from a network",
      "A way to encrypt network traffic"
    ],
    correctAnswer: 1,
    explanation: "A man-in-the-middle attack occurs when an attacker secretly intercepts and possibly alters communications between two parties who believe they are directly communicating with each other. This can be used to steal sensitive information or inject malicious content.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 7,
    category: "Network Security",
    question: "What is the purpose of a network intrusion detection system (NIDS)?",
    options: [
      "To prevent all network attacks",
      "To monitor network traffic for suspicious activity and alert administrators",
      "To encrypt network traffic",
      "To block all incoming connections"
    ],
    correctAnswer: 1,
    explanation: "A Network Intrusion Detection System (NIDS) monitors network traffic for suspicious activity and issues alerts when such activity is discovered. It's a passive monitoring system that doesn't actively block traffic but helps identify potential security threats.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 8,
    category: "Network Security",
    question: "What is the difference between a hub and a switch in network security?",
    options: [
      "A hub is more secure than a switch",
      "A switch provides better security by creating separate collision domains",
      "A hub is faster than a switch",
      "They are exactly the same thing"
    ],
    correctAnswer: 1,
    explanation: "A switch provides better security than a hub because it creates separate collision domains for each port, preventing broadcast storms and making it harder for attackers to intercept traffic. A hub broadcasts all traffic to all ports, making it less secure.",
    difficulty: "beginner",
    points: 10
  },
  {
    id: 9,
    category: "Network Security",
    question: "What is the purpose of network segmentation?",
    options: [
      "To make the network faster",
      "To improve security by dividing the network into smaller, more manageable segments",
      "To reduce the number of devices on the network",
      "To increase network bandwidth"
    ],
    correctAnswer: 1,
    explanation: "Network segmentation improves security by dividing the network into smaller, more manageable segments. This limits the potential impact of a security breach and makes it easier to control access between different parts of the network.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 10,
    category: "Network Security",
    question: "What is the difference between a stateful and stateless firewall?",
    options: [
      "A stateful firewall is less secure than a stateless firewall",
      "A stateful firewall tracks the state of network connections while a stateless firewall doesn't",
      "A stateless firewall is faster than a stateful firewall",
      "They are exactly the same thing"
    ],
    correctAnswer: 1,
    explanation: "A stateful firewall tracks the state of network connections and makes decisions based on the context of the traffic, while a stateless firewall makes decisions based on static rules without considering the connection state. Stateful firewalls provide better security but require more resources.",
    difficulty: "advanced",
    points: 20
  },

  // Password Security (10 questions)
  {
    id: 11,
    category: "Password Security",
    question: "Which of the following is the strongest password?",
    options: [
      "password123",
      "P@ssw0rd!",
      "CorrectHorseBatteryStaple",
      "12345678"
    ],
    correctAnswer: 2,
    explanation: "The strongest password is 'CorrectHorseBatteryStaple' because it's a passphrase that's both long and memorable. Length is more important than complexity when it comes to password strength.",
    difficulty: "beginner",
    points: 10
  },
  {
    id: 12,
    category: "Password Security",
    question: "What is a password manager and why is it recommended?",
    options: [
      "A tool that remembers your passwords so you don't have to",
      "A secure vault that stores and generates strong, unique passwords for each service",
      "A way to share passwords with friends",
      "A tool that makes all your passwords the same"
    ],
    correctAnswer: 1,
    explanation: "A password manager is a secure vault that stores and generates strong, unique passwords for each service. It helps you maintain strong security practices by allowing you to use unique, complex passwords without having to remember them all.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 13,
    category: "Password Security",
    question: "What is two-factor authentication (2FA)?",
    options: [
      "A way to use two different passwords",
      "A security process that requires two different forms of identification",
      "A method to share passwords securely",
      "A way to reset your password"
    ],
    correctAnswer: 1,
    explanation: "Two-factor authentication (2FA) is a security process that requires two different forms of identification. This typically involves something you know (password) and something you have (phone or security key), making it much harder for attackers to gain unauthorized access.",
    difficulty: "beginner",
    points: 10
  },
  {
    id: 14,
    category: "Password Security",
    question: "What is a password hash and why is it important?",
    options: [
      "A way to make passwords longer",
      "A one-way function that converts passwords into a fixed-length string of characters",
      "A method to share passwords securely",
      "A way to reset your password"
    ],
    correctAnswer: 1,
    explanation: "A password hash is a one-way function that converts passwords into a fixed-length string of characters. It's important because it allows systems to verify passwords without storing the actual password, making it much harder for attackers to steal passwords even if they gain access to the database.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 15,
    category: "Password Security",
    question: "What is a password salt and why is it used?",
    options: [
      "A way to make passwords taste better",
      "A random string added to passwords before hashing to prevent rainbow table attacks",
      "A method to share passwords securely",
      "A way to reset your password"
    ],
    correctAnswer: 1,
    explanation: "A password salt is a random string added to passwords before hashing. It's used to prevent rainbow table attacks by ensuring that even identical passwords will have different hashes, making it much harder for attackers to crack passwords.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 16,
    category: "Password Security",
    question: "What is a password policy and what should it include?",
    options: [
      "A list of allowed passwords",
      "A set of rules that define password requirements and security measures",
      "A method to share passwords securely",
      "A way to reset your password"
    ],
    correctAnswer: 1,
    explanation: "A password policy is a set of rules that define password requirements and security measures. It should include minimum length, complexity requirements, expiration periods, and restrictions on password reuse to ensure strong password security.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 17,
    category: "Password Security",
    question: "What is a password breach and how should you respond?",
    options: [
      "A way to reset your password",
      "An incident where passwords are stolen or exposed, requiring immediate action to secure accounts",
      "A method to share passwords securely",
      "A way to make passwords stronger"
    ],
    correctAnswer: 1,
    explanation: "A password breach is an incident where passwords are stolen or exposed. When this happens, you should immediately change the affected password and any similar passwords, enable 2FA if available, and monitor your accounts for suspicious activity.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 18,
    category: "Password Security",
    question: "What is a password recovery process and why is it important?",
    options: [
      "A way to share passwords securely",
      "A secure method to reset forgotten passwords while maintaining account security",
      "A way to make passwords stronger",
      "A method to store passwords"
    ],
    correctAnswer: 1,
    explanation: "A password recovery process is a secure method to reset forgotten passwords while maintaining account security. It's important because it provides a way to regain access to accounts without compromising security, typically through email verification or security questions.",
    difficulty: "beginner",
    points: 10
  },
  {
    id: 19,
    category: "Password Security",
    question: "What is a password audit and why is it conducted?",
    options: [
      "A way to share passwords securely",
      "A review of password practices and security measures to identify weaknesses",
      "A way to make passwords stronger",
      "A method to store passwords"
    ],
    correctAnswer: 1,
    explanation: "A password audit is a review of password practices and security measures to identify weaknesses. It's conducted to ensure that password policies are being followed and to identify potential security risks before they can be exploited.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 20,
    category: "Password Security",
    question: "What is a password manager's master password and why is it important?",
    options: [
      "A way to share passwords securely",
      "The single password that protects access to all other passwords in the manager",
      "A way to make passwords stronger",
      "A method to store passwords"
    ],
    correctAnswer: 1,
    explanation: "A master password is the single password that protects access to all other passwords in the manager. It's important because it's the only password you need to remember, and it must be strong and unique to protect all your other passwords.",
    difficulty: "intermediate",
    points: 15
  },

  // Malware & Threats (10 questions)
  {
    id: 21,
    category: "Malware & Threats",
    question: "What is the difference between a virus and a worm?",
    options: [
      "There is no difference",
      "A virus requires user action to spread, while a worm spreads automatically",
      "A worm is more dangerous than a virus",
      "A virus only affects Windows computers"
    ],
    correctAnswer: 1,
    explanation: "A virus requires user action to spread (like opening an infected file), while a worm can spread automatically through networks without user interaction. Both are types of malware but have different propagation methods.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 22,
    category: "Malware & Threats",
    question: "What is a zero-day exploit?",
    options: [
      "A type of malware that only works at midnight",
      "A security vulnerability that is exploited before the vendor can release a patch",
      "A hacking technique that only works on the first day of the month",
      "A type of password attack"
    ],
    correctAnswer: 1,
    explanation: "A zero-day exploit is a security vulnerability that is exploited by attackers before the software vendor is aware of it or can release a patch. These are particularly dangerous because there's no immediate fix available.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 23,
    category: "Malware & Threats",
    question: "What is ransomware and how does it work?",
    options: [
      "A type of virus that spreads through email",
      "Malware that encrypts files and demands payment for decryption",
      "A way to protect against viruses",
      "A type of firewall"
    ],
    correctAnswer: 1,
    explanation: "Ransomware is malware that encrypts files on a victim's system and demands payment (ransom) in exchange for the decryption key. It's particularly dangerous because it can affect both personal and business data, and there's no guarantee that paying the ransom will result in data recovery.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 24,
    category: "Malware & Threats",
    question: "What is a rootkit and why is it dangerous?",
    options: [
      "A type of virus that spreads through email",
      "Malware that provides privileged access while hiding its presence",
      "A way to protect against viruses",
      "A type of firewall"
    ],
    correctAnswer: 1,
    explanation: "A rootkit is malware that provides privileged access to a computer while hiding its presence. It's dangerous because it can be difficult to detect and remove, and it often provides attackers with persistent access to the system.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 25,
    category: "Malware & Threats",
    question: "What is a trojan horse in cybersecurity?",
    options: [
      "A type of virus that spreads through email",
      "Malware that disguises itself as legitimate software",
      "A way to protect against viruses",
      "A type of firewall"
    ],
    correctAnswer: 1,
    explanation: "A trojan horse is malware that disguises itself as legitimate software to trick users into installing it. Unlike viruses and worms, trojans don't replicate themselves but can be used to steal data, install other malware, or provide remote access to attackers.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 26,
    category: "Malware & Threats",
    question: "What is a botnet and how is it used?",
    options: [
      "A type of virus that spreads through email",
      "A network of infected computers controlled by attackers",
      "A way to protect against viruses",
      "A type of firewall"
    ],
    correctAnswer: 1,
    explanation: "A botnet is a network of infected computers (bots) controlled by attackers. These networks can be used to launch DDoS attacks, send spam, or perform other malicious activities while hiding the attacker's identity.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 27,
    category: "Malware & Threats",
    question: "What is a keylogger and how does it work?",
    options: [
      "A type of virus that spreads through email",
      "Malware that records keystrokes to steal sensitive information",
      "A way to protect against viruses",
      "A type of firewall"
    ],
    correctAnswer: 1,
    explanation: "A keylogger is malware that records keystrokes to steal sensitive information like passwords and credit card numbers. It can be implemented in software or hardware and is particularly dangerous because it can capture information before it's encrypted.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 28,
    category: "Malware & Threats",
    question: "What is a backdoor in cybersecurity?",
    options: [
      "A type of virus that spreads through email",
      "A method to bypass normal authentication and gain unauthorized access",
      "A way to protect against viruses",
      "A type of firewall"
    ],
    correctAnswer: 1,
    explanation: "A backdoor is a method to bypass normal authentication and gain unauthorized access to a system. It can be installed by malware or intentionally by developers, and it's particularly dangerous because it can provide persistent access to attackers.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 29,
    category: "Malware & Threats",
    question: "What is a logic bomb and how does it work?",
    options: [
      "A type of virus that spreads through email",
      "Malware that activates when specific conditions are met",
      "A way to protect against viruses",
      "A type of firewall"
    ],
    correctAnswer: 1,
    explanation: "A logic bomb is malware that activates when specific conditions are met, such as a particular date or time, or when certain actions are performed. It's often used by malicious insiders and can cause significant damage when triggered.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 30,
    category: "Malware & Threats",
    question: "What is a polymorphic virus and why is it dangerous?",
    options: [
      "A type of virus that spreads through email",
      "Malware that changes its code to avoid detection",
      "A way to protect against viruses",
      "A type of firewall"
    ],
    correctAnswer: 1,
    explanation: "A polymorphic virus is malware that changes its code to avoid detection by antivirus software. It's dangerous because it can be difficult to detect and remove, as it constantly changes its appearance while maintaining its malicious functionality.",
    difficulty: "advanced",
    points: 20
  },

  // Encryption (10 questions)
  {
    id: 31,
    category: "Encryption",
    question: "What is the difference between symmetric and asymmetric encryption?",
    options: [
      "Symmetric is faster but asymmetric is more secure",
      "Symmetric uses one key while asymmetric uses two keys",
      "Asymmetric is only used for emails",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "Symmetric encryption uses a single key for both encryption and decryption, while asymmetric encryption uses a pair of keys (public and private). Asymmetric is more secure but slower, while symmetric is faster but requires secure key distribution.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 32,
    category: "Encryption",
    question: "What is end-to-end encryption?",
    options: [
      "Encryption that only works at the start and end of a message",
      "A system where only the communicating users can read the messages",
      "Encryption that only works on mobile devices",
      "A type of encryption that's not very secure"
    ],
    correctAnswer: 1,
    explanation: "End-to-end encryption ensures that only the communicating users can read the messages. Even the service provider cannot access the encrypted data, providing the highest level of privacy and security.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 33,
    category: "Encryption",
    question: "What is a hash function and how is it used in security?",
    options: [
      "A way to make passwords longer",
      "A one-way function that converts data into a fixed-length string",
      "A method to share passwords securely",
      "A way to reset your password"
    ],
    correctAnswer: 1,
    explanation: "A hash function is a one-way function that converts data into a fixed-length string. It's used in security for password storage, digital signatures, and data integrity verification, as it's computationally infeasible to reverse the process.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 34,
    category: "Encryption",
    question: "What is a digital signature and how does it work?",
    options: [
      "A way to sign documents electronically",
      "A mathematical scheme for verifying the authenticity of digital messages",
      "A method to share passwords securely",
      "A way to reset your password"
    ],
    correctAnswer: 1,
    explanation: "A digital signature is a mathematical scheme for verifying the authenticity of digital messages. It uses public key cryptography to ensure that a message was created by a known sender and that it wasn't altered in transit.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 35,
    category: "Encryption",
    question: "What is a certificate authority (CA) and what is its role?",
    options: [
      "A way to make passwords longer",
      "An entity that issues digital certificates to verify the identity of websites",
      "A method to share passwords securely",
      "A way to reset your password"
    ],
    correctAnswer: 1,
    explanation: "A certificate authority (CA) is an entity that issues digital certificates to verify the identity of websites and other entities. It plays a crucial role in establishing trust in online communications by verifying the identity of certificate holders.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 36,
    category: "Encryption",
    question: "What is the difference between SSL and TLS?",
    options: [
      "They are exactly the same thing",
      "TLS is the successor to SSL and provides better security",
      "SSL is more secure than TLS",
      "They are used for different purposes"
    ],
    correctAnswer: 1,
    explanation: "TLS (Transport Layer Security) is the successor to SSL (Secure Sockets Layer) and provides better security. While the terms are often used interchangeably, TLS is the more modern and secure protocol for encrypting communications over a network.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 37,
    category: "Encryption",
    question: "What is a public key infrastructure (PKI)?",
    options: [
      "A way to make passwords longer",
      "A system for managing digital certificates and public key encryption",
      "A method to share passwords securely",
      "A way to reset your password"
    ],
    correctAnswer: 1,
    explanation: "A public key infrastructure (PKI) is a system for managing digital certificates and public key encryption. It provides a framework for creating, storing, and distributing digital certificates, which are used to verify the identity of users and devices.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 38,
    category: "Encryption",
    question: "What is the difference between encryption and encoding?",
    options: [
      "They are exactly the same thing",
      "Encryption provides security while encoding is just a way to represent data",
      "Encoding is more secure than encryption",
      "They are used for different purposes"
    ],
    correctAnswer: 1,
    explanation: "Encryption provides security by making data unreadable without a key, while encoding is just a way to represent data in a different format. Encoding is not secure and can be easily reversed, while encryption requires a key to decrypt the data.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 39,
    category: "Encryption",
    question: "What is a key exchange protocol and why is it important?",
    options: [
      "A way to make passwords longer",
      "A method to securely exchange encryption keys between parties",
      "A method to share passwords securely",
      "A way to reset your password"
    ],
    correctAnswer: 1,
    explanation: "A key exchange protocol is a method to securely exchange encryption keys between parties. It's important because it allows parties to establish a secure communication channel without having to meet in person to exchange keys.",
    difficulty: "advanced",
    points: 20
  },
  {
    id: 40,
    category: "Encryption",
    question: "What is the difference between hashing and encryption?",
    options: [
      "They are exactly the same thing",
      "Hashing is one-way while encryption is two-way",
      "Encryption is one-way while hashing is two-way",
      "They are used for different purposes"
    ],
    correctAnswer: 1,
    explanation: "Hashing is a one-way function that converts data into a fixed-length string, while encryption is a two-way function that can be reversed with the correct key. Hashing is used for data integrity and password storage, while encryption is used for data confidentiality.",
    difficulty: "intermediate",
    points: 15
  },

  // Social Engineering (10 questions)
  {
    id: 41,
    category: "Social Engineering",
    question: "What is phishing and how can you identify it?",
    options: [
      "A type of fishing game",
      "A cyber attack that uses fake emails or websites to steal information",
      "A way to catch viruses",
      "A type of password"
    ],
    correctAnswer: 1,
    explanation: "Phishing is a cyber attack that uses fake emails or websites to trick users into revealing sensitive information. Common signs include urgent requests, poor grammar, suspicious links, and requests for sensitive information.",
    difficulty: "beginner",
    points: 10
  },
  {
    id: 42,
    category: "Social Engineering",
    question: "What is the principle of least privilege?",
    options: [
      "Giving users as many permissions as possible",
      "Giving users only the permissions they need to do their job",
      "A way to make passwords stronger",
      "A type of encryption"
    ],
    correctAnswer: 1,
    explanation: "The principle of least privilege means giving users only the permissions they need to perform their job functions. This minimizes the potential damage from accidents or security breaches.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 43,
    category: "Social Engineering",
    question: "What is pretexting in social engineering?",
    options: [
      "A way to make passwords stronger",
      "Creating a false scenario to obtain information",
      "A type of encryption",
      "A way to catch viruses"
    ],
    correctAnswer: 1,
    explanation: "Pretexting is a social engineering technique where an attacker creates a false scenario to obtain information. This often involves impersonating someone in authority or creating a sense of urgency to manipulate the victim.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 44,
    category: "Social Engineering",
    question: "What is baiting in social engineering?",
    options: [
      "A way to make passwords stronger",
      "Offering something enticing to get victims to take action",
      "A type of encryption",
      "A way to catch viruses"
    ],
    correctAnswer: 1,
    explanation: "Baiting is a social engineering technique where attackers offer something enticing to get victims to take action. This could be a free download, a gift card, or other incentives that lead to malware installation or information disclosure.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 45,
    category: "Social Engineering",
    question: "What is tailgating in physical security?",
    options: [
      "A way to make passwords stronger",
      "Following someone through a secure door without authorization",
      "A type of encryption",
      "A way to catch viruses"
    ],
    correctAnswer: 1,
    explanation: "Tailgating is a physical security breach where an unauthorized person follows an authorized person through a secure door. It's a common social engineering technique used to gain physical access to restricted areas.",
    difficulty: "beginner",
    points: 10
  },
  {
    id: 46,
    category: "Social Engineering",
    question: "What is quid pro quo in social engineering?",
    options: [
      "A way to make passwords stronger",
      "Offering a service or benefit in exchange for information",
      "A type of encryption",
      "A way to catch viruses"
    ],
    correctAnswer: 1,
    explanation: "Quid pro quo is a social engineering technique where attackers offer a service or benefit in exchange for information. This often involves impersonating IT support or other service providers to gain trust and access.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 47,
    category: "Social Engineering",
    question: "What is vishing and how does it work?",
    options: [
      "A way to make passwords stronger",
      "Voice phishing that uses phone calls to steal information",
      "A type of encryption",
      "A way to catch viruses"
    ],
    correctAnswer: 1,
    explanation: "Vishing (voice phishing) is a social engineering technique that uses phone calls to steal information. Attackers often impersonate legitimate organizations and use urgency or fear to manipulate victims into revealing sensitive information.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 48,
    category: "Social Engineering",
    question: "What is smishing and how can you protect against it?",
    options: [
      "A way to make passwords stronger",
      "SMS phishing that uses text messages to steal information",
      "A type of encryption",
      "A way to catch viruses"
    ],
    correctAnswer: 1,
    explanation: "Smishing (SMS phishing) is a social engineering technique that uses text messages to steal information. To protect against it, never click links in unsolicited texts, verify the sender's identity, and be suspicious of urgent requests.",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: 49,
    category: "Social Engineering",
    question: "What is the importance of security awareness training?",
    options: [
      "A way to make passwords stronger",
      "Educating users about security threats and best practices",
      "A type of encryption",
      "A way to catch viruses"
    ],
    correctAnswer: 1,
    explanation: "Security awareness training is crucial for educating users about security threats and best practices. It helps users recognize and avoid social engineering attacks, making them the first line of defense against security breaches.",
    difficulty: "beginner",
    points: 10
  },
  {
    id: 50,
    category: "Social Engineering",
    question: "What is the role of human psychology in social engineering?",
    options: [
      "A way to make passwords stronger",
      "Understanding how to manipulate human behavior and emotions",
      "A type of encryption",
      "A way to catch viruses"
    ],
    correctAnswer: 1,
    explanation: "Social engineering exploits human psychology by manipulating emotions and behavior. Attackers use techniques like authority, urgency, and reciprocity to bypass security measures and gain access to sensitive information.",
    difficulty: "advanced",
    points: 20
  }
];

const categories = [
  "Network Security",
  "Password Security",
  "Malware & Threats",
  "Encryption",
  "Social Engineering"
];

export default function SecurityQuiz() {
  const { data: session } = useSession();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  // Update filtered questions when category changes
  useEffect(() => {
    if (selectedCategory) {
      setFilteredQuestions(questions.filter(q => q.category === selectedCategory));
    } else {
      setFilteredQuestions(questions);
    }
  }, [selectedCategory]);

  const handleNextQuestion = useCallback(() => {
    if (!filteredQuestions.length) return;
    
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestion, filteredQuestions.length]);

  useEffect(() => {
    if (timeLeft === null) return;
    
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextQuestion();
    }
  }, [timeLeft, handleNextQuestion]);

  const handleAnswerSelect = async (index: number) => {
    if (selectedAnswer !== null || !filteredQuestions[currentQuestion]) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const isCorrect = index === filteredQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + filteredQuestions[currentQuestion].points);
    }

    // Update progress
    const category = filteredQuestions[currentQuestion].category;
    setProgress(prev => ({
      ...prev,
      [category]: (prev[category] || 0) + 1
    }));

    // Note: Quiz results are now stored locally
    // In a production app, you'd send this to your API endpoint
    if (session) {
      setIsSaving(true);
      try {
        // Simulate saving (replace with actual API call in production)
        console.log('Quiz result:', {
          userId: session.user.id,
          quizType: 'security',
          questionId: filteredQuestions[currentQuestion].id,
          selectedAnswer: index,
          isCorrect,
          timestamp: new Date(),
          category: filteredQuestions[currentQuestion].category,
          difficulty: filteredQuestions[currentQuestion].difficulty,
          points: isCorrect ? filteredQuestions[currentQuestion].points : 0
        });
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('Error saving quiz result:', error);
        setError('Failed to save progress. Please try again.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    setQuizCompleted(false);
    setTimeLeft(30);
    setError(null);
    setScore(0);
    setProgress({});
  };

  // If there's an error, show error message
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 text-lg font-semibold mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-4 bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If no questions are available, show message
  if (!questions.length) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-yellow-800 text-lg font-semibold mb-2">No Questions Available</h2>
          <p className="text-yellow-600">There are no questions available for this quiz. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Quiz Completed! 🎉</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Your Score</h3>
              <p className="text-4xl font-bold text-blue-600">{score} points</p>
              <p className="text-gray-600 mt-2">
                out of {filteredQuestions.reduce((acc, q) => acc + q.points, 0)} possible points
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Category Progress</h3>
              {categories.map(category => (
                <div key={category} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{category}</span>
                    <span className="text-sm text-gray-600">
                      {progress[category] || 0}/{questions.filter(q => q.category === category).length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${((progress[category] || 0) / questions.filter(q => q.category === category).length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
          onClick={() => {
                setQuizCompleted(false);
                setCurrentQuestion(0);
            setScore(0);
            setSelectedAnswer(null);
            setShowExplanation(false);
                setProgress({});
                setTimeLeft(30);
          }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Category Selection */}
      {!selectedCategory && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Select a Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
              >
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
        <p className="text-gray-600">
                  {questions.filter(q => q.category === category).length} questions
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Difficulty: {getCategoryDifficulty(category)}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Interface */}
      {selectedCategory && filteredQuestions.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {filteredQuestions.length}
              </span>
              <span className="text-sm font-medium">Score: {score}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Timer */}
          {timeLeft !== null && (
            <div className="text-center mb-6">
              <div className="inline-block bg-gray-100 px-4 py-2 rounded-full">
                <span className="text-lg font-medium">
                  {timeLeft} seconds
                </span>
              </div>
            </div>
          )}

          {/* Question */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {filteredQuestions[currentQuestion].difficulty}
              </span>
              <span className="ml-2 text-gray-600">
                {filteredQuestions[currentQuestion].points} points
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-4">
              {filteredQuestions[currentQuestion].question}
            </h3>
      </div>

          {/* Answers */}
          <div className="space-y-4 mb-8">
            {filteredQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-lg transition-all ${
                  selectedAnswer === null
                    ? 'bg-gray-50 hover:bg-gray-100'
                    : selectedAnswer === index
                    ? index === filteredQuestions[currentQuestion].correctAnswer
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-red-100 border-2 border-red-500'
                    : index === filteredQuestions[currentQuestion].correctAnswer
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-gray-50'
                }`}
            >
              {option}
            </button>
          ))}
      </div>

          {/* Explanation */}
          <AnimatePresence>
      {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-blue-50 p-6 rounded-lg mb-8"
              >
                <h4 className="font-semibold mb-2">Explanation:</h4>
                <p className="text-gray-700">
                  {filteredQuestions[currentQuestion].explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => handleCategorySelect(selectedCategory)}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Change Category
            </button>
            {selectedAnswer !== null && (
              <button
                onClick={handleNextQuestion}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {currentQuestion < filteredQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isSaving && (
        <div className="fixed top-4 right-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow-md">
          Saving progress...
        </div>
      )}
    </div>
  );
}

// Helper function to get category difficulty
function getCategoryDifficulty(category: string): string {
  const categoryQuestions = questions.filter(q => q.category === category);
  const difficulties = categoryQuestions.map(q => q.difficulty);
  const difficultyCounts = {
    beginner: difficulties.filter(d => d === 'beginner').length,
    intermediate: difficulties.filter(d => d === 'intermediate').length,
    advanced: difficulties.filter(d => d === 'advanced').length
  };

  if (difficultyCounts.advanced > difficultyCounts.beginner) {
    return 'Advanced';
  } else if (difficultyCounts.intermediate > difficultyCounts.beginner) {
    return 'Intermediate';
  } else {
    return 'Beginner';
  }
} 