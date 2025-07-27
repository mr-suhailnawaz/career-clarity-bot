import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="absolute inset-0 bg-black/5"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Perfect Your
            <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Freelancer Profile
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get AI-powered insights and actionable feedback to optimize your LinkedIn resume 
            and stand out in the competitive freelancing market.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            variant="professional" 
            size="lg" 
            onClick={onGetStarted}
            className="text-lg px-8 py-4"
          >
            Analyze My Resume
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            See Example Analysis
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            "AI-Powered Analysis",
            "Instant Feedback",
            "Professional Recommendations"
          ].map((feature, index) => (
            <div key={index} className="flex items-center justify-center gap-3 text-white/90">
              <CheckCircle className="h-5 w-5 text-primary-glow" />
              <span className="font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};