import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ResumeUpload } from "@/components/ResumeUpload";
import { AnalysisResults } from "@/components/AnalysisResults";

type AppState = 'hero' | 'upload' | 'results';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleGetStarted = () => {
    setCurrentState('upload');
  };

  const handleFileAnalyzed = (analysis: any) => {
    setAnalysisData(analysis);
    setCurrentState('results');
  };

  const handleStartOver = () => {
    setCurrentState('hero');
    setAnalysisData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentState === 'hero' && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}
      
      {currentState === 'upload' && (
        <div className="py-20">
          <ResumeUpload onFileAnalyzed={handleFileAnalyzed} />
        </div>
      )}
      
      {currentState === 'results' && analysisData && (
        <div className="py-20">
          <AnalysisResults analysis={analysisData} onStartOver={handleStartOver} />
        </div>
      )}
    </div>
  );
};

export default Index;
