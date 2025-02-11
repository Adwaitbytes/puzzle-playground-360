
import { Background } from "@/components/Background";
import { ArrowLeft, Timer, Trophy, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const challenges = [
  {
    category: "Speed Round",
    question: "Calculate: 15 × 12",
    options: ["160", "170", "180", "190"],
    answer: "180",
    points: 100,
    timeLimit: 15
  },
  {
    category: "Problem Solving",
    question: "If a train travels at 60 mph for 2.5 hours, how far does it travel?",
    options: ["120 miles", "150 miles", "180 miles", "200 miles"],
    answer: "150 miles",
    points: 150,
    timeLimit: 30
  },
  {
    category: "Mental Math",
    question: "What is 25% of 360?",
    options: ["80", "90", "60", "70"],
    answer: "90",
    points: 120,
    timeLimit: 20
  }
];

const MathOlympics = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(challenges[0].timeLimit);
  const [isActive, setIsActive] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      toast({
        title: "Time's Up!",
        description: "Try to answer faster next time!",
        variant: "destructive",
      });
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isActive, toast]);

  const handleAnswer = (selected: string) => {
    const correct = selected === challenges[currentChallenge].answer;
    const timeBonus = Math.floor(timeLeft * 10);
    
    if (correct) {
      const pointsEarned = challenges[currentChallenge].points + timeBonus;
      setScore(prev => prev + pointsEarned);
      toast({
        title: "Correct! 🎉",
        description: `You earned ${pointsEarned} points (including ${timeBonus} time bonus)!`,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Keep practicing to improve your speed and accuracy!",
        variant: "destructive",
      });
    }

    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setTimeLeft(challenges[currentChallenge + 1].timeLimit);
      setIsActive(true);
    } else {
      toast({
        title: "Olympics Complete! 🏆",
        description: `Final Score: ${score} points!`,
      });
      setIsActive(false);
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
        
        <h1 className="text-2xl sm:text-4xl font-bold text-gradient mb-6">Math Olympics</h1>
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 glass-card mb-6 bg-secondary/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span className="text-lg font-semibold">Score: {score}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-accent" />
                <span className="text-lg font-semibold">Time: {timeLeft}s</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-accent">
                  {challenges[currentChallenge].category} • {challenges[currentChallenge].points} points
                </span>
              </div>
              
              <h2 className="text-xl font-semibold mb-6">{challenges[currentChallenge].question}</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {challenges[currentChallenge].options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={!isActive}
                    className="w-full py-6 text-lg bg-accent hover:bg-accent-light text-white disabled:opacity-50"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-center text-sm text-white/60">
              Answer quickly for time bonus points!
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default MathOlympics;
