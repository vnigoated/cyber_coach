# 🛡️ Career Connect - Full Career Development Platform

<div align="center">




![Career Connect Logo](https://img.shields.io/badge/Career%20Connect-Cybersecurity%20Education-orange?style=for-the-badge&logo=security&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://careercoach.sparkstudio.co.in)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/piyushdhoka/varun_sovap)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A comprehensive cybersecurity education platform with AI-powered learning, interactive labs, and career development tools.**

</div>

## 🌟 Features

### 🎓 **Multi-Role Learning System**
- **Students**: Interactive courses, assessments, and hands-on labs
- **Teachers**: Course creation, student management, and analytics
- **Administrators**: Platform oversight, user management, and comprehensive analytics

### 🤖 **AI-Powered Components**
- **Intelligent Chatbot**: Context-aware assistance with RAG (Retrieval-Augmented Generation)
- **Document Processing**: PDF parsing and intelligent content extraction
- **Personalized Learning**: Adaptive learning paths based on user progress

### 🔬 **Interactive Learning Environment**
- **Virtual Labs**: Real-time cybersecurity lab environments
- **Assessment System**: Comprehensive testing with analytics
- **Video Library**: Curated educational content
- **Technical Interviews**: Practice sessions for career preparation


### 📊 **Analytics & Progress Tracking**
- **Learning Analytics**: Detailed progress tracking and insights
- **Performance Metrics**: Comprehensive assessment analytics
- **Certification System**: Digital certificates for completed courses

## 🚀 Technology Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React
- **State Management**: React Context API

### Backend & Database
- **Backend-as-a-Service**: Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth with bcrypt.js
- **File Storage**: Supabase Storage

### AI & Document Processing
- **PDF Processing**: PDF.js 4.0.379
- **AI Integration**: Google Gemini API
- **Document Parsing**: Custom RAG implementation

### DevOps & Deployment
- **Hosting**: Vercel
- **Version Control**: Git/GitHub
- **CI/CD**: GitHub Actions (via Vercel)
- **Domain**: Custom domain with SSL

## 📁 Project Structure

```
varun_sovap/
├── public/                          # Static assets
│   ├── docs/                       # PDF documents for RAG
│   └── pdf.worker.min.mjs          # PDF.js worker
├── src/
│   ├── components/                  # React components
│   │   ├── Admin/                  # Admin dashboard components
│   │   ├── Assessment/             # Assessment and testing
│   │   ├── Auth/                   # Authentication forms
│   │   ├── Certificates/           # Certificate management
│   │   ├── Chatbot/                # AI chatbot interface
│   │   ├── Courses/                # Course management
│   │   ├── Dashboard/              # User dashboards
│   │   ├── Labs/                   # Virtual lab environments
│   │   ├── Layout/                 # Layout components
│   │   ├── Notes/                  # Note-taking system
│   │   ├── Profile/                # User profile management
│   │   ├── Teacher/                # Teacher dashboard
│   │   ├── TechnicalInterview/     # Interview practice
│   │   └── Video/                  # Video library
│   ├── context/                    # React Context providers
│   ├── data/                       # Static data and configurations
│   ├── lib/                        # Library configurations
│   ├── services/                   # API and business logic
│   └── types/                      # TypeScript type definitions
├── supabase/
│   └── migrations/                 # Database migrations
└── server.mjs                      # Express.js proxy server
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Google Gemini API key

### 1. Clone the Repository
```bash
git clone https://github.com/piyushdhoka/varun_sovap.git
cd varun_sovap
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Database Setup
1. Set up your Supabase project
2. Run the migrations in the `supabase/migrations/` directory
3. Configure Row Level Security (RLS) policies

### 5. Development Server
```bash
# Start the development server
npm run dev

# Start with proxy server (for full features)
npm run dev:full
```

### 6. Build for Production
```bash
npm run build
npm run preview
```

## 🌐 Deployment

The application is configured for deployment on Vercel with automatic deployments from the main branch.

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_GEMINI_API_KEY`: Your Google Gemini API key

## 🎯 Usage

### For Students
1. **Register/Login**: Create an account with student role
2. **Take Assessment**: Complete initial skill assessment
3. **Browse Courses**: Explore available cybersecurity courses
4. **Interactive Labs**: Practice with hands-on lab environments
5. **AI Assistance**: Use the chatbot for learning support
6. **Track Progress**: Monitor your learning journey

### For Teachers
1. **Create Courses**: Develop course content and structure
2. **Manage Students**: Oversee student progress and performance
3. **Analytics**: View detailed teaching analytics
4. **Content Management**: Upload and organize educational materials

### For Administrators
1. **User Management**: Manage all platform users
2. **Platform Analytics**: Comprehensive platform insights
3. **Content Oversight**: Monitor and manage all content
4. **System Configuration**: Configure platform settings

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/piyushdhoka/varun_sovap/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Supabase** for the backend infrastructure
- **Vercel** for hosting and deployment
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful icons
- **PDF.js** for document processing capabilities

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/piyushdhoka/varun_sovap?style=social)
![GitHub forks](https://img.shields.io/github/forks/piyushdhoka/varun_sovap?style=social)
![GitHub issues](https://img.shields.io/github/issues/piyushdhoka/varun_sovap)
![GitHub pull requests](https://img.shields.io/github/issues-pr/piyushdhoka/varun_sovap)

---

<div align="center">
  <p>Made with ❤️ by the Career Connect Team</p>
  <p>
    <a href="https://careercoach.sparkstudio.co.in">Live Demo</a> •
    <a href="https://github.com/piyushdhoka/varun_sovap/issues">Report Bug</a> •
    <a href="https://github.com/piyushdhoka/varun_sovap/issues">Request Feature</a>
  </p>
</div>
#   v o i s _ h a c k a t h o n  
 