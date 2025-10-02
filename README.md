# 🛡️ CyberSecure Learning Platform

A comprehensive cybersecurity education platform built with Next.js, featuring interactive quizzes, learning modules, and progress tracking.

## 🚀 Quick Start Guide

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

### 📦 Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Emmarepo/cyberlearn.git
   cd cyberlearn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   # Database (SQLite for local development)
   DATABASE_URL="file:./dev.db"
   
   # NextAuth.js Configuration
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3001"
   ```

4. **Initialize the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Create and migrate database
   npx prisma db push
   
   # (Optional) Seed with sample data
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 🗄️ Database Setup

This project uses **SQLite** for local development, which means:
- ✅ **No external database required**
- ✅ **Automatic database file creation**
- ✅ **Zero configuration needed**
- ✅ **Perfect for development and testing**

The database file (`dev.db`) will be created automatically in your project root when you run the application.

## 🔧 Available Scripts

```bash
# Start development server (port 3001)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Database commands
npx prisma studio          # Open database browser
npx prisma db push         # Apply schema changes
npx prisma generate        # Generate Prisma client
npx prisma migrate reset   # Reset database (careful!)
```

## 🎯 First Time Setup

### Creating Your First Admin Account

1. Start the application (`npm run dev`)
2. Navigate to [http://localhost:3001](http://localhost:3001)
3. Click "Get Started" or "Sign In"
4. Register with any email/password
5. The first user automatically becomes an admin

### Testing the Platform

1. **Take a Quiz**: Go to `/quizzes` and try the phishing quiz
2. **Check Tools**: Visit `/tools/password-checker` 
3. **View Progress**: Check your learning dashboard at `/learn`
4. **Admin Panel**: Access admin features at `/admin`

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.3.3 + React 19 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: Prisma ORM + SQLite (local) / PostgreSQL (production)
- **Authentication**: NextAuth.js with JWT sessions
- **Forms**: React Hook Form + Zod validation
- **Security**: bcryptjs password hashing

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── learn/             # Learning dashboard
│   ├── quizzes/           # Quiz modules
│   └── tools/             # Security tools
├── components/            # React components
│   ├── ui/                # UI components
│   ├── auth/              # Auth components
│   └── quizzes/           # Quiz components
├── prisma/                # Database schema & migrations
├── docs/                  # Documentation
└── public/                # Static assets
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **Session Management**: Secure JWT tokens
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM
- **CSRF Protection**: NextAuth.js built-in
- **Environment Variables**: Secure configuration

## 🐛 Troubleshooting

### Common Issues

**Port 3001 already in use?**
```bash
# Kill process on port 3001
npx kill-port 3001
# Or use a different port
npm run dev -- -p 3002
```

**Database connection issues?**
```bash
# Reset database
npx prisma migrate reset
npx prisma db push
```

**Missing dependencies?**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Prisma client issues?**
```bash
# Regenerate Prisma client
npx prisma generate
```

## 📚 Learning Modules

The platform includes:
- **Phishing Detection Quiz**: Learn to identify phishing emails
- **Security Fundamentals**: Network security, encryption, malware
- **Password Security**: Best practices and strength checking
- **Social Engineering**: Recognize manipulation techniques
- **Interactive Tools**: Password strength checker and more

## 🎓 Academic Context

This is a final year computer science project focused on cybersecurity education. The platform demonstrates:
- Modern web development practices
- Security-first design principles
- User experience optimization
- Database design and management
- Authentication and authorization
- Responsive design implementation

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify your `.env.local` file is configured correctly
4. Check that port 3001 is available

## 🚀 Production Deployment

For production deployment:
1. Use PostgreSQL instead of SQLite
2. Set proper environment variables
3. Configure NEXTAUTH_URL to your domain
4. Use a secure NEXTAUTH_SECRET

---

**Happy Learning! 🛡️**
