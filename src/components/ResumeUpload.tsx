import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, X, Loader2 } from "lucide-react";

interface ResumeUploadProps {
  onFileAnalyzed: (analysis: any) => void;
}

export const ResumeUpload = ({ onFileAnalyzed }: ResumeUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const acceptedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && acceptedTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && acceptedTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      toast({
        title: "Invalid file type", 
        description: "Please upload a PDF or Word document",
        variant: "destructive",
      });
    }
  };

  const analyzeResume = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with mock data
    setTimeout(() => {
      const mockAnalysis = {
        overall_score: 78,
        sections: {
          headline: { score: 85, feedback: "Strong professional headline that clearly states your value proposition." },
          summary: { score: 72, feedback: "Good summary but could be more specific about achievements and metrics." },
          experience: { score: 80, feedback: "Well-structured experience section with clear responsibilities." },
          skills: { score: 75, feedback: "Comprehensive skills list but missing some trending technologies." },
          education: { score: 90, feedback: "Education section is complete and well-formatted." }
        },
        recommendations: [
          "Add specific metrics and quantifiable achievements to your experience descriptions",
          "Include more industry-relevant keywords to improve ATS compatibility",
          "Consider adding a portfolio section or project highlights",
          "Update skills section with latest technologies in your field"
        ],
        strengths: [
          "Professional formatting and structure",
          "Clear career progression",
          "Strong educational background"
        ],
        improvements: [
          "Lack of quantifiable achievements",
          "Missing portfolio links",
          "Could benefit from more keywords"
        ]
      };
      
      onFileAnalyzed(mockAnalysis);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed successfully.",
      });
    }, 3000);
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Upload Your Resume</h2>
        <p className="text-muted-foreground">Upload your LinkedIn resume to get detailed feedback and improvement suggestions</p>
      </div>

      <Card className="p-8 shadow-card">
        {!selectedFile ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              isDragOver 
                ? 'border-primary bg-accent/50' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drag & drop your resume here</h3>
            <p className="text-muted-foreground mb-4">or click to browse</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>Choose File</span>
              </Button>
            </label>
            <p className="text-sm text-muted-foreground mt-4">
              Supports PDF, DOC, and DOCX files (max 10MB)
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              variant="professional" 
              size="lg" 
              onClick={analyzeResume}
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                "Analyze Resume"
              )}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};