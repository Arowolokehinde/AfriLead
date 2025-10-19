# AfriLead MVP - Project Structure

## Overview
This project has been completely restructured to follow the MVP flow outlined in the PDF. All pages use Next.js App Router with organized, modular components.

## Project Structure

```
AfriLead/
├── app/
│   ├── (auth)/                    # Auth pages with grouped routing
│   │   ├── signin/
│   │   │   └── page.tsx          # Sign in page
│   │   └── signup/
│   │       └── page.tsx          # Sign up page
│   ├── onboarding/               # User onboarding flow
│   │   ├── role/
│   │   │   └── page.tsx          # Role selection (mentor/mentee)
│   │   ├── mentor/
│   │   │   └── page.tsx          # Mentor onboarding form
│   │   └── mentee/
│   │       └── page.tsx          # Mentee onboarding form
│   ├── dashboard/                # User dashboards
│   │   ├── mentor/
│   │   │   └── page.tsx          # Mentor dashboard with requests
│   │   └── mentee/
│   │       └── page.tsx          # Mentee dashboard
│   ├── discover/
│   │   └── page.tsx              # Browse and match with mentors
│   ├── messages/
│   │   └── page.tsx              # Chat/messaging interface
│   ├── session/
│   │   └── [id]/
│   │       └── page.tsx          # Session details and completion
│   ├── profile/
│   │   └── [id]/
│   │       └── page.tsx          # User profile view
│   ├── layout.tsx                # Root layout with navbar & footer
│   ├── page.tsx                  # Landing page
│   └── globals.css
│
├── components/
│   ├── landing/                  # Landing page components
│   │   ├── hero.tsx             # Hero section with CTA
│   │   ├── mission.tsx          # Mission statement
│   │   └── how-it-works.tsx     # Process explanation
│   ├── onboarding/              # Onboarding forms
│   │   ├── mentor-form.tsx      # Mentor profile form
│   │   └── mentee-form.tsx      # Mentee profile form
│   ├── dashboard/               # Dashboard components
│   │   └── mentor-request-card.tsx  # Request card for mentors
│   ├── discover/                # Discovery page components
│   │   └── mentor-card.tsx      # Mentor display card
│   ├── shared/                  # Shared components
│   │   ├── navbar.tsx           # Global navigation
│   │   └── footer.tsx           # Global footer
│   └── ui/                      # shadcn/ui components
│       └── ... (50+ UI components)
│
├── lib/
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── constants/
│   │   └── index.ts             # Shared constants
│   └── utils.ts
│
└── public/                      # Static assets
```

## User Flow (Following MVP PDF)

### 1. Landing Page (/)
- Hero section with mission statement
- "Become a Mentor" and "Find a Mentor" CTAs
- Mission explanation
- How it works section
- Components: Hero, Mission, HowItWorks

### 2. Authentication
- Sign In: `/signin`
- Sign Up: `/signup`
- Google OAuth integration ready
- Email/password authentication

### 3. Onboarding Flow
- **Role Selection** (`/onboarding/role`)
  - Choose between Mentor or Mentee
  - Can be pre-selected via URL param

- **Mentor Onboarding** (`/onboarding/mentor`)
  - Name, email, country
  - Skills/expertise selection
  - Professional experience
  - Bio and availability

- **Mentee Onboarding** (`/onboarding/mentee`)
  - Name, email, country
  - Interests selection
  - Goals selection
  - Bio (optional)

### 4. Discovery & Matching (`/discover`)
- Browse all mentors
- Search by name or skill
- Filter by skills/interests
- View mentor cards with:
  - Basic info and photo
  - Skills and experience
  - Rating and sessions completed
  - Match score (for logged-in mentees)
- Request mentorship

### 5. Dashboards

**Mentor Dashboard** (`/dashboard/mentor`)
- Pending mentorship requests
- Accept/reject requests
- Active mentees list
- Session statistics
- Rating overview

**Mentee Dashboard** (`/dashboard/mentee`)
- Connected mentors
- Upcoming sessions
- Learning progress
- Statistics and goals

### 6. Messaging (`/messages`)
- Conversation list
- Real-time chat interface
- Search conversations
- Message notifications
- Video/call integration ready

### 7. Session Management (`/session/[id]`)
- Session details
- Join meeting link (Google Meet)
- Complete session
- Rate and provide feedback
- Reschedule/cancel options

### 8. Profile View (`/profile/[id]`)
- Detailed mentor/mentee profile
- Skills and expertise
- Experience and bio
- Testimonials
- Session statistics
- Request mentorship CTA

## Key Features Implemented

✅ **MVP Core Features**
- User role selection (mentor/mentee)
- Profile creation with 4-6 fields max
- Basic rule-based matching (by interests)
- Simple messaging interface
- Session completion and feedback
- Basic dashboards with stats

✅ **Mobile-First Design**
- Responsive layouts
- Touch-friendly interfaces
- Mobile navigation menu

✅ **Component Organization**
- Modular, reusable components
- Logical folder structure
- TypeScript types for all entities

✅ **Pages Follow App Router Pattern**
- All pages in `app/` directory
- Each page has its own folder with `page.tsx`
- Grouped routes with `()` for auth
- Dynamic routes with `[]` for profiles and sessions

## TypeScript Types

Defined in `lib/types/index.ts`:
- `User`, `MentorProfile`, `MenteeProfile`
- `MentorshipRequest`, `MentorshipConnection`
- `Session`, `SessionFeedback`
- `Message`, `Match`

## Constants

Defined in `lib/constants/index.ts`:
- `INTERESTS`: Tech, Business, Design, etc.
- `GOALS`: Learning, Career Guidance, etc.
- `AFRICAN_COUNTRIES`: All 54 African countries

## Next Steps for Development

1. **Backend Integration**
   - Set up Firebase/Supabase
   - Implement authentication
   - Create database schema
   - Add API routes

2. **Matching Algorithm**
   - Implement rule-based matching
   - Filter mentors by mentee interests
   - Calculate match scores

3. **Real-time Features**
   - Implement actual messaging
   - Add notifications
   - Session scheduling

4. **Additional Features**
   - Email notifications
   - Calendar integration
   - File uploads
   - Admin dashboard

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (50+ components)
- **Icons**: Lucide React
- **Recommended Backend**: Firebase or Supabase
- **Hosting**: Vercel

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Access the application at `http://localhost:3000`

## Design Principles

Following the MVP guidelines from the PDF:

1. **Simplicity First**: 4-6 fields max in forms
2. **Clear User Flow**: Landing → Auth → Onboarding → Match → Connect → Session
3. **Fast to Build**: Using shadcn/ui components and Firebase
4. **Mobile-First**: Responsive design throughout
5. **Track Impact**: Basic analytics and feedback system

---

**Status**: ✅ All core MVP pages and components complete
**Ready for**: Backend integration and user testing
