
import { Background } from "@/components/Background";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const patterns = [
  {
    sequence: [2, 4, 6, 8],
    nextNumber: 10,
    description: "Each number increases by 2",
    options: ["9", "10", "11", "12"],
    difficulty: "Easy"
  },
  {
    sequence: [1, 3, 6, 10],
    nextNumber: 15,
    description: "The difference between consecutive numbers increases by 1",
    options: ["13", "14", "15", "16"],
    difficulty: "Medium"
  },
  {
    sequence: [2, 4, 8, 16],
    nextNumber: 32,
    description: "Each number is doubled",
    options: ["24", "28", "30", "32"],
    difficulty: "Medium"
  }
];

const PatternQuest = () => {
  const [currentPattern, setCurrentPattern] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (selected: string) => {
    const correct = Number(selected) === patterns[currentPattern].nextNumber;
    
    if (correct) {
      setScore(prev => prev + 1);
      toast({
        title: "Pattern Found! 🎉",
        description: "You've discovered the sequence!",
        variant: "default",
      });
    } else {
      toast({
        title: "Keep Looking",
        description: "Try to spot the pattern in the numbers",
        variant: "destructive",
      });
    }
    setShowExplanation(true);
  };

  const nextPattern = () => {
    if (currentPattern < patterns.length - 1) {
      setCurrentPattern(prev => prev + 1);
      setShowExplanation(false);
    } else {
      toast({
        title: "Quest Complete! 🏆",
        description: `You discovered ${score} out of ${patterns.length} patterns!`,
      });
    }
  };

  return (
    <main className="min-h-screen relative pt-16 sm:pt-20">
      <Background />
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <Link to="/games" className="flex items-center gap-2 text-accent hover:text-accent-light mb-4 sm:mb-8">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Back to Games</span>
        </Link>
        
        <h1 className="text-2xl sm:text-4xl font-bold text-gradient mb-6">Pattern Quest</h1>
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 glass-card mb-6 bg-secondary/30">
            <div className="mb-4">
              <span className="text-sm text-accent mb-2 block">
                Pattern {currentPattern + 1} of {patterns.length} • {patterns[currentPattern].difficulty}
              </span>
              
              <div className="flex justify-center gap-4 mb-6">
                {patterns[currentPattern].sequence.map((num, index) => (
                  <div key={index} className="w-12 h-12 flex items-center justify-center bg-accent/20 rounded-lg text-xl font-bold">
                    {num}
                  </div>
                ))}
                <div className="w-12 h-12 flex items-center justify-center bg-accent/40 rounded-lg text-xl font-bold">
                  ?
                </div>
              </div>
              
              <p className="text-center mb-6">What number comes next in the sequence?</p>
              
              <div className="grid grid-cols-2 gap-4">
                {patterns[currentPattern].options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="w-full py-6 text-lg bg-accent hover:bg-accent-light text-white"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {showExplanation && (
              <div className="mt-6 p-4 bg-primary/20 rounded-lg">
                <h3 className="font-semibold mb-2">Pattern Explanation:</h3>
                <p className="text-white/90">{patterns[currentPattern].description}</p>
                <Button 
                  className="mt-4 w-full bg-accent hover:bg-accent-light"
                  onClick={nextPattern}
                >
                  Next Pattern
                </Button>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-accent font-semibold">Patterns Found: {score}/{patterns.length}</p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default PatternQuest;
