import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, TrendingUp, Download, RefreshCw } from "lucide-react";

interface AnalysisData {
  overall_score: number;
  sections: {
    [key: string]: {
      score: number;
      feedback: string;
    };
  };
  recommendations: string[];
  strengths: string[];
  improvements: string[];
}

interface AnalysisResultsProps {
  analysis: AnalysisData;
  onStartOver: () => void;
}

export const AnalysisResults = ({ analysis, onStartOver }: AnalysisResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <div className="max-w-6xl mx-auto px-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Resume Analysis Results</h2>
        <p className="text-muted-foreground">Here's your detailed resume analysis and improvement recommendations</p>
      </div>

      {/* Overall Score */}
      <Card className="p-6 shadow-card bg-gradient-secondary">
        <div className="text-center">
          <div className="mb-4">
            <div className={`text-6xl font-bold ${getScoreColor(analysis.overall_score)} mb-2`}>
              {analysis.overall_score}
            </div>
            <p className="text-lg text-muted-foreground">Overall Score</p>
          </div>
          <Progress value={analysis.overall_score} className="w-full max-w-md mx-auto h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            Your resume scores {analysis.overall_score}/100
          </p>
        </div>
      </Card>

      {/* Section Scores */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Section Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(analysis.sections).map(([section, data]) => (
            <Card key={section} className="p-6 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold capitalize">{section}</h4>
                <Badge variant={getScoreBadgeVariant(data.score)}>
                  {data.score}%
                </Badge>
              </div>
              <Progress value={data.score} className="mb-3 h-2" />
              <p className="text-sm text-muted-foreground">{data.feedback}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 shadow-card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Key Recommendations
          </h3>
          <div className="space-y-3">
            {analysis.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                <div className="w-6 h-6 bg-primary rounded-full text-white text-xs flex items-center justify-center font-semibold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          {/* Strengths */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Strengths
            </h3>
            <div className="space-y-2">
              {analysis.strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <p className="text-sm">{strength}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Areas for Improvement */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
              Areas for Improvement
            </h3>
            <div className="space-y-2">
              {analysis.improvements.map((improvement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <p className="text-sm">{improvement}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="professional" size="lg" className="px-8">
          <Download className="mr-2 h-4 w-4" />
          Download Full Report
        </Button>
        <Button variant="outline" size="lg" onClick={onStartOver} className="px-8">
          <RefreshCw className="mr-2 h-4 w-4" />
          Analyze Another Resume
        </Button>
      </div>
    </div>
  );
};