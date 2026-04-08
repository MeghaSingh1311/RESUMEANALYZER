import React, { useState, useEffect } from 'react';
import UploadForm from './components/upload/UploadForm';
import ScoreOverview from './components/dashboard/ScoreOverview';
import ATSPanel from './components/dashboard/ATSPanel';
import MatchPanel from './components/dashboard/MatchPanel';
import ProjectsPanel from './components/dashboard/ProjectsPanel';
import ShortlistPanel from './components/dashboard/ShortlistPanel';
import ImprovementPanel from './components/dashboard/ImprovementPanel';
import VerdictPanel from './components/dashboard/VerdictPanel';
import { AlertTriangle, RefreshCw, Rocket, Target, Shield, ArrowRight, ArrowLeft } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="py-20 flex flex-col items-center text-center">
      <div className="inline-flex items-center space-x-2 bg-indigo-50/50 backdrop-blur-sm border border-indigo-100/50 px-4 py-2 rounded-full mb-8">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
        </span>
        <span className="text-sm font-medium text-indigo-700 uppercase tracking-wider">AI-Powered Extraction Now Live</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
        Master Your <span className="text-indigo-600 bg-clip-text">Job Applications</span>
      </h1>
      
      <p className="max-w-2xl text-xl text-gray-700/80 mb-12 leading-relaxed">
        Upload your resume and the job description to get an instant analysis of your 
        skills, ATS compatibility, and professional match score.
      </p>

      <button 
        onClick={onStart}
        className="group relative inline-flex items-center px-8 py-4 bg-indigo-600/90 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-indigo-200/50"
      >
        <span>Analyze Your Resume</span>
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl">
        <div className="p-8 glass-card rounded-2xl">
          <div className="w-12 h-12 bg-blue-100/50 rounded-lg flex items-center justify-center mb-6">
            <Rocket className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold mb-3">ATS Optimization</h3>
          <p className="text-gray-600 text-sm">We check your file formatting and keyword density to ensure you pass through modern recruiters' filters seamlessly.</p>
        </div>

        <div className="p-8 glass-card rounded-2xl">
          <div className="w-12 h-12 bg-indigo-100/50 rounded-lg flex items-center justify-center mb-6">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold mb-3">Skill Gap Analysis</h3>
          <p className="text-gray-600 text-sm">Our "Brain" scans the job description and tells you exactly which skills you're missing from your resume.</p>
        </div>

        <div className="p-8 glass-card rounded-2xl">
          <div className="w-12 h-12 bg-emerald-100/50 rounded-lg flex items-center justify-center mb-6">
            <Shield className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-bold mb-3">Instant Verdict</h3>
          <p className="text-gray-600 text-sm">Get a probability score of being shortlisted and a final grade to understand your current standing in the market.</p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [view, setView] = useState('landing');

  useEffect(() => {
    window.history.replaceState({ view: 'landing' }, '');

    const handlePopState = (event) => {
      const nextView = event.state?.view || 'landing';
      setView(nextView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const pushView = (nextView) => {
    window.history.pushState({ view: nextView }, '');
    setView(nextView);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    pushView('upload');
  };

  const handleGoBack = () => {
    if (view === 'results') {
      pushView('upload');
    } else if (view === 'upload') {
      pushView('landing');
    }
  };

  const startAnalysis = () => {
    pushView('upload');
  };

  const handleAnalysisResult = (result) => {
    setAnalysisResult(result);
    pushView('results');
  };

  return (
    <div className="min-h-screen text-gray-900 font-sans antialiased">
      {/* Navbar with Glassmorphism */}
      <nav className="glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              {view !== 'landing' && (
                <button
                  onClick={handleGoBack}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-100 transition-all"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div className="bg-indigo-600/90 backdrop-blur-sm p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">ResumeAnalyzer</span>
            </div>
            {analysisResult && (
              <button
                onClick={handleReset}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-indigo-100/50 transition-all"
              >
                <span>New Analysis</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'landing' ? (
          <LandingPage onStart={startAnalysis} />
        ) : view === 'upload' ? (
          <div className="py-12">
            <UploadForm onResult={handleAnalysisResult} />
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Incomplete Analysis Warning Banner */}
            {analysisResult.meta?.incomplete === true && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-yellow-800">Analysis may be incomplete</h3>
                  <p className="text-sm text-yellow-700">Some sections could not be fully processed due to technical limits or input complexity.</p>
                </div>
              </div>
            )}

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Column */}
              <div className="lg:col-span-8 space-y-8">
                <ScoreOverview result={analysisResult} />
                <ImprovementPanel result={analysisResult} />
                <VerdictPanel result={analysisResult} />
              </div>

              {/* Sidebar Column */}
              <div className="lg:col-span-4 space-y-8">
                <ShortlistPanel result={analysisResult} />
                <ATSPanel result={analysisResult} />
                <MatchPanel result={analysisResult} />
                <ProjectsPanel result={analysisResult} />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>© 2026 Resume Analyzer Project. Built with React, Tailwind CSS, and FastAPI.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
