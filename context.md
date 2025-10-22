# 🔧 Career Connect - Developer Context & Technical Documentation

## 📋 Project Overview

**Career Connect** (formerly CyberSec AI Coach) is a comprehensive cybersecurity education platform designed to provide interactive learning experiences for students, teachers, and administrators. This document serves as the technical context and developer guide for the project.


- **Branch**: `main`
- **Live URL**: [https://careercoach.sparkstudio.co.in](https://careercoach.sparkstudio.co.in)
- **Tech Stack**: React 18 + TypeScript + Vite + Supabase + Tailwind CSS

## 🏗️ Architecture & Technology Stack

### Frontend Architecture
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2 for fast development and optimized builds
- **Styling**: Tailwind CSS 3.4.1 with PostCSS
- **Icons**: Lucide React 0.344.0
- **State Management**: React Context API for auth and theme
- **Routing**: Client-side routing with conditional rendering

### Backend & Database
- **BaaS**: Supabase (PostgreSQL + Auth + Storage)
- **Authentication**: Supabase Auth with bcrypt.js password hashing
- **Database**: PostgreSQL with Row Level Security (RLS)
- **File Storage**: Supabase Storage for document management
- **Real-time**: Supabase real-time subscriptions

### AI & Document Processing
- **PDF Processing**: PDF.js 4.0.379 with custom worker configuration
- **AI Integration**: Google Gemini API for chatbot functionality
- **RAG System**: Custom Retrieval-Augmented Generation implementation
- **Document Parsing**: Automatic PDF content extraction and indexing

### DevOps & Deployment
- **Hosting**: Vercel with automatic deployments
- **CI/CD**: GitHub Actions integration via Vercel
- **Domain**: Custom domain with SSL certificate
- **Environment**: Development and production configurations

## 📁 Detailed File Structure

```
varun_sovap/
├── 📄 Configuration Files
│   ├── package.json                 # Dependencies and scripts
│   ├── tsconfig.json               # TypeScript configuration
│   ├── vite.config.ts              # Vite build configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   ├── postcss.config.js           # PostCSS configuration
│   ├── eslint.config.js            # ESLint configuration
│   └── vercel.json                 # Vercel deployment config
│
├── 🌐 Public Assets
│   ├── index.html                  # HTML template
│   ├── pdf.worker.min.js          # PDF.js worker (local)
│   └── docs/                       # PDF documents for RAG
│       ├── index.json              # Document index
│       ├── nist_cybersecurity_framework.txt
│       ├── owasp_top10.txt
│       └── sample_lab.txt
│
├── 💻 Source Code
│   ├── main.jsx                    # Application entry point
│   ├── App.tsx                     # Main app component
│   ├── index.css                   # Global styles
│   ├── vite-env.d.ts              # Vite TypeScript declarations
│   │
│   ├── 🧩 components/              # React components
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.tsx  # Admin main dashboard
│   │   │   └── AssessmentAnalytics.tsx # Assessment analytics
│   │   ├── Assessment/
│   │   │   └── AssessmentTest.tsx  # Interactive assessment system
│   │   ├── Auth/
│   │   │   ├── LoginForm.tsx       # User authentication form
│   │   │   └── RegisterForm.tsx    # User registration form
│   │   ├── Certificates/
│   │   │   └── Certificates.tsx    # Certificate management
│   │   ├── Chatbot/
│   │   │   ├── Chatbot.tsx         # AI chatbot interface
│   │   │   └── docs/               # Chatbot knowledge base
│   │   ├── Courses/
│   │   │   ├── CourseList.tsx      # Course catalog
│   │   │   ├── CourseDetail.tsx    # Individual course view
│   │   │   ├── ModuleViewer.tsx    # Course module display
│   │   │   ├── ModuleTest.tsx      # Module assessments
│   │   │   └── FinalExam.tsx       # Course final exams
│   │   ├── Dashboard/
│   │   │   └── Dashboard.tsx       # User dashboard
│   │   ├── Labs/
│   │   │   ├── LabsList.tsx        # Available labs catalog
│   │   │   ├── LabViewer.tsx       # Lab interface
│   │   │   ├── LabEnvironment.tsx  # Lab environment setup
│   │   │   └── RealTimeLabEnvironment.tsx # Live lab sessions
│   │   ├── Layout/
│   │   │   ├── Header.tsx          # App header with navigation
│   │   │   └── Sidebar.tsx         # Navigation sidebar
│   │   ├── Notes/
│   │   │   └── NotesTab.tsx        # Note-taking interface
│   │   ├── Profile/
│   │   │   └── Profile.tsx         # User profile management
│   │   ├── Teacher/
│   │   │   └── TeacherDashboard.tsx # Teacher dashboard
│   │   ├── TechnicalInterview/
│   │   │   └── TechnicalQuestions.tsx # Interview practice
│   │   └── Video/
│   │       ├── VideoLibrary.tsx    # Video content library
│   │       ├── VideoPlayer.tsx     # Custom video player
│   │       └── LiveStream.tsx      # Live streaming capability
│   │
│   ├── 🔄 context/                 # React Context providers
│   │   ├── AuthContext.jsx/.tsx    # Authentication state management
│   │   └── ThemeContext.jsx/.tsx   # Theme state management
│   │
│   ├── 📊 data/                    # Static data and configurations
│   │   ├── assessmentQuestions.ts  # Assessment question bank
│   │   ├── labs.ts                 # Lab configurations
│   │   ├── owaspCourses.ts         # OWASP course data
│   │   └── technicalQuestions.ts   # Interview question bank
│   │
│   ├── 🔧 lib/                     # Library configurations
│   │   └── supabase.ts             # Supabase client configuration
│   │
│   ├── 🚀 services/                # API and business logic
│   │   ├── adminService.ts         # Admin functionality
│   │   ├── aiService.ts            # AI/Gemini integration
│   │   ├── assessmentService.ts    # Assessment logic
│   │   ├── authService.ts          # Authentication service
│   │   ├── courseService.ts        # Course management
│   │   ├── learnerMemoryService.ts # Learning progress tracking
│   │   ├── learningPathService.ts  # Adaptive learning paths
│   │   ├── ragDocsService.ts       # RAG document processing
│   │   └── ragService.ts           # RAG query processing
│   │
│   └── 📝 types/                   # TypeScript type definitions
│       └── index.ts                # Shared type definitions
│
├── 🗄️ supabase/                   # Database migrations
│   └── migrations/
│       ├── 20250721195746_scarlet_desert.sql
│       ├── 20250721195914_icy_tooth.sql
│       ├── 20250722195150_withered_spire.sql
│       ├── 20251005_adaptive_extensions.sql
│       ├── 20251005_init_schema.sql
│       ├── 20251017_disable_rls_dev.sql
│       └── 20251017_fix_rls_policies.sql
│
└── 🖥️ Server
    ├── server.mjs                  # Express.js proxy server
    ├── disable_rls_dev.sql         # RLS management scripts
    └── fix_rls_policies.sql
- **Authentication**: Custom authentication with Supabase backend

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Custom implementation with bcrypt password hashing
- **File Storage**: Supabase Storage
- **API**: Supabase REST API with Row Level Security (RLS)

### AI Integration
- **AI Provider**: Google Gemini (gemini-2.0-flash model)
- **Features**: 
  - RAG (Retrieval Augmented Generation) for document-based responses
  - Learner memory service for personalized interactions
  - PDF.js integration for document processing

### Analytics
- **Analytics**: Vercel Analytics for user behavior tracking
- **Monitoring**: Built-in error handling and logging

## Key Features

### 1. Multi-Role System
- **Students**: Access courses, labs, assessments, certificates
- **Teachers**: Create courses, manage students, view analytics
- **Admins**: Full platform management, user administration, system analytics

### 2. Interactive Learning Components

#### Courses & Modules
- **OWASP Top 10 Courses**: Comprehensive security training modules
- **Video Library**: Curated cybersecurity educational videos
- **Progress Tracking**: User progress across courses and modules
- **Certificates**: Digital certificates upon course completion

#### Hands-on Labs
- **Real-time Lab Environment**: Live vulnerable applications for testing
- **Interactive Terminals**: Browser-based security testing terminals
- **Lab Types**:
  - Broken Access Control Lab
  - Cryptographic Failures Lab
  - SQL Injection Lab
  - Security Misconfiguration Lab
  - Vulnerable Components Lab
  - Insecure Design Analysis Lab

#### AI-Powered Chatbot
- **CyberSec AI Assistant**: Powered by Google Gemini
- **RAG Integration**: Context-aware responses using document knowledge base
- **Learner Memory**: Personalized learning experiences
- **Document Processing**: PDF analysis and text extraction

#### Assessment System
- **Skill Assessments**: Multi-choice questions with explanations
- **Technical Interview Questions**: Company-specific interview preparation
- **Assessment Analytics**: Performance tracking and insights
- **Adaptive Learning**: Difficulty adjustment based on performance

### Proctoring & Exam Integrity
The platform includes an integrated proctoring capability to preserve exam integrity for high-stakes assessments. Key points:

- Feature summary:
  - Real-time face detection and basic liveness checks using the bundled face-api models and OpenCV Haar cascades.
  - Periodic screenshot capture and motion detection to flag suspicious activity.
  - Browser-based webcam streaming with client-side analysis to avoid uploading raw video unless flagged.
  - Violation notifications delivered to the instructor dashboard and optionally via email/webhook.

- Implementation (files & assets):
  - Frontend proctoring UI: `src/components/Assessment/Proctoring.tsx` and `src/components/Assessment/ProctoringDemo.tsx`.
  - Violation UI: `src/components/Assessment/ViolationNotification.tsx`.
  - Local models and helpers: `public/models/face-api/` and `models/haarcascade_frontalface_default.xml`.
  - Proctoring orchestration and rules are implemented in `src/services/assessmentService.ts` and client-side helpers in `src/services/ragDocsService.ts` (where PDF parsing is handled).

- Technology and models:
  - face-api (tiny_face_detector) for face detection and simple recognition.
  - Haar cascade XML for fallback frontal-face detection in lower-powered environments.
  - Optional server-side verification (manual review or automated ML pipelines) can be implemented via the existing `server.mjs` proxy.

- Privacy and data handling:
  - By default the client performs analysis locally and only uploads metadata (timestamps, flags, small image thumbnails) when an event is triggered.
  - Ensure the project's `.env` and privacy documentation indicate retention policies and opt-in/consent flows for recorded proctoring data.

- Testing and troubleshooting:
  - Use `ProctoringDemo.tsx` to exercise detection flows during development.
  - Verify models are present under `public/models/face-api/` and that `models/haarcascade_frontalface_default.xml` is reachable.
  - Check console logs for detection events and confirm instructor notifications appear in `Admin/AssessmentAnalytics.tsx` when enabled.


### 3. Content Management
- **Course Creation**: Teachers can create and manage courses
- **Module Management**: Structured learning paths with videos and labs
- **File Upload**: Support for course materials and documents
- **Notes System**: Student and admin note-taking capabilities

### 4. User Experience Features
- **Dark/Light Theme**: Theme switching with context persistence
- **Responsive Design**: Mobile-first responsive interface
- **Real-time Updates**: Live progress tracking and notifications
- **Demo Credentials**: Quick access for testing different roles

## Project Structure

```
src/
├── components/           # React components
│   ├── Admin/           # Admin dashboard components
│   ├── Assessment/      # Assessment and testing components
│   ├── Auth/           # Login/Register forms
│   ├── Certificates/   # Certificate management
│   ├── Chatbot/        # AI chatbot interface
│   ├── Courses/        # Course-related components
│   ├── Dashboard/      # Main dashboard
│   ├── Labs/           # Interactive lab environment
│   ├── Layout/         # Header, sidebar, navigation
│   ├── Notes/          # Note-taking functionality
│   ├── Profile/        # User profile management
│   ├── Teacher/        # Teacher dashboard
│   ├── TechnicalInterview/ # Interview preparation
│   └── Video/          # Video library
├── context/            # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── ThemeContext.tsx # Theme management
├── data/               # Static data and configurations
│   ├── assessmentQuestions.ts
│   ├── labs.ts
│   ├── owaspCourses.ts
│   └── technicalQuestions.ts
├── lib/                # Utility libraries
│   └── supabase.ts     # Supabase configuration
├── services/           # API and business logic
│   ├── adminService.ts
│   ├── aiService.ts
│   ├── assessmentService.ts
│   ├── authService.ts
│   ├── courseService.ts
│   ├── learnerMemoryService.ts
│   ├── learningPathService.ts
│   ├── ragDocsService.ts
│   └── ragService.ts
```

## 🔌 API & Services Architecture

### Authentication Service (`authService.ts`)
- **User Registration**: Multi-role user creation with bcrypt password hashing
- **Login System**: Role-based authentication with JWT tokens
- **Session Management**: Local storage with secure token handling
- **Role Management**: Student, Teacher, Admin role hierarchy

### AI Services
#### AI Service (`aiService.ts`)
- **Google Gemini Integration**: Advanced AI responses for chatbot
- **Model**: `gemini-2.0-flash-exp` for optimal performance
- **Safety Settings**: Configured content filtering and safety thresholds

#### RAG Service (`ragService.ts`)
- **Document Retrieval**: Intelligent document search and retrieval
- **Context Augmentation**: Enhanced AI responses with relevant documentation
- **Vector Search**: Semantic search across cybersecurity documents

#### RAG Docs Service (`ragDocsService.ts`)
- **PDF Processing**: PDF.js integration with local worker configuration
- **Document Indexing**: Automatic text extraction and indexing
- **Content Parsing**: Structured document content extraction

### Course & Learning Services
#### Course Service (`courseService.ts`)
- **Course Management**: CRUD operations for courses and modules
- **Progress Tracking**: User progress persistence and analytics
- **Content Delivery**: Structured learning path management

#### Assessment Service (`assessmentService.ts`)
- **Question Bank Management**: Dynamic question selection
- **Progress Tracking**: User assessment history and analytics
- **Scoring System**: Intelligent scoring with explanations

#### Learning Path Service (`learningPathService.ts`)
- **Adaptive Learning**: Personalized learning recommendations
- **Skill Assessment**: Progress-based course recommendations
- **Path Optimization**: Dynamic learning path adjustments

### Admin & Analytics
#### Admin Service (`adminService.ts`)
- **User Management**: CRUD operations for all user types
- **Platform Analytics**: Comprehensive usage statistics
- **Content Moderation**: Course and user content oversight

#### Learner Memory Service (`learnerMemoryService.ts`)
- **Personalization**: User interaction history and preferences
- **Context Retention**: Chatbot conversation context management
- **Learning Analytics**: Behavioral pattern analysis

## 🗄️ Database Schema & Structure

### Core Tables
```sql
-- Users table with role-based access
users (
  id: UUID PRIMARY KEY,
  email: VARCHAR UNIQUE,
  name: VARCHAR,
  role: ENUM('student', 'teacher', 'admin'),
  password_hash: VARCHAR,
  level: ENUM('beginner', 'intermediate', 'advanced'),
  completed_assessment: BOOLEAN,
  bio: TEXT,
  specialization: VARCHAR,
  experience_years: VARCHAR,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)

-- Course and learning content
courses (
  id: UUID PRIMARY KEY,
  title: VARCHAR,
  description: TEXT,
  difficulty: ENUM('beginner', 'intermediate', 'advanced'),
  category: VARCHAR,
  created_by: UUID REFERENCES users(id),
  created_at: TIMESTAMP
)

-- User progress tracking
user_progress (
  id: UUID PRIMARY KEY,
  user_id: UUID REFERENCES users(id),
  course_id: UUID REFERENCES courses(id),
  progress_percentage: INTEGER,
  completed_at: TIMESTAMP,
  last_accessed: TIMESTAMP
)

-- Assessment and testing
assessments (
  id: UUID PRIMARY KEY,
  user_id: UUID REFERENCES users(id),
  questions: JSONB,
  answers: JSONB,
  score: INTEGER,
  completed_at: TIMESTAMP
)
```

### Row Level Security (RLS)
- **User Isolation**: Users can only access their own data
- **Role-based Access**: Different permissions for students, teachers, admins
- **Content Protection**: Secure access to courses and assessments

## 🚀 Development Workflow

### Local Development Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Configure Supabase and Gemini API credentials

# Start development server
npm run dev

# Start with proxy server (recommended for full features)
npm run dev:full
```

### Build & Deployment Process
```bash
# Production build
npm run build

# Preview production build
npm run preview

# Deploy to Vercel (automatic on push to main)
git push origin main
```

### Code Quality & Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with React best practices
- **Prettier**: Code formatting (configured in ESLint)
- **Tailwind CSS**: Utility-first styling approach

## 🔧 Configuration Files

### Vite Configuration (`vite.config.ts`)
- **Environment Variables**: Automatic loading and validation
- **Build Optimization**: Code splitting and tree shaking
- **Development Server**: Hot module replacement (HMR)

### Vercel Configuration (`vercel.json`)
- **SPA Routing**: Client-side routing support
- **Static Asset Handling**: Optimized asset delivery
- **Environment Variables**: Production environment configuration

### Tailwind Configuration (`tailwind.config.js`)
- **Custom Colors**: Brand color palette
- **Responsive Breakpoints**: Mobile-first design system
- **Typography**: Custom font configurations

## 🔒 Security Considerations

### Authentication & Authorization
- **Password Security**: bcrypt hashing with salt rounds
- **Session Management**: Secure token storage and validation
- **Role-based Access Control**: Granular permission system

### Data Protection
- **Row Level Security**: Database-level access control
- **Input Validation**: Comprehensive form validation
- **CORS Configuration**: Proper cross-origin request handling

### API Security
- **Rate Limiting**: Prevent API abuse
- **Environment Variables**: Secure credential management
- **HTTPS Enforcement**: SSL/TLS encryption

## 🚨 Common Issues & Solutions

### PDF.js Worker Issues
- **Problem**: "Failed to fetch dynamically imported module" for PDF worker
- **Solution**: Local worker file in `/public/pdf.worker.min.js`
- **Configuration**: Updated `ragDocsService.ts` to use local worker

### Supabase Connection Issues
- **Problem**: Authentication failures or connection timeouts
- **Solution**: Verify environment variables and network connectivity
- **Testing**: Use `testSupabaseConnection()` function

### Vercel Deployment Issues
- **Problem**: White screen or routing issues
- **Solution**: Proper SPA configuration in `vercel.json`
- **Static Assets**: Ensure proper asset paths in build output

## 📊 Performance Optimization

### Code Splitting
- **Dynamic Imports**: Lazy loading of components
- **Bundle Analysis**: Regular bundle size monitoring
- **Tree Shaking**: Unused code elimination

### Asset Optimization
- **Image Optimization**: Vercel automatic image optimization
- **CSS Purging**: Tailwind CSS unused style removal
- **Font Loading**: Optimized web font loading

### Database Performance
- **Query Optimization**: Efficient Supabase queries
- **Caching Strategy**: Client-side data caching
- **Real-time Updates**: Selective subscription management

## 🔮 Future Enhancements

### Planned Features
- **Advanced Analytics**: Detailed learning analytics dashboard
- **Mobile App**: React Native mobile application
- **Offline Support**: Progressive Web App (PWA) capabilities
- **Advanced AI**: More sophisticated AI tutoring features

### Technical Improvements
- **Microservices**: Backend service decomposition
- **Kubernetes**: Container orchestration for scalability
- **GraphQL**: More efficient data fetching
- **WebRTC**: Real-time collaboration features

## 🤝 Contributing Guidelines

### Development Process
1. **Fork Repository**: Create personal fork for development
2. **Feature Branches**: Use descriptive branch names
3. **Commit Messages**: Follow conventional commit format
4. **Pull Requests**: Detailed PR descriptions with testing notes

### Code Standards
- **TypeScript**: Maintain strict type safety
- **Component Structure**: Follow established patterns
- **Testing**: Add tests for new features
- **Documentation**: Update relevant documentation

---

## 📚 Additional Resources

- **Supabase Documentation**: [https://supabase.com/docs](https://supabase.com/docs)
- **React Documentation**: [https://react.dev](https://react.dev)
- **Vite Documentation**: [https://vitejs.dev](https://vitejs.dev)
- **Tailwind CSS**: [https://tailwindcss.com](https://tailwindcss.com)
- **Google Gemini API**: [https://ai.google.dev](https://ai.google.dev)

---

*This context document is maintained by the development team and should be updated with any architectural changes or new features.*

### Core Tables
- **users**: User authentication and profile data
- **courses**: Course information and metadata
- **course_modules**: Individual course modules
- **course_enrollments**: Student course registrations
- **user_progress**: Learning progress tracking
- **notes**: Admin and user notes

### Security Features
- **Row Level Security (RLS)**: Database-level security policies
- **User Roles**: Granular permission system (student/teacher/admin)
- **Custom Authentication**: bcrypt password hashing
- **API Key Management**: Secure external service integration

## Environment Configuration

### Required Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Demo Credentials
- **Student**: `student@demo.com` / `password`
- **Teacher**: `teacher@demo.com` / `password`
- **Admin**: `admin@demo.com` / `password`

## Development Workflow

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run proxy`: Start proxy server
- `npm run dev:full`: Run both proxy and dev server

### Key Development Features
- **Hot Module Replacement**: Fast development iteration
- **TypeScript**: Type-safe development
- **ESLint**: Code quality enforcement
- **Concurrent Development**: Proxy and dev server coordination

## Educational Content

### OWASP Top 10 2021 Coverage
1. **A01:2021 – Broken Access Control**
2. **A02:2021 – Cryptographic Failures**
3. **A03:2021 – Injection**
4. **A04:2021 – Insecure Design**
5. **A05:2021 – Security Misconfiguration**
6. **A06:2021 – Vulnerable and Outdated Components**
7. **A07:2021 – Identification and Authentication Failures**
8. **A08:2021 – Software and Data Integrity Failures**
9. **A09:2021 – Security Logging and Monitoring Failures**
10. **A10:2021 – Server-Side Request Forgery (SSRF)**

### Learning Methodologies
- **Hands-on Labs**: Real vulnerable applications for practice
- **Interactive Terminals**: Browser-based security testing
- **Video Learning**: Curated educational content
- **AI-Assisted Learning**: Personalized guidance and support
- **Assessment Driven**: Regular testing and feedback
- **Certificate Programs**: Skill validation and recognition

## Security Considerations

### Application Security
- **Input Validation**: Comprehensive input sanitization
- **Authentication**: Secure custom authentication system
- **Authorization**: Role-based access control (RBAC)
- **Data Protection**: Encrypted storage and transmission
- **Error Handling**: Secure error messages and logging

### Infrastructure Security
- **Database Security**: RLS policies and secure connections
- **API Security**: Rate limiting and validation
- **File Upload Security**: Type validation and secure storage
- **Environment Security**: Secure configuration management

## Future Roadmap

### Planned Features
- **Mobile Application**: React Native mobile app
- **Advanced Analytics**: Detailed learning analytics
- **Social Features**: Student collaboration and forums
- **Certification Programs**: Industry-recognized certifications
- **Enterprise Features**: Multi-tenant organization support
- **API Documentation**: Public API for integrations

### Technical Improvements
- **Performance Optimization**: Code splitting and lazy loading
- **Offline Support**: Progressive Web App (PWA) features
- **Real-time Collaboration**: Live collaborative learning
- **Advanced AI**: Enhanced AI tutoring capabilities
- **Security Hardening**: Additional security measures

## Contributing Guidelines

### Development Standards
- **TypeScript**: Strict type checking required
- **Component Structure**: Functional components with hooks
- **Styling**: Tailwind CSS utility classes
- **Testing**: Comprehensive test coverage (planned)
- **Documentation**: Inline code documentation

### Code Quality
- **ESLint**: Automated code quality checks
- **Type Safety**: Full TypeScript integration
- **Error Handling**: Comprehensive error boundaries
- **Performance**: Optimized rendering and state management

## Support and Documentation

### Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run database migrations (Supabase)
5. Start development server: `npm run dev`

### Resources
- **Supabase Documentation**: Database and authentication setup
- **Vite Documentation**: Build tool configuration
- **Tailwind CSS**: Styling framework guide
- **React Documentation**: Component development patterns

---

**Last Updated**: October 21, 2025  
**Version**: 1.0.0  
**Maintainer**: piyushxdevv