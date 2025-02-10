
import { Background } from "@/components/Background";
import { ArrowLeft, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Challenge {
  id: number;
  question: string;
  options: string[];
  correct: number;
  completed: boolean;
}

const DailyChallenge = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      question: "If a train travels 120 kilometers in 2 hours, what is its average speed?",
      options: ["30 km/h", "60 km/h", "90 km/h", "120 km/h"],
      correct: 1,
      completed: false,
    },
    {
      id: 2,
      question: "What is the value of sin(30°)?",
      options: ["0.5", "1", "0.866", "0.707"],
      correct: 0,
      completed: false,
    },
    {
      id: 3,
      question: "If x² + 5x + 6 = 0, what are the values of x?",
      options: ["-2 and -3", "-1 and -6", "2 and 3", "1 and 6"],
      correct: 0,
      completed: false,
    },
    {
      id: 4,
      question: "What is the area of a circle with radius 5 units?",
      options: ["25π", "10π", "15π", "20π"],
      correct: 0,
      completed: false,
    },
    {
      id: 5,
      question: "If cos(x) = 0.5, what is x?",
      options: ["30°", "45°", "60°", "90°"],
      correct: 2,
      completed: false,
    },
  ]);
  
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const newChallenges = [...challenges];
    const challenge = newChallenges[currentChallenge];

    if (selectedAnswer === challenge.correct) {
      setScore(prev => prev + 20);
      challenge.completed = true;
      setChallenges(newChallenges);
      
      toast({
        title: "Correct!",
        description: "Well done! Keep going!",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Try another challenge!",
        variant: "destructive",
      });
    }

    setSelectedAnswer(null);
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
    }
  };

  const allCompleted = challenges.every(c => c.completed);

  return (
    <main className="min-h-screen relative pt-20">
      <Background />
      <div className="container mx-auto px-4 py-8">
        <Link to="/games" className="flex items-center gap-2 text-accent hover:text-accent-light mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Games
        </Link>

        <div className="glass-card p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gradient">Daily Challenges</h1>
            <div className="flex items-center gap-4">
              <Trophy className="w-6 h-6 text-accent" />
              <span className="text-xl font-bold">Score: {score}/100</span>
            </div>
          </div>

          {!allCompleted ? (
            <div className="space-y-6">
              <div className="flex justify-between mb-4">
                {challenges.map((_, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === currentChallenge
                        ? 'bg-accent text-white'
                        : challenges[index].completed
                        ? 'bg-green-500/50 text-white'
                        : 'bg-white/10'
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>

              <p className="text-xl">{challenges[currentChallenge].question}</p>
              <div className="space-y-3">
                {challenges[currentChallenge].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full p-4 rounded ${
                      selectedAnswer === index
                        ? 'bg-accent text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full bg-accent hover:bg-accent-light"
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-accent">All Challenges Completed!</h2>
              <p>Final Score: {score}/100</p>
              <Trophy className="w-12 h-12 text-accent mx-auto" />
              <p>Come back tomorrow for new challenges.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default DailyChallenge;
