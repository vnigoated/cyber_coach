import React, { useState } from 'react';
import { 
  Shield, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  Target, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Brain,
  Lock,
  Gamepad
} from 'lucide-react';
import { LoginForm } from '../Auth/LoginForm';
import { RegisterForm } from '../Auth/RegisterForm';

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [userType, setUserType] = useState<'student' | 'teacher' | null>(null);

  const handleGetStarted = (type: 'student' | 'teacher') => {
    setUserType(type);
    setShowLogin(true);
  };

  if (showLogin) {
    return (
      <LoginForm 
        userType={userType}
        onToggleMode={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
        onBack={() => {
          setShowLogin(false);
          setUserType(null);
        }}
        onSuccess={onLogin}
      />
    );
  }

  if (showRegister) {
    return (
      <RegisterForm 
        userType={userType}
        onToggleMode={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
        onBack={() => {
          setShowRegister(false);
          setUserType(null);
        }}
        onSuccess={onLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-page">
      {/* Hero Section */}
      <div className="relative">
        {/* Navigation */}
        <nav className="relative z-10 px-6 py-4" aria-label="Main navigation">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 accent-amber" aria-hidden />
              <span className="text-2xl font-bold text-primary">Career Connect</span>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="https://cybergame.sparkstudio.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md text-muted hover:text-primary transition-colors"
                aria-label="Open Cyber Game in new tab"
              >
                Cyber Game
              </a>
              <button
                onClick={() => handleGetStarted('student')}
                className="px-4 py-2 rounded-md btn-primary"
                aria-label="Sign in as student"
              >
                Sign In
              </button>

              <button
                onClick={() => handleGetStarted('student')}
                className="px-4 py-2 rounded-md btn-primary"
                aria-label="Get started as student"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center mb-8" role="img" aria-label="Career Connect logo">
              <div className="relative">
                <Shield className="h-24 w-24 accent-emerald animate-pulse" aria-hidden />
                  <div className="absolute inset-0 h-24 w-24 accent-emerald animate-ping opacity-20" aria-hidden>
                  <Shield className="h-full w-full" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="accent-emerald block">Master Cybersecurity</span>
              <span className="text-primary block">Build Your Career</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted mb-12 max-w-3xl mx-auto">
              Join thousands of professionals advancing their cybersecurity careers with hands-on labs, 
              AI-powered learning, and industry-recognized certifications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={() => handleGetStarted('student')}
                className="group btn-primary px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-102 transition-all duration-250 flex items-center space-x-2"
                aria-label="Start learning now"
              >
                <GraduationCap className="h-5 w-5" aria-hidden />
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleGetStarted('teacher')}
                className="group px-6 py-3 rounded-lg bg-muted text-primary border border-card transition-all duration-200 flex items-center space-x-2"
                aria-label="Teach with us"
              >
                <Users className="h-5 w-5" aria-hidden />
                <span>Teach with Us</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* What's New badges */}
            <div className="flex justify-center gap-3 mt-6 mb-16">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-primary text-sm font-semibold">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2" aria-hidden />
                New: Hands-on Ransomware Lab
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-primary text-sm font-semibold">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2" aria-hidden />
                New: AI-assisted Exam Review
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold accent-emerald mb-2">50+</div>
                <div className="text-muted">Interactive Labs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold accent-emerald mb-2">1000+</div>
                <div className="text-muted">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold accent-emerald mb-2">95%</div>
                <div className="text-muted">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold accent-emerald mb-2">24/7</div>
                <div className="text-muted">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cyber Game Promo Section (moved above Features) */}
      <div className="py-16 px-6">
          <div className="max-w-6xl mx-auto bg-card border-card rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 bg-amber-600 p-4 rounded-2xl" aria-hidden>
            <Gamepad className="h-12 w-12 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-primary mb-2">Think you're cyber smart?</h3>
            <p className="text-muted mb-4 max-w-3xl">
              Dive into real-world security scenarios, test your reactions, learn from expert feedback, and train your way to a certified cyber-aware badge — all in one interactive game.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="http://localhost:9002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 btn-primary px-5 py-3 rounded-xl font-semibold transition-transform transform hover:scale-105"
                  aria-label="Play the Cyber Game"
                >
                  <span>Play the Cyber Game</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Comprehensive cybersecurity education platform with cutting-edge tools and methodologies
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-card border-card rounded-2xl p-6 hover:bg-muted transition-all duration-300 group">
              <div className="bg-muted w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6 accent-emerald" aria-hidden />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Interactive Courses</h3>
              <p className="text-muted">
                OWASP Top 10, NIST Framework, and industry-standard cybersecurity curricula with hands-on practice.
              </p>
            </div>

            <div className="bg-card border-card rounded-2xl p-6 hover:bg-muted transition-all duration-300 group">
              <div className="bg-muted w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6 accent-emerald" aria-hidden />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Virtual Labs</h3>
              <p className="text-muted">
                Real-world cybersecurity scenarios in safe, controlled environments. Practice penetration testing and vulnerability assessment.
              </p>
            </div>

            <div className="bg-card border-card rounded-2xl p-6 hover:bg-muted transition-all duration-300 group">
              <div className="bg-muted w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="h-6 w-6 accent-emerald" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">AI-Powered Assistant</h3>
              <p className="text-muted">
                Get instant help with our intelligent chatbot powered by advanced AI. Available 24/7 for your learning journey.
              </p>
            </div>

            <div className="bg-card border-card rounded-2xl p-6 hover:bg-muted transition-all duration-300 group">
              <div className="bg-muted w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6 accent-amber" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Industry Certifications</h3>
              <p className="text-muted">
                Earn recognized certificates that validate your cybersecurity skills and boost your career prospects.
              </p>
            </div>

            <div className="bg-card border-card rounded-2xl p-6 hover:bg-muted transition-all duration-300 group">
              <div className="bg-muted w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 accent-amber" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Real-time Analytics</h3>
              <p className="text-muted">
                Track your progress with detailed analytics and personalized learning recommendations powered by AI.
              </p>
            </div>

            <div className="bg-card border-card rounded-2xl p-6 hover:bg-muted transition-all duration-300 group">
              <div className="bg-muted w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6 accent-emerald" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Global Community</h3>
              <p className="text-muted">
                Connect with cybersecurity professionals worldwide. Share knowledge, collaborate, and grow together.
              </p>
            </div>
          </div>
        </div>
      </div>
      
          

          {/* Learning Paths Section */}
  <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Tailored curricula for every skill level and career goal
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Beginner Path */}
            <div className="bg-card border-card rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-center mb-6">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 accent-emerald" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Beginner</h3>
                <p className="text-muted">Perfect for newcomers to cybersecurity</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                  Cybersecurity Fundamentals
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                  Network Security Basics
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                  Introduction to Ethical Hacking
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                  Security Awareness Training
                </li>
              </ul>

              <button 
                onClick={() => handleGetStarted('student')}
                className="w-full btn-primary py-3 rounded-xl font-semibold transition-colors"
              >
                Start Learning
              </button>
            </div>

            {/* Intermediate Path */}
            <div className="bg-card border-card rounded-2xl p-8 hover:scale-105 transition-transform duration-300 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-amber-600 text-primary px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 accent-amber" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Intermediate</h3>
                <p className="text-muted">For those with basic cybersecurity knowledge</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-orange-400 mr-3" />
                  Advanced Penetration Testing
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-orange-400 mr-3" />
                  Incident Response & Forensics
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-orange-400 mr-3" />
                  Security Architecture Design
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-orange-400 mr-3" />
                  Vulnerability Assessment
                </li>
              </ul>

              <button 
                onClick={() => handleGetStarted('student')}
                className="w-full btn-primary py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Start Learning
              </button>
            </div>

            {/* Advanced Path */}
            <div className="bg-card border-card rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-center mb-6">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 accent-emerald" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Advanced</h3>
                <p className="text-muted">For experienced cybersecurity professionals</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  Advanced Threat Hunting
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  Red Team Operations
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  Cloud Security Architecture
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3" />
                  Zero Trust Implementation
                </li>
              </ul>

              <button 
                onClick={() => handleGetStarted('student')}
                className="w-full btn-primary py-3 rounded-xl font-semibold transition-colors"
              >
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Professionals Worldwide
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              See what our students and industry experts have to say about Career Connect
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 mb-4">
                "Career Connect transformed my cybersecurity career. The hands-on labs and AI assistance 
                made complex concepts easy to understand and apply in real-world scenarios."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-white font-semibold">
                  SR
                </div>
                <div className="ml-3">
                  <div className="text-primary font-semibold">Sarah Rodriguez</div>
                  <div className="text-muted text-sm">Security Analyst at TechCorp</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 mb-4">
                "The virtual labs are incredibly realistic. I was able to practice penetration testing 
                techniques in a safe environment before applying them in my job."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-white font-semibold">
                  MJ
                </div>
                <div className="ml-3">
                  <div className="text-primary font-semibold">Michael Johnson</div>
                  <div className="text-muted text-sm">Penetration Tester at SecureNet</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 mb-4">
                "As a cybersecurity instructor, I love how Career Connect makes it easy to create 
                engaging content and track student progress. The platform is intuitive and powerful."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-white font-semibold">
                  AC
                </div>
                <div className="ml-3">
                  <div className="text-primary font-semibold">Dr. Amanda Chen</div>
                  <div className="text-muted text-sm">Cybersecurity Professor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
  <div className="py-20 px-6 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Cybersecurity Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have advanced their careers with Career Connect. 
            Start learning today and secure your future in cybersecurity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => handleGetStarted('student')}
              className="group bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <GraduationCap className="h-6 w-6" />
              <span>Start Learning Now</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => handleGetStarted('teacher')}
              className="group bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 px-8 py-4 rounded-2xl font-semibold text-lg backdrop-blur-sm transition-all duration-300 flex items-center space-x-2"
            >
              <Users className="h-6 w-6" />
              <span>Become an Instructor</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Shield className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-white">Career Connect</span>
            </div>
            
            <div className="text-slate-400 text-center md:text-right">
              <p>&copy; 2024 Career Connect. All rights reserved.</p>
              <p className="text-sm mt-1">Empowering the next generation of cybersecurity professionals.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};