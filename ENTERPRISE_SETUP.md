# AfriLead - Enterprise Setup Guide

## 🎯 Overview

AfriLead has been upgraded to an enterprise-level mentorship platform with proper authentication, database integration, and professional architecture.

## ✅ What's Been Implemented

### 1. **Database Integration (MongoDB)**

#### Connection Setup
- **File**: `lib/mongodb.ts`
- Cached connection for optimal performance
- Hot-reload friendly in development
- Production-ready configuration

#### Database Models
All models include proper validation, indexes, and timestamps:

- **User** (`models/User.ts`)
  - Authentication and basic profile
  - Fields: name, email, password, role, country, photoUrl
  - Indexes: email, role, country

- **MentorProfile** (`models/MentorProfile.ts`)
  - Mentor-specific information
  - Fields: bio, title, company, experience, skills, expertise, rating
  - Indexes: skills, expertise, industry, rating, isActive

- **MenteeProfile** (`models/MenteeProfile.ts`)
  - Mentee-specific information
  - Fields: bio, interests, goals, careerStage, education
  - Indexes: interests, goals, careerStage, isActive

- **MentorshipRequest** (`models/MentorshipRequest.ts`)
  - Connection requests between mentors and mentees
  - Fields: mentorId, menteeId, status, message, dates
  - Indexes: mentorId + status, menteeId + status

- **Session** (`models/Session.ts`)
  - Mentorship session tracking
  - Fields: scheduledAt, duration, status, topic, notes, rating
  - Indexes: status + scheduledAt, mentorId, menteeId

### 2. **Authentication System (NextAuth.js)**

#### Setup
- **File**: `app/api/auth/[...nextauth]/route.ts`
- JWT-based sessions for scalability
- Credentials provider (email/password)
- Google OAuth ready (placeholder)
- Type-safe session management

#### API Routes
- `POST /api/auth/signup` - User registration with validation
- `POST /api/auth/[...nextauth]` - Authentication handler
- `GET/POST /api/mentors` - Mentor profile CRUD
- `POST /api/mentees` - Mentee profile creation

#### Security Features
- Password hashing with bcrypt (12 rounds)
- Email validation
- Password strength requirements
- Protected API routes with session checks

### 3. **Form Validation (Zod + React Hook Form)**

#### Validation Schemas
- **Auth**: `lib/validations/auth.ts`
  - Sign up: name, email, password, country, role
  - Sign in: email, password
  - Password requirements: 8+ chars, uppercase, lowercase, number

- **Mentor**: `lib/validations/mentor.ts`
  - Bio (50-500 chars)
  - Skills (1-20 items)
  - Years of experience
  - LinkedIn URL validation

- **Mentee**: `lib/validations/mentee.ts`
  - Interests (1-15 items)
  - Goals (1-10 items)
  - Career stage enum
  - Optional fields properly handled

### 4. **Reusable UI Components**

#### Layout Components
- **PageContainer** (`components/ui/page-container.tsx`)
  - Consistent page spacing (pt-24 for navbar clearance)
  - Configurable max-width
  - Responsive padding

- **PageHeader** (`components/ui/page-header.tsx`)
  - Title, description, badge, actions
  - Consistent spacing and typography

- **FormField** (`components/ui/form-field.tsx`)
  - Label with required indicator
  - Error message display
  - Consistent spacing

#### Providers
- **SessionProvider** (`components/providers/SessionProvider.tsx`)
  - NextAuth session wrapper
  - Integrated in root layout

### 5. **Refactored Pages**

#### Sign In (`app/signin/page.tsx`)
- ✅ React Hook Form + Zod validation
- ✅ NextAuth integration
- ✅ Loading states
- ✅ Error handling
- ✅ Google OAuth button (ready)
- ✅ Professional layout with PageContainer
- ✅ Password strength indicator
- ✅ Forgot password link

#### Sign Up (`app/signup/page.tsx`)
- ✅ Multi-field validation
- ✅ Country selector (African countries)
- ✅ Role selection (mentor/mentee/both)
- ✅ Password strength meter
- ✅ Password requirements checklist
- ✅ Terms & conditions checkbox
- ✅ Auto sign-in after registration
- ✅ Professional error messaging

### 6. **Data & Configuration**

#### Country Data
- **File**: `lib/data/countries.ts`
- All 54 African countries
- Ready for dropdown selectors

#### Environment Variables
- **File**: `.env.local` (created)
```env
MONGODB_URI=mongodb://localhost:27017/afrilead
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

## 🚀 Setup Instructions

### 1. Database Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB
brew install mongodb-community@7.0  # macOS
# or follow official MongoDB docs for your OS

# Start MongoDB
brew services start mongodb-community@7.0

# Verify connection
mongosh
```

#### Option B: MongoDB Atlas (Recommended for Production)
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/afrilead?retryWrites=true&w=majority
```

### 2. Generate Auth Secret
```bash
openssl rand -base64 32
```
Add to `.env.local` as `NEXTAUTH_SECRET`

### 3. Install Dependencies
```bash
npm install
# Packages installed:
# - next-auth
# - mongoose
# - bcryptjs
# - zod
# - react-hook-form
# - @hookform/resolvers
```

### 4. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
AfriLead/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts   # NextAuth handler
│   │   │   └── signup/route.ts          # Registration endpoint
│   │   ├── mentors/route.ts             # Mentor CRUD
│   │   └── mentees/route.ts             # Mentee CRUD
│   ├── signin/page.tsx                  # ✅ Enterprise-ready
│   ├── signup/page.tsx                  # ✅ Enterprise-ready
│   ├── onboarding/                      # 🔄 Needs DB integration
│   ├── discover/page.tsx                # 🔄 Needs API integration
│   └── dashboard/                       # 🔄 Needs API integration
├── components/
│   ├── providers/
│   │   └── SessionProvider.tsx          # NextAuth wrapper
│   ├── ui/
│   │   ├── page-container.tsx           # Layout component
│   │   ├── page-header.tsx              # Header component
│   │   └── form-field.tsx               # Form component
│   └── shared/
│       ├── navbar.tsx                   # Global navigation
│       └── footer.tsx                   # Global footer
├── lib/
│   ├── mongodb.ts                       # DB connection
│   ├── validations/
│   │   ├── auth.ts                      # Auth schemas
│   │   ├── mentor.ts                    # Mentor schemas
│   │   └── mentee.ts                    # Mentee schemas
│   └── data/
│       └── countries.ts                 # African countries
├── models/
│   ├── User.ts                          # User model
│   ├── MentorProfile.ts                 # Mentor model
│   ├── MenteeProfile.ts                 # Mentee model
│   ├── MentorshipRequest.ts             # Request model
│   └── Session.ts                       # Session model
├── types/
│   └── next-auth.d.ts                   # NextAuth types
└── .env.local                           # Environment config
```

## 🔐 Authentication Flow

### Registration
1. User fills signup form
2. Client-side validation (Zod)
3. POST `/api/auth/signup`
4. Password hashed (bcrypt)
5. User created in MongoDB
6. Auto sign-in via NextAuth
7. Redirect to onboarding

### Sign In
1. User enters credentials
2. Client-side validation
3. NextAuth credentials provider
4. Password verification
5. JWT token created
6. Session established
7. Redirect to dashboard

### Protected Routes (Next Step)
- Middleware checks session
- Redirects unauthenticated users
- Role-based access control

## 🎨 UI/UX Improvements

### Fixed Issues
✅ **Navbar Spacing**: All pages now use `pt-24` via PageContainer
✅ **Gradient Removal**: No gradients anywhere (per your request)
✅ **Professional Design**: Solid colors, clean borders, proper shadows
✅ **Form Validation**: Real-time feedback, clear error messages
✅ **Loading States**: Spinners, disabled states during API calls
✅ **Password Strength**: Visual meter with requirements checklist

### Consistent Patterns
- PageContainer for all pages (proper navbar clearance)
- FormField for all form inputs
- PageHeader for page titles
- Loading states with Loader2 icon
- Error states with AlertCircle icon
- Success feedback where appropriate

## 📝 API Documentation

### POST /api/auth/signup
**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "country": "Nigeria",
  "role": "mentee"
}
```

**Response** (201):
```json
{
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "mentee",
    "country": "Nigeria"
  },
  "message": "User created successfully"
}
```

**Errors**:
- 400: Missing fields, invalid email, weak password
- 409: Email already exists
- 500: Server error

### GET /api/mentors
**Query Parameters**:
- `skills`: Comma-separated skills
- `industry`: Industry filter
- `minRating`: Minimum rating (1-5)
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10)

**Response**:
```json
{
  "mentors": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

### POST /api/mentors
**Headers**: Requires authentication
**Request**:
```json
{
  "bio": "...",
  "title": "Senior Product Manager",
  "skills": ["Product Management", "UX", "Leadership"],
  "yearsOfExperience": 8,
  "industry": "Technology"
}
```

## 🔄 Next Steps (Recommended Order)

1. **Protected Routes Middleware**
   - Create `middleware.ts`
   - Protect /dashboard, /onboarding, /profile routes
   - Role-based access control

2. **Onboarding Flow**
   - Integrate with mentor/mentee API
   - Save profiles to database
   - Handle both new users and existing users

3. **Discover Page**
   - Fetch mentors from `/api/mentors`
   - Implement filters
   - Pagination
   - Request connection functionality

4. **Dashboard Pages**
   - Fetch user-specific data
   - Display mentor requests
   - Show sessions
   - Analytics

5. **Session & Message APIs**
   - Create session booking
   - Real-time messaging (consider Socket.io)
   - Session completion/rating

6. **File Uploads**
   - Profile photos
   - Use cloud storage (Cloudinary, AWS S3)

7. **Email Notifications**
   - Verification emails
   - Session reminders
   - New message alerts

## 🔧 Development Tips

### Running MongoDB
```bash
# Start MongoDB
brew services start mongodb-community@7.0

# Stop MongoDB
brew services stop mongodb-community@7.0

# MongoDB shell
mongosh

# View databases
show dbs

# Use afrilead database
use afrilead

# View collections
show collections

# Query users
db.users.find()
```

### Testing Auth
```bash
# Test signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123456",
    "country": "Kenya",
    "role": "mentee"
  }'
```

### Debugging
- Check browser console for client errors
- Check terminal for server errors
- Use MongoDB Compass for database inspection
- Use NextAuth debug mode (set `debug: true` in authOptions)

## 📚 Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org/)
- [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/)
- [Zod Documentation](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)

## 🎉 Summary

Your AfriLead platform now has:
✅ Professional authentication system
✅ MongoDB database integration
✅ Type-safe form validation
✅ Enterprise-level code structure
✅ Reusable components
✅ Professional UI/UX
✅ Proper spacing (navbar issue fixed)
✅ No gradients (as requested)
✅ Loading & error states
✅ Password strength validation
✅ Ready for production scaling

The foundation is solid. Continue with the next steps to complete the full platform!
