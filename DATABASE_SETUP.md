# 🗄️ Database Setup for New Deployment

## **Quick Setup Steps**

### **1. Create New PostgreSQL Database**
Choose one of these free options:
- **Vercel Postgres** (easiest integration)
- **Neon** (generous free tier)
- **Supabase** (full-featured)

### **2. Get Database URL**
You'll get a connection string like:
```
postgresql://username:password@host:5432/database_name
```

### **3. Set Environment Variables in Vercel**
In your Vercel project settings:
```
DATABASE_URL=your_postgresql_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-app.vercel.app
```

### **4. Deploy and Initialize**
The deployment will automatically:
- Run `prisma generate`
- Create database tables
- Start with empty database

## **For Academic Presentation**

A fresh database is actually **better** for your academic demo because:
- ✅ Clean, predictable demo environment
- ✅ You can create test accounts during presentation
- ✅ Shows the registration/onboarding flow
- ✅ No old test data cluttering the demo

## **Test Data Creation**
After deployment, you can quickly create:
- Admin account for demo
- Sample quiz results
- Achievement unlocks
- User progress examples
