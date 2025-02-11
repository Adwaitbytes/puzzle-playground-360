
import { Background } from "@/components/Background";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const problems = [
  {
    id: 1,
    question: "Sarah has 5 apples and buys 3 more. How many apples does she have now?",
    options: ["7", "8", "9", "6"],
    answer: "8",
    explanation: "5 apples + 3 apples = 8 apples",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "A train travels 60 miles per hour. How far will it travel in 2 hours?",
    options: ["100", "120", "90", "150"],
    answer: "120",
    explanation: "60 miles/hour × 2 hours = 120 miles",
    difficulty: "Medium"
  },
  {
    id: 3,
    question: "If a rectangle has a length of 8 meters and a width of 5 meters, what is its area?",
    options: ["35", "40", "45", "13"],
    answer: "40",
    explanation: "Area = length × width = 8 meters × 5 meters = 40 square meters",
    difficulty: "Medium"
  }
];

const WordProblems = () => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (selected: string) => {
    const correct = selected === problems[currentProblem].answer;
    
    if (correct) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: "Well done! Keep going!",
        variant: "default",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Try again or check the explanation!",
        variant: "destructive",
      });
    }
    setShowExplanation(true);
  };

  const nextProblem = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(prev => prev + 1);
      setShowExplanation(false);
    } else {
      toast({
        title: "Game Complete! 🏆",
        description: `You scored ${score} out of ${problems.length}!`,
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
        
        <h1 className="text-2xl sm:text-4xl font-bold text-gradient mb-6">Word Problems</h1>
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 glass-card mb-6">
            <div className="mb-4">
              <span className="text-sm text-accent mb-2 block">
                Problem {currentProblem + 1} of {problems.length} • {problems[currentProblem].difficulty}
              </span>
              <h2 className="text-xl font-semibold mb-4">{problems[currentProblem].question}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {problems[currentProblem].options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    variant="outline"
                    className="w-full text-lg py-6 hover:bg-accent/20"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {showExplanation && (
              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <h3 className="font-semibold mb-2">Explanation:</h3>
                <p>{problems[currentProblem].explanation}</p>
                <Button 
                  className="mt-4 w-full bg-accent hover:bg-accent-light"
                  onClick={nextProblem}
                >
                  Next Problem
                </Button>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-accent font-semibold">Current Score: {score}/{problems.length}</p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default WordProblems;
